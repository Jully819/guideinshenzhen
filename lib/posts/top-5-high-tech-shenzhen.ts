import type { Post, PostImage } from "@/lib/posts";

/**
 * The photographs are self-hosted rather than hotlinked from Pexels.
 *
 * WHY. Hotlinking gave us a JPEG of whatever size the CDN felt like, a filename
 * of "pexels-photo-31529279.jpeg" that says nothing to a crawler, no second
 * rendition to offer a phone, and a third party in the critical path of our
 * largest paint. These are WebP, two widths each, every file under 200KB, named
 * for what is in them.
 *
 * REGENERATING THEM. The originals are Pexels photo ids, listed against each
 * name below. Fetch at w=1600, resize to 800 and 1200, encode WebP at quality
 * 80 and drop the quality until the file is under 200KB.
 *
 * THE CREDIT IS NOT OPTIONAL. Self-hosting does not transfer authorship. Every
 * caption still names the photographer and links to the original.
 */
const IMG = "/blog/shenzhen-high-tech";

function shot(
  name: string,
  height: number,
  alt: string,
  credit: string,
  creditUrl: string,
  sourceUrl: string,
  priority = false,
): PostImage {
  return {
    src: `${IMG}/${name}-1200.webp`,
    srcSet: `${IMG}/${name}-800.webp 800w, ${IMG}/${name}-1200.webp 1200w`,
    /* The article column is capped at 44rem, so a 1200px file is only ever
       needed by a high-density screen. Telling the browser the real displayed
       width is what stops it downloading the large one on a phone. */
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt,
    width: 1200,
    height,
    priority,
    credit,
    creditUrl,
    sourceUrl,
  };
}

/**
 * "Top 5 high-tech places to visit in Shenzhen".
 *
 * WRITTEN AGAINST THE SERP, not from a blank page. The three ranking pages
 * checked in August 2026 were whatsupshenzhen.com (7 numbered stores, roughly
 * 1,300 words), voyagefox.net (guide, roughly 3,000) and yenkidinchina.com
 * (guide, roughly 5,750). Average about 3,350 words, so this sits inside the
 * twenty per cent band the project rules ask for. All three are numbered
 * listicle-guides with a practical block per item and a photograph above each
 * heading, so this is too.
 *
 * WHAT THEY ALL COVERED and this therefore covers: named venues with a
 * practical block, the Nanshan and Shenzhen Bay cluster, Huaqiangbei, the
 * observation deck, drone delivery at Talent Park, and how the days fit
 * together.
 *
 * WHAT NONE OF THEM COVERED, added here: arriving over the Hong Kong border,
 * an honest time budget per stop, and when not to bother at all.
 *
 * VOICE. Written to references/voice.md, which is measured off the National Day
 * post. Short sentences, no em dashes, no semicolons, no colons, no
 * parentheses, no exclamation marks. The jokes are front-loaded and then it
 * goes straight, per references/humour.md. One adapted metaphor, no anecdote,
 * because every story in references/stories.md belongs to another company. One
 * opinion, the "boring things properly" line from references/opinions.md.
 *
 * ⚠️ NO BUSINESS FIGURES APPEAR IN THIS POST. references/stats.md does not
 * exist, and the rules say real numbers come from there. Prices, response times
 * and cancellation windows are therefore absent by design rather than
 * forgotten. Add them once that file does.
 *
 * ⚠️ THE PHOTOGRAPHY IS STOCK. Two frames are genuinely Shenzhen. The rest are
 * generic. Pexels has nothing of Huaqiangbei or Sky City. Replace with real
 * photographs before this earns its keep.
 */
