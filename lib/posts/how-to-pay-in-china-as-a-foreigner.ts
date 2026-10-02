import type { Post } from "@/lib/posts";

/**
 * PHOTOGRAPHY NOTE. One image here is genuinely Chinese and the rest are not.
 *
 * The hero is a pair of hands holding a one yuan note, so the currency in the
 * frame is the currency the post is about. It is described as a one yuan note
 * because that is what it shows. The Pexels filename says twenty, which is
 * wrong, and copying that into the alt text would have put a false detail on
 * the page.
 *
 * EVERY OTHER IMAGE IS GENERIC STOCK, taken somewhere else. Alt text describes
 * the object rather than the place, and no caption names a location.
 *
 * TWO WERE FETCHED AND THROWN OUT rather than shipped:
 *
 *   an ATM illustration, which was a black and white paper craft collage of a
 *   hand pulling US DOLLAR notes out of a machine. Wrong currency for a post
 *   about paying in China, and an illustration in a set of photographs.
 *
 *   a business dinner, which was a Western wine tasting at a rectangular table.
 *   The section it was for is about a shared round table and who quietly pays
 *   at one, so the picture argued against the paragraph. Replaced with a round
 *   table laid with shared dishes.
 *
 * VOLATILE NUMBERS ARE THE HAZARD OF THIS TOPIC and the reason the facts blocks
 * look thinner than the competing pages. Wallet limits, service fees and card
 * acceptance change without notice, and every rival guide states them as
 * settled fact with a year in the title. The caps quoted here come from the
 * State Council's own published guidance and are linked to it. The service fee
 * is attributed in the prose and explicitly marked as a figure that moves. No
 * fee percentage, no exchange rate and no per-transaction ceiling appears in a
 * facts block, because those are exactly what strand somebody at a till.
 *
 * ONE SET OF DETAILS IS SECOND HAND and flagged here so nobody promotes it. The
 * operational advice about declining dynamic currency conversion, refunds
 * landing in the app balance rather than on the card, and virtual or prepaid
 * cards being rejected is corroborated across the competing guides but has no
 * primary source in this repo. It is written as guidance, never as a rule.
 *
 * SOURCING NOTE. references/stats.md still does not exist, so there is no
 * price, response time or cancellation window anywhere in this post.
 *
 * NO STORY AND NO OPINION. references/stories.md owns three anecdotes, all
 * belonging to other companies, with an empty shelf for this brand.
 * references/opinions.md marks three of four takes NEEDS A NUMBER and the
 * fourth is Bluente's.
 */
