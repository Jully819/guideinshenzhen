import type { Post } from "@/lib/posts";

/**
 * PHOTOGRAPHY NOTE, and it matters for this post more than most.
 *
 * The hero is REAL SHENZHEN and was verified rather than assumed. The tapered
 * illuminated tower is the China Resources Headquarters in Nanshan and the
 * Tencent sign is legible on the block to its left, shot across Shenzhen Bay.
 * It is the one image here that can carry a caption naming the city.
 *
 * THE OTHER FOUR ARE GENERIC STOCK and none of them was taken in Shenzhen.
 * Their alt text describes the object rather than the place for that reason,
 * and no caption in this post claims otherwise:
 *
 *   circuit-board-components   a bare board, photographed anywhere
 *   electronics-factory-line   a production line, country unknown
 *   drone-technology           a consumer drone, not identified as a DJI
 *   robotics-laboratory        an arm in a MEXICO CITY lab, per the Pexels tag
 *
 * The robotics frame is the one to watch. It is captioned nowhere near a claim
 * about a Shenzhen facility, because it is a photograph of a different
 * continent. Replace all four with real photography before this post is used
 * as a portfolio piece.
 *
 * A sixth image was fetched and dropped rather than shipped. It was a generic
 * Western business district that looked nothing like Shenzhen, which on a post
 * about Shenzhen is worse than having one fewer picture.
 *
 * SOURCING NOTE. Every figure below is public and externally linked, and none
 * of it is a business figure about Guide in Shenzhen. references/stats.md does
 * not exist, so no price, response time or cancellation window appears here.
 *
 * One number is weaker than the rest and is flagged so nobody promotes it by
 * accident. The research spending share is attributed in the text to the South
 * China Morning Post because that page would not open through this network,
 * so it rests on the search index rather than on a read of the article. The
 * WIPO cluster ranking, the Nanshan figures and the Fortune Global 500 count
 * were all fetched and read directly.
 *
 * NO STORY AND NO OPINION, DELIBERATELY. references/stories.md owns three
 * anecdotes and all three belong to other companies, with an explicitly empty
 * shelf for this brand. references/opinions.md marks three of its four takes
 * NEEDS A NUMBER and the fourth belongs to Bluente and is about Singapore. It
 * also rules out comparing Shenzhen to another city by quality, which is the
 * exact temptation this topic creates. So the post ranks cities by measured
 * output and never by merit.
 */
