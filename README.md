# Shenzhen private services — booking site

Next.js 15 (App Router) + Tailwind v4. Booking calendar backed by Cal.com,
card deposit via Stripe Checkout.

## Prerequisites

**Node.js is not installed on this machine.** Install it before anything below
will run — the LTS installer from [nodejs.org](https://nodejs.org), or nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

## Setup

```bash
cd site && npm install && cp .env.example .env.local
```

Fill in `.env.local` (see comments in `.env.example`), then:

```bash
npm run dev
```

Stripe webhooks need a second terminal:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Paste the `whsec_…` it prints into `STRIPE_WEBHOOK_SECRET`.

## Do this first: the slot-hold question

Cal.com's v2 API has **no documented slot reservation endpoint**. A slot can be
taken by someone else while a guest is inside Stripe Checkout.

The current code handles this by:

1. Re-checking availability in `app/api/checkout/route.ts` before opening Checkout.
2. Re-checking again in the webhook, and **auto-refunding** if the slot has gone.

There is a second approach that would genuinely hold the slot: set the Cal.com
event type to *requires confirmation*, create a `pending` booking before
payment, and confirm it on the webhook. Whether `pending` bookings actually
block availability is **not stated in the docs and has not been tested.**

Before launch: create a test event type, make a pending booking, then call
`GET /v2/slots` and see whether the slot disappears. If it does, switch to that
approach — it's strictly better. If it doesn't, keep the refund path.

## Architecture

| Path | Role |
|---|---|
| `lib/content.ts` | **All** placeholder copy, pricing, business facts |
| `lib/cal.ts` | Cal.com v2 client — slots, bookings, session lookup |
| `lib/stripe.ts` | Server-only Stripe client |
| `lib/tz.ts` | Dual-timezone formatting — every user-facing time goes through it |
| `app/api/availability` | `GET` real slots for a month |
| `app/api/checkout` | Re-check slot, open Stripe Checkout |
| `app/api/stripe/webhook` | **Source of truth** — creates the booking on payment |
| `components/time-spine.tsx` | The signature element, reused as the step indicator |

**The booking is created by the webhook, not by the browser.** A guest who
closes the tab after paying still gets their booking. The success page only
reports what already happened.

**The webhook must stay idempotent.** Stripe retries. Dedupe currently works by
looking up the Cal.com booking whose metadata carries the `stripeSessionId`. If
you add a database, write a `processed_stripe_events` row keyed on `event.id`
and check that first — cheaper and stricter.

## Design tokens

Palette and type are defined once in `app/globals.css` under `@theme`. Colours
are taken from the gptagency.io reference.

| Token | Hex | Job |
|---|---|---|
| `--ink` | `#0E1426` | Deep navy-black. Dark sections, footer, active states. |
| `--paper` | `#EFEEE8` | Warm bone. Light section background. |
| `--paper-card` | `#F7F6F2` | Cards, which sit **lighter** than the page. |
| `--paper-dim` | `#E4E3DB` | Banding and callout blocks. |
| `--lime` | `#A4E32E` | The one loud colour. Primary action only. |
| `--olive` | `#5A6E31` | Highlight block, marks and accent text on bone. |
| `--mist` | `#C3C8D4` | Body text and hairlines on ink. |
| `--slate` | `#63635C` | Meta and eyebrow text on bone. |
| `--alert` | `#A33F32` | Errors and required markers. Not in the reference. |

**The trap in this palette: `--lime` on `--paper` is 1.33:1.** It is unreadable
as text on any light surface. Lime may only appear as:

- a **fill** with `--ink` text on it (11.86:1), or
- **text on `--ink`** (11.86:1).

Anywhere a light background needs an accent that carries text or a visible
mark, use `--olive` (4.87:1 on paper). A lime hairline or a lime 4px diamond on
bone is invisible — that is why the step indicators, list markers and callout
borders are olive rather than lime.

**Lime is also scarce on purpose.** It marks the single primary action on a
screen and nothing else. Selected tabs, the selected time slot and completed
steps use `--ink`; the selected calendar date uses `--olive`. Spend lime twice
on one view and it stops meaning "press this".

Focus rings flip by surface: `--ink` on light, `--lime` on `.on-ink`. A lime
focus ring on bone would be an invisible focus indicator.

## Replace before launch

Everything invented lives in `lib/content.ts`. `REPLACE_BEFORE_LAUNCH` at the
top of that file is the authoritative list. Summary:

- Business name, legal name, phone, WhatsApp, email, WeChat ID, licence number
- All prices — every figure is a guess
- `/about` page body copy, and the trust facts it lists as missing
- FAQ answers marked PLACEHOLDER — visa rules and cancellation terms especially
- `metadata.robots` in `app/layout.tsx` is `index: false`. Flip it when real
  content lands.

**Deliberately empty:** `testimonials` in `lib/content.ts`. No reviews were
invented — fabricated social proof is a lie to customers and unlawful in
several jurisdictions. The home page hides that section until the array has
real entries.

**Visa guidance** must link to official consular sources rather than summarise
them. Getting entry rules wrong causes real harm to a traveller.

## Gotchas already hit (don't reintroduce)

- **Never run `npm run build` while `npm run dev` is live.** They share `.next`
  and the dev server dies with `__webpack_modules__[moduleId] is not a
  function`. Fix: stop dev, `rm -rf .next`, restart.
- **Newsreader is requested roman-only.** Adding `style: ["normal","italic"]`
  back makes next/font request a Google Fonts axis subset that 404s, and the
  production build fails. Dev survives on a warm cache, so this only shows up
  in CI or on Vercel.
- **Don't put a background utility in both the base and the conditional half
  of a `className` template.** Tailwind's output order decides the winner, not
  your string order. This silently killed the calendar's selected-day
  highlight.
- **The hero sets `text-paper`.** Anything light-on-light placed inside it
  (like the booking card) must set `text-ink` explicitly or its inheriting
  text renders invisible.

## Verified

Checked against a running server on 13 Aug 2026:

- `tsc --noEmit` clean; `npm run build` clean from an empty `.next` (10 routes,
  109 kB first load, service pages prerendered).
- All routes 200; unknown paths 404.
- Timezone module tested directly against five zones. The case that matters —
  a 09:40 Shenzhen pickup renders as `21:40 Mon 13 Apr your time` from New York,
  correctly flagging the guest's previous day. Month windows land exactly on
  00:00 Shenzhen.
- Calendar keyboard: arrows ±1 / ±7, Home/End, Enter activates, one tabbable
  cell, unavailable days remain focusable so arrows can traverse them.
- Contrast measured on rendered tokens after the palette change: ink on lime
  buttons 11.86:1, lime on ink 11.86:1, olive on paper 4.87:1, slate on paper
  5.21:1, mist on ink 10.93:1, alert on paper 5.45:1, paper on olive 4.87:1,
  body 15.75:1. All AA. Lime-as-text-on-paper measures 1.33:1 and is verified
  unused.
- `/book/confirmed` with a forged `session_id` correctly refuses to confirm.

**Not verified — needs your accounts:** real Cal.com availability, a real
Stripe payment, the webhook creating a booking, webhook idempotency, and the
refund-on-race path. Availability was exercised against a stubbed response, so
the UI logic is proven but the integration is not.

## Verification steps

- Walk the flow at 375 / 768 / 1280px.
- Stripe test card `4242 4242 4242 4242`, any future expiry and CVC.
- Confirm the booking lands in the Cal.com dashboard with `stripeSessionId` in
  its metadata.
- Fire the same webhook event twice — exactly one booking should exist.
- Force the race: take the slot in Cal.com between checkout and webhook, and
  confirm the refund fires.
- Set the browser timezone to `America/New_York` and confirm both times render
  and agree.
- Keyboard-only pass through all four steps. The calendar grid is arrow-key
  navigable with a roving tabindex; Home/End jump to month start/end.
- `prefers-reduced-motion: reduce` stops the hero entrance.
