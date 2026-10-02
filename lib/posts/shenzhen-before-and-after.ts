import type { Post, PostImage } from "@/lib/posts";

/**
 * The photographs are self-hosted rather than hotlinked from Pexels, for the
 * reasons set out at the top of top-5-high-tech-shenzhen.ts. Two widths each,
 * WebP, every file under 200KB, named for what is in the frame.
 *
 * THE CREDIT IS NOT OPTIONAL. Self-hosting does not transfer authorship. Every
 * caption still names the photographer and links to the original.
 */
const IMG = "/blog/shenzhen-before-and-after";

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
       needed by a high-density screen. */
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
 * Shenzhen before and after.
 *
 * KEYWORD. The primary term is not in site/keywords.csv, and that is deliberate
 * rather than an oversight. keywords.csv is entirely commercial-intent service
 * terms. This post is informational, aimed at the visitor who wants to know what
 * was here first. The nearest commercial terms in that file are things to do in
 * Shenzhen with a guide and Shenzhen city tour private, and both are served by
 * the internal links rather than by the body copy.
 *
 * WRITTEN AGAINST THE SERP, checked August 2026. Four pages were analysed
 * because two of the top results refused to fetch. kupi.com, an encyclopedia
 * entry of roughly 1,700 words in five sections. minut.com, roughly 1,500 words
 * on the same arc with a shanzhai section. shenzhendecoded.com, roughly 3,800
 * words on Nantou. randomwire.com, a 2008 photo post of roughly 250 words, which
 * is dropped from the length band as an outlier rather than averaged in. The
 * remaining three average about 2,333 words, so the band is 1,867 to 2,800.
 *
 * borgenproject.org and scmp.com would not load from this network. Neither was
 * quietly counted.
 *
 * WHAT THEY ALL COVERED and this therefore covers: the pre-1979 county, the 1980
 * special economic zone, Deng Xiaoping, Shenzhen speed, the founding of Huawei,
 * Tencent, BYD and DJI, and the present population and GDP.
 *
 * WHAT NONE OF THEM COVERED, added here: the gap between the 30,000 figure for
 * Shenzhen town and the roughly 330,000 for Bao'an County, the second line
 * border that ran inside the city until 2018, and where a visitor can still walk
 * through the before.
 *
 * VOICE. Written to references/voice.md. Short sentences, no em dashes, no
 * semicolons, no colons, no parentheses, no exclamation marks. The humour is
 * front-loaded and then it goes straight, per references/humour.md, and every
 * joke costs the writer rather than the city.
 *
 * NO STORY. Every anecdote in references/stories.md belongs to another company.
 * None is retold here as ours.
 *
 * ONE OPINION, in the shape of number 4 in references/opinions.md, the boring
 * things properly take. Its number is from the subject matter rather than from
 * the business, because references/stats.md still does not exist. Same precedent
 * as top-5-high-tech-shenzhen.ts.
 *
 * NO BUSINESS FIGURES APPEAR IN THIS POST. No price, no response time, no
 * cancellation window. They are absent by design until stats.md exists.
 *
 * THE PHOTOGRAPHY IS GENERIC STOCK AND NONE OF IT IS VERIFIABLY SHENZHEN. The
 * walled-gate frame is Datong. The alley is Hong Kong. The container port is
 * Hong Kong. The fenced path is Sweden. The alt text therefore describes what is
 * in the frame and never claims it is the place named in the heading above it.
 * Replace with real photographs before this earns its keep.
 */
