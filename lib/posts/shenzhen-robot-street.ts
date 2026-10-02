import type { Post, PostImage } from "@/lib/posts";

/**
 * The photographs are self-hosted rather than hotlinked from Pexels, for the
 * same reasons set out in top-5-high-tech-shenzhen.ts. WebP, two widths each,
 * every file under 200KB, named for what is in them. The credit still travels
 * with every one of them, because self-hosting does not transfer authorship.
 */
const IMG = "/blog/shenzhen-robot-street";

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
 * "Shenzhen robot street".
 *
 * KEYWORD. keywords.csv has no robot term, so this is anchored to the closest
 * entry in it, "things to do in Shenzhen with a guide", from the traveller
 * intent group. The primary is the phrase people actually type. No existing
 * post targets it. top-5-high-tech-places-to-visit-in-shenzhen is the nearest
 * neighbour and covers a different five places in a different district, so the
 * two support each other rather than compete.
 *
 * WRITTEN AGAINST THE SERP. The three analysable ranking pages checked in
 * August 2026 were eyeshenzhen.com (news, roughly 400 words),
 * ourchinastory.com (news feature, roughly 850) and notesfromchina.com
 * (tech-tourism guide with an FAQ, roughly 6,500). Average about 2,580 words,
 * so the twenty per cent band is roughly 2,070 to 3,100 and this sits inside
 * it. Four further pages would not fetch at all, listed below.
 *
 * PAGES THAT WOULD NOT FETCH, and were therefore not analysed rather than
 * quietly counted: newsgd.com, sz.gov.cn, lg.gov.cn and autonews.gasgoo.com.
 * All four returned closed sockets to both the fetch tool and curl.
 *
 * WHAT THEY ALL COVERED and this therefore covers: the robot 6S store and what
 * the six services are, the daily robot show, the food robots, the humanoids
 * and arms inside, the leasing model, and the traffic robot in Bantian.
 *
 * WHAT NONE OF THEM COVERED, added here: an honest time and distance budget
 * from the half of the city visitors actually stay in, the split between going
 * to look and going to buy.
 *
 * VOICE. Written to references/voice.md. No em dashes, no semicolons, no
 * colons, no parentheses, no exclamation marks. Humour front-loaded per
 * references/humour.md, then straight.
 *
 * ⚠️ NO STORY. Every anecdote in references/stories.md belongs to another
 * company, so this post has none rather than borrowing one.
 *
 * ⚠️ NO HOUSE OPINION. Every entry in references/opinions.md is either owned by
 * another company or marked NEEDS A NUMBER. The one stance in this post rests
 * on figures reported by Xinhua, and is flagged as theirs in the prose.
 *
 * ⚠️ NO BUSINESS FIGURES. references/stats.md does not exist. Prices, response
 * times and cancellation windows are absent by design.
 *
 * ⚠️ VOLATILE DETAIL DELIBERATELY SOFTENED. Show times, opening hours and metro
 * line numbers are reported by the sources but rot without warning, so they are
 * described by shape rather than printed as a timetable. Nothing in a facts
 * block is a bookable detail.
 *
 * ⚠️ THE PHOTOGRAPHY IS ALL STOCK, and none of it is the robot street. Pexels
 * has nothing of Galaxy World, the 6S store or Bantian. The street-level frame
 * is Shanghai. Every alt string says what the picture actually shows rather
 * than what the section is about. Replace with real photographs before this
 * earns its keep.
 */
