import type { Post } from "@/lib/posts";

/**
 * PHOTOGRAPHY NOTE. Every image here is generic stock and NOT ONE was taken in
 * Shenzhen or Hong Kong. Alt text describes the object rather than the place
 * for that reason, and no caption in this post names a location.
 *
 * TWO WERE FETCHED AND THROWN OUT rather than shipped, which is worth
 * recording so nobody re-picks them:
 *
 *   a Gare du Nord platform, unmistakably Paris down to the Thalys and the
 *   iron roof, fetched for the border-crossing section. A French terminus
 *   illustrating the Hong Kong to Shenzhen crossing is simply a wrong picture.
 *
 *   a Berlin cafe counter, fetched for the payments section. It showed a
 *   contactless card tap, which is the exact thing that DOES NOT work in the
 *   way this section describes, so it argued against its own paragraph.
 *
 * Their replacements are a hand scanning a QR code and a metro carriage, both
 * without location tells. The carriage file was also renamed from
 * `train-station-platform` to `metro-carriage-commuters` after the swap,
 * because the old filename described a platform and the new picture is an
 * interior.
 *
 * The hotpot frame is tagged Toyohashi, Japan on Pexels. It carries no visible
 * signage and hotpot is the right subject, so it stays, captioned as a hotpot
 * table and nothing more.
 *
 * SOURCING NOTE. references/stats.md still does not exist, so there is no
 * price, response time or cancellation window anywhere in this post. Every
 * figure below is public, externally linked, and was FETCHED AND READ rather
 * than taken from a search summary. The control point numbers come from the
 * Hong Kong Immigration Department's own press release.
 *
 * ONE FIGURE WAS DELIBERATELY LEFT OUT. A widely repeated UBS estimate puts
 * Hong Kong spending in Shenzhen at around a tenth of Hong Kong retail sales.
 * It would have been the best number in the opening section. It is not here
 * because every page carrying it is quoting somebody else and the primary
 * source would not open, and an unverified number is worse than a missing one.
 *
 * NO STORY AND NO OPINION. references/stories.md owns three anecdotes and all
 * three belong to other companies, with an empty shelf for this brand.
 * references/opinions.md marks three of four takes NEEDS A NUMBER and the
 * fourth is Bluente's. That file also forbids comparing Shenzhen to another
 * city BY QUALITY, which on a Hong Kong versus Shenzhen price piece is the
 * standing temptation. So this post compares the two on price and on travel
 * time, which are measurable, and never on whether one is nicer.
 */
