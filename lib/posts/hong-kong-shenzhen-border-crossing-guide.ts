import type { Post } from "@/lib/posts";

/**
 * PHOTOGRAPHY NOTE. Pexels has no picture of a Hong Kong to Shenzhen
 * checkpoint, so none of these show the crossing the post describes. No
 * caption names a checkpoint and the alt text describes what is in the frame.
 *
 *   hero         Several passports and paper tickets on a table. They are
 *                Polish passports. Generic travel documents, no place claimed.
 *   skyline (HK) A ferry on Victoria Harbour at night. Pexels titles it Hong
 *                Kong, and the red ferry is consistent with that.
 *   skyline (SZ) A lit skyline across water. Pexels does not name the city. The
 *                tall bullet-shaped tower looks like the China Resources
 *                Headquarters at Shenzhen Bay, which is why it sits beside the
 *                Shenzhen Bay section. Confirm before relying on that.
 *   metro        A passenger at a platform with screen doors and Chinese and
 *                English signs. The station is Zhongshanba on the Guangzhou
 *                metro, NOT Shenzhen. The alt text names no city.
 *   luggage      A traveller wheeling a suitcase along a platform. A Polish
 *                regional train. Generic.
 *
 * ONE WAS FETCHED AND THROWN OUT. A "high speed train station" search returned
 * the Gare du Nord in Paris, French trains and all. It would have sat in the
 * high-speed rail section and looked like West Kowloon. The section has no image.
 *
 * VOLATILE FACTS ARE KEPT OUT OF THE FACTS BLOCKS. Opening hours, fares, metro
 * line numbers, ticket prices and visa lists change without notice, and every
 * rival guide states them as settled. Hours are described as "most close
 * overnight" and "check on the day". The only figures in the post are the UK
 * government's passport rules and its visa-free window, attributed to it by name
 * and linked.
 *
 * SOURCING. Crossing behaviour was cross-checked across shenzhenshopper.com,
 * wanderinchina.com, newsgd.com and 10life.com. Two claims rest on a single
 * source and are written as reports, not as fact. Huanggang being open round the
 * clock is in two of them, and visa on arrival not being processed at West
 * Kowloon is in one. The pickup at Futian, Luohu and Hong Kong airport comes
 * from the FAQ in lib/content.ts. The arrival card rule is deliberately not
 * stated, because it has changed more than once and could not be confirmed.
 *
 * NO BUSINESS FIGURES. references/stats.md covers another business, so there is
 * no price, response time or cancellation window anywhere in this post.
 *
 * NO STORY AND NO OPINION. The anecdotes and takes in references/ belong to
 * other companies or lack a number. Nothing here is borrowed.
 */