export const whyShenzhenIsChinasTechCapital: Post = {
  slug: "why-shenzhen-is-chinas-tech-capital",
  title: "Why Shenzhen is China's tech capital",
  published: "2026-08-19",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the team that walks visitors through Huaqiangbei, Nanshan and the factory belt every week, and interprets in the meetings that follow.",
  readingMinutes: 12,
  metaTitle: "Why Shenzhen Is China's Tech Capital, in Real Numbers",
  metaDescription:
    "Why Shenzhen is China's tech capital, in public numbers. The world's top innovation cluster, Tencent and DJI at home, and what it means if you visit.",
  excerpt:
    "Shenzhen sits at the top of the world's innovation cluster rankings, ahead of Tokyo and Silicon Valley. Here is what the public numbers actually say, and what they mean for anyone visiting.",
  socialImage:
    "/blog/why-shenzhen-is-chinas-tech-capital/og-why-shenzhen-is-chinas-tech-capital-1200x630.jpg",
  keywords: {
    primary: "why Shenzhen is China's tech capital",
    secondary: [
      "Shenzhen innovation cluster ranking",
      "Shenzhen R&D spending",
      "tech companies headquartered in Shenzhen",
      "Shenzhen hardware supply chain",
      "Nanshan district Shenzhen tech",
      "visiting Shenzhen tech industry",
    ],
    longTail: [
      "is Shenzhen the Silicon Valley of China",
      "what companies are headquartered in Shenzhen",
      "why do hardware startups go to Shenzhen",
      "how much does Shenzhen spend on research",
      "is Shenzhen richer than Hong Kong",
      "can tourists visit tech companies in Shenzhen",
      "do you need Mandarin to do business in Shenzhen",
    ],
  },
  hero: {
    src: "/blog/why-shenzhen-is-chinas-tech-capital/shenzhen-skyline-1200.webp",
    srcSet:
      "/blog/why-shenzhen-is-chinas-tech-capital/shenzhen-skyline-800.webp 800w, /blog/why-shenzhen-is-chinas-tech-capital/shenzhen-skyline-1200.webp 1200w",
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt: "The Nanshan skyline in Shenzhen at night across Shenzhen Bay, with the lit China Resources Headquarters tower at its centre",
    width: 1200,
    height: 799,
    priority: true,
    credit: "Ben Cheung",
    creditUrl: "https://www.pexels.com/@ben-cheung-140183",
    sourceUrl:
      "https://www.pexels.com/photo/illuminated-skyscrapers-in-city-at-night-9651234/",
  },
  intro: [
    "Ask why Shenzhen is China's tech capital and the shortest honest answer is a ranking. The World Intellectual Property Organization puts Shenzhen, Hong Kong and Guangzhou top of its global innovation cluster list for 2025. Ahead of Tokyo. Ahead of San Jose and San Francisco.",
    "That is a measured position, not a slogan. What follows is what sits underneath it, which parts of the city the work actually happens in, and what any of it means if you are the one flying in.",
  ],
  sections: [
    {
      id: "cluster-ranking",
      heading: "The ranking that settles the argument",
      paragraphs: [
        "Shenzhen is usually introduced as the Silicon Valley of China. The comparison is lazy in one direction and unfair in the other, and the cluster ranking is more useful than either.",
        "WIPO measures clusters by patent filings and scientific publications inside a geographic area. On the [Global Innovation Index for 2025](https://www.wipo.int/web-publications/global-innovation-index-2025/en/global-innovation-tracker.html), Shenzhen sits inside the top cluster in the world, grouped with Hong Kong and Guangzhou. Tokyo and Yokohama are second. San Jose and San Francisco are third.",
        "Two things are worth holding onto. The ranking is regional, so Shenzhen does not earn it alone. It is also built from output nobody can talk their way into. Patents get filed or they do not.",
        "**The city was a county of farms and fishing settlements when the Special Economic Zone was drawn in 1980.** It is now third among Chinese cities by economic output, behind Shanghai and Beijing, with a population of about seventeen and a half million. We wrote about how that happened in [Shenzhen before and after](/blog/shenzhen-before-and-after).",
      ],
      facts: [
        { label: "Cluster rank", value: "First in the world, WIPO 2025" },
        { label: "Grouped with", value: "Hong Kong and Guangzhou" },
        { label: "Measured on", value: "Patent filings and research publications" },
        { label: "City output rank", value: "Third in China, after Shanghai and Beijing" },
      ],
    },
    {
      id: "rd-spending",
      heading: "What the city puts into research",
      image: {
        src: "/blog/why-shenzhen-is-chinas-tech-capital/circuit-board-components-1200.webp",
        srcSet:
          "/blog/why-shenzhen-is-chinas-tech-capital/circuit-board-components-800.webp 800w, /blog/why-shenzhen-is-chinas-tech-capital/circuit-board-components-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Close view of a bare printed circuit board covered in surface-mounted components",
        width: 1200,
        height: 800,
        credit: "Miguel Á. Padriñán",
        creditUrl: "https://www.pexels.com/@padrinan",
        sourceUrl:
          "https://www.pexels.com/photo/black-and-white-photography-of-a-mother-board-3520692/",
      },
      paragraphs: [
        "Rankings follow money. Shenzhen spends an unusual share of what it earns on research. The [South China Morning Post reported](https://www.scmp.com/tech/big-tech/article/3286417/shenzhens-soaring-rd-spending-rivals-beijing-dwarfs-hong-kong-amid-chinas-tech-drive) that the figure passed six per cent of the city's economic output for the first time in 2023, which puts it second in China on both the total and the share.",
        "For scale, most wealthy countries sit between two and three per cent. A city spending twice that is doing something deliberate.",
        "The spending is also unusually corporate. A large share comes from firms rather than universities. That changes what gets researched. Company money follows products that can be sold, so the work skews toward things you can hold.",
        "That is the honest limit of the number, and it is worth saying. Research spending measures effort, not results. It tells you what a place is trying to be.",
      ],
      facts: [
        { label: "Research share", value: "Above six per cent of city output, 2023" },
        { label: "Rank in China", value: "Second, by total and by share" },
        { label: "Mostly funded by", value: "Companies rather than universities" },
        { label: "Source", value: "South China Morning Post, linked above" },
      ],
    },
    {
      id: "companies",
      heading: "The companies that stayed",
      paragraphs: [
        "The usual way to argue a city is important is to list its head offices. Shenzhen has the [seventh-most Fortune Global 500 headquarters of any city on earth](https://en.wikipedia.org/wiki/Shenzhen). The list is short. It is also heavy.",
        "Huawei and ZTE build the network equipment. Tencent runs WeChat, which is the app the entire country conducts its daily life through. DJI makes most of the world's consumer drones. BYD builds electric cars and the batteries inside them. BGI does genome sequencing.",
        "What is striking is not the roster. It is that these firms grew up here and stayed. Moving to Beijing or Shanghai was always available. They did not take it. The supply chain was the reason.",
        "A hardware company in Shenzhen can get a part remade the same week. That advantage does not survive a relocation, and every one of these businesses knows it.",
      ],
      list: {
        intro: "The names most visitors already know, and what they actually make.",
        items: [
          "Huawei and ZTE, telecoms and network equipment",
          "Tencent, WeChat and games",
          "DJI, consumer and commercial drones",
          "BYD, electric vehicles and batteries",
          "BGI, genome sequencing",
          "Oppo, smartphones",
        ],
      },
      facts: [
        { label: "Fortune Global 500 head offices", value: "Seventh-most of any city worldwide" },
        { label: "Container port", value: "Fourth-busiest in the world" },
        { label: "Research output", value: "Eighteenth among world cities" },
      ],
    },
    {
      id: "hardware",
      heading: "Why hardware people come here and nowhere else",
      image: {
        src: "/blog/why-shenzhen-is-chinas-tech-capital/electronics-factory-line-1200.webp",
        srcSet:
          "/blog/why-shenzhen-is-chinas-tech-capital/electronics-factory-line-800.webp 800w, /blog/why-shenzhen-is-chinas-tech-capital/electronics-factory-line-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Rows of part-assembled electronic units moving along a production line",
        width: 1200,
        height: 800,
        credit: "Andrey Matveev",
        creditUrl: "https://www.pexels.com/@zeleboba",
        sourceUrl:
          "https://www.pexels.com/photo/production-line-of-computer-elements-5554948/",
      },
      paragraphs: [
        "Software can be written anywhere. Hardware cannot, and that is the whole argument for this city.",
        "The thing Shenzhen has that other places do not is density. Components, board houses, injection moulders, plating shops and assembly all sit within an hour of each other. Nothing has to be shipped between steps. A revision that takes six weeks elsewhere takes days.",
        "Huaqiangbei is the visible version of that. It is a market district of component floors where you can buy a reel of resistors, a display module and a finished power bank inside one building. Most people arrive expecting a shopping trip and leave understanding a supply chain.",
        "We wrote about visiting it, along with four other places worth the trip, in [the top 5 high-tech places to visit in Shenzhen](/blog/top-5-high-tech-places-to-visit-in-shenzhen).",
        "The catch is that this density is not a public amenity. Prices are quoted in Mandarin, quality varies floor by floor, and a factory that welcomes a serious buyer will not open its doors to a curious tourist. That gap is where most first visits go wrong.",
      ],
      facts: [
        { label: "What makes it work", value: "Components, tooling and assembly within about an hour" },
        { label: "The visible version", value: "Huaqiangbei component floors, Futian" },
        { label: "What to expect", value: "Mandarin pricing and floor-by-floor quality" },
        { label: "Confirm before you go", value: "Any factory visit needs arranging in advance" },
      ],
    },
    {
      id: "nanshan",
      heading: "Nanshan, where most of it actually sits",
      image: {
        src: "/blog/why-shenzhen-is-chinas-tech-capital/drone-technology-1200.webp",
        srcSet:
          "/blog/why-shenzhen-is-chinas-tech-capital/drone-technology-800.webp 800w, /blog/why-shenzhen-is-chinas-tech-capital/drone-technology-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A white quadcopter drone in flight against a clear sky",
        width: 1200,
        height: 800,
        credit: "Bert Christiaens",
        creditUrl: "https://www.pexels.com/@bert-christiaens-2570221",
        sourceUrl: "https://www.pexels.com/photo/white-drone-flying-5555813/",
      },
      paragraphs: [
        "Shenzhen is not evenly technical. Most of what the rankings measure happens in one district on the western side. It is the district in the photograph at the top of this page.",
        "Nanshan holds the Hi-Tech Industrial Park. Tencent, ZTE, DJI and China Resources all keep their head offices there. Its economy alone runs to around one trillion yuan a year. That is larger than the whole of Bulgaria.",
        "It is also where the universities are. Eight of Shenzhen's eleven sit in Nanshan, including the Shenzhen graduate schools of Tsinghua and Peking University, Harbin Institute of Technology and the Southern University of Science and Technology.",
        "So the city has a research district and a manufacturing belt. They are not the same place. Bao'an and Longgang carry much of the factory work. Futian is the financial and market centre. A trip planned around one district will miss the others. The drive between them is the part nobody budgets for.",
      ],
      facts: [
        { label: "District", value: "Nanshan, western Shenzhen" },
        { label: "Head offices there", value: "Tencent, ZTE, DJI, China Resources" },
        { label: "District output", value: "About one trillion yuan a year" },
        { label: "Universities", value: "Eight of the city's eleven" },
      ],
    },
    {
      id: "visiting",
      heading: "What any of this means if you are visiting",
      image: {
        src: "/blog/why-shenzhen-is-chinas-tech-capital/robotics-laboratory-1200.webp",
        srcSet:
          "/blog/why-shenzhen-is-chinas-tech-capital/robotics-laboratory-800.webp 800w, /blog/why-shenzhen-is-chinas-tech-capital/robotics-laboratory-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "An industrial robotic arm on a workbench in an engineering laboratory",
        width: 1200,
        height: 800,
        credit: "Diego Martinez",
        creditUrl: "https://www.pexels.com/@diego-martinez-1522505274",
        sourceUrl:
          "https://www.pexels.com/photo/advanced-robotic-arm-in-mexico-city-laboratory-29320998/",
      },
      paragraphs: [
        "None of the above is visitable in the way a museum is. There is no tour of Huawei. DJI does not run an open day. The interesting parts of this city are workplaces. Workplaces need a reason to let you in.",
        "What is open is the layer underneath. The component markets trade with anybody. The observation deck on the four hundredth metre shows you the whole build in one look. Robotaxis carry ordinary passengers. Those are real and they are bookable by a stranger.",
        "The rest runs on introductions. A factory will host a buyer with a specification and a translator, and will politely decline the same person without either. That is not gatekeeping so much as a working day being protected.",
        "A [private tour guide in Shenzhen](/private-tour-guide-shenzhen) earns the money when you have three days, six half-formed leads, no Mandarin and no way to tell a trading company from the factory it claims to be. That is a real problem and it is the one we solve. If it is yours, [tell us the dates](/inquiry).",
      ],
      facts: [
        { label: "Open to anybody", value: "Component markets, observation deck, robotaxis" },
        { label: "Needs arranging", value: "Factory visits, supplier meetings, campus access" },
        { label: "Language", value: "Mandarin for pricing and negotiation" },
        { label: "Worth checking", value: "Access and opening arrangements change, confirm before travelling" },
      ],
    },
  ],
  faqs: [
    {
      question: "Is Shenzhen the Silicon Valley of China?",
      answer:
        "It is the closest thing, but the comparison hides the difference. Silicon Valley is built on software and venture capital, while Shenzhen is built on hardware and supply chain. WIPO ranks the Shenzhen, Hong Kong and Guangzhou cluster first in the world for innovation output, ahead of the San Jose and San Francisco cluster.",
    },
    {
      question: "What companies are headquartered in Shenzhen?",
      answer:
        "Huawei, Tencent, ZTE, DJI, BYD, BGI and Oppo all have their head offices in the city. Shenzhen has the seventh-most Fortune Global 500 headquarters of any city in the world. Most of the technology names sit in Nanshan district on the western side.",
    },
    {
      question: "Why do hardware startups go to Shenzhen?",
      answer:
        "Because everything a physical product needs is within about an hour of everything else. Components, board manufacture, tooling, moulding and assembly are all local, so a design revision takes days instead of weeks. That speed is the single reason companies stay after they can afford to leave.",
    },
    {
      question: "How much does Shenzhen spend on research?",
      answer:
        "More than six per cent of the city's economic output, which passed that mark for the first time in 2023 according to the South China Morning Post. That is roughly double what most wealthy countries spend. An unusually large share of it comes from companies rather than from universities.",
    },
    {
      question: "Is Shenzhen richer than Hong Kong?",
      answer:
        "By total economic output, yes. Shenzhen overtook Hong Kong in 2022 and is now third among Chinese cities behind Shanghai and Beijing. Hong Kong still has much higher output per person, so the two cities are wealthy in different ways.",
    },
    {
      question: "Can tourists visit tech companies in Shenzhen?",
      answer:
        "Generally not. Huawei, Tencent and DJI do not run public tours, and factories host buyers rather than visitors. What is open to anybody is the component markets, the observation deck and the robotaxi network. Anything beyond that needs arranging in advance and a genuine reason for the meeting.",
    },
    {
      question: "Do you need Mandarin to do business in Shenzhen?",
      answer:
        "For sightseeing, no. For buying, yes. Prices in the component markets are quoted in Mandarin and the number a local hears is often not the number offered in English. Technical meetings also turn on vocabulary that general interpreters guess at, which is where a specialist interpreter pays for itself.",
    },
  ],
};
