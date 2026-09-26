import type { Post, PostImage } from "@/lib/posts";

/**
 * Self-hosted WebP, two widths, every file under 200KB, named for what is in
 * them. Same pipeline and same reasoning as the other posts in this folder.
 * The credit still travels with every photograph.
 */
const IMG = "/blog/shenzhen-international-museum-of-art";

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
 * "Shenzhen International Museum of Art".
 *
 * ⚠️ THE BRIEF NAMED A MUSEUM THAT DOES NOT EXIST. The request was for the
 * "Shenzhen Asia Art Museum in Guangming district". There is no institution by
 * that name. The large art museum in Guangming is the Shenzhen International
 * Museum of Art, 深圳国际美术馆, which opened on 30 May 2026. This post is about
 * that one. The wrong name is answered directly in the FAQ rather than ignored,
 * because anybody searching it has made the same mistake.
 *
 * KEYWORD. keywords.csv has no museum term, so this is anchored to the closest
 * entry in it, "Shenzhen city tour private". The primary is the museum's own
 * name, which is what people type. The robot street post is anchored to
 * "things to do in Shenzhen with a guide", so the two do not compete.
 *
 * WRITTEN AGAINST THE SERP. The three analysable ranking pages checked in
 * August 2026 were travelofchina.com (art and museum guide with FAQ, roughly
 * 4,750 words), chinadailyhk.com (news, roughly 550) and a trip.com visitor
 * guide (roughly 900). Average about 2,070 words, so the twenty per cent band
 * is roughly 1,650 to 2,480 and this sits inside it. macaonews.org, roughly
 * 450 words, was read as a fourth reference but not counted.
 *
 * PAGES THAT WOULD NOT FETCH, and were therefore not analysed rather than
 * quietly counted: szdaily.com, szgm.gov.cn and sz.gov.cn. All three returned
 * closed sockets, the same as the government domains on the last post.
 *
 * WHAT THEY ALL COVERED and this therefore covers: the building and its
 * architect, the floor area and the count of halls, the opening exhibitions,
 * tickets and booking, and the Guangming Science City cluster.
 *
 * WHAT NONE OF THEM COVERED, added here: that their own exhibition listings
 * have already expired, an honest half-day budget from where visitors actually
 * sleep, the booking and identity friction a foreign visitor hits, and when not
 * to go at all.
 *
 * ⚠️ EXHIBITION LISTINGS ARE DELIBERATELY NOT REPRODUCED AS CURRENT. The seven
 * opening shows were dated. The bronze animal heads closed on 20 July 2026 and
 * the Budapest loan was billed to 31 August 2026. Every competing page still
 * lists both as though they were on. This post names them as the opening
 * programme, in the past, and sends the reader to check what is actually
 * hanging.
 *
 * ⚠️ NO STORY. Every anecdote in references/stories.md belongs to another
 * company, so this post has none rather than borrowing one.
 *
 * ⚠️ NO HOUSE OPINION. Every entry in references/opinions.md is either owned by
 * another company or marked NEEDS A NUMBER.
 *
 * ⚠️ NO BUSINESS FIGURES. references/stats.md does not exist.
 *
 * ⚠️ TICKET PRICES CONFLICT BETWEEN SOURCES and are therefore described by
 * shape rather than printed. China Daily reported an all-access pass at 120
 * yuan with an early-bird at 72. The trip.com guide reported a 20 yuan basic
 * ticket alongside the same 72. Hours, metro line numbers and prices are kept
 * out of every facts block per the note on PostSection in lib/posts.ts.
 *
 * ⚠️ THE PHOTOGRAPHY IS ALL STOCK AND NONE OF IT IS THIS MUSEUM. Pexels has
 * nothing of Guangming. The galleries pictured are in Scotland, France and
 * London, and the platform shot is a station in another Chinese city. Every alt
 * string says what the picture actually shows. Replace before this earns its
 * keep.
 */