export const hongKongShenzhenBorderCrossingGuide: Post = {
  slug: "hong-kong-shenzhen-border-crossing-guide",
  title: "Hong Kong to Shenzhen border crossing guide",
  published: "2026-10-05",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the team that meets visitors at the Futian and Luohu crossings, and knows which door they walk out of.",
  readingMinutes: 14,
  metaTitle: "Hong Kong Shenzhen Border Crossing Guide for First-Timers",
  metaDescription:
    "A Hong Kong Shenzhen border crossing guide. Which crossing to use, what to carry, how to set up your phone, and what happens at the border. Ask us to meet you.",
  excerpt:
    "Four crossings, one choice that matters. Which border to use for where you are going, what to carry, and the phone setup that decides how the first hour goes.",
  socialImage:
    "/blog/hong-kong-shenzhen-border-crossing-guide/og-hong-kong-shenzhen-border-crossing-guide-1200x630.jpg",
  keywords: {
    primary: "Hong Kong Shenzhen border crossing guide",
    secondary: [
      "which Hong Kong Shenzhen border crossing to use",
      "Lo Wu border crossing",
      "Futian Lok Ma Chau border crossing",
      "Shenzhen Bay border crossing",
      "Huanggang border crossing",
      "high-speed train West Kowloon to Shenzhen",
      "documents needed to cross into Shenzhen",
      "set up your phone before crossing into China",
      "what happens at the Hong Kong Shenzhen border",
      "crossing back from Shenzhen to Hong Kong",
    ],
    longTail: [
      "can I walk across the Hong Kong Shenzhen border",
      "which border crossing is best for tourists",
      "how long does it take to cross the Hong Kong Shenzhen border",
      "do I need a visa to go from Hong Kong to Shenzhen",
      "is the Hong Kong Shenzhen border open 24 hours",
      "can I use Alipay in Shenzhen from Hong Kong",
      "can a guide meet me at the Shenzhen border",
    ],
  },
  hero: {
    src: "/blog/hong-kong-shenzhen-border-crossing-guide/passport-control-1200.webp",
    srcSet:
      "/blog/hong-kong-shenzhen-border-crossing-guide/passport-control-800.webp 800w, /blog/hong-kong-shenzhen-border-crossing-guide/passport-control-1200.webp 1200w",
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt: "Several passports and paper travel tickets spread across a table",
    width: 1200,
    height: 800,
    priority: true,
    credit: "Jakub Zerdzicki",
    creditUrl: "https://www.pexels.com/@jakubzerdzicki",
    sourceUrl:
      "https://www.pexels.com/photo/polish-passports-and-travel-documents-on-a-table-33497885/",
  },
  intro: [
    "This Hong Kong Shenzhen border crossing guide comes down to one choice. Take the high-speed train from West Kowloon if you want the fewest steps, or the MTR to Lo Wu or Lok Ma Chau if you want the cheapest way across. Bring your passport, and set your phone up before you reach the border.",
    "The rest of this covers how each crossing works, which one fits where you are going, what to carry, and what happens inside the building. Most guides stop at the transport. The part that catches people is the phone, so that gets its own section.",
  ],
  sections: [
    {
      id: "which-crossing",
      heading: "Which Hong Kong Shenzhen border crossing to use",
      image: {
        src: "/blog/hong-kong-shenzhen-border-crossing-guide/hong-kong-skyline-1200.webp",
        srcSet:
          "/blog/hong-kong-shenzhen-border-crossing-guide/hong-kong-skyline-800.webp 800w, /blog/hong-kong-shenzhen-border-crossing-guide/hong-kong-skyline-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A red ferry crossing a dark harbour in front of a lit city skyline at night",
        width: 1200,
        height: 800,
        credit: "Arnold Nagy",
        creditUrl: "https://www.pexels.com/@arnold-nagy-195342381",
        sourceUrl:
          "https://www.pexels.com/photo/hong-kong-skyline-at-night-with-lit-ferries-35886110/",
      },
      paragraphs: [
        "There are several crossings between Hong Kong and Shenzhen. Four matter to a visitor. Lo Wu, Futian, Shenzhen Bay, and the high-speed train at West Kowloon. Huanggang is a fifth, and it is mostly for buses.",
        "Pick by where you are going in Shenzhen, not by which one looks easiest on a map. Shenzhen is a long city. The crossings drop you at different ends of it.",
        "Futian puts you in the business district. Lo Wu puts you in Luohu, the part of town that grew up around this crossing. Shenzhen Bay puts you in Nanshan, beside the tech district and the bay. The train lands at Futian, Shenzhen North or Guangmingcheng.",
        "A wrong choice does not cost you a fine. It costs you a long metro ride on the other side.",
        "One thing holds for all of them. Hours differ, and most crossings close overnight. Huanggang is the one reported to run round the clock. Check the hours for your own crossing on the day you travel.",
      ],
      facts: [
        { label: "Fewest steps", value: "The high-speed train from West Kowloon" },
        { label: "Cheapest", value: "The MTR East Rail Line to Lo Wu or Lok Ma Chau" },
        { label: "Nanshan and the west", value: "Shenzhen Bay" },
        { label: "Late at night", value: "Huanggang, if it is still open when you arrive" },
        { label: "Always", value: "Confirm the hours on the day" },
      ],
    },
    {
      id: "getting-to-the-border",
      heading: "Getting to the Hong Kong side of the border",
      paragraphs: [
        "Most of the work happens before you reach the checkpoint. You have to get to the right station, on the right branch, with the right ticket.",
        "For Lo Wu and Lok Ma Chau, that means the MTR East Rail Line. Your Octopus card is the easy way to pay for it, and it is the one place the card is worth having. Top it up in Hong Kong before you go, and keep the balance in mind, because it will not help you once you are across.",
        "For Shenzhen Bay you want a bus, and the bus stop is not always next to a station. Look up the stop the day before, and check which side of the road it is on. For the train, you go to West Kowloon, which is its own station and not part of the East Rail Line.",
        "Leave earlier than the timetable suggests. The trip to the border is the part you can plan, so plan it with some slack in it. If you are catching the high-speed train, be at the station well ahead of departure, because the immigration checks come before the platform.",
        "If you are arriving at Hong Kong airport first, the border is a second trip and not a continuation of the first. There are coaches and ferries that link the two, and they are worth a look if you do not want to cross the city by train with your bags. Work out which crossing you want before you leave the airport, because that decides which coach you board.",
      ],
      facts: [
        { label: "Lo Wu and Lok Ma Chau", value: "The MTR East Rail Line, paid for with an Octopus card" },
        { label: "Shenzhen Bay", value: "A bus, so find the stop the day before" },
        { label: "High-speed train", value: "West Kowloon station, with immigration before the platform" },
        { label: "From the airport", value: "A second journey, so pick your crossing before you leave" },
      ],
    },
    {
      id: "lo-wu",
      heading: "Lo Wu, the original walk across",
      paragraphs: [
        "Lo Wu is the oldest crossing and the one most visitors picture. You ride the MTR East Rail Line to the last station, step off, and walk. The Hong Kong building and the Shenzhen building sit either side of the boundary with an enclosed bridge between them.",
        "Hong Kong immigration comes first. Then the bridge. Then mainland immigration, where you show your passport and your entry permission. Then you are in Luohu, with the metro right there.",
        "One trap catches first-timers. East Rail trains do not all end at Lo Wu. Some go to Lok Ma Chau instead. Read the electronic sign on the platform before you board, and again once you are on the train.",
        "Weekend mornings are when the queues build, according to the guides who write about it. If you can cross on a weekday, take it.",
        "Lo Wu suits you if your hotel is in Luohu, if you are shopping around Dongmen, or if you want the cheapest crossing and do not mind the walk.",
      ],
      facts: [
        { label: "Getting there", value: "MTR East Rail Line, then check the platform sign" },
        { label: "Lands you in", value: "Luohu" },
        { label: "Good for", value: "Luohu and the Dongmen shopping streets" },
        { label: "Watch for", value: "Trains that end at Lok Ma Chau instead" },
      ],
    },
    {
      id: "futian-lok-ma-chau",
      heading: "Futian and Lok Ma Chau, for the business district",
      paragraphs: [
        "Futian is the Shenzhen side of the Lok Ma Chau crossing. The idea is the same as Lo Wu. You take the MTR East Rail Line to Lok Ma Chau, clear Hong Kong, walk across, clear the mainland, and you are in Futian.",
        "Futian is where the Shenzhen Convention and Exhibition Centre sits, and where most of the large offices are. If your day is a trade fair, a meeting in the CBD or a bank, this is your crossing. We meet visitors here, and at Lo Wu.",
        "Huanggang is the road crossing nearby. It is where the cross-border coaches run from places like Tsim Sha Tsui and Mong Kok. Two of the guides we read say it is the one that stays open all night. If you arrive late, check it first.",
      ],
      facts: [
        { label: "Lands you in", value: "Futian, the business district" },
        { label: "Good for", value: "The convention centre, offices and meetings" },
        { label: "Late arrivals", value: "Huanggang, reported open all night, so confirm first" },
        { label: "Pickup", value: "We can meet you at Futian or Luohu" },
      ],
    },
    {
      id: "shenzhen-bay",
      heading: "Shenzhen Bay, for Nanshan and the west",
      image: {
        src: "/blog/hong-kong-shenzhen-border-crossing-guide/shenzhen-skyline-1200.webp",
        srcSet:
          "/blog/hong-kong-shenzhen-border-crossing-guide/shenzhen-skyline-800.webp 800w, /blog/hong-kong-shenzhen-border-crossing-guide/shenzhen-skyline-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Illuminated skyscrapers along a waterfront at dusk, one tall tower glowing gold",
        width: 1200,
        height: 799,
        credit: "Ben Cheung",
        creditUrl: "https://www.pexels.com/@ben-cheung-140183",
        sourceUrl:
          "https://www.pexels.com/photo/illuminated-skyscrapers-in-city-at-night-9651234/",
      },
      paragraphs: [
        "Shenzhen Bay works differently. There is no train. You reach it by bus from Hong Kong, usually from Yuen Long or Tin Shui Wai. Both the Hong Kong and the mainland checks happen in one building, so you stamp out and in under one roof.",
        "It lands you in Nanshan. That means the tech district, the bay and Shekou. If you are visiting a company there, or staying by the water, this saves you a long metro ride from Futian.",
        "Crowds peak around eight in the morning and five in the evening, and the taxi queue is longest in the late afternoon. Cross outside those hours if you can.",
      ],
      facts: [
        { label: "Reached by", value: "A bus from Hong Kong, not by rail" },
        { label: "Lands you in", value: "Nanshan" },
        { label: "Good for", value: "The tech district, Qianhai and Shekou" },
        { label: "Avoid", value: "The early morning and late afternoon peaks" },
      ],
    },
    {
      id: "high-speed-train",
      heading: "The high-speed train from West Kowloon",
      paragraphs: [
        "The train is the fewest-steps option, and it works in an unusual way. Hong Kong and mainland immigration are both at West Kowloon station, before you board. You clear both sides in Hong Kong, get on, and step off in Shenzhen with nothing left to do but walk out.",
        "That is why it feels short. The ride to Futian takes around a quarter of an hour, and you arrive at a station inside the city instead of a border building you then have to leave.",
        "Tickets are real-name, which ties them to your passport. Buy with the passport you will travel on, and carry it. The [operator's own guide](https://www.highspeed.mtr.com.hk/en/main/index.html) explains the ticket types and the process.",
        "One catch. The guides we read report that visa on arrival and transit exemptions are not handled at the West Kowloon checkpoint. If your entry depends on either, ask before you buy, because a land crossing may be your only route. The operator's site also carries a notice about visa-free transit for foreign nationals. Read it for your own passport rather than trusting a summary, including this one.",
        "The train also stops at Shenzhen North and Guangmingcheng, which helps if your plans carry on into the mainland.",
      ],
      facts: [
        { label: "Immigration", value: "Both sides, at West Kowloon, before you board" },
        { label: "Ticket", value: "Real-name, bought with your passport" },
        { label: "Lands you in", value: "Futian, Shenzhen North or Guangmingcheng" },
        { label: "Ask first", value: "If you rely on visa on arrival or a transit exemption" },
      ],
    },
    {
      id: "documents",
      heading: "What to carry at the border",
      paragraphs: [
        "You need your passport, and a valid entry permission for the mainland. For most visitors that is one of two things. A visa, or a visa-free rule for your nationality.",
        "The UK government's [entry requirements for China](https://www.gov.uk/foreign-travel-advice/china/entry-requirements) say a British passport holder can enter for up to 30 days without a visa for business, tourism or visiting friends, until 31 December 2026. Other nationalities have different lists and different dates. Read your own government's page, not this one.",
        "The same page says your passport should be valid for at least six months after you arrive, with two blank pages. You can be refused entry if it is not.",
        "Save the address of your first night in Shenzhen on your phone, in Chinese. A taxi driver or an officer will find it faster than your English spelling.",
        "Arrival card rules have changed more than once. Check the official immigration site the week you travel, rather than relying on a blog post.",
      ],
      facts: [
        { label: "Passport", value: "Valid six months past arrival, with two blank pages" },
        { label: "Entry permission", value: "A visa, or a visa-free rule for your nationality" },
        { label: "Also carry", value: "Your first address in Shenzhen, saved in Chinese" },
        { label: "Check", value: "Arrival card rules, in the week you travel" },
      ],
    },
    {
      id: "phone-setup",
      heading: "Set up your phone before you cross",
      image: {
        src: "/blog/hong-kong-shenzhen-border-crossing-guide/metro-platform-1200.webp",
        srcSet:
          "/blog/hong-kong-shenzhen-border-crossing-guide/metro-platform-800.webp 800w, /blog/hong-kong-shenzhen-border-crossing-guide/metro-platform-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A passenger waiting at a metro platform with screen doors and signs in Chinese and English",
        width: 1200,
        height: 800,
        credit: "Muhamad Guruh Budi Hartono",
        creditUrl: "https://www.pexels.com/@muhamad-guruh-budi-hartono-430167744",
        sourceUrl:
          "https://www.pexels.com/photo/man-waiting-at-subway-station-in-urban-setting-30243948/",
      },
      paragraphs: [
        "This is the part the transport guides skip, and it is where first-timers lose the most time. Mainland China runs on two wallet apps. Your Hong Kong Octopus card is for Hong Kong, so do not count on it on the Shenzhen side.",
        "Foreign cards can be linked, and you do not need a Chinese bank account, according to the [official guidance for overseas visitors](https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html). Our [guide to paying in China as a foreigner](/blog/how-to-pay-in-china-as-a-foreigner) covers the setup in full, including the verification step that stops people in a station queue.",
        "Do all of it in Hong Kong, on wifi, before you cross. A bank text that does not arrive is a small problem in a hotel and a large one in an arrivals hall.",
        "Carry a little cash as the backup. A dead battery at the border is a bad place to find out you have nothing else.",
      ],
      list: {
        intro: "Three things to finish before you reach the crossing.",
        ordered: true,
        items: [
          "Install Alipay or WeChat Pay and link your card, so the metro and a taxi are paid for on the other side",
          "Sort your data with a roaming plan or an eSIM, and download offline maps and your booking confirmations, because many foreign apps do not load on mainland connections",
          "Screenshot the address of your first stop in Chinese",
        ],
      },
    },
    {
      id: "step-by-step",
      heading: "What happens at the border, step by step",
      image: {
        src: "/blog/hong-kong-shenzhen-border-crossing-guide/luggage-station-1200.webp",
        srcSet:
          "/blog/hong-kong-shenzhen-border-crossing-guide/luggage-station-800.webp 800w, /blog/hong-kong-shenzhen-border-crossing-guide/luggage-station-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A traveller wheeling a blue suitcase along a station platform beside a train",
        width: 1200,
        height: 900,
        credit: "SHOX ART",
        creditUrl: "https://www.pexels.com/@shox",
        sourceUrl:
          "https://www.pexels.com/photo/traveler-with-luggage-boarding-modern-train-32707616/",
      },
      paragraphs: [
        "The land crossings follow the same few steps. The order differs only on the train, where it all happens before you board.",
        "Keep the passport in your hand through the whole sequence, not at the bottom of a bag. Move your bags in one go. In the hall, use the marked taxi queue or the metro, and ignore anyone offering a ride. Look for signs about photography before you take pictures.",
      ],
      list: {
        intro: "The order at a walk-across crossing.",
        ordered: true,
        items: [
          "Leave the train or bus and follow the signs to departure",
          "Show your passport to Hong Kong immigration",
          "Walk to the mainland side, or take the shuttle where one runs, as at Huanggang",
          "At mainland immigration, hand over your passport and your entry permission, and be ready to say where you are going and for how long",
          "Collect your passport, pass the bag check if there is one, and follow the exit signs",
          "Check your phone connects, and your wallet app opens, before you leave the building",
        ],
      },
      facts: [
        { label: "Keep in hand", value: "Your passport, through every step" },
        { label: "Be ready to say", value: "Where you are going, and for how long" },
        { label: "Outside", value: "The metro, or the marked taxi queue" },
      ],
    },
    {
      id: "after-the-border",
      heading: "From the crossing to your hotel",
      paragraphs: [
        "You are through. Now you have to get somewhere. This is where the phone setup earns its keep.",
        "The metro is the easiest way out of every land crossing. Its gates take the QR codes from the wallet apps, so you can walk straight in without buying a ticket. The signs are in Chinese and English, and the station names are the same ones on your offline map.",
        "A taxi is the better call if you have bags, or if the hotel is far from a station. Use the marked queue outside the building. Show the driver the address in Chinese on your phone, because saying it in English is a gamble. Most drivers take the wallet apps. Some do not, which is why the cash is in your pocket.",
        "Ride-hailing works too, but it depends on your phone connecting, and on your wallet app being set up. If it does not work at the border, that is a reason to try again inside the station and not outside it.",
        "Do not plan the first hour tightly. Even a clean crossing eats time, and the metro ride across Shenzhen can be long. If you have a meeting, treat the border as a delay of unknown length, and put the meeting after it with room to spare.",
      ],
      facts: [
        { label: "Easiest way out", value: "The metro, with the wallet app QR code at the gate" },
        { label: "With bags", value: "The marked taxi queue, with the address in Chinese" },
        { label: "Backup", value: "A little cash, for drivers who will not take the app" },
        { label: "First hour", value: "Leave it loose, because a crossing eats time" },
      ],
    },
    {
      id: "if-something-goes-wrong",
      heading: "If something goes wrong at the border",
      paragraphs: [
        "Most crossings are dull, and that is the point. A few go wrong, and they go wrong in the same few ways.",
        "Your phone does not connect. Move to a spot with a signal, restart it, and check that your plan or eSIM is switched on. If it still fails, use the cash and the saved address, and sort the data once you reach the hotel wifi.",
        "Your wallet app will not open or will not take the card. Try the other app. Set up both before you cross, because one will often work when the other does not. If neither does, pay in cash and fix it later.",
        "An officer asks a question you do not follow. Stay calm and slow down. Show your passport, show the address, and let them lead. Raised voices have never made a border faster.",
        "You are refused entry. This is rare for someone with the right documents, and it is the reason to check the rules for your own passport the week you travel. If it happens, stay polite, ask what the problem is, and contact your embassy or consulate. Do not argue the point at the desk.",
        "You miss the last train or the crossing closes. Most crossings close overnight, so this is the case where the late-night option matters. Huanggang is the one reported to stay open. Have a hotel in Hong Kong as the backup if your plan depends on a late crossing.",
      ],
    },
    {
      id: "crossing-back",
      heading: "Crossing back into Hong Kong",
      paragraphs: [
        "The return is the same in reverse. Mainland exit first, then Hong Kong entry. Leave more time than you think, especially at the end of a weekend when day-trippers all head home.",
        "If you hold a Chinese visa rather than visa-free entry, read this twice. The UK government's advice says that if you visit Hong Kong from the mainland and want to return to the mainland, you need a visa that allows a second entry. A single-entry visa will not cover it.",
        "Hong Kong also has its own entry rules, separate from the mainland's. Check them for your passport before you cross at all.",
      ],
    },
    {
      id: "being-met",
      heading: "If you would rather be met at the crossing",
      paragraphs: [
        "Plenty of people cross alone and it goes fine. Some would rather walk out of the building and find a name on a sign.",
        "We meet visitors at the Futian and Luohu crossings, and at Hong Kong airport. Tell us your arrival point when you ask, because the route changes the timing of the day. The [private tour guide in Shenzhen](/private-tour-guide-shenzhen) page says what a day with us looks like, and you can [send us the dates](/inquiry) from there.",
        "If you are crossing from Hong Kong for the day, the post on [why Hong Kong people spend their money in Shenzhen](/blog/why-hong-kong-people-spend-money-in-shenzhen) says what those days are usually for. If it is the tech, start with the [top 5 high-tech places to visit in Shenzhen](/blog/top-5-high-tech-places-to-visit-in-shenzhen).",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I walk across the Hong Kong Shenzhen border?",
      answer:
        "Yes, at Lo Wu and at Futian. You ride the MTR to the last station on that branch, clear Hong Kong immigration, and walk to the mainland building. Shenzhen Bay is reached by bus, and the high-speed train does both checks before you board.",
    },
    {
      question: "Which border crossing is best for tourists?",
      answer:
        "It depends where you are going. Futian suits the business district, Lo Wu suits Luohu, and Shenzhen Bay suits Nanshan. The train is the easiest for anyone with luggage who is heading for Futian.",
    },
    {
      question: "How long does it take to cross the Hong Kong Shenzhen border?",
      answer:
        "The train ride itself takes around a quarter of an hour. At the walk-across crossings it depends on the queue, which builds at weekends. Leave slack, and do not book a tight meeting on the other side.",
    },
    {
      question: "Do I need a visa to go from Hong Kong to Shenzhen?",
      answer:
        "Hong Kong and the mainland have separate entry rules, so you need permission for the mainland. That may be a visa, or a visa-free rule for your nationality. Check your own government's page and the Chinese embassy, because the lists and dates change.",
    },
    {
      question: "Is the Hong Kong Shenzhen border open 24 hours?",
      answer:
        "Most crossings close overnight. Two of the guides we read report that Huanggang runs round the clock. Hours change, so confirm before any late arrival.",
    },
    {
      question: "Can I use Alipay or WeChat Pay in Shenzhen when I come from Hong Kong?",
      answer:
        "Yes, if you set it up first. Foreign cards can be linked and a Chinese bank account is not required, according to the official guidance. Do it on wifi in Hong Kong so a verification text does not stall you at the border.",
    },
    {
      question: "Can a guide meet me at the Shenzhen border?",
      answer:
        "Yes. We meet visitors at the Futian and Luohu crossings, and at Hong Kong airport. Tell us your arrival point when you send the dates.",
    },
  ],
};