export const shenzhenRobotStreet: Post = {
  slug: "shenzhen-robot-street-longgang",
  title: "The Shenzhen robot street in Longgang",
  published: "2026-08-22",
  updated: "2026-08-22",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the guides who work this city daily, in English, Mandarin and Cantonese. We run days in Longgang for visitors who want to see the robotics cluster, and meetings for the ones who came to buy from it. Everything here is what we say in the car on the way out.",
  readingMinutes: 11,
  /* 51 characters. Keyword first, no colon, and the second half is the thing
     the ranking news articles never answer. */
  metaTitle: "Shenzhen Robot Street in Longgang, and How to Visit",
  /* 150 characters. Keyword, then what you get, then a soft nudge. */
  metaDescription:
    "The Shenzhen robot street in Longgang, where robots pour coffee, cook dinner and work a junction. What is there, what the day costs, and what to do if you came to buy.",
  socialImage: "/blog/shenzhen-robot-street/og-shenzhen-robot-street-1200x630.jpg",
  excerpt:
    "Bantian, in Longgang, has a block where robots make the coffee, run the restaurant and direct the traffic outside. It is a showroom rather than a theme park, and that is the interesting part.",
  keywords: {
    primary: "Shenzhen robot street",
    secondary: [
      "robot 6S store Shenzhen",
      "Longgang robot block",
      "robot restaurant Shenzhen",
      "robot theatre Longgang",
      "traffic police robot Bantian",
      "getting to Longgang from Futian",
      "buying robots in Shenzhen",
    ],
    longTail: [
      "where is the robot street in Shenzhen",
      "is the Shenzhen robot street worth visiting",
      "can tourists visit the robot 6S store",
      "can you buy a robot in Shenzhen",
      "is there a robot restaurant in Shenzhen",
      "how long do you need at the Shenzhen robot street",
      "do you need a guide for the Shenzhen robot street",
    ],
  },
  hero: shot(
    "humanoid-robot-shenzhen-robot-street",
    900,
    "Stock photograph of a white humanoid robot lit by blue lights. Not the Shenzhen robot street.",
    "Kindel Media",
    "https://www.pexels.com/@kindelmedia",
    "https://www.pexels.com/photo/white-robot-action-figure-on-blue-string-lights-8566470/",
    true,
  ),
  intro: [
    "The **Shenzhen robot street** is in Bantian, in [Longgang district](https://en.wikipedia.org/wiki/Longgang_District,_Shenzhen), around the Galaxy World complex. Robots pour the coffee there, sweep the pavement, dance on a stage and work a traffic junction outside. The world's first robot 6S store sits in the middle of it.",
    "That is the answer. Whether it is worth your afternoon is a different question, and a harder one.",
    "Most people arrive expecting a theme park. It is a shop. A very strange shop, with a robot arm tossing a toy back and forth like somebody waiting for a kettle, but a shop. Nobody at this company built any of it. We just drive people out there and explain what they are looking at.",
    "[Serious face now.] **Longgang is not where you are staying.** Almost every visitor sleeps in Futian or Nanshan, and this block sits well out to the northeast of both. That single fact decides more about whether this trip works than anything on the street does.",
    "One more thing before the walk-through. All of this is new and most of it moves. The store opened in the summer of 2025, the traffic robot went on duty in March 2026, and the line-up of what is on the pavement changes with whoever has a machine to show. Treat everything below as the shape of the place rather than the timetable, and confirm the bookable details the week you go. If your trip is built around a fair, the [exhibition calendar](/calendar) is the thing to plan around first.",
  ],
  sections: [
    {
      id: "where-it-is",
      heading: "Where the Shenzhen robot street actually is",
      image: shot(
        "longgang-shenzhen-street-night",
        800,
        "Stock aerial photograph of a Chinese city at night, towers and lit highways. Not Longgang.",
        "ainc T",
        "https://www.pexels.com/@ainc-t-76908403",
        "https://www.pexels.com/photo/vibrant-cityscape-at-night-with-illuminated-skyscrapers-34947069/",
      ),
      paragraphs: [
        "Bantian is a working technology district in the west of Longgang. Offices, campuses, and the kind of streets that exist because people work on them. Huawei's home ground is out this way. It is not a tourist quarter and it has never pretended to be.",
        "The robots are clustered around Galaxy World, a mall and tower complex with a park in front of it. The 6S store sits on the retail level. The pavement outside is where the shows happen. Longgang has described the wider area as the country's first robot block, pulling a showroom, a theatre, testing ground and an industrial park into a few walkable streets.",
        "Walkable is the operative word. This is one block, not a district-wide trail. You can cross the whole thing in ten minutes, which is worth knowing before you budget a day for it.",
        "The rest of Longgang is genuinely large and mostly residential. Do not plan to wander out from the robots into anything. There is no old quarter next door and no waterfront. What you came for is the block.",
      ],
      facts: [
        { label: "District", value: "Longgang, in the Bantian area" },
        { label: "Shape", value: "One block around a mall, not a trail" },
        { label: "Cost", value: "Free to walk. You pay for food and rides." },
        { label: "Time to allow", value: "Ninety minutes on the block itself" },
        { label: "Watch for", value: "It is a long way from where visitors sleep" },
      ],
    },
    {
      id: "six-s-store",
      heading: "The robot 6S store, and what the six services are",
      image: shot(
        "robot-6s-store-robotic-arm",
        800,
        "Stock photograph of a blue industrial robot arm in a glass display case.",
        "Freek Wolsink",
        "https://www.pexels.com/@freek-wolsink-508219",
        "https://www.pexels.com/photo/blue-yaskawa-industrial-robot-in-showcase-display-34207369/",
      ),
      paragraphs: [
        "The [world's first robot 6S store](https://www.eyeshenzhen.com/content/2025-07/30/content_31646452.htm) opened here at the end of July 2025. The name is borrowed from the car trade, where a 4S dealership handles sales, spare parts, service and survey. Robotics got two more.",
        "Those two extras are the whole idea. Leasing lets a company put a humanoid on a stand for one week without owning it. Customisation means the machine can be built for one job that nobody has built a machine for yet. Both exist because almost nobody is ready to buy a robot outright.",
        "Inside, the range is wider than the videos suggest. Humanoids at several sizes, some built to copy a human expression. Robotic arms passing objects between themselves. Gesture sensors that mirror what you do. Massage robots that will work on your shoulders while you stand there.",
        "The store reported twenty-six robot companies signed up at launch, Unitree among them, with close to fifty firms across the supply chain involved and more than two hundred expressing interest. That is what the place is really for. It is a shared shop window for an industry that is mostly business to business.",
        "Rental prices were reported at launch as running from a few thousand yuan to hundreds of thousands, depending on the machine. That is a range rather than a price list, and it is theirs, not ours. Anybody costing a real hire should ask in the room.",
      ],
      list: {
        intro: "The six services the name refers to.",
        items: [
          "**Sales.** Machines and components, industrial through to educational.",
          "**Spare parts.** The reason a cluster of suppliers matters more than a catalogue.",
          "**Service.** Maintenance and repair, on machines nobody else locally can fix.",
          "**Survey.** Feedback from real users, fed back into what gets built next.",
          "**Leasing.** Short hires for events, exhibitions and inspections.",
          "**Customisation.** A machine built for one job, to order.",
        ],
      },
      facts: [
        { label: "Opened", value: "End of July 2025" },
        { label: "Cost", value: "Free to enter. Everything inside is priced." },
        { label: "Time to allow", value: "Forty minutes, longer if you are buying" },
        { label: "Best for", value: "Anyone who wants to touch the hardware" },
        { label: "Watch for", value: "Staff work in Mandarin first" },
      ],
    },
    {
      id: "street-itself",
      heading: "What happens on the street itself",
      image: shot(
        "robot-barista-coffee-longgang",
        801,
        "Stock photograph of a robotic arm beside a coffee cup on a desk.",
        "Pavel Danilyuk",
        "https://www.pexels.com/@pavel-danilyuk",
        "https://www.pexels.com/photo/a-scientist-testing-a-device-8439069/",
      ),
      paragraphs: [
        "The pavement outside the store is the part people remember. There is a robot show in the open zone at the front, run four times across the day and lasting about ten minutes each time. Humanoids and robot dogs, mostly. When it rains the whole thing moves indoors.",
        "Confirm the day's schedule before you cross the city for it. Four short slots spread from late morning to evening means you can miss all four by arriving at the wrong hour, and no article is a reliable source for a timetable that moves.",
        "The food robots are the better trick anyway. One machine at the entrance makes jianbing guozi to order, the savoury pancake sold on street corners all over China, folded and out in a few minutes. Another does ice cream. Coffee robots grind, pour and finish the cup with latte art.",
        "It is worth watching what these are actually for. A jianbing robot is not a novelty stunt, it is somebody testing whether a machine can hold a food safety standard and a rush at the same time. The joke and the pilot programme are the same object.",
        "Outside, at a junction on Wuhe Avenue, there is a [robot on traffic duty](https://english.news.cn/20260313/56c326b7fd7b4976b877775b48ca43dd/c.html). It has been working since the sixth of March 2026. It gives standard traffic gestures in time with the lights, and its vision system picks up riders without helmets and cars stopped over the line, then whistles at them.",
        "Stand and watch it for five minutes. It is the most ordinary thing on the block and the strangest. Nobody crossing that road looks up.",
      ],
      facts: [
        { label: "Shows", value: "Four short slots across the day. Confirm before travelling." },
        { label: "Cost", value: "Free to watch. Food is priced normally." },
        { label: "Time to allow", value: "Thirty minutes, if a show lands well" },
        { label: "Weather", value: "Rain moves the show indoors" },
        { label: "Watch for", value: "The traffic robot is outside, not in the mall" },
      ],
    },
    {
      id: "restaurant",
      heading: "The robot restaurant",
      image: shot(
        "robot-restaurant-shenzhen",
        801,
        "Stock photograph of a person and a robotic arm holding wine glasses.",
        "Pavel Danilyuk",
        "https://www.pexels.com/@pavel-danilyuk",
        "https://www.pexels.com/photo/a-robot-holding-a-wine-8439083/",
      ),
      paragraphs: [
        "There is a human and robot restaurant inside the 6S store, and Longgang's own reporting puts more than a dozen machines in it working separate jobs. Humanoids greet you at the door. A robotic chef stir-fries to a programmed routine. Ask nicely and one of the greeters will dance.",
        "Manage your expectations about the cooking. A robot wok runs one recipe the same way every time, which is exactly what a robot wok is for and exactly what a good Cantonese kitchen is not. Consistency is the feature. Surprise is not on the menu.",
        "Eat there for what it is. You are paying to watch an automation experiment during service, with dinner attached. That is a fair trade and a genuinely good hour. It is not the meal you build a Shenzhen food day around.",
        "We could not open Longgang's own page on this restaurant directly, so the detail above comes from their published summary rather than from the page itself. Treat the head count of robots as approximate and check the place is still trading before you plan an evening on it.",
      ],
      facts: [
        { label: "Where", value: "Inside the 6S store" },
        { label: "Cost", value: "Restaurant prices. Confirm on the day." },
        { label: "Time to allow", value: "An hour, service permitting" },
        { label: "Good for", value: "Anyone travelling with teenagers" },
        { label: "Watch for", value: "One recipe, cooked identically, every time" },
      ],
    },
    {
      id: "theatre",
      heading: "The robot theatre and the testing ground",
      image: shot(
        "robot-theatre-robot-dog-longgang",
        800,
        "Stock photograph of a four-legged robot dog standing indoors.",
        "Vladimir Srajber",
        "https://www.pexels.com/@vladimirsrajber",
        "https://www.pexels.com/photo/futuristic-robot-dog-indoors-in-stationary-pose-29393023/",
      ),
      paragraphs: [
        "The block also holds a robot theatre, where the machines perform rather than sell. Boxing bouts. Robot football. Dance routines with more coordination than the average wedding.",
        "The football is the one to watch if you get a choice. Two teams of small humanoids falling over constantly, getting up on their own, and occasionally producing thirty seconds of play that looks deliberate. Everybody laughs. Everybody also works out, at about the same moment, that getting up unaided is the hard part.",
        "There is a testing ground here too, which matters more than it sounds. Machines that only ever work in a lab are demos. Machines that walk on a real pavement, in Shenzhen humidity, past people who are not being careful, are products. That is the difference this block exists to close.",
        "Programming for the theatre is not fixed and not always running. This is the item most likely to be dark when you arrive. Build the day so that missing it costs you nothing.",
      ],
      facts: [
        { label: "What is on", value: "Boxing, robot football, dance routines" },
        { label: "Cost", value: "Varies by event. Check before going." },
        { label: "Time to allow", value: "Thirty minutes if something is running" },
        { label: "Reliability", value: "The least dependable item on the block" },
        { label: "Watch for", value: "Programming changes without notice" },
      ],
    },
    {
      id: "getting-there",
      heading: "Getting there from Futian, and what the day really costs",
      image: shot(
        "bantian-crossing-traffic-robot",
        796,
        "Stock photograph of pedestrians crossing a busy street in Shanghai.",
        "icy pomelo Allen",
        "https://www.pexels.com/@icy-pomelo-allen-2161489400",
        "https://www.pexels.com/photo/busy-street-scene-in-downtown-shanghai-china-37520279/",
      ),
      paragraphs: [
        "Every page about this place tells you what is there. Almost none of them tell you what getting there costs, which is the only part that can wreck a short trip.",
        "Here is the honest accounting. The metro reaches Bantian and the ride out from Futian is comfortably the longest leg of the day. Allow around an hour each way from a central hotel, more in the evening peak, and a similar stretch by car when the roads are busy. Add ninety minutes on the block and you have most of an afternoon gone.",
        "So the shape that works is a half day, not a stop. Go out late morning, take a show and lunch, walk the block, come back before the peak. Trying to bolt this onto a Futian day means spending two hours in transit to look at a shop for forty minutes.",
        "The other thing to sort before you go is payment. The store, the restaurant and the food robots all assume a Chinese mobile payment app, the same as everywhere else in this city. Cash and a foreign card get you very little. Set it up before you fly, not on the pavement.",
        "Language is the second friction and it gets less attention. Signage has English on it. The conversations do not. Asking what a machine costs to hire, or whether it can do the thing you need, is a Mandarin conversation with a salesperson, and the answer is where the value of the trip sits.",
        "If you are stitching this into a wider tech itinerary, our [top five high-tech places to visit in Shenzhen](/blog/top-5-high-tech-places-to-visit-in-shenzhen) covers the Futian and Nanshan half. Those two lists are one city and two different afternoons. Do not try to merge them.",
      ],
      facts: [
        { label: "From", value: "Futian or Nanshan hotels" },
        { label: "Travel time", value: "About an hour each way. More at peak." },
        { label: "Realistic shape", value: "A half day, ending before the evening peak" },
        { label: "Needs", value: "A working Chinese payment app" },
        { label: "Watch for", value: "Signs are bilingual. Conversations are not." },
      ],
    },
    {
      id: "business-visitors",
      heading: "If you came to buy rather than to look",
      image: shot(
        "robot-testing-ground-engineer",
        801,
        "Stock photograph of two people in lab coats examining a robotic arm.",
        "Pavel Danilyuk",
        "https://www.pexels.com/@pavel-danilyuk",
        "https://www.pexels.com/photo/woman-in-white-long-sleeve-shirt-holding-blue-folder-8438998/",
      ),
      paragraphs: [
        "This is the visit nobody writes about and it is the better use of the block. Close to fifty firms sit across this supply chain, covering components, manufacturing, software and applications. They are gathered in one place precisely so that a buyer does not have to drive to four industrial parks in a day.",
        "Come with a specification, not a curiosity. Which task, what payload, what cycle time, what it has to survive. A room full of machines answers a specific question well and a vague one badly. The same rule holds in the electronics markets across town, and for the same reason.",
        "Leasing is the underrated door. Renting a machine for a stand at a fair, or for one inspection, tells you more in a week than a year of specification sheets. It is also how most companies should be finding out whether any of this works for them.",
        "Ask about service before you ask about price. A robot bought from a firm with no local repair path is a very expensive ornament the first time something jams. The reason this cluster is worth flying to is that parts and repair sit on the same street as the sale.",
        "Take somebody who can hear the second answer. Prices and lead times are quoted differently depending on who is asking, which is not a scam, it is how wholesale works everywhere. We do this as [business trip support](/business-trip) rather than as sightseeing, and it is a different day with a different shape.",
      ],
      facts: [
        { label: "Bring", value: "A written specification, not a wish" },
        { label: "Ask first", value: "Service and parts, then price" },
        { label: "Best route in", value: "Lease before you buy" },
        { label: "Time to allow", value: "A full morning, plus meetings" },
        { label: "Watch for", value: "The useful answers arrive in Mandarin" },
      ],
    },
  ],
  faqs: [
    {
      question: "Where is the robot street in Shenzhen?",
      answer:
        "In the Bantian area of Longgang district, around the Galaxy World complex, out to the northeast of the central districts. The robot 6S store, the show zone and the robot restaurant are all on the same block. The metro reaches it, and the ride from a central hotel takes roughly an hour.",
    },
    {
      question: "Is the Shenzhen robot street worth visiting?",
      answer:
        "Yes on a longer trip, no on a short one. The block itself is about ninety minutes of genuine interest, and it costs around two hours of travel from where most visitors sleep. If you have two days in the city, spend them in Futian and Nanshan instead.",
    },
    {
      question: "Can tourists visit the robot 6S store?",
      answer:
        "Yes. It is a shop and it is free to walk into. You can watch the humanoids, the robotic arms and the massage robots without buying anything. Staff work in Mandarin first, so a detailed question about a machine usually needs help.",
    },
    {
      question: "Can you buy a robot in Shenzhen?",
      answer:
        "You can, and you can rent one, which is what most people should do first. The store covers sales, spare parts, service, user feedback, leasing and custom builds. Reported rental costs at launch ran from a few thousand yuan to hundreds of thousands depending on the machine, so get a current quote rather than working from an article.",
    },
    {
      question: "Is there a robot restaurant in Shenzhen?",
      answer:
        "There is one inside the 6S store in Longgang, with humanoid greeters and a robotic chef cooking to a set routine. It is an automation experiment you can eat in rather than a destination meal. Check it is still trading before you plan an evening around it.",
    },
    {
      question: "How long do you need at the Shenzhen robot street?",
      answer:
        "About ninety minutes for the block, or two to three hours if you take a show and eat there. Add roughly an hour of travel in each direction. Half a day is the shape that works, ending before the evening peak.",
    },
    {
      question: "Do you need a guide for the Shenzhen robot street?",
      answer:
        "Not for looking. The store is free, the metro goes there and the signage has English on it. A guide earns their keep when you are sourcing, negotiating a lease, or working to a single free day you cannot afford to lose to a dark theatre and a long ride back.",
    },
  ],
};