export const howToPayInChinaAsAForeigner: Post = {
  slug: "how-to-pay-in-china-as-a-foreigner",
  title: "How to pay in China as a foreigner",
  published: "2026-08-21",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the team that stands next to visitors at the till when a foreign card is refused, and settles it in Mandarin before the queue builds.",
  readingMinutes: 18,
  metaTitle: "How to Pay in China as a Foreigner, Without Surprises",
  metaDescription:
    "How to pay in China as a foreigner. Alipay and WeChat Pay setup, card and cash backup, what fails at the till, and the fapiao rules business trips need.",
  excerpt:
    "Three layers, set up before you fly. What actually works at a till in China, what quietly fails, and the invoice rule that decides whether your company reimburses the trip.",
  socialImage:
    "/blog/how-to-pay-in-china-as-a-foreigner/og-how-to-pay-in-china-as-a-foreigner-1200x630.jpg",
  keywords: {
    primary: "how to pay in China as a foreigner",
    secondary: [
      "payment methods in China for foreigners",
      "set up Alipay and WeChat Pay with a foreign card",
      "Alipay and WeChat Pay limits for foreigners",
      "using Visa and Mastercard in China",
      "do you need cash in China",
      "paying for taxis trains and hotels in China",
      "China payment checklist before you travel",
      "foreign card declined in China",
      "paying a Chinese supplier",
      "fapiao invoice for business expenses",
    ],
    longTail: [
      "can foreigners use Alipay and WeChat Pay in China",
      "do I need a Chinese bank account to pay in China",
      "how much cash should I bring to China",
      "why was my foreign card declined in China",
      "can I use Visa or Mastercard in China",
      "what is a fapiao and do I need one",
      "who pays at a Chinese business dinner",
      "how do I pay a Chinese supplier",
    ],
  },
  hero: {
    src: "/blog/how-to-pay-in-china-as-a-foreigner/yuan-banknotes-1200.webp",
    srcSet:
      "/blog/how-to-pay-in-china-as-a-foreigner/yuan-banknotes-800.webp 800w, /blog/how-to-pay-in-china-as-a-foreigner/yuan-banknotes-1200.webp 1200w",
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt: "A pair of hands holding a one yuan banknote up to the light",
    width: 1200,
    height: 800,
    priority: true,
    credit: "cottonbro studio",
    creditUrl: "https://www.pexels.com/@cottonbro",
    sourceUrl: "https://www.pexels.com/photo/20-banknote-on-white-table-3943738/",
  },
  intro: [
    "How to pay in China as a foreigner comes down to three layers. Alipay or WeChat Pay with an international card linked, one physical card as backup, and a few hundred yuan in cash. Set the apps up before you fly. Almost everything else follows from that.",
    "The rest of this is what each layer is actually for, where each one fails, and what to do when it fails with people waiting behind you. The last two sections are for business trips, where the money question is not paying for lunch. It is paying a supplier and getting an invoice your finance team will accept.",
  ],
  sections: [
    {
      id: "three-layers",
      heading: "The three layers, and what each one is for",
      image: {
        src: "/blog/how-to-pay-in-china-as-a-foreigner/phone-app-setup-1200.webp",
        srcSet:
          "/blog/how-to-pay-in-china-as-a-foreigner/phone-app-setup-800.webp 800w, /blog/how-to-pay-in-china-as-a-foreigner/phone-app-setup-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A hand holding a smartphone showing a screen of app icons",
        width: 1200,
        height: 800,
        credit: "FOX",
        creditUrl: "https://www.pexels.com/@fox-58267",
        sourceUrl:
          "https://www.pexels.com/photo/person-holding-black-android-smartphone-with-black-case-969462/",
      },
      paragraphs: [
        "China skipped the card machine. It went from cash to phones and largely left the plastic step out, which is why a Visa that works in forty countries can be useless in a noodle shop.",
        "So you carry three things rather than one. Each covers where the others fail.",
        "**The phone is the primary layer and it covers most of the day.** A mainland wallet app with your own card linked pays for meals, taxis, tickets, metro fares and market stalls. This is not the backup. This is the main way money moves in China, and treating it as optional is the single most common mistake visitors make.",
        "The physical card is the second layer. It works at international hotels, airports, larger malls and department stores. The State Council's own guidance sets an expectation for three-star and above hotels and the higher-graded attractions. That tells you where coverage is meant to be good. It also tells you where it is not.",
        "Cash is the third layer and it is the one people drop first. Keep it. A dead battery turns the first layer off completely, and a small vendor with no card terminal turns the second one off too. Notes work in both situations.",
        "One more thing sits underneath all three. Your phone needs to be online to pay, so data matters as much as the wallet does. A roaming SIM or an eSIM bought before you land is part of the payment setup, not a separate errand.",
      ],
      facts: [
        { label: "Layer one", value: "A mainland wallet app, for most of the day" },
        { label: "Layer two", value: "One physical card, for hotels and larger retail" },
        { label: "Layer three", value: "Cash, for small vendors and dead batteries" },
        { label: "Underneath all three", value: "Working mobile data, arranged before arrival" },
      ],
    },
    {
      id: "setting-up",
      heading: "Setting up the wallet apps before you fly",
      image: {
        src: "/blog/how-to-pay-in-china-as-a-foreigner/qr-code-payment-1200.webp",
        srcSet:
          "/blog/how-to-pay-in-china-as-a-foreigner/qr-code-payment-800.webp 800w, /blog/how-to-pay-in-china-as-a-foreigner/qr-code-payment-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A phone screen being held up to a wall-mounted QR code scanner",
        width: 1200,
        height: 800,
        credit: "Proxyclick Visitor Management System",
        creditUrl: "https://www.pexels.com/@proxyclick",
        sourceUrl: "https://www.pexels.com/photo/cellphone-and-scanner-2451622/",
      },
      paragraphs: [
        "Do this at home, on your own wifi, a week before you travel. Not at the airport.",
        "The reason is verification. Both apps ask for a passport scan and a face check, and both can hand the card off to your bank for a one-time code. If your bank sends that code by SMS to a number that does not roam, you want to find out in your kitchen rather than in an arrivals hall.",
        "Foreign users can link international credit cards including Visa and Mastercard, according to the [official guidance for overseas visitors](https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html). A Chinese bank account is not required. That single fact is the thing that changed in recent years and it is why guides written before it are worth ignoring.",
        "Alipay tends to be the easier of the two for a first-time visitor. It has done more work on the international onboarding, and the same government guidance notes it expanded its service languages from two to sixteen.",
        "**Set up both anyway.** They are not interchangeable at the merchant end. Some small vendors display one code and not the other, and the day one app has a problem is the day you find out you never installed the other.",
        "The two apps are not the same tool. Alipay is a payments product first, and it shows. The English is better, the card onboarding is smoother, and more of the travel functions such as transport and tickets are built into it.",
        "WeChat is a messaging app that grew a wallet. If you are doing business in China you will end up on WeChat regardless, because that is where suppliers, guides and colleagues expect to reach you. The payment side then comes along with it.",
        "That is the honest split. Install Alipay for paying and WeChat for talking to people, and accept that each will occasionally do the other's job.",
        "A few details decide whether the card links on the first attempt. The name on the card should match the name in your passport. Virtual and prepaid cards are commonly refused. And your bank's fraud system may block the first mainland transaction by default, which is a phone call to your card issuer before you leave rather than a problem with the app.",
      ],
      list: {
        intro: "What to have in front of you before you start.",
        ordered: true,
        items: [
          "Your passport, with the photo page clean and readable",
          "A physical credit or debit card in your own name",
          "A phone number that can receive your bank's verification code",
          "Twenty minutes and a stable connection",
          "A small test purchase to run once the card is linked",
        ],
      },
      facts: [
        { label: "Do it", value: "At home, about a week before travel" },
        { label: "Needed", value: "Passport, a card in your own name, a reachable phone number" },
        { label: "Install", value: "Both apps, not one" },
        { label: "Call first", value: "Your card issuer, to stop a fraud block on the first attempt" },
      ],
    },
    {
      id: "limits-and-fees",
      heading: "Limits and fees, and why the numbers keep moving",
      image: {
        src: "/blog/how-to-pay-in-china-as-a-foreigner/bank-cards-1200.webp",
        srcSet:
          "/blog/how-to-pay-in-china-as-a-foreigner/bank-cards-800.webp 800w, /blog/how-to-pay-in-china-as-a-foreigner/bank-cards-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Several bank cards fanned out on a wooden table",
        width: 1200,
        height: 800,
        credit: "RDNE Stock project",
        creditUrl: "https://www.pexels.com/@rdne",
        sourceUrl: "https://www.pexels.com/photo/credit-cards-on-the-table-7821730/",
      },
      paragraphs: [
        "A foreign-linked wallet is not a local wallet. It carries ceilings a resident account never meets, and a service fee above a certain size of purchase.",
        "The ceilings were raised substantially. China [lifted the single transaction limit](https://english.www.gov.cn/news/202405/25/content_WS665125c5c6d0868f4e8e770d.html) for overseas visitors from one thousand US dollars to five thousand, and the annual cumulative cap from ten thousand to fifty thousand. For a normal trip those are not limits you will touch.",
        "For a buying trip they might be. Settling a sample order or a deposit on a phone is different. The annual cap becomes a real number. Know where you stand against it before you travel.",
        "The service fee is the part that irritates people. Both apps have generally charged nothing on small purchases and a percentage above a threshold, and the figure most commonly quoted is around three per cent above roughly two hundred yuan. Treat that as a guide rather than a promise.",
        "**Every number in this section has changed at least once and will change again.** Fees, thresholds and verification tiers are set by the platforms. They are adjusted without announcement. The version in the app on the day beats the version in any article, including this one. That is why none of them appear in the panel below.",
        "There is a second fee that has nothing to do with China. Your own bank's foreign transaction charge applies on top, and it is usually the larger of the two on small spending. Check what your card charges abroad before you decide which one to link.",
      ],
      facts: [
        { label: "Caps were raised", value: "Single transaction and annual limits, per the State Council" },
        { label: "Normal trips", value: "Unlikely to reach either ceiling" },
        { label: "Buying trips", value: "Check the annual cap before travelling" },
        { label: "Where to confirm", value: "In the app on the day, not in any published guide" },
      ],
    },
    {
      id: "cards",
      heading: "Where a foreign card works and where it quietly does not",
      paragraphs: [
        "Card acceptance in China is not a spectrum. It is close to a switch, and the switch follows the size of the business.",
        "Cards work at international hotels, at airports, at large malls and department stores, at chain restaurants and at the bigger attractions. The published guidance sets an expectation for exactly these places, naming three-star and above hotels and the higher-graded tourist sites.",
        "Cards do not work at most local restaurants, most taxis, market stalls, small shops and street food. Not because anybody objects. The terminal simply is not there, because the customers have not needed one for a decade.",
        "UnionPay is the exception worth knowing about. It is the domestic card network and the same guidance notes UnionPay cards work at merchants' point of sale terminals broadly. Some foreign banks issue UnionPay cards, and if yours does it is a genuinely useful second card to carry.",
        "Two habits save money at the terminals that do work. Decline dynamic currency conversion and choose to be billed in yuan, because the convenience rate offered at the machine is reliably worse than your bank's. And check the amount on the screen before you approve it rather than after.",
        "**The failure that catches business travellers is the hotel deposit.** A hotel may pre-authorise a sum against your card at check-in, which is released later rather than charged. If your card is near its limit that hold can be the thing that declines your dinner.",
      ],
      list: {
        intro: "A rough map of where the plastic is worth taking out.",
        items: [
          "Reliable: international hotels, airports, large malls, department stores, chain restaurants",
          "Patchy: mid-sized independent restaurants and shops in big cities",
          "Rarely: local eateries, taxis, market stalls, street food, small vendors",
          "Broad, if you have one: UnionPay, which is the domestic network",
        ],
      },
      facts: [
        { label: "Best coverage", value: "Hotels, airports, large retail and chains" },
        { label: "Poor coverage", value: "Small vendors, taxis, local restaurants" },
        { label: "Always", value: "Decline conversion into your home currency" },
        { label: "Watch for", value: "Hotel pre-authorisation holds against your limit" },
      ],
    },
    {
      id: "cash",
      heading: "How much cash to actually carry",
      image: {
        src: "/blog/how-to-pay-in-china-as-a-foreigner/market-stall-1200.webp",
        srcSet:
          "/blog/how-to-pay-in-china-as-a-foreigner/market-stall-800.webp 800w, /blog/how-to-pay-in-china-as-a-foreigner/market-stall-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A vendor in gloves serving food from a market counter",
        width: 1200,
        height: 800,
        credit: "Julia Filirovska",
        creditUrl: "https://www.pexels.com/@julia-filirovska",
        sourceUrl:
          "https://www.pexels.com/photo/photo-of-a-person-putting-fried-fish-in-a-white-paper-8250344/",
      },
      paragraphs: [
        "Cash is legal tender and refusing it is not allowed, and the authorities have been actively pushing acceptance back up in transport, shopping and catering. That is the official position.",
        "The practical position is that a young cashier in a mall may genuinely not know what to do with a two hundred yuan note, and may not have change. Both things are true at once.",
        "So carry cash as insurance rather than as a payment method. A few hundred yuan in small notes covers a taxi when an app fails, a market stall, a rural stop and a phone that has died. It is not there to fund the trip.",
        "Small denominations matter more than the total. Ten and twenty yuan notes get accepted without friction. A single large note at a food stall is a problem you created for yourself.",
        "Getting hold of it is straightforward. You can exchange at bank branches showing a currency exchange sign, or withdraw from ATMs carrying your card network's logo. Airport rates are worse than bank rates almost everywhere, which is an argument for changing a small amount on arrival and the rest later.",
        "**Keep the cash somewhere separate from the phone.** The third layer exists to survive whatever took out the other two. A wallet and a phone in one pocket fail together.",
      ],
      facts: [
        { label: "Purpose", value: "Insurance, not the main method" },
        { label: "Useful denominations", value: "Small notes, for stalls and taxis" },
        { label: "Where to get it", value: "Bank branches with an exchange sign, or network ATMs" },
        { label: "Carry it", value: "Separately from your phone" },
      ],
    },
    {
      id: "scenarios",
      heading: "The situations that actually come up",
      paragraphs: [
        "Knowing the three layers is one thing. Knowing which one to reach for at a taxi window is another, and the answer changes by situation.",
        "Taxis split by type. A ride-hailing app charges the card already sitting in it, so there is nothing to do at the end of the journey. A street taxi flagged down is the opposite. Some drivers take a scan. Some want notes. This is the most common place a visitor needs the cash layer.",
        "The metro is easy and getting easier. Most large systems now let you buy through an app or tap in, and paper tickets still exist at the machines. Carry a little change for those machines anyway.",
        "Intercity trains are the exception worth planning around. Booking is tied to your passport. The ticket is issued against it. You collect and validate with it too. Bring the passport you booked under. Not a photograph of it.",
        "Hotels want a card even when you have paid already. The deposit is usually a hold against the card rather than a charge, and it is released after checkout, sometimes slowly. Assume the money is unavailable for a few days and plan the rest of the trip around that rather than around the balance you think you have.",
        "Attractions and museums are mostly app-booked now, and some of the busier ones sell out in advance rather than at the gate. Turning up expecting to pay at a window is how people miss things.",
        "**Tipping is not expected anywhere and adding one can be awkward.** Restaurants, taxis and hotels do not build tips into pay. Pushing money at somebody who did not ask for it is a small social problem, not a kindness. Luxury hotel porters are the exception. Even there it is not required.",
        "You will also see people paying with a face or a palm at a supermarket scanner. Ignore it. Those systems are built around residents with a national ID and a local bank account behind them, and they are not a route in for a visitor. The QR code does everything they do.",
        "Bargaining is a separate question from paying, and it belongs in markets rather than shops. A price on a shelf in a mall is the price. A price quoted at a market stall usually is not, and the payment method has nothing to do with which situation you are in.",
      ],
      list: {
        intro: "Which layer to reach for, by situation.",
        items: [
          "Ride-hailing app: already paid, nothing to do at the end",
          "Street taxi: app scan or cash, and cash more often than you expect",
          "Metro: app or ticket machine, with small change as backup",
          "Intercity train: booked and collected against your passport",
          "Hotel: a card, for the deposit hold as well as the room",
          "Attractions: usually booked in the app, sometimes days ahead",
        ],
      },
      facts: [
        { label: "Most cash-dependent", value: "Street taxis flagged down" },
        { label: "Bring your passport", value: "For anything involving an intercity train" },
        { label: "Hotel deposits", value: "A hold on the card, released after checkout" },
        { label: "Tipping", value: "Not expected, and awkward to insist on" },
      ],
    },
    {
      id: "when-it-fails",
      heading: "When it fails at the till, and what to do standing there",
      paragraphs: [
        "It will fail at some point. The useful skill is not avoiding that. It is recovering in under a minute without holding up a queue.",
        "Work through it in order. Try the other app first, which is why you installed both. Then try the physical card. Then pay cash. Then, and only then, start diagnosing.",
        "The common causes are dull and fixable. A weak signal in a basement mall. A bank fraud block on a first mainland transaction. A card whose name does not match the passport on the account. A verification tier that has not been completed, which quietly lowers what you are allowed to spend.",
        "One quirk surprises people afterwards rather than at the counter. Refunds on a wallet payment commonly land in the app balance rather than returning to the card you linked. The money is not lost. It is sitting somewhere you were not expecting to look.",
        "There is also a scam layer worth naming, because it targets exactly this confusion. Somebody friendly strikes up a conversation near a tourist site. Then steers you toward a tea ceremony, a bar or a gallery. The bill at the end is the point of the encounter. Confirm the amount on your own screen before approving anything, and check the merchant name that appears when you scan.",
        "Two habits close off most of the risk in a QR system. Check the merchant name that appears on your screen after scanning, because it should be a business rather than an individual. And type the amount yourself where the code does not carry one, rather than letting somebody else enter it on your phone.",
        "Be wary of a stranger offering to help with a payment that is not working. The offer usually comes with a request to hand over the phone, and an unlocked phone with a linked card is worth more than whatever you were buying. Step out of the queue and sort it yourself instead.",
        "**The real cost of a payment failure is rarely the money.** It is the meeting you were walking to. Or the taxi you did not get. That is the reason to set the fallbacks up rather than trust one method.",
      ],
      list: {
        intro: "The order to work through, without thinking about it.",
        ordered: true,
        items: [
          "The other wallet app",
          "The physical card, if the merchant has a terminal",
          "Cash",
          "Ask whether they will hold the item while you sort it out",
          "Diagnose later, somewhere with a seat and a signal",
        ],
      },
      facts: [
        { label: "Most common causes", value: "Weak signal, bank fraud block, incomplete verification" },
        { label: "Name mismatch", value: "Card name should match the passport on the account" },
        { label: "Refunds", value: "Often land in the app balance, not back on the card" },
        { label: "Before approving", value: "Check the amount and the merchant name on your screen" },
      ],
    },
    {
      id: "paying-a-business",
      heading: "Paying a business is a different problem entirely",
      image: {
        src: "/blog/how-to-pay-in-china-as-a-foreigner/receipt-paperwork-1200.webp",
        srcSet:
          "/blog/how-to-pay-in-china-as-a-foreigner/receipt-paperwork-800.webp 800w, /blog/how-to-pay-in-china-as-a-foreigner/receipt-paperwork-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Paperwork, receipts and stationery spread across a desk",
        width: 1200,
        height: 800,
        credit: "Kaboompics",
        creditUrl: "https://www.pexels.com/@karola-g",
        sourceUrl:
          "https://www.pexels.com/photo/receipts-and-documents-on-top-of-a-desk-7680681/",
      },
      paragraphs: [
        "Everything above is about buying lunch. Buying two thousand units is a different system and almost nothing written for tourists covers it.",
        "The first thing to understand is that a personal wallet is not how companies pay each other. A supplier expecting a deposit wants a bank transfer to a company account, against an invoice, in a named currency. Scanning a QR code with your personal Alipay is not a business payment, and a supplier who is happy to take one should make you think rather than relax.",
        "**Ask whose account it is before you send anything.** A company that trades as a company should not be asking for a personal account. It is the clearest warning sign in a first order. Legitimate factories have company accounts and expect to be paid into them.",
        "The second thing is that the money moves slowly compared with everything else in this post. An international transfer takes days rather than seconds, needs the full beneficiary details to be exactly right, and carries fees at both ends. Nobody stands in a factory office and pays on the spot.",
        "So the practical shape of a sourcing trip is that you agree the terms in the room and settle them afterwards from your own bank. What you do on the day is confirm what is being bought, at what specification, for what total, and get that written down in a form your accounts department will recognise.",
        "Third parties exist for the awkward middle ground. Escrow through a trading platform, letters of credit for larger orders, and payment agents all trade a fee for a degree of protection. Which one fits depends on the order size and how long you have known the supplier. Make that call with your own finance people. Not on a blog.",
        "If the trip is a buying trip, the city underneath it is worth understanding too. We wrote about that in [why Shenzhen is China's tech capital](/blog/why-shenzhen-is-chinas-tech-capital).",
      ],
      facts: [
        { label: "Suppliers are paid by", value: "Bank transfer to a company account, against an invoice" },
        { label: "Warning sign", value: "A company asking to be paid into a personal account" },
        { label: "Timescale", value: "Days, not seconds" },
        { label: "Decide with", value: "Your own finance team, before you travel" },
      ],
    },
    {
      id: "fapiao-and-dinner",
      heading: "The fapiao, and who pays at dinner",
      image: {
        src: "/blog/how-to-pay-in-china-as-a-foreigner/business-dinner-1200.webp",
        srcSet:
          "/blog/how-to-pay-in-china-as-a-foreigner/business-dinner-800.webp 800w, /blog/how-to-pay-in-china-as-a-foreigner/business-dinner-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A round table laid with many shared dishes including dumplings and soups",
        width: 1200,
        height: 800,
        credit: "Change C.C",
        creditUrl: "https://www.pexels.com/@change-c-c",
        sourceUrl:
          "https://www.pexels.com/photo/traditional-asian-cuisine-on-round-table-32860319/",
      },
      paragraphs: [
        "Here is the detail that decides whether your company reimburses this trip, and not one of the guides ranking for this subject mentions it.",
        "China runs an official invoice called a fapiao. It is not the slip the till prints. A [fapiao is a legal receipt](https://www.china-briefing.com/news/understanding-chinas-fapiao-invoice-system/) issued under the tax system, and it is the document that proves a business expense actually happened. An ordinary receipt does not carry that weight.",
        "So picture four days of meals and taxis paid from a personal wallet. The app history comes home. The fapiao does not. Finance may accept none of it. The transaction record shows money left. It does not show what was bought or from whom in the form the system recognises.",
        "Asking is normal and expected. The phrase you want is fapiao, said at the point of paying, and a business that fails to issue one when a customer asks is in the wrong. Bigger restaurants and hotels will do it as a matter of routine. Smaller ones may need a moment.",
        "There are two broad kinds and the difference matters to your accounts department rather than to you. The general version records the purchase. The special version permits a tax deduction and needs more information about the buyer, including the company's tax code and address. If your employer wants the second kind, get those details before you fly rather than trying to obtain them from a restaurant doorway.",
        "Increasingly the whole thing is digital, issued to a phone or an email rather than printed and stamped. That is easier to collect and easier to lose in an inbox, so file them as they arrive.",
        "**Dinner is the one payment you should usually not make.** At a Chinese business dinner the host pays. It is settled quietly, often away from the table, before anybody reaches for a wallet. Insisting on splitting the bill, or racing to pay when you are the guest, reads as a correction of your host rather than as generosity.",
        "The reciprocal move is to host the next one. That is understood, it is straightforward, and it is a much better use of the gesture than a contest over a bill you were never expected to settle.",
      ],
      facts: [
        { label: "What it is", value: "The official tax invoice, not the till receipt" },
        { label: "Ask for it", value: "At the moment of paying, by name" },
        { label: "Bring with you", value: "Your company's invoicing details, if you need the deductible kind" },
        { label: "At dinner", value: "The host pays, quietly. Reciprocate another night" },
      ],
    },
    {
      id: "checklist",
      heading: "The week before you fly",
      paragraphs: [
        "Everything above collapses into about half an hour of admin. Doing it early is the whole difference between a trip where money is invisible and one where it is a recurring problem.",
        "Start with the bank rather than the apps. Tell your card issuer you are travelling to China and ask them to whitelist it. This is the step most people skip and it is the cause of most first-day failures. While you are on the call, ask what the card charges in foreign transaction fees, because that number decides which card is worth linking.",
        "Then install both apps and link the card. Run one small real purchase through each. A test that costs a few pounds at home is worth more than any amount of reading, because it either works or it surfaces the problem while you can still fix it.",
        "Sort the connection next. A wallet with no data is a wallet that does not open. An eSIM bought before departure is the simplest version, and it means you are online the moment you land rather than hunting for airport wifi with a queue behind you.",
        "**Then take a photograph of your passport photo page and store it somewhere you can reach without the passport.** Ticket collection, hotel check-in and app verification all lean on it, and the moment you need it is usually the moment it is in a hotel safe on the other side of the city.",
        "Business travellers have two extra jobs. Get your company's invoicing details before you leave, because a fapiao issued to the wrong entity is not much better than no fapiao. And agree with your finance team how supplier payments will actually be made, so you are not improvising terms in a factory meeting room.",
      ],
      list: {
        intro: "The short version, in the order that makes each step easier.",
        ordered: true,
        items: [
          "Call your card issuer, whitelist China, and ask what the card charges abroad",
          "Install Alipay and WeChat, verify with your passport, link the card",
          "Run one small test purchase through each app",
          "Arrange data, ideally an eSIM activated before you land",
          "Save a photograph of your passport page somewhere reachable",
          "Order a little cash, in small notes",
          "Business trips only, collect your company invoicing details",
          "Business trips only, agree how supplier payments will be sent",
        ],
      },
      facts: [
        { label: "Do first", value: "The call to your bank, not the app install" },
        { label: "Time needed", value: "About half an hour, a week ahead" },
        { label: "The test purchase", value: "Small, real, and at home" },
        { label: "Business extras", value: "Invoicing details and an agreed payment route" },
      ],
    },
  ],
  faqs: [
    {
      question: "Can foreigners use Alipay and WeChat Pay in China?",
      answer:
        "Yes. Both accept international cards including Visa and Mastercard, and the official guidance for overseas visitors confirms no Chinese bank account is needed. You verify with your passport and a face scan, then link the card. Set both up before you travel rather than on arrival.",
    },
    {
      question: "Do I need a Chinese bank account to pay in China?",
      answer:
        "No, not as a visitor. Linking an international card to a wallet app covers almost everything a traveller does. A Chinese account only becomes relevant if you are living, working or running a business there.",
    },
    {
      question: "How much cash should I bring to China?",
      answer:
        "Enough to be insurance rather than a budget. A few hundred yuan in small notes covers a taxi, a market stall or a dead phone battery. Keep it somewhere separate from your phone, because the whole point is that it survives whatever stopped the apps working.",
    },
    {
      question: "Why was my foreign card declined in China?",
      answer:
        "Usually a fraud block from your own bank on a first mainland transaction, a weak signal indoors, or incomplete verification in the app. A name on the card that does not match your passport is another common cause. Call your card issuer before you travel and the most likely reason disappears.",
    },
    {
      question: "Can I use Visa or Mastercard in China?",
      answer:
        "In two ways. Linked inside a wallet app they work almost everywhere, which is the method to rely on. Presented as a physical card they work at international hotels, airports, large malls and chains, but rarely at local restaurants, taxis or market stalls.",
    },
    {
      question: "What is a fapiao and do I need one?",
      answer:
        "A fapiao is China's official tax invoice and it is the document that proves a business expense. A normal till receipt does not do the same job. If you are travelling on business and expect to be reimbursed, ask for a fapiao when you pay, and bring your company's invoicing details if your employer needs the deductible kind.",
    },
    {
      question: "Who pays at a Chinese business dinner?",
      answer:
        "The host, and usually without any discussion at the table. Competing to pay when you are the guest tends to read as correcting your host rather than as a courtesy. The expected response is to host the next dinner instead.",
    },
    {
      question: "How do I pay a Chinese supplier?",
      answer:
        "By bank transfer to a company account, against an invoice, not through a personal wallet app. Expect it to take days rather than seconds and to carry fees at both ends. A supplier trading as a company that asks to be paid into a personal account is the clearest warning sign in a first order.",
    },
  ],
};