export const shenzhenBeforeAndAfter: Post = {
  slug: "shenzhen-before-and-after",
  title: "Shenzhen before and after, and where the old city survives",
  published: "2026-08-18",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the guides who work this city daily, in English, Mandarin and Cantonese. We spend most weeks in Huaqiangbei, at factory gates in Bao'an and Dongguan, and walking visitors through Nantou when they ask what was here first. Everything here is what we tell people in the car on the way in.",
  readingMinutes: 10,
  /* 56 characters. Keyword at the front, year on the end for freshness. */
  metaTitle: "Shenzhen Before and After: Rural County to Megacity 2026",
  /* 157 characters. Keyword, then the two figures that carry the whole story,
     then a soft nudge rather than an instruction. */
  metaDescription:
    "Shenzhen before and after, from a rural county of 330,000 people to 17.99 million. What changed, when it changed, and where the old city is still standing.",
  socialImage: `${IMG}/og-shenzhen-before-and-after-1200x630.jpg`,
  excerpt:
    "The fishing village was real. It was not the whole story. Bao'an County had about 330,000 people, a walled seat founded in 331 AD and a railway station from 1911. Here is what replaced it, and what survived.",
  keywords: {
    primary: "Shenzhen before and after",
    secondary: [
      "what Shenzhen looked like before 1979",
      "Shenzhen fishing village myth",
      "Shenzhen Special Economic Zone 1980",
      "Shenzhen speed",
      "Shenzhen second line border",
      "Shenzhen population and GDP today",
      "old Shenzhen Nantou ancient town",
      "Shenzhen urban villages",
    ],
    longTail: [
      "was Shenzhen really a fishing village",
      "what was Shenzhen before 1979",
      "how did Shenzhen grow so fast",
      "how old is Shenzhen",
      "is there anything old to see in Shenzhen",
      "what is an urban village in Shenzhen",
      "why is Shenzhen called China's Silicon Valley",
      "do you need a guide to see old Shenzhen",
    ],
  },
  hero: shot(
    "shenzhen-skyline-before-and-after",
    799,
    "Illuminated skyscrapers packed along a city waterfront at night.",
    "Ben Cheung",
    "https://www.pexels.com/@ben-cheung-140183",
    "https://www.pexels.com/photo/illuminated-skyscrapers-in-city-at-night-9651234/",
    true,
  ),
  intro: [
    "**Shenzhen before and after** is a forty-seven year gap. Before 1979 this was Bao'an County, about 330,000 people farming rice, fishing the bay and trading over the Hong Kong border. Today it is 17.99 million people and a 3.68 trillion yuan economy. The county is still under there.",
    "That is the answer. The rest of this is what was here first, how it went, and how much of it you can still walk through, which is the part most accounts skip.",
    "Every guide in this city has used the fishing village line. I have used it. It fits neatly into the ninety seconds between the airport exit and the first traffic jam, and it is not quite true.",
    "[Serious face now.] The village was real. The county around it was not a village, and the difference is the reason Shenzhen looks the way it does rather than a piece of trivia.",
    "One caution before the dates. Everything below is history, so it is written against sources you can go and read yourself. Anything about what is open, what it costs and how you reach it changes without warning, and none of that is in here. Check it the week you travel.",
  ],
  sections: [
    {
      id: "before-1979",
      heading: "What was here before 1979",
      image: shot(
        "rice-paddies-before-shenzhen",
        800,
        "Farmers working in flooded rice paddies at sunset.",
        "Tuấn Vũ",
        "https://www.pexels.com/@tu-n-vu-2153773491",
        "https://www.pexels.com/photo/traditional-asian-farmers-working-in-rice-paddies-at-sunset-35782265/",
      ),
      paragraphs: [
        "The land is old. The city is not. Bao'an County was founded in 331 AD under the Eastern Jin dynasty, with its seat at Nantou, which means roughly seventeen hundred years of administration happened here before anybody drew a special economic zone on the map.",
        "It was a coastal county and it made its living the way coastal counties do. Salt. Pearls. Rice. Fishing. Trade through the Pearl River Delta, which has been a trading delta for as long as there have been boats on it.",
        "Hong Kong came out of the same county. Britain took Hong Kong Island in 1842, Kowloon in 1860, and the New Territories on a lease in 1898. All three were carved off Bao'an. The border everybody queues at now is a line drawn through what used to be one administrative unit.",
        "The railway arrived in 1911. The Chinese section of the Kowloon to Canton line opened and its last stop on the Chinese side was Shenzhen station. A market town beside a border and a railway does well, and this one did.",
        "By 1953 it was doing well enough that the county government moved to it. Nantou had held the seat for sixteen hundred years. The administration packed up and went to Shenzhen town, because the town had the railway and the larger economy. The name you know was a promotion, not a founding.",
      ],
      facts: [
        { label: "Founded", value: "Bao'an County, 331 AD, seat at Nantou" },
        { label: "Old economy", value: "Salt, pearls, rice, fishing, border trade" },
        { label: "Railway", value: "Kowloon to Canton line, Chinese section, 1911" },
        { label: "Same county as", value: "Hong Kong, until 1842, 1860 and 1898" },
        { label: "Renamed", value: "Bao'an became Shenzhen, 23 January 1979" },
      ],
    },
    {
      id: "fishing-village",
      heading: "The fishing village number, and the one nobody quotes",
      image: shot(
        "fishing-village-boats-pearl-river-delta",
        800,
        "Fishing boats moored in a harbour below a mountain ridge.",
        "FENG HE",
        "https://www.pexels.com/@feng-he-2162517834",
        "https://www.pexels.com/photo/fishing-boats-in-harbour-with-mountain-backdrop-38400749/",
      ),
      paragraphs: [
        "Thirty thousand people. That is the figure in every article ever written about this city, and it is a real figure. It is the population of Shenzhen town at the end of the seventies.",
        "The number nobody quotes is about three hundred and thirty thousand. That is Bao'an County, which is the thing that was actually renamed. **Both figures are true and they are measuring different objects.** The popular version picks the small one, because the small one is a better story.",
        "There were fishing villages. Hundreds of them, along the bay and up the creeks, and their descendants own a startling amount of Shenzhen today. But a county of three hundred and thirty thousand people with a Ming walled town, a working railway station and a salt industry is not a village. It is a small rural county, which is duller to say and closer to right.",
        "This has one practical consequence for a visitor. Arrive believing there was nothing here and you will not go looking for anything, and there is more to look at than the skyline suggests.",
        "It also explains the shape of the modern city. Every one of those settlements owned its land, and it kept owning it. That is where the urban villages come from, and they are the strangest good thing about walking around Shenzhen.",
      ],
      facts: [
        { label: "Shenzhen town", value: "About 30,000 people at the end of the 1970s" },
        { label: "Bao'an County", value: "About 330,000 people, the unit renamed in 1979" },
        { label: "Both correct", value: "They count a town and a county" },
        { label: "What survived", value: "The village land rights, which built the urban villages" },
      ],
    },
    {
      id: "the-zone",
      heading: "1980, and the zone that started it",
      image: shot(
        "shekou-port-special-economic-zone",
        534,
        "Red container cranes and stacked shipping containers at a working port.",
        "Jimmy Chan",
        "https://www.pexels.com/@jimbear",
        "https://www.pexels.com/photo/red-cranes-and-multicoloured-cargo-containers-on-a-cost-12999282/",
      ),
      paragraphs: [
        "Shekou went first, and it went before the zone existed. The industrial zone at Shekou was demarcated on 31 January 1979 and was working by that July, run by China Merchants under Yuan Geng.",
        "The special economic zone came in May 1980. Shenzhen was named the first of them, on Deng Xiaoping's push, and the terms were the whole point. Cheap land leases. Reduced tariffs. Foreign investment allowed in, through procedures simple enough that people actually used them.",
        "Hong Kong sat thirty kilometres away and that was the design rather than a coincidence. Capital and orders on one side, land and labour on the other. The county had spent a century being the place next to Hong Kong. Now being next to Hong Kong was the asset.",
        "Yuan Geng put a slogan up at Shekou in 1981. Time is money, efficiency is life. It reads as mild corporate wallpaper now. In 1981 it was close to heresy, Deng endorsed it on his 1984 visit, and it has been quoted in every account of this period since.",
        "The zone was four districts, not the city. Luohu, Futian, Nanshan and Yantian were inside it. Everything else was outside and outside ran under different rules. That single distinction governed Shenzhen for the next thirty years.",
      ],
      facts: [
        { label: "Shekou first", value: "Demarcated 31 January 1979, working by July" },
        { label: "Zone declared", value: "May 1980, the first in China" },
        { label: "Original zone", value: "Luohu, Futian, Nanshan and Yantian" },
        { label: "The pitch", value: "Cheap land, low tariffs, simple procedures" },
        { label: "The location", value: "Thirty kilometres from Hong Kong" },
      ],
    },
    {
      id: "shenzhen-speed",
      heading: "Three days a floor",
      image: shot(
        "shenzhen-speed-tower-under-construction",
        800,
        "Tower cranes over apartment blocks under construction on a city skyline.",
        "Kritsada Channel",
        "https://www.pexels.com/@kritsada-channel-663425830",
        "https://www.pexels.com/photo/cranes-by-apartment-buildings-under-construction-in-city-skyline-26590643/",
      ),
      paragraphs: [
        "[Shenzhen speed](https://en.wikipedia.org/wiki/Shenzhen_speed) began as a construction statistic. The Guomao building went up in Luohu between 1982 and 1985, fifty-three storeys and a hundred and sixty metres, and for a long stretch of it the crews turned out one finished floor every three days.",
        "It was the tallest building in China when it topped out. It is not tall now and nobody photographs it. It is still the most important building in the city, because the number attached to it became the way the whole country talked about Shenzhen for a decade.",
        "Here is the one strong opinion in this article, and it is not the flattering one. **What built this city was not vision. It was three days a floor, done fifty-three times, mostly at night, by people whose names are not on anything.** Vision gets the speeches. Repetition did the work, and repetition is the least quotable thing there is.",
        "The honest half is that repetition flattens things. Turning out a floor every three days for three years means never stopping to ask what was on the site. Most of what was here went under, and the city has since spent serious money digging pieces of it back out. You cannot have the speed and the care at once. Shenzhen picked, and it knew it was picking.",
        "Everything else followed at the same pace. The stock exchange opened on 1 December 1990. The first metro line did not open until 28 December 2004, which is late for a city that size and tells you plainly where the money went first.",
      ],
      facts: [
        { label: "Guomao building", value: "Luohu, built 1982 to 1985" },
        { label: "The record", value: "One floor every three days, fifty-three floors" },
        { label: "Height", value: "160 metres, tallest in China on completion" },
        { label: "Stock exchange", value: "Opened 1 December 1990" },
        { label: "First metro line", value: "Opened 28 December 2004" },
      ],
    },
    {
      id: "second-line",
      heading: "The border that ran inside the city",
      image: shot(
        "wire-fence-checkpoint-line",
        800,
        "A narrow asphalt path running between a wire fence and trees.",
        "Efrem Efre",
        "https://www.pexels.com/@efrem-efre-2786187",
        "https://www.pexels.com/photo/asphalt-alley-with-fence-around-and-forest-behind-17644159/",
      ),
      paragraphs: [
        "There were two borders here, not one. The famous one is the Hong Kong border. The other ran through the middle of Shenzhen, and almost nothing written for visitors mentions it at all.",
        "It was called the second line. Eighty-four and a half kilometres of three-metre wire fence with a patrol road beside it, built between 1982 and 1985, separating the special economic zone from the rest of the country it was part of. There were checkpoints. **You needed a permit to pass, and that applied to Chinese citizens.**",
        "So for most of this city's life, the people building it could not simply walk into it. Migrant workers arrived to put up the towers and stopped at a fence. The everyday words for inside and outside the line are still in use here, and they still tell you something reliable about rent.",
        "The zone was extended to the whole city on 1 July 2010, which took it from 396 square kilometres to 1,953. The permit checks ended. The fence itself stayed standing for another eight years, until the State Council formally scrapped it in January 2018.",
        "You can read the old line on a map without knowing that is what you are doing. It is why the denser, older, more expensive half of Shenzhen sits south of a curve that no longer exists, and why Bao'an and Longgang still feel like a different city. For thirty years they were governed as one.",
      ],
      facts: [
        { label: "What it was", value: "An internal border around the zone" },
        { label: "Built", value: "1982 to 1985, 84.6 km of fence and patrol road" },
        { label: "To cross it", value: "A permit, until the 2010 expansion" },
        { label: "Zone grew", value: "396 sq km to 1,953 sq km, 1 July 2010" },
        { label: "Fence removed", value: "Formally scrapped, January 2018" },
      ],
    },
    {
      id: "shenzhen-today",
      heading: "What the after actually is",
      image: shot(
        "shenzhen-today-aerial-view",
        800,
        "A dense skyline of lit towers photographed from above at night.",
        "ainc T",
        "https://www.pexels.com/@ainc-t-76908403",
        "https://www.pexels.com/photo/vibrant-nighttime-cityscape-of-skyscrapers-31017183/",
      ),
      paragraphs: [
        "17.99 million permanent residents at the end of 2024, and a GDP of 3.68 trillion yuan, up 5.8 per cent on the year. Forty-seven years earlier the same ground held a rural county and a market town. That is the before and the after in two sentences.",
        "The companies are the part people already know. Huawei started here in 1987, BYD in 1995, Tencent in 1998, DJI in 2006. None of them were relocated here by anyone. They started here, which is a different claim and a much stronger one.",
        "Almost nobody in Shenzhen is from Shenzhen. That explains the food, the mix of accents, the willingness to try things, and the absence of the settled local way of doing everything that most Chinese cities have. The place is made entirely of people who left somewhere else.",
        "It also explains why the history feels thin on the ground. A city where nearly everyone arrived after 1990 has no inherited stories about the site. Ask a friend here what stood where their office is now in 1985 and you will usually get a shrug, and they are not being unhelpful.",
        "[UN-Habitat published a full account of the transformation](https://unhabitat.org/the-story-of-shenzhen-its-economic-social-and-environmental-transformation) if you want the economics rather than the tour. It is the serious version of this article. If you want the opposite of both, the [five high-tech places worth a day](/blog/top-5-high-tech-places-to-visit-in-shenzhen) are all in the same two districts.",
      ],
      facts: [
        { label: "Population", value: "17.99 million permanent residents, end of 2024" },
        { label: "GDP", value: "3.68 trillion yuan in 2024, up 5.8 per cent" },
        { label: "Founded here", value: "Huawei 1987, BYD 1995, Tencent 1998, DJI 2006" },
        { label: "Who lives here", value: "Overwhelmingly people who arrived from elsewhere" },
        { label: "The gap", value: "A rural county in 1979, a megacity now" },
      ],
    },
    {
      id: "see-the-before",
      heading: "Where the before is still standing",
      image: shot(
        "chinese-walled-town-stone-gate",
        675,
        "A carved stone archway in an old Chinese walled town.",
        "乾 黄",
        "https://www.pexels.com/@1579440499",
        "https://www.pexels.com/photo/28263427/",
      ),
      paragraphs: [
        "This is the part every other account of Shenzhen history leaves out. **The before is not all gone.** Some of it is a short walk from a metro station, and it makes the best half day in this city for anybody who likes old things.",
        "Nantou is the one to do. It is the walled county seat, the administrative centre of [Bao'an County](https://en.wikipedia.org/wiki/Bao%27an_County) from 331 AD, sitting in Nanshan surrounded by tower blocks. The walls you see are Ming, put up in the 1390s. By the 2000s it was a slum inside its own gates. A restoration around 2019 and 2020 kept the residents and let in coffee, ceramics and bars, so it works as a neighbourhood rather than a museum.",
        "Dapeng Fortress is the other one and it is much further out. A Ming coastal garrison on the Dapeng peninsula, roughly six hundred years old, built to fight pirates. It eats most of a day in travel. Worth it if forts are your thing, a wasted day if they are not.",
        "Then the urban villages, which are the real answer to the question. Those old farming and fishing settlements kept their land when the fields around them turned into a city. They could not build outward so they built upward, and the result is dense blocks of handshake buildings where the alleys are narrow enough to reach across.",
        "More than three hundred of them are still standing and they house an enormous share of the population. Baishizhou was the famous one and most of it has now gone. Go and walk one before the rest follow, because the clearance is not slowing down.",
        "None of this needs a guide. It needs a metro card and an afternoon. It goes easier with somebody who reads the signage and knows which block went up when, and that is a preference rather than a requirement. It is what a [private day](/tours/private) buys and nothing more than that.",
      ],
      list: {
        intro: "The three things worth your time, in the order most people should do them.",
        ordered: true,
        items: [
          "**Nantou**, in Nanshan. Half a day, the walls are Ming, the coffee is current.",
          "**Any urban village**, anywhere. An hour. This is the one that explains the city.",
          "**Dapeng Fortress**, on the peninsula. A full day, mostly travel. Forts only.",
        ],
      },
      facts: [
        { label: "Nantou", value: "Nanshan, walled county seat, restored 2019 to 2020" },
        { label: "Dapeng Fortress", value: "Dapeng peninsula, Ming garrison, most of a day" },
        { label: "Urban villages", value: "More than three hundred, spread across the city" },
        { label: "Time to allow", value: "Half a day for Nantou, a full day for Dapeng" },
        { label: "Watch for", value: "Access details change, confirm the week you go" },
      ],
    },
  ],
  faqs: [
    {
      question: "Was Shenzhen really a fishing village?",
      answer:
        "Partly. Shenzhen town held about 30,000 people at the end of the 1970s, and there were hundreds of genuine fishing villages along the bay. But the unit renamed in 1979 was Bao'an County, which held roughly 330,000 people, a Ming walled seat and a railway station. Both numbers get quoted as if they described the same thing.",
    },
    {
      question: "What was Shenzhen before 1979?",
      answer:
        "Bao'an County, founded in 331 AD with its seat at Nantou. It lived on salt, pearls, rice, fishing and trade across the Hong Kong border. The Kowloon to Canton railway reached Shenzhen town in 1911, and the county government moved there from Nantou in 1953.",
    },
    {
      question: "How old is Shenzhen?",
      answer:
        "The city is dated from 1979, when Bao'an County was renamed. The site is far older. Nantou has been an administrative centre since 331 AD and the walls standing there today were built by the Ming in the 1390s.",
    },
    {
      question: "How did Shenzhen grow so fast?",
      answer:
        "A special economic zone in May 1980 gave it cheap land leases, low tariffs and workable rules for foreign investment, thirty kilometres from Hong Kong. Shekou had already started in 1979. The construction rate that followed became known as Shenzhen speed, after a tower in Luohu that went up at one floor every three days.",
    },
    {
      question: "Is there anything old to see in Shenzhen?",
      answer:
        "Yes, more than people expect. Nantou ancient town in Nanshan is a restored walled settlement you can walk into for free. Dapeng Fortress on the peninsula is a Ming coastal garrison about six hundred years old. The urban villages scattered across the city are the living version of the same history.",
    },
    {
      question: "What is an urban village in Shenzhen?",
      answer:
        "A farming or fishing settlement that kept its land rights while the city grew around it. Unable to expand outward, the villagers built upward, producing dense blocks of tall narrow buildings with very tight alleys. More than three hundred remain, they house a large share of the population, and the city is steadily clearing them.",
    },
    {
      question: "Why is Shenzhen called China's Silicon Valley?",
      answer:
        "Because the companies started here rather than moving in. Huawei was founded in Shenzhen in 1987, BYD in 1995, Tencent in 1998 and DJI in 2006, on top of a manufacturing base built through the 1980s and 1990s. The nickname undersells the hardware supply chain, which has no real equivalent in California.",
    },
    {
      question: "Do you need a guide to see old Shenzhen?",
      answer:
        "No. Nantou is free, open and on the metro, and the urban villages are simply neighbourhoods you can walk into. A guide is worth paying for when the day has a job attached, such as meetings either side of the sightseeing, or a single free day you cannot afford to lose to logistics.",
    },
  ],
};