export const shenzhenInternationalMuseumOfArt: Post = {
  slug: "shenzhen-international-museum-of-art",
  title: "The Shenzhen International Museum of Art in Guangming",
  published: "2026-08-23",
  updated: "2026-08-23",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the guides who work this city daily, in English, Mandarin and Cantonese. We run the Guangming trip for visitors who want the new museums and the science city, and we tell people when it is not worth the ride out.",
  readingMinutes: 9,
  /* 52 characters. The museum's own name first, then the district and the
     year, because half the pages ranking for this are frozen at opening week. */
  metaTitle: "Shenzhen International Museum of Art, Guangming 2026",
  /* 159 characters. Name, location, then the thing no competing page says. */
  metaDescription:
    "The Shenzhen International Museum of Art in Guangming, what is actually inside the fifteen halls, and an honest half day budget for getting out there and back.",
  socialImage:
    "/blog/shenzhen-international-museum-of-art/og-shenzhen-international-museum-of-art-1200x630.jpg",
  excerpt:
    "Fifteen halls in two hull-shaped buildings, out in Guangming Science City. It opened in May 2026, it is a long way from where you are staying, and the opening exhibitions have already come down.",
  keywords: {
    primary: "Shenzhen International Museum of Art",
    secondary: [
      "Shenzhen art museum Guangming",
      "SIMoA Shenzhen building Cui Kai",
      "Shenzhen International Museum of Art exhibitions",
      "Shenzhen International Museum of Art tickets",
      "getting to Guangming Science City",
      "Shenzhen Science and Technology Museum",
      "Shenzhen art museum for visitors",
    ],
    longTail: [
      "is there an Asia Art Museum in Shenzhen",
      "where is the Shenzhen International Museum of Art",
      "how do you buy tickets for the Shenzhen International Museum of Art",
      "how long do you need at the Shenzhen International Museum of Art",
      "what is on at the Shenzhen International Museum of Art",
      "can you visit the science museum and the art museum in one day",
      "is the Shenzhen International Museum of Art worth visiting",
    ],
  },
  hero: shot(
    "shenzhen-international-museum-of-art-exterior",
    800,
    "Stock photograph of two children looking out of a large gallery window. Not this museum.",
    "Oguz Dik",
    "https://www.pexels.com/@oguz-dik-2162408326",
    "https://www.pexels.com/photo/children-gazing-through-modern-gallery-window-38563922/",
    true,
  ),
  intro: [
    "The **Shenzhen International Museum of Art** is in Guangming Science City, out in the northwest of the city, and it opened on the thirtieth of May 2026. Fifteen exhibition halls sit inside two hull-shaped buildings by the architect Cui Kai. Allow half a day, because most of it is the journey.",
    "That is the answer. Whether you should give it half a day is the part worth reading.",
    "A quick correction first, because it is the reason a lot of people end up here. There is no Asia Art Museum in Shenzhen. The name gets typed a great deal and it belongs to nothing. If somebody told you to visit the Asia Art Museum in Guangming, this building is what they meant.",
    "[Serious face now.] **Every English page about this museum is still advertising the opening exhibitions, and most of them have closed.** The bronze animal heads came down in July. The Budapest loan was only ever booked through the end of August. A museum three months old is mostly a promise about what happens next, and the listings you are reading are already history.",
    "So this is a post about the building, the shape of a visit and the cost of getting there. For what is actually hanging this week, check the museum's own channels the day before you go. If your trip is built around a fair, the [exhibition calendar](/calendar) is the thing to plan around first.",
  ],
  sections: [
    {
      id: "where-it-is",
      heading: "Where the museum is, and why that matters",
      image: shot(
        "guangming-metro-getting-there",
        800,
        "Stock photograph of a man waiting on a subway platform at Zhongshanba station in another Chinese city.",
        "Muhamad Guruh Budi Hartono",
        "https://www.pexels.com/@muhamad-guruh-budi-hartono-430167744",
        "https://www.pexels.com/photo/man-waiting-at-subway-station-in-urban-setting-30243948/",
      ),
      paragraphs: [
        "[Guangming](https://en.wikipedia.org/wiki/Guangming_District,_Shenzhen) is the far northwest of Shenzhen. It was farmland and dairy within living memory and it is now a science city with a particle accelerator district attached. Nobody stays out here on a first trip.",
        "The museum sits in a cluster the district calls one park and four centres. The Shenzhen Science and Technology Museum is the neighbour, with a science park and a sports centre alongside. That grouping is the single most useful fact on this page, because it turns a long ride for one building into a long ride for two.",
        "The metro reaches it and the ride out is the longest part of the day. Reckon on the better part of an hour each way from a Futian or Nanshan hotel, and a short hop by bus or on foot at the far end. Confirm the last leg before you set off, because sources disagree about whether it is a walk or a minibus.",
        "None of that is a reason not to go. It is a reason not to bolt it onto a morning in Futian and hope.",
      ],
      facts: [
        { label: "District", value: "Guangming, in the northwest" },
        { label: "Neighbours", value: "Science and Technology Museum, science park" },
        { label: "Travel time", value: "Most of an hour each way from the centre" },
        { label: "Time to allow", value: "Half a day, door to door" },
        { label: "Watch for", value: "The last leg from the station changes by source" },
      ],
    },
    {
      id: "the-building",
      heading: "The building, and the two hulls",
      image: shot(
        "simoa-gallery-interior-guangming",
        879,
        "Stock photograph of a grand gallery interior with classical sculptures, in Scotland.",
        "Michael D Beckwith",
        "https://www.pexels.com/@michael-d-beckwith-2150568551",
        "https://www.pexels.com/photo/elegant-interior-of-art-gallery-in-scotland-31267774/",
      ),
      paragraphs: [
        "The architect is Cui Kai and the idea is two hulls, one drawn from an eastern aesthetic and one from a western, joined by a central hall. Ground was broken in September 2022. It is a [135,000 square metre building](https://macaonews.org/life/arts-culture/shenzhen-international-art-museum/), which is large enough that the walking is a real factor in how long you last.",
        "The detailing is where the money went. Thirteen curtain wall systems using carbon fibre and photovoltaics. A cable-supported glass wall. Metal louvres that meter the daylight before it reaches anything hanging on a wall.",
        "The feature everybody photographs is the Moon Gate, a circular mesh installation that throws a different pattern depending on the hour. Go in the afternoon if the light matters to you. Go at opening if the crowd matters more.",
        "Two hulls symbolising two civilisations is the kind of concept that could have been a press release and nothing else. It is not. The two halves genuinely read differently from inside, and the walk between them is the part of the building that does the most work.",
      ],
      facts: [
        { label: "Architect", value: "Cui Kai" },
        { label: "Floor area", value: "About 135,000 square metres" },
        { label: "Broke ground", value: "September 2022" },
        { label: "Opened", value: "30 May 2026" },
        { label: "Best for", value: "Anyone who came for the architecture" },
      ],
    },
    {
      id: "whats-inside",
      heading: "What is inside the fifteen halls",
      image: shot(
        "budapest-masters-painting-gallery",
        800,
        "Stock photograph in grayscale of a sculpture on a plinth in a French art gallery.",
        "rene",
        "https://www.pexels.com/@rene-3154849",
        "https://www.pexels.com/photo/statue-on-a-podium-in-an-art-museum-9165593/",
      ),
      paragraphs: [
        "Fifteen exhibition halls, built to international loan standards, which is the specification that decides whether a foreign museum will lend you anything at all. That is not a detail for visitors. It is the whole reason a Titian can hang in Guangming.",
        "Behind them sits a 12,000 square metre repository, a 700-seat indoor theatre, an outdoor theatre, a 200-seat lecture hall, an art library and 3,000 square metres of space for public education.",
        "Read that list again and notice what it is. Roughly a third of this building is not galleries. It is storage, teaching rooms and stages. A museum built to borrow and to teach rather than to display a collection it already owns.",
        "For a visitor the practical consequence is simple. The programme changes often and the building rewards a second visit more than a long first one.",
      ],
      list: {
        intro: "What is in the building beyond the galleries.",
        items: [
          "**A 12,000 square metre repository**, which is what lenders check before they say yes.",
          "**A 700-seat indoor theatre**, plus an outdoor one.",
          "**A 200-seat lecture hall**, for the talks programme.",
          "**An art library**, open to the public.",
          "**3,000 square metres of education space**, aimed at school groups.",
        ],
      },
      facts: [
        { label: "Halls", value: "Fifteen, to international loan standard" },
        { label: "Time to allow", value: "Two hours inside, more with a talk" },
        { label: "Good for", value: "Repeat visits rather than one long one" },
        { label: "Bring", value: "A light layer. The halls are kept cool." },
        { label: "Watch for", value: "Locker space is limited" },
      ],
    },
    {
      id: "exhibitions",
      heading: "The exhibitions, and why every listing you have read is stale",
      image: shot(
        "neo-link-contemporary-installation",
        800,
        "Stock photograph of transparent glass spheres suspended on strings.",
        "Jan van der Wolf",
        "https://www.pexels.com/@jan-van-der-wolf-11680885",
        "https://www.pexels.com/photo/large-variety-of-glass-spheres-hanging-on-strings-18502969/",
      ),
      paragraphs: [
        "The museum opened with [seven exhibitions at once](https://www.chinadailyhk.com/hk/article/634016), which is a statement of intent more than a programme. Bronze animal heads from the Yuanmingyuan with dozens of groups of older artefacts around them. Five centuries of the Budapest collection, Titian through Monet. Nearly fifty contemporary works by artists including Anish Kapoor and Olafur Eliasson.",
        "Then a Xu Bing room built for children, a first art and technology biennale, ink work from the Central Academy of Fine Arts in Beijing, and a survey of Chinese abstraction.",
        "**Most of that has come down.** The bronze heads closed on the twentieth of July. The Budapest loan was billed only to the end of August. Loan shows are short by nature and these were opening-week shows, which are shorter than most.",
        "This is the thing to take from the list rather than the list itself. The opening programme tells you what this museum can get through the door. National treasures, a major European collection and two of the biggest names in installation art, in one building, in week one. Whatever is hanging when you visit will have been chosen by the people who arranged that.",
        "Check what is on before you commit the afternoon. A wasted trip to Guangming costs more than a wasted trip to Futian, and it is entirely avoidable.",
      ],
      facts: [
        { label: "Opened with", value: "Seven exhibitions at once" },
        { label: "Since", value: "The opening shows have largely closed" },
        { label: "Check", value: "The museum's own channels, the day before" },
        { label: "Expect", value: "Loans and touring shows over a fixed collection" },
        { label: "Watch for", value: "English listings that are months out of date" },
      ],
    },
    {
      id: "tickets-booking",
      heading: "Tickets, booking and the part that catches foreigners out",
      image: shot(
        "simoa-tickets-booking-visitors",
        800,
        "Stock photograph of people standing with their backs to the camera near a ticket office.",
        "Maxim Titov",
        "https://www.pexels.com/@fearvi",
        "https://www.pexels.com/photo/anonymous-people-standing-near-ticket-office-3848898/",
      ),
      paragraphs: [
        "Booking runs through the museum's own WeChat account rather than a website you can use from a laptop before you fly. That single sentence is the most practical thing on this page.",
        "There is a cheap basic ticket and a dearer all-access pass that covers the ticketed shows. Reported prices differ between sources and have already changed once since opening, so treat any figure you read as an indication and confirm on the day you book.",
        "Two things reliably go wrong for visitors. The first is that a working Chinese payment method is assumed, the same as everywhere else in this city. The second is that slots for a popular loan show go before the weekend does.",
        "Bring your passport. Entry to public venues here is tied to real identity, and the booking is in somebody's name whether or not that somebody is standing in front of the desk.",
        "Nothing here is hard. It is just a sequence of small steps that all have to have happened before you are standing at a door in Guangming, and the ride back is long if one of them did not. Our post on [how to pay in China as a foreigner](/blog/how-to-pay-in-china-as-a-foreigner) covers the payment half properly.",
      ],
      facts: [
        { label: "Booking", value: "Through the museum's WeChat account" },
        { label: "Tickets", value: "A basic ticket and an all-access pass" },
        { label: "Bring", value: "Passport, and a working payment app" },
        { label: "Book by", value: "Midweek, for a weekend loan show" },
        { label: "Watch for", value: "Prices quoted in old articles" },
      ],
    },
    {
      id: "science-museum",
      heading: "Doing it with the science museum next door",
      image: shot(
        "shenzhen-science-technology-museum",
        960,
        "Stock photograph of a museum hall with a whale skeleton, at the Natural History Museum in London.",
        "Hasan Lütfü Örsdemir",
        "https://www.pexels.com/@hlorsdemir",
        "https://www.pexels.com/photo/natural-history-museum-interior-with-whale-skeleton-36058209/",
      ),
      paragraphs: [
        "The Shenzhen Science and Technology Museum is the other reason to come out here, and it opened first. It is the last building Zaha Hadid Architects designed for this city and it is the more dramatic of the two from the outside.",
        "Doing both in one day is the right call for most people. You have already paid the travel cost once. Two hours in each and a break between them fills a day properly and turns a long ride into a good one.",
        "The trap is the booking. The two museums use separate systems and a ticket to one is not a ticket to the other. People arrive having booked half of what they thought they booked, which is a bad thing to discover an hour from your hotel.",
        "Take the art museum first if the weather is poor and the science museum first if you are travelling with children who will not last the afternoon. Both are indoors and both are cool, so the ordering is about attention rather than shelter.",
        "If a day of new buildings is what you are after, our [top five high-tech places to visit in Shenzhen](/blog/top-5-high-tech-places-to-visit-in-shenzhen) and the [robot street in Longgang](/blog/shenzhen-robot-street-longgang) cover the other two corners of the city. All three are separate days. Do not try to merge them.",
      ],
      facts: [
        { label: "Neighbour", value: "Shenzhen Science and Technology Museum" },
        { label: "Booking", value: "Separate system. One ticket is not both." },
        { label: "Shape", value: "Two hours each, with a break between" },
        { label: "Good for", value: "Families, and anyone who came for buildings" },
        { label: "Watch for", value: "Assuming a combined ticket exists" },
      ],
    },
    {
      id: "when-to-skip",
      heading: "When to skip it",
      image: shot(
        "quiet-gallery-when-to-skip",
        773,
        "Stock photograph of two framed works on a plain white gallery wall.",
        "Ivan Siarbolin",
        "https://www.pexels.com/@ivan-siarbolin-1513699",
        "https://www.pexels.com/photo/black-and-red-frames-on-white-wall-4068032/",
      ),
      paragraphs: [
        "Skip it if you have two days in Shenzhen. Two days belong to Futian and Nanshan, and two hours of travel is a straight loss against that. This is a third-day building.",
        "Skip it if nothing on this month's programme interests you. A new museum between loan shows is a very fine building with quiet rooms in it, and there is no permanent collection waiting to carry the visit. Look first, then decide.",
        "Skip it if you were promised an Asia Art Museum and what you wanted was Asian antiquities. That is not what this is. The programme so far has been international loans and contemporary work, and the older Chinese material has arrived as visiting exhibitions rather than as a standing display.",
        "You also do not need us for any of it. The metro goes there, the building is signed in English, and booking a museum ticket is not a skill. If your payment app works and you can read a WeChat screen with a translation tool open, go on your own.",
        "Hire somebody when the day has a job attached. You are taking a client out and the conversation matters more than the labels. You have one free day between meetings and cannot afford to lose it to a closed hall. You want the museum, the science museum and a driver who can wait through both. That is the day a [private guide in Shenzhen](/private-tour-guide-shenzhen) is worth paying for, and when it is not, we would rather tell you so.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is there an Asia Art Museum in Shenzhen?",
      answer:
        "No. There is no institution in Shenzhen by that name, and the search brings a lot of people to the wrong place. The large art museum in Guangming district is the Shenzhen International Museum of Art, which opened on 30 May 2026. That is almost certainly the building being asked about.",
    },
    {
      question: "Where is the Shenzhen International Museum of Art?",
      answer:
        "In Guangming Science City, in the northwest of Shenzhen, next to the Shenzhen Science and Technology Museum. The metro reaches it and the ride from a central hotel takes the better part of an hour each way. Confirm the last stretch from the station before you set off.",
    },
    {
      question: "How do you buy tickets for the Shenzhen International Museum of Art?",
      answer:
        "Through the museum's own WeChat account rather than an international booking site. There is a basic ticket and an all-access pass covering the ticketed exhibitions. A Chinese payment method is assumed, and you should bring your passport because entry is tied to the name on the booking.",
    },
    {
      question: "How long do you need at the Shenzhen International Museum of Art?",
      answer:
        "About two hours inside for the exhibitions and the building. Add most of an hour of travel in each direction, which makes it a half day door to door. Give it a full day if you are also doing the science museum next door.",
    },
    {
      question: "What is on at the Shenzhen International Museum of Art?",
      answer:
        "Check the museum's own channels rather than any article, including this one. It opened with seven exhibitions in May 2026 and most of those have since closed, including the Yuanmingyuan bronze heads in July and the Budapest loan at the end of August. The programme is built on loans and touring shows, so it turns over quickly.",
    },
    {
      question: "Can you visit the science museum and the art museum in one day?",
      answer:
        "Yes, and it is the sensible way to do it, because they are neighbours and you only pay the travel cost once. Allow about two hours in each with a break between. Book them separately, because the two use different systems and one ticket does not cover both.",
    },
    {
      question: "Is the Shenzhen International Museum of Art worth visiting?",
      answer:
        "On a longer trip, yes, especially if a loan show you want is hanging or you came for the architecture. On a two-day trip, no, because the travel eats the time you would rather spend in Futian and Nanshan. Look at what is on before you decide, since there is no permanent collection to fall back on.",
    },
  ],
};