export const whyHongKongPeopleSpendMoneyInShenzhen: Post = {
  slug: "why-hong-kong-people-spend-money-in-shenzhen",
  title: "Why Hong Kong people spend their money in Shenzhen",
  published: "2026-08-20",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the team that meets visitors at the Shenzhen crossings every week and spends the day on the other side with them.",
  readingMinutes: 9,
  metaTitle: "Why Hong Kong People Spend Their Money in Shenzhen",
  metaDescription:
    "Why Hong Kong people spend money in Shenzhen, and what changes if you are not a Hong Kong resident. The border, payment and paperwork, explained plainly.",
  excerpt:
    "Fifty-three million trips north in a single year, for dinner, dentistry and groceries. Here is what drives the traffic, and what is different if you are crossing on a foreign passport.",
  socialImage:
    "/blog/why-hong-kong-people-spend-money-in-shenzhen/og-why-hong-kong-people-spend-money-in-shenzhen-1200x630.jpg",
  keywords: {
    primary: "why Hong Kong people spend money in Shenzhen",
    secondary: [
      "northbound consumption trend",
      "Hong Kong Shenzhen price difference",
      "what Hongkongers buy in Shenzhen",
      "Hong Kong Shenzhen border crossing",
      "paying in Shenzhen with Alipay and WeChat Pay",
      "visiting Shenzhen on a foreign passport",
    ],
    longTail: [
      "is Shenzhen cheaper than Hong Kong",
      "how do Hong Kong people get to Shenzhen",
      "can foreigners do a Shenzhen day trip from Hong Kong",
      "do you need a visa to go to Shenzhen from Hong Kong",
      "can I use Alipay in Shenzhen with a foreign card",
      "what do Hong Kong people buy in Shenzhen",
      "when is the best day to cross into Shenzhen",
    ],
  },
  hero: {
    src: "/blog/why-hong-kong-people-spend-money-in-shenzhen/shopping-mall-interior-1200.webp",
    srcSet:
      "/blog/why-hong-kong-people-spend-money-in-shenzhen/shopping-mall-interior-800.webp 800w, /blog/why-hong-kong-people-spend-money-in-shenzhen/shopping-mall-interior-1200.webp 1200w",
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt: "The interior of a large modern shopping mall with escalators and planting between the shopfronts",
    width: 1200,
    height: 800,
    priority: true,
    credit: "mxkrv",
    creditUrl: "https://www.pexels.com/@mxkrv-3655916",
    sourceUrl:
      "https://www.pexels.com/photo/interior-of-a-modern-shopping-mall-13425897/",
  },
  intro: [
    "The short answer to why Hong Kong people spend money in Shenzhen is the exchange rate and the border. A meal, a haircut or a pair of glasses costs a fraction of the Hong Kong price, and the crossing is a train ride rather than a flight. Fifty-three million trips north in 2023.",
    "The longer answer is what they cross for and how the money actually moves. Almost none of it works the same way if your passport is not from Hong Kong or the mainland. That last part is the half nobody writes down.",
  ],
  sections: [
    {
      id: "the-scale",
      heading: "The size of the thing",
      image: {
        src: "/blog/why-hong-kong-people-spend-money-in-shenzhen/pedestrian-street-night-1200.webp",
        srcSet:
          "/blog/why-hong-kong-people-spend-money-in-shenzhen/pedestrian-street-night-800.webp 800w, /blog/why-hong-kong-people-spend-money-in-shenzhen/pedestrian-street-night-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Pedestrians crossing a city street at night, caught in motion blur",
        width: 1200,
        height: 800,
        credit: "Kaique Rocha",
        creditUrl: "https://www.pexels.com/@hikaique",
        sourceUrl:
          "https://www.pexels.com/photo/timelapse-photography-of-people-crossing-roads-266046/",
      },
      paragraphs: [
        "Hong Kong residents made fifty-three million trips into Shenzhen in 2023, the first full year after the border reopened. [Al Jazeera reported the figure](https://www.aljazeera.com/economy/2024/5/27/in-pricey-hong-kong-residents-flock-to-china-for-cheaper-dining-shopping) against a Hong Kong population of about seven and a half million. The arithmetic is roughly seven crossings a year for every person in the city.",
        "The daily numbers make it plainer. Over one recent five-day holiday the [Hong Kong Immigration Department estimated](https://www.immd.gov.hk/eng/press/press-releases/20260331b.html) about 5.43 million passengers through land crossings alone. Lo Wu was forecast at around 240,000 a day. Lok Ma Chau Spur Line at 220,000. Shenzhen Bay at 184,000.",
        "**Those are commuter volumes, not tourist volumes.** A holiday weekend moves more people through one Hong Kong land crossing than most airports handle in a week.",
        "Shenzhen has more than seventeen million people of its own. The visitors are not filling an empty city. They are joining one.",
      ],
      facts: [
        { label: "Trips north", value: "Fifty-three million in 2023" },
        { label: "Busiest land crossing", value: "Lo Wu, around 240,000 a day at peak" },
        { label: "Land crossings, five-day holiday", value: "About 5.43 million passengers" },
        { label: "Source", value: "Hong Kong Immigration Department, linked above" },
      ],
    },
    {
      id: "the-price-gap",
      heading: "Why it is cheaper, and by how much",
      image: {
        src: "/blog/why-hong-kong-people-spend-money-in-shenzhen/shopping-bags-1200.webp",
        srcSet:
          "/blog/why-hong-kong-people-spend-money-in-shenzhen/shopping-bags-800.webp 800w, /blog/why-hong-kong-people-spend-money-in-shenzhen/shopping-bags-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Red and white paper shopping bags lined up on a counter",
        width: 1200,
        height: 800,
        credit: "Angela Roma",
        creditUrl: "https://www.pexels.com/@angela-roma",
        sourceUrl:
          "https://www.pexels.com/photo/similar-white-and-red-shopping-bags-on-brick-counter-7319110/",
      },
      paragraphs: [
        "Two things move at once. The Hong Kong dollar is pegged to the US dollar, and the yuan has been the weaker currency against it since 2021. So the same wallet buys more the moment it crosses.",
        "Underneath the currency sits a plain cost gap. Rent, wages and floor space all cost less in Shenzhen. Consumer prices follow them down. Al Jazeera puts the Hong Kong economy at nearly twice the size of Shenzhen's per head, which is the same gap seen from the earnings side.",
        "The saving is largest on things made of time rather than materials. A haircut, a massage, a dental cleaning or a made-to-measure jacket is mostly somebody's hour, and an hour is what costs less.",
        "It is smallest on branded goods. A global brand prices to its own strategy, so imported cosmetics, luxury handbags and flagship phones often close the gap or reverse it. That is the part the weekend trip reports tend to skip.",
      ],
      facts: [
        { label: "What drives it", value: "Currency peg plus a wage and rent gap" },
        { label: "Biggest savings", value: "Services, where the cost is somebody's time" },
        { label: "Smallest savings", value: "International branded goods" },
        { label: "Worth checking", value: "Rates move, so compare on the day rather than on last year's post" },
      ],
    },
    {
      id: "what-they-cross-for",
      heading: "What people actually cross for",
      image: {
        src: "/blog/why-hong-kong-people-spend-money-in-shenzhen/restaurant-dining-1200.webp",
        srcSet:
          "/blog/why-hong-kong-people-spend-money-in-shenzhen/restaurant-dining-800.webp 800w, /blog/why-hong-kong-people-spend-money-in-shenzhen/restaurant-dining-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A hotpot table set with a divided broth pot and plates of sliced raw meat and vegetables",
        width: 1200,
        height: 800,
        credit: "Huu Huynh",
        creditUrl: "https://www.pexels.com/@imhh",
        sourceUrl:
          "https://www.pexels.com/photo/people-sitting-at-a-table-full-of-food-in-a-restaurant-19775602/",
      },
      paragraphs: [
        "The trip is usually not a shopping trip. It is a normal weekend, bought at a discount.",
        "Food is the anchor. A hotpot dinner that would be a considered expense in Hong Kong becomes an ordinary Saturday. That is why so many trips are a meal with errands attached. Rarely the other way round.",
        "The errands are the interesting part. Dentistry, eye tests, haircuts, nails, massage and physiotherapy are all bookable across the border. All of them are appointments. Very few are walk-ins.",
        "Groceries come home in the bag. Fresh produce and household staples are the quiet regular purchase. They are why a lot of crossings are the same people every month. Not a new crowd each time.",
        "The friction in all of it is booking rather than paying. Mainland clinics, salons and tailors run their diaries through mainland apps and a mainland phone number, and the good ones fill up days ahead. A Hong Kong resident has both. A visitor usually has neither, which is the single practical reason these errands are harder to copy than they look.",
      ],
      list: {
        intro: "What tends to be worth the crossing, and what tends not to be.",
        items: [
          "Worth it, generally: meals, dentistry, optical, hair and beauty, massage, tailoring, groceries",
          "Marginal: mid-range clothing and homeware, where the gap is real but small",
          "Often not worth it: international brand-name cosmetics, luxury goods and flagship electronics",
          "Never worth it: anything counterfeit, which is a customs problem on the way home",
        ],
      },
      facts: [
        { label: "The anchor", value: "A meal, with errands attached" },
        { label: "The repeat purchase", value: "Groceries and household staples" },
        { label: "Needs booking ahead", value: "Dental, optical, hair, massage, tailoring" },
        { label: "Booking language", value: "Mandarin, through mainland apps" },
      ],
    },
    {
      id: "the-crossing",
      heading: "How the crossing actually works",
      image: {
        src: "/blog/why-hong-kong-people-spend-money-in-shenzhen/metro-carriage-commuters-1200.webp",
        srcSet:
          "/blog/why-hong-kong-people-spend-money-in-shenzhen/metro-carriage-commuters-800.webp 800w, /blog/why-hong-kong-people-spend-money-in-shenzhen/metro-carriage-commuters-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Commuters sitting and standing inside a metro carriage",
        width: 1200,
        height: 800,
        credit: "Daniil Kondrashin",
        creditUrl: "https://www.pexels.com/@daniil-kondrashin",
        sourceUrl: "https://www.pexels.com/photo/people-inside-the-train-12904224/",
      },
      paragraphs: [
        "There is no single border post. Hong Kong runs several land crossings into Shenzhen, and they behave differently enough that picking the wrong one costs an hour.",
        "The three that carry the most people are Lo Wu, Lok Ma Chau Spur Line and Shenzhen Bay. Lo Wu is the classic one and lands you next to Luohu's markets. Futian puts you in the business and mall district. Shenzhen Bay is the one drivers and coaches use.",
        "Some crossings run around the clock and some do not, and the queue at each varies by hour and by holiday far more than by distance. The department publishes [live and daily passenger figures](https://www.immd.gov.hk/eng/facts/passenger-statistics-menu.html), which is a better guide than any blog post including this one.",
        "**The timing rule that actually matters is simple.** Public holidays on either side turn a twenty-minute formality into a two-hour queue. The worst of it is the first morning of the break. Then the last evening.",
        "What the guides written for Hong Kong readers leave out is what happens on the other side of the gate. Fifty-three million trips do not disappear into a city of seventeen million without leaving a mark. They arrive in the same few districts, on the same two days, at roughly the same hour.",
        "So a Futian mall on a Saturday afternoon is not a normal Shenzhen crowd. It is a Hong Kong crowd, and it queues for the same restaurants, the same nail bars and the same dental chairs. The wait for a table can be longer than the wait at immigration.",
        "The fix is unglamorous and it works. Go on a weekday. If the trip has to be a weekend, book the appointments before you cross and eat early rather than at one o'clock. Midweek Shenzhen and Saturday Shenzhen are close to different cities.",
      ],
      facts: [
        { label: "Main land crossings", value: "Lo Wu, Lok Ma Chau Spur Line, Shenzhen Bay" },
        { label: "Lands you near", value: "Luohu markets, Futian malls, or the western bridge" },
        { label: "Avoid", value: "The first morning and last evening of any public holiday" },
        { label: "Confirm before travelling", value: "Opening hours and queue levels, from the department's own page" },
      ],
    },
    {
      id: "paying",
      heading: "The payment problem nobody mentions until you are there",
      image: {
        src: "/blog/why-hong-kong-people-spend-money-in-shenzhen/mobile-qr-payment-1200.webp",
        srcSet:
          "/blog/why-hong-kong-people-spend-money-in-shenzhen/mobile-qr-payment-800.webp 800w, /blog/why-hong-kong-people-spend-money-in-shenzhen/mobile-qr-payment-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A hand holding a smartphone to scan a printed QR code",
        width: 1200,
        height: 800,
        credit: "Kampus Production",
        creditUrl: "https://www.pexels.com/@kampus",
        sourceUrl:
          "https://www.pexels.com/photo/person-taking-photo-of-the-qr-code-7289717/",
      },
      paragraphs: [
        "Shenzhen runs on two payment apps. Almost everything is a QR code, and cash is accepted but increasingly unfamiliar to the person behind the counter.",
        "Hong Kong residents solved this years ago. Their apps are linked to cards the system already recognises. A Saturday in Shenzhen costs them no more thought than a Saturday in Mong Kok.",
        "A foreign card is a different experience. The apps do accept international cards now, and they also apply verification steps and spending ceilings that a local account never meets. Al Jazeera noted a limit applying to foreign users who have not registered identity documents.",
        "The failure mode is not dramatic. It is a queue behind you, a declined scan and a merchant who has no other way to take your money. Set the apps up and test them on something small before you need them.",
      ],
      facts: [
        { label: "How you pay", value: "QR code through a mainland payment app" },
        { label: "Cash", value: "Legal and accepted, often awkward" },
        { label: "Foreign cards", value: "Supported, with verification and ceilings a local account never hits" },
        { label: "Do first", value: "Install and test on a small purchase, not at a till with a queue" },
      ],
    },
    {
      id: "not-a-hong-kong-resident",
      heading: "What changes if you are not a Hong Kong resident",
      paragraphs: [
        "Nearly everything written about this trend is written for people carrying a Hong Kong identity card and a Home Return Permit. That document is what makes the crossing a twenty-minute formality, and it is not available to visitors.",
        "On a foreign passport the crossing is an immigration event. Entry requirements depend on nationality and on arrangements that change, sometimes at short notice. The only sensible source is an official one, checked close to the date. Anything a travel blog states about visas, including this paragraph, has a shelf life.",
        "The practical consequences are the ones to plan for. Allow more time at the counter than a resident does. Carry the passport you entered Hong Kong on. Expect the payment apps to ask for more, as above. Assume any appointment needs booking in Mandarin ahead of the day rather than on arrival.",
        "There is a second asymmetry that catches people out. A Hong Kong resident treats a bad day as a wasted afternoon and goes back next weekend. A visitor on a three-day trip does not have a next weekend. The same queue costs them a great deal more.",
        "That changes what is worth planning. A resident can afford to wander and see what is open. A visitor cannot, which is why the appointments and the crossing point should be settled before the day starts rather than during it.",
        "Where a [private guide in Shenzhen](/private-tour-guide-shenzhen) earns the fee is the day with appointments in it. Dental work, a tailor, a supplier meeting and a clinic all have to be booked, confirmed and interpreted. Each one is a phone call in Mandarin. The business on the other end has no reason to answer an unknown foreign number. If that is your day rather than a mall afternoon, [send us the dates](/inquiry).",
        "If the trip is business rather than errands, the city underneath the shopping is worth understanding too. We wrote about that in [why Shenzhen is China's tech capital](/blog/why-shenzhen-is-chinas-tech-capital) and about how the place got here in [Shenzhen before and after](/blog/shenzhen-before-and-after).",
      ],
      facts: [
        { label: "Hong Kong residents use", value: "A Home Return Permit, which visitors cannot get" },
        { label: "Foreign passports", value: "Requirements vary by nationality and change" },
        { label: "Check with", value: "An official source, close to your travel date" },
        { label: "Plan for", value: "Longer processing, app verification, Mandarin bookings" },
      ],
    },
  ],
  faqs: [
    {
      question: "Is Shenzhen cheaper than Hong Kong?",
      answer:
        "For most everyday spending, yes. The gap is widest on services such as meals, haircuts, dentistry and tailoring, where the cost is mostly somebody's time. It is narrowest on international branded goods, which are sometimes no cheaper at all.",
    },
    {
      question: "How do Hong Kong people get to Shenzhen?",
      answer:
        "By train, through one of several land crossings. Lo Wu, Lok Ma Chau Spur Line and Shenzhen Bay carry the heaviest traffic. The Immigration Department forecast them at roughly 240,000, 220,000 and 184,000 passengers a day over a recent holiday. Which one to use depends on where in Shenzhen you are going.",
    },
    {
      question: "Can foreigners do a Shenzhen day trip from Hong Kong?",
      answer:
        "Often yes, but not on the same terms. Hong Kong residents cross on a Home Return Permit, which visitors cannot obtain. Entry requirements for other nationalities vary and change, so check an official source close to your travel date rather than relying on a blog.",
    },
    {
      question: "Do you need a visa to go to Shenzhen from Hong Kong?",
      answer:
        "It depends entirely on your nationality, and the arrangements are revised from time to time. Some passport holders have visa-free or simplified options and others need a visa arranged in advance. This is the one detail worth confirming officially, because getting it wrong means being turned around at the counter.",
    },
    {
      question: "Can I use Alipay in Shenzhen with a foreign card?",
      answer:
        "Generally yes. International cards can be linked, though foreign users face verification steps and spending limits that local accounts do not. Install and test the app on a small purchase before you rely on it. The moment it fails is usually at a till, with a queue behind you.",
    },
    {
      question: "What do Hong Kong people buy in Shenzhen?",
      answer:
        "Meals first, then services and groceries. Dentistry, optical, hair, massage and tailoring are the common appointments. Groceries are the repeat purchase. That is what turns a day out into a monthly routine.",
    },
    {
      question: "When is the best day to cross into Shenzhen?",
      answer:
        "A weekday outside public holidays, if you have the choice. Holiday weekends push land crossings past five million passengers over a few days. The worst congestion falls on the first morning and the last evening. The Immigration Department publishes daily passenger figures worth checking first.",
    },
  ],
};