export const topFiveHighTechShenzhen: Post = {
  slug: "top-5-high-tech-places-to-visit-in-shenzhen",
  title: "Top 5 high-tech places to visit in Shenzhen",
  published: "2026-08-17",
  updated: "2026-08-17",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the guides who work this city daily, in English, Mandarin and Cantonese. We spend most weeks in Huaqiangbei, at factory gates in Bao'an and Dongguan, and on the halls at CHTF and CIOE. Everything here is what we tell visitors in the car on the way in.",
  readingMinutes: 14,
  /* 50 characters. The keyword is the first five words and the year signals
     freshness, which matters on a page full of things that change. */
  metaTitle: "Top 5 High-Tech Places to Visit in Shenzhen (2026)",
  /* 154 characters. Keyword, then the benefit nobody else offers, then a soft
     nudge rather than an instruction. */
  metaDescription:
    "The top 5 high-tech places to visit in Shenzhen, from Huaqiangbei to a robotaxi ride. What each stop costs you in time, and how to fit them into two days.",
  socialImage:
    "/blog/shenzhen-high-tech/og-top-5-high-tech-places-shenzhen-1200x630.jpg",
  excerpt:
    "Huaqiangbei, the deck on floor 116, a robotaxi, drone-delivered lunch at Talent Park, and DJI Sky City. Three of the five sit in one corridor, so two days covers it.",
  keywords: {
    primary: "top 5 high-tech places to visit in Shenzhen",
    secondary: [
      "high-tech things to do in Shenzhen",
      "Huaqiangbei electronics market",
      "Ping An Finance Centre observation deck",
      "Shenzhen robotaxi ride",
      "drone delivery Talent Park Shenzhen",
      "DJI Sky City Shenzhen",
      "Shenzhen tech tour itinerary",
    ],
    longTail: [
      "can tourists ride a robotaxi in Shenzhen",
      "is Huaqiangbei worth visiting",
      "how many days do you need in Shenzhen",
      "what is the best time of day to visit Huaqiangbei",
      "can you pay with a foreign card in Shenzhen",
      "can you visit Shenzhen from Hong Kong for the day",
      "do I need a guide in Shenzhen",
    ],
  },
  hero: shot(
        "shenzhen-skyline-high-tech-city",
        800,
        "Aerial view of the Shenzhen skyline at dusk, towers lit against a darkening sky.",
        "tian Jin",
        "https://www.pexels.com/@tian-jin-505460776",
        "https://www.pexels.com/photo/aerial-view-of-shenzhen-skyline-at-dusk-31529279/", true,
      ),
  intro: [
    "The **top 5 high-tech places to visit in Shenzhen** are Huaqiangbei electronics market, the Free Sky deck on floor 116 of the Ping An Finance Centre, a robotaxi ride across Nanshan, drone-delivered lunch at Talent Park, and DJI Sky City. Three of the five sit in the same corridor. Two days covers all of it without rushing.",
    "That is the answer. The rest of this is how to actually do it, which is a different question and a harder one.",
    "Planning a first tech day here is a bit like learning darts. At the start you are pleased to hit the board at all. You will spend an hour getting to a store that needed twenty minutes. You will stand on the wrong side of a service boundary wondering why no car is coming. That is fine. Everybody does it once.",
    "[Serious face now.] **Four of the five stops below need a working Chinese payment app before you arrive.** Not while you are standing there. Before. It is the least interesting sentence in this article and it decides more of your trip than anything else in it.",
    "One more thing before the list. All of this moves. Robotaxi service areas get redrawn, drone routes are added and dropped, and a market floor that sold phone parts last year sells lithium cells now. Treat everything below as the shape of the thing rather than the timetable, and check the bookable details the week you travel. If you are here for a fair, the [exhibition calendar](/calendar) is the thing to plan around first.",
  ],
  sections: [
    {
      id: "huaqiangbei",
      heading: "1. Huaqiangbei, the world's largest electronics market",
      image: shot(
        "huaqiangbei-electronics-market-components",
        900,
        "Close-up of connectors and capacitors on a circuit board.",
        "Djenz Van Eysendeyk",
        "https://www.pexels.com/@djenz-van-eysendeyk-1836927628",
        "https://www.pexels.com/photo/close-up-of-computer-motherboard-components-28675583/",
      ),
      paragraphs: [
        "[Huaqiangbei](https://en.wikipedia.org/wiki/Huaqiangbei) is the one place on this list people fly in specifically for. It is more than twenty multi-storey malls of component stalls in Futian, stacked on top of each other and spilling into the street. SEG, Mingtong, Huaqiang Electronics World. The names blur after the second building.",
        "The density is the attraction. A floor of nothing but connectors. A floor of screens. A floor of people repairing what the last floor sold, at benches, in front of you, at a speed that makes a pit crew look leisurely.",
        "Go with a specific question. Browsing Huaqiangbei is overwhelming and, past the first hour, quietly boring in the way a hardware catalogue is boring. Arriving with a real errand turns it into the best afternoon in the city. Two hundred of this connector, three suppliers, best price. Now the place has a shape.",
        "Timing matters more here than anywhere else on the list. Late morning on a weekday is the sweet spot. Get there around half ten and the stalls are open and the aisles are still walkable. By two in the afternoon the corridors fill with couriers pushing trolleys of boxes, and browsing turns into queuing.",
        "Prices are negotiable and they are quoted differently depending on who is asking. That is not a scam. It is a wholesale market doing what wholesale markets do. It does mean the first number you hear is rarely the number that exists, and that hearing the second one usually takes Mandarin.",
      ],
      list: {
        intro: "What this place is actually good for, and what to leave alone.",
        items: [
          "**Buy** components, cables and connectors. This is the deepest stock anywhere.",
          "**Buy** mechanical keyboards and LED gear. Both are cheaper and stranger here.",
          "**Buy** drone parts and spares, which are hard to find at home at all.",
          "**Leave** brand-name phones. Region locking and warranty become your problem the moment you land.",
          "**Leave** anything you cannot test at the stall. There is no returning it from another country.",
        ],
      },
      facts: [
        { label: "District", value: "Futian" },
        { label: "Cost", value: "Free to walk. Everything else negotiable." },
        { label: "Time to allow", value: "Two hours to look. Half a day to source." },
        { label: "Best window", value: "Weekday, from about half ten in the morning" },
        { label: "Watch for", value: "Cash and foreign cards get you almost nowhere" },
      ],
    },
    {
      id: "free-sky-116",
      heading: "2. Free Sky, the deck on floor 116",
      image: shot(
        "ping-an-finance-centre-observation-deck",
        800,
        "A man looking out over a city skyline from a high-rise observation window.",
        "Daniel Erlandson",
        "https://www.pexels.com/@daniel-erlandson-2150649940",
        "https://www.pexels.com/photo/exploring-tokyo-from-a-skyscraper-view-31252461/",
      ),
      paragraphs: [
        "The [Ping An Finance Centre](https://en.wikipedia.org/wiki/Ping_An_Finance_Centre) is 599 metres tall and the public deck sits on floor 116. Guides love telling you that. It is the one fact all of us have.",
        "The lift takes under a minute. That is its own small piece of engineering, and roughly the time it takes to regret the coffee you drank on the way in. Your ears will go. Then the doors open.",
        "The view is the entire point. From up there Shenzhen reads as a plan rather than a place, which is more or less how it was built. You can see the logic of it. Blocks, corridors, the harbour, the border, Hong Kong on the far side when the air cooperates.",
        "Go on a clear day or do not go. This is the whole of the advice. Shenzhen gets haze, and a 599-metre view of grey costs exactly the same as a 599-metre view of the Pearl River Delta. Check the sky in the morning and keep the deck as the flexible item in the day.",
        "Late afternoon is the compromise most people want. Daylight over Futian first, then the towers coming on underneath you while you are still up there. It is worth staying through the change rather than photographing it and leaving.",
        "It pairs naturally with Huaqiangbei. Both are Futian and both are close. Going from a market floor to the top of the tallest thing for miles, in one afternoon, tells you more about this city than either stop does alone.",
      ],
      facts: [
        { label: "District", value: "Futian" },
        { label: "Cost", value: "Ticketed. Confirm the current price before you go." },
        { label: "Time to allow", value: "About an hour, plus the queue" },
        { label: "Best window", value: "Late afternoon, on a clear day only" },
        { label: "Watch for", value: "Haze. It makes the whole trip pointless." },
      ],
    },
    {
      id: "robotaxi",
      heading: "3. A robotaxi across Nanshan",
      image: shot(
        "shenzhen-robotaxi-autonomous-vehicle",
        800,
        "A white autonomous vehicle on a city street, buildings reflected in its bodywork.",
        "Stephen Leonardi",
        "https://www.pexels.com/@stephen-leonardi-587681991",
        "https://www.pexels.com/photo/autonomous-self-driving-car-on-urban-street-35076289/",
      ),
      paragraphs: [
        "Driverless taxis run in parts of Shenzhen, and riding one is the cheapest genuinely futuristic thing you can do here. Pony.ai is the name most visitors end up using. The wheel turns on its own, the car waits at the lights, and nobody is sitting where somebody should be sitting.",
        "The novelty lasts about four minutes. After that it is a car. That is the interesting part, and it is worth paying attention to the moment it happens. The strangeness wearing off inside a single trip tells you more about where this technology has actually got to than any demonstration would.",
        "The catch is access, and it is a real one. Service areas are drawn on a map that changes. The apps generally expect a Chinese phone number and a local payment method. A visitor standing four streets outside a boundary will simply never be offered a car, and nothing on the screen explains why.",
        "Build it into a journey you were making anyway. Treat the robotaxi as the way you get from one stop to the next rather than as an attraction with an address. If it works you have saved a taxi fare and got the story. If it does not, you take the metro and lose nothing.",
        "This is the stop on the list most likely to need somebody local to make it happen. It is also, reliably, the one people talk about on the way home.",
      ],
      facts: [
        { label: "District", value: "Nanshan and parts of Futian" },
        { label: "Cost", value: "Roughly a normal taxi fare" },
        { label: "Time to allow", value: "None. Use it to get somewhere." },
        { label: "Needs", value: "A working local app and a phone number" },
        { label: "Watch for", value: "Service boundaries that move without warning" },
      ],
    },
    {
      id: "drone-delivery",
      heading: "4. Drone-delivered lunch at Talent Park",
      image: shot(
        "talent-park-drone-delivery-shenzhen",
        800,
        "A white delivery drone flying above a city at sunset.",
        "Davis Arenas",
        "https://www.pexels.com/@carlosdetrip",
        "https://www.pexels.com/photo/a-white-drone-flying-11690533/",
      ),
      paragraphs: [
        "Talent Park in Nanshan has drone-delivery pickup points. Watching lunch arrive by air in a public park is the best illustration of this city there is. Not a demo. Not a stand at a trade fair. A municipal park, a cabinet, and somebody's noodles coming down out of the sky.",
        "The park itself is worth the walk regardless. Water, paths, the Shenzhen Bay bridge, and a view back at the Nanshan skyline that costs nothing. Most people give it half an hour and wish they had given it more.",
        "Order to a pickup cabinet and wait. That is the whole activity. It takes ten minutes and it is more memorable than most things you will pay for, which is a slightly annoying fact about travel generally.",
        "The honest caveat is that routes change. A cabinet serving last season may not be serving now. The menu of what can be flown to you is also narrower than the menu on the app. Confirm before you cross the city for it.",
        "Pair it with the tower deck and you get the city from two heights in one day. The plan from 116 floors up, and the thing actually working at knee height in a park.",
      ],
      facts: [
        { label: "District", value: "Nanshan, by Shenzhen Bay" },
        { label: "Cost", value: "Park is free. You pay for lunch." },
        { label: "Time to allow", value: "An hour, including the wait and a walk" },
        { label: "Needs", value: "A delivery app that takes your payment method" },
        { label: "Watch for", value: "Routes and cabinets change between seasons" },
      ],
    },
    {
      id: "dji-sky-city",
      heading: "5. DJI Sky City",
      image: shot(
        "dji-sky-city-shenzhen-drone",
        800,
        "A hand holding a small white consumer drone.",
        "Pok Rie",
        "https://www.pexels.com/@pok-rie-33563",
        "https://www.pexels.com/photo/person-holding-white-and-black-quadcopter-drone-1336211/",
      ),
      paragraphs: [
        "[DJI](https://www.dji.com/) is a Shenzhen company and Sky City is its home in Nanshan. The building is the first thing you notice. Two towers with blocks that look hung rather than stacked, which is a strange thing to see on the skyline and stranger from directly underneath.",
        "The store is a shop rather than an exhibition, and that is what makes it worth the trip. You can handle the current range. The staff answer questions at a level that assumes you know what a gimbal does. That is a relief if you do, and a short conversation if you do not.",
        "Buying is a separate question from visiting. Flying a drone home is a customs and airline-battery conversation. Have it before you are at the counter, not at the airport with a bag that will not go in the hold.",
        "Nanshan around it is the actual point for a lot of visitors. The offices of most of the names you know are within a few stops. Tencent, Huawei, ZTE. You cannot go inside any of them. Standing outside an office is a thin activity, so treat the district as the backdrop to your other Nanshan stops rather than a destination.",
        "If your days are tight, this is the one to cut. The products are the same ones you can hold in a shop at home. A [private day](/tours/private) built around the other four is the version most people actually want.",
      ],
      facts: [
        { label: "District", value: "Nanshan" },
        { label: "Cost", value: "Free to visit" },
        { label: "Time to allow", value: "Forty minutes, longer if you are buying" },
        { label: "Best paired with", value: "Talent Park, which is close" },
        { label: "Watch for", value: "Battery rules before you buy anything" },
      ],
    },
    {
      id: "itinerary",
      heading: "Two days, or three if you want to breathe",
      image: shot(
        "shenzhen-skyline-sunset-itinerary",
        800,
        "The Shenzhen skyline at sunset with the city's tallest towers in silhouette.",
        "Lywin",
        "https://www.pexels.com/@lywin-55237728",
        "https://www.pexels.com/photo/city-skyline-at-sunset-14230196/",
      ),
      paragraphs: [
        "Two days is the honest minimum for all five. Three is the shape most people are happiest with, because it lets you cross the city once a day instead of twice.",
        "Day one is Futian. Huaqiangbei in the late morning while you still have patience for it. Lunch somewhere near, then Free Sky in the late afternoon for the light change. Those two sit close enough that the day is not mostly transport. That is the failure mode of every Shenzhen itinerary written by somebody who has not done it.",
        "Day two is Nanshan. Talent Park and the drone cabinets around the middle of the day, since lunch is the point. DJI Sky City after. A robotaxi between them if the service area cooperates, and the metro if it does not. Finish at Shenzhen Bay Park, which faces Hong Kong on a clear evening.",
        "If you have a third day, do not add a sixth place. Go back to Huaqiangbei with the thing you learned on day one, or take the ferry, or sit in OCT-LOFT for an afternoon. The city rewards a second look at one thing more than a first look at five.",
        "One day only. Huaqiangbei, Free Sky, and a robotaxi between them if you are lucky. Drop Nanshan entirely. Trying to do both sides in a day means seeing the inside of a car.",
      ],
      list: {
        intro: "The two-day version, in order.",
        ordered: true,
        items: [
          "Huaqiangbei, late morning on day one, while your patience is intact.",
          "Free Sky 116, late afternoon the same day, if the sky is clear.",
          "Talent Park and the drone cabinets, around lunch on day two.",
          "DJI Sky City after lunch, forty minutes unless you are buying.",
          "A robotaxi between the two Nanshan stops, and the metro if the map says no.",
        ],
      },
      facts: [
        { label: "One day", value: "Futian only. Two stops and a ride." },
        { label: "Two days", value: "All five, Futian then Nanshan" },
        { label: "Three days", value: "All five, plus a second look at one" },
        { label: "Don't", value: "Cross between Futian and Nanshan twice in a day" },
      ],
    },
    {
      id: "from-hong-kong",
      heading: "Coming over from Hong Kong for the day",
      image: shot(
        "hong-kong-shenzhen-border-train",
        800,
        "An urban train platform with the Hong Kong skyline behind it.",
        "Oleg Prachuk",
        "https://www.pexels.com/@olegprachuk",
        "https://www.pexels.com/photo/hong-kong-mtr-interactive-28224892/",
      ),
      paragraphs: [
        "A lot of people doing this list are not staying in Shenzhen at all. They are in Hong Kong and they have a spare day. None of the guides ranking for this keyword say anything useful about that. It is an odd gap, because it is how a large share of these visitors arrive.",
        "The border is the whole logistical story of your day. It is a building, there are queues, and the queues are unpredictable in a way that eats itineraries. Budget generously in both directions and plan the first stop close to whichever crossing you use.",
        "Entry requirements are the one thing in this article you must not take from an article. Rules for visa-free entry and transit change, they differ by nationality, and a blog post is exactly the wrong source. Check the official position for your passport in the week you travel, and if you are travelling on business, check it twice.",
        "The practical shape that works. Cross early, do Futian first because it is nearer most crossings, and keep the far side of the city for a trip where you are sleeping here. A day trip that includes Nanshan is a day trip that mostly happens on a motorway.",
        "The other thing about arriving from Hong Kong is that your phone situation changes at the border. Whatever was working for maps and payments on one side may not work on the other. This is the moment the boring preparation pays off, or does not.",
      ],
      facts: [
        { label: "Realistic day", value: "Huaqiangbei and Free Sky. Both Futian." },
        { label: "Budget for", value: "Border queues, both directions" },
        { label: "Check yourself", value: "Entry rules for your own passport" },
        { label: "Watch for", value: "Apps and maps behaving differently over the line" },
      ],
    },
    {
      id: "time-budget",
      heading: "What each stop really costs you in time",
      image: shot(
        "shenzhen-metro-getting-around",
        800,
        "A man waiting on a platform at a Chinese subway station.",
        "Muhamad Guruh Budi Hartono",
        "https://www.pexels.com/@muhamad-guruh-budi-hartono-430167744",
        "https://www.pexels.com/photo/man-waiting-at-subway-station-in-urban-setting-30243948/",
      ),
      paragraphs: [
        "Every guide to this city lists places. Almost none of them tell you what the places cost in hours, which is the only currency that actually runs out on a short trip.",
        "Here is the honest accounting. Huaqiangbei takes two hours to look at and half a day to use. Free Sky takes an hour plus whatever the queue is doing. Talent Park takes an hour if you are eating. Sky City takes forty minutes unless you are buying, in which case take an hour. A robotaxi takes no time at all, because it replaces a journey you were making anyway.",
        "That totals about five hours of actual attractions. The rest of your two days is transport, food, and standing still, and that is normal. A day that is five hours of attractions and five hours of everything else is a good day. A day that is eight hours of attractions is a forced march you will not enjoy or remember.",
        "The number that surprises people is the transport. Futian to Nanshan is not far on a map and is a genuine chunk of an afternoon in practice. This is why the two-day shape splits by district rather than by theme.",
        "Now the one strong opinion in this article, and it is not about any of the five. The fifteen minutes you spend setting up payment before you fly decides more of this trip than your itinerary does. Four of the five stops need it. Huaqiangbei alone is more than twenty malls where cash and a foreign card get you almost nothing. Doing the boring thing properly, in advance, is the entire difference between a good day and an expensive walk.",
      ],
      facts: [
        { label: "Huaqiangbei", value: "Two hours looking, half a day sourcing" },
        { label: "Free Sky 116", value: "One hour, plus the queue" },
        { label: "Talent Park", value: "One hour, including lunch" },
        { label: "DJI Sky City", value: "Forty minutes" },
        { label: "Robotaxi", value: "No extra time. It replaces a journey." },
      ],
    },
    {
      id: "when-to-skip",
      heading: "When to skip all of this",
      image: shot(
        "shenzhen-park-quiet-green-space",
        807,
        "A quiet tree-lined path through a green city park.",
        "Vitali Adutskevich",
        "https://www.pexels.com/@vitali-adutskevich-1096947",
        "https://www.pexels.com/photo/park-alley-with-green-trees-14300713/",
      ),
      paragraphs: [
        "If you are not actually interested in technology, do not do this list. Shenzhen has mountains, a coastline, an old market quarter and a lot of very good food, and none of that is on this page. A tech itinerary followed out of obligation is five hours of looking at buildings you do not care about.",
        "You also do not need us for it. If your Mandarin is decent, your payment app works and you can afford to lose an hour to a wrong turn, do the whole thing yourself. Four of the five are publicly accessible and the metro reaches all of them. Nobody needs a guide to walk them into a shop.",
        "Hire someone when the trip has a job attached. You are sourcing at Huaqiangbei and the price you are quoted matters. You have [meetings either side of the sightseeing](/business-trip). You have exactly one free day and cannot afford to spend a third of it discovering that the robotaxi will not collect you from where you are standing.",
        "That is the honest line, and it is the same one we would give you on the phone. A day with us is worth it when the friction is expensive. When it is not, it is a nice extra and you should spend the money on dinner.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is Huaqiangbei worth visiting?",
      answer:
        "Yes, for at least an hour. It is more than twenty multi-storey malls of electronics and the scale of it is the experience. Beyond an hour it rewards people with a specific errand. If you are sourcing rather than looking, allow half a day and bring somebody who can hear the local price.",
    },
    {
      question: "Can tourists ride a robotaxi in Shenzhen?",
      answer:
        "In practice it depends on where you are standing and what is on your phone. Driverless taxis operate in defined parts of the city, mostly around Nanshan and Futian, and the apps generally expect a Chinese phone number and a local payment method. Most visitors need help with the setup rather than with the ride.",
    },
    {
      question: "How many days do you need in Shenzhen?",
      answer:
        "Two days covers all five places on this list. Three is more comfortable, because it lets you cross the city once a day instead of twice. One day is enough for Futian alone, which means Huaqiangbei and the observation deck.",
    },
    {
      question: "What is the best time of day to visit Huaqiangbei?",
      answer:
        "Late morning on a weekday, from about half ten. The stalls are open and the aisles are still walkable. By two in the afternoon the corridors fill with couriers pushing trolleys and browsing becomes queuing.",
    },
    {
      question: "Can you pay with a foreign card in Shenzhen?",
      answer:
        "Rarely, and almost never in the electronics markets. Set up a Chinese mobile payment app linked to your card before you travel rather than after you land. Four of the five stops on this list assume you have one.",
    },
    /* Trimmed from nine to eight, which is the top of the checklist's 4 to 8
       band. The question dropped was "how high is the observation deck", whose
       answer is already the first two sentences of that section. */
    {
      question: "Where can you see drone delivery in Shenzhen?",
      answer:
        "Talent Park in Nanshan has drone-delivery pickup points, and the park is free to enter. You order to a cabinet and wait about ten minutes. Routes and cabinets change between seasons, so confirm before making a special trip.",
    },
    {
      question: "Can you visit Shenzhen from Hong Kong for the day?",
      answer:
        "Many people do, and Futian is the sensible half of the city for it. Budget generously for border queues in both directions. Entry requirements differ by nationality and change, so check the official position for your own passport in the week you travel rather than trusting any article.",
    },
    {
      question: "Do I need a guide for a Shenzhen tech trip?",
      answer:
        "Not for the sightseeing. Four of the five places are publicly accessible and the metro reaches all of them. A guide earns their keep when the day has a job attached, such as sourcing, meetings, or a single free day you cannot afford to lose to logistics.",
    },
  ],
};
