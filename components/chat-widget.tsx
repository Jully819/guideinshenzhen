"use client";

import { useEffect, useId, useRef, useState } from "react";
import { business } from "@/lib/content";

/**
 * The message widget, bottom right of every page.
 *
 * IT DOES NOT PRETEND TO BE LIVE CHAT. There is no agent, no socket and no
 * typing indicator, so nothing here implies one: the launcher says "Questions?",
 * the panel is headed "Leave a message", and the first line states plainly that
 * the reply comes by email and roughly when. A widget that looks like live chat
 * and answers in six hours is worse than a contact form, because the visitor
 * sits and waits for a bubble that is never coming.
 *
 * THE DIRECT CHANNELS ARE ALWAYS VISIBLE, not hidden behind a failure. Someone
 * standing in an airport with a booking today wants WhatsApp, not a form and a
 * promise. The form is for questions that can wait; the row underneath it is
 * for everything else.
 *
 * IF THE FORM IS NOT CONNECTED IT SAYS SO. /api/message answers 503 when no
 * transport is configured, and this panel then shows the direct channels
 * instead of a tick — see the `no-transport` branch. Never tell someone their
 * message was sent when it went nowhere.
 *
 * The panel is a plain container, not role="dialog": it does not trap focus or
 * block the page, and announcing a modal that behaves like a popover sends a
 * screen-reader user hunting for a boundary that is not there. Escape closes
 * it and returns focus to the launcher, which is the behaviour that matters.
 */

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string; showChannels: boolean };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const panel = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const firstField = useRef<HTMLInputElement>(null);

  const panelId = useId();
  const titleId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  // Escape closes from anywhere, including from inside the textarea.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpen(false);
      launcher.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Focus the first field on open. Without this a keyboard user presses the
  // launcher and focus stays behind on the button, with the panel's fields
  // several tab stops away past everything else in the page's tab order.
  useEffect(() => {
    if (open) firstField.current?.focus();
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          page: window.location.pathname,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          state: "error",
          message:
            body.code === "no-transport"
              ? "The message form is not connected yet — but these reach us now:"
              : (body.error ?? "That did not send. Try one of these instead:"),
          showChannels: true,
        });
        return;
      }

      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({
        state: "error",
        message: "No connection. These work offline of this form:",
        showChannels: true,
      });
    }
  }

  return (
    <>
      {/* z-30, matching the sticky booking bar rather than beating it: the
          launcher sits bottom-right and the bar is pinned under the header, so
          they never meet, and nothing here should be able to cover the
          header's own dropdown at z-40. */}
      <div className="fixed right-4 bottom-4 z-30 sm:right-6 sm:bottom-6">
        {open && (
          <div
            ref={panel}
            id={panelId}
            aria-labelledby={titleId}
            /* Anchored to the viewport, not to the launcher: at 375px a panel
               positioned relative to a button in the corner runs off the right
               edge. This one spans the width with a 1rem inset and only
               becomes a floating card from sm up. */
            className="fixed inset-x-4 bottom-20 max-h-[min(32rem,calc(100dvh-7rem))] overflow-y-auto rounded-2xl border border-ink/12 bg-paper shadow-[0_28px_60px_-24px_rgb(0_0_0/0.45)] sm:absolute sm:inset-x-auto sm:right-0 sm:bottom-16 sm:w-[22rem]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4">
              <div>
                <p id={titleId} className="font-display text-[1.05rem]">
                  Leave a message
                </p>
                <p className="mt-1 text-[0.8rem] leading-relaxed text-ink/60">
                  We answer by email, usually the same day. Shenzhen keeps{" "}
                  <span className="tabular">
                    {business.hours.open}–{business.hours.close}
                  </span>{" "}
                  local time.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  launcher.current?.focus();
                }}
                className="-mr-1 shrink-0 rounded p-1 text-ink/65 transition-colors hover:text-ink"
              >
                <span className="sr-only">Close</span>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            {status.state === "sent" ? (
              <Sent onAnother={() => setStatus({ state: "idle" })} />
            ) : (
              <form onSubmit={onSubmit} className="px-5 py-4">
                <Field label="Your name" htmlFor={nameId}>
                  <input
                    ref={firstField}
                    id={nameId}
                    name="name"
                    required
                    maxLength={80}
                    autoComplete="name"
                    className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-[0.9rem] focus:border-ink"
                  />
                </Field>

                <Field label="Email for the reply" htmlFor={emailId}>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-[0.9rem] focus:border-ink"
                  />
                </Field>

                <Field label="Message" htmlFor={messageId}>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="Dates, what the trip is for, anything you need to know."
                    className="w-full resize-y rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-[0.9rem] focus:border-ink"
                  />
                </Field>

                {/* Honeypot. Hidden from sight AND from the tab order AND from
                    screen readers — a field only a script can reach. Not
                    `display:none`, which some bots skip on purpose. */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor={`${nameId}-co`}>Company</label>
                  <input
                    id={`${nameId}-co`}
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {status.state === "error" && (
                  <p
                    role="alert"
                    className="mt-1 mb-3 text-[0.82rem] leading-relaxed text-alert"
                  >
                    {status.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status.state === "sending"}
                  className="btn btn-primary mt-1 w-full justify-center py-2.5 text-[0.85rem]"
                >
                  {status.state === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}

            <Channels />
          </div>
        )}

        <button
          ref={launcher}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="btn btn-primary shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]"
        >
          {open ? "Close" : "Questions?"}
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            {open ? (
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M2 3.5h12v8H6.5L3.5 14v-2.5H2z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>
    </>
  );
}

/** Always shown, under whatever state the form is in. */
function Channels() {
  return (
    <div className="border-t border-ink/10 px-5 py-4">
      <p className="eyebrow mb-3 text-slate">Or reach us directly</p>
      <ul className="space-y-2 text-[0.88rem]">
        <li className="tabular text-ink/70">
          WeChat: {business.wechatId}
        </li>
      </ul>
    </div>
  );
}

function Sent({ onAnother }: { onAnother: () => void }) {
  return (
    <div className="px-5 py-6">
      {/* aria-live: the form it replaced is gone, so without this a screen
          reader user gets silence where the confirmation should be. */}
      <p role="status" className="font-display text-[1rem]">
        Message sent.
      </p>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-ink/65">
        It goes to the same people who run the days. You will get a reply at the
        address you gave — check spam if it is quiet for a while.
      </p>
      <button
        type="button"
        onClick={onAnother}
        className="mt-4 text-[0.85rem] text-moss underline underline-offset-4 hover:text-ink"
      >
        Send another
      </button>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label htmlFor={htmlFor} className="eyebrow mb-1.5 text-slate">
        {label}
      </label>
      {children}
    </div>
  );
}
