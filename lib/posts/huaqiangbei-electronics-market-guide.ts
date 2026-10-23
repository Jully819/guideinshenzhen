import type { Post } from "@/lib/posts";

/**
 * PHOTOGRAPHY NOTE. Pexels has no picture of Huaqiangbei, so none of these
 * show it. No caption names the district and every alt text describes only
 * what is in the frame.
 *
 *   hero             A black and white close-up of a circuit board. Generic.
 *   gadget-shop      A shopfront of small electrical parts. The sign reads "NUR
 *                    ELEKTRIK", so this is a Turkish street, most likely in
 *                    Istanbul. It sits above the market buildings section as a
 *                    picture of the kind of counter, not of the place.
 *   shenzhen-street  Traffic past the curved green roof of the Shenzhen Civic
 *                    Center in Futian. Real Shenzhen, but not Huaqiangbei. It
 *                    sits in the getting there section because Huaqiangbei is
 *                    in the same district of the city.
 *   phone-repair     Disassembled smartphone parts on a repair mat. Generic.
 *   qr-payment       A customer holding a phone with a QR code over a payment
 *                    terminal. The receipt printer shows an English menu, so
 *                    the setting is a restaurant counter. Generic.
 *   chargers-cables  A power bank and USB cables on white. Studio shot.
 *
 * FIVE FETCHED AND THROWN OUT. A search for an electronics market returned a
 * flea market table of old tools with a Portuguese label on a charger. A
 * search for bargaining returned two vendors at a Beijing antiques market. Both
 * would have read as Huaqiangbei. A phone shop search returned what looks like
 * an Apple Store interior, dropped for the branding. A soldering bench and a
 * box of numbered bins of nuts were dropped as off topic.
 *
 * VOLATILE FACTS ARE KEPT OUT OF THE FACTS BLOCKS. No metro line numbers, no
 * opening hours stated as fact, no prices, no floor numbers. Sources disagree
 * on the line numbers at Huaqiang North, Huaqiang Road and Huaxin, and on
 * opening hours, so the post gives station names and says to confirm on the day.
 *
 * SOURCING. Competitor structure was read from epicsourcing.co, fulfillbot.com
 * and supplyia.com, with wanderinchina.com as a cross-check. The first result,
 * globalsources.com, returned HTTP 403 and was not read. Building specialities
 * are stated only where at least two of those agree. Three claims rest on one
 * source and are attributed in the text. The 1979 history and the 70 to 80
 * percent Chaoshan estimate come from Sixth Tone. The power bank rule comes from
 * secondary reports because the CAAC notice itself could not be found, and the
 * post says reports. The Shenzhen government figure of 22 specialised markets
 * and 1.45 square kilometres was NOT used, because that page could not be
 * fetched to confirm it. "More than twenty" is the softer claim that four
 * sources share.
 *
 * THE MANDARIN. The terms and pinyin in the price tag section are standard
 * trade vocabulary written from the writer's knowledge, not from a source. A
 * native speaker on the team should read that list before it ships.
 *
 * NO BUSINESS FIGURES. references/stats.md covers another business, so there is
 * no price, response time or cancellation window anywhere in this post. The
 * description of what a guide does comes from /business-trip and lib/content.ts.
 *
 * NO STORY AND NO OPINION. The anecdotes and takes in references/ belong to
 * other companies or lack a number. Nothing here is borrowed.
 *
 * NO "WHO THIS IS NOT FOR" SECTION. The blog skill asks for one. CLAUDE.md and
 * voice.md settle it the other way, as of 3 October 2026, and that wins.
 */
export const huaqiangbeiElectronicsMarketGuide: Post = {
  slug: "huaqiangbei-electronics-market-guide",
  title: "Huaqiangbei electronics market guide",
  published: "2026-10-23",
  author: "Guide in Shenzhen",
  authorBio:
    "Written by the team that takes visitors through Huaqiangbei and the other Shenzhen electronics markets, and hears the quote in Mandarin.",
  readingMinutes: 11,
  metaTitle: "Huaqiangbei Electronics Market Guide for First-Time Buyers",
  metaDescription:
    "A Huaqiangbei electronics market guide. Which building sells what, how to get there, how to bargain, and the Mandarin on the price tag. Ask us to come along.",
  excerpt:
    "Which building sells what, how to get there, how to bargain, and what the Mandarin on the price tag means. The part most guides to Huaqiangbei skip.",
  socialImage:
    "/blog/huaqiangbei-electronics-market-guide/og-huaqiangbei-electronics-market-guide-1200x630.jpg",
  keywords: {
    primary: "Huaqiangbei electronics market guide",
    secondary: [
      "what is Huaqiangbei",
      "Huaqiangbei market buildings",
      "how to get to Huaqiangbei",
      "bargaining in Huaqiangbei",
      "Huaqiangbei Mandarin phrases for buyers",
      "testing electronics before buying in Shenzhen",
      "power banks on flights in China",
      "paying at Huaqiangbei",
      "Huaqiangbei shopping guide with a translator",
    ],
    longTail: [
      "can tourists buy at Huaqiangbei",
      "what time does Huaqiangbei open",
      "how long to spend at Huaqiangbei",
      "do I need a translator at Huaqiangbei",
      "can I use WeChat Pay or Alipay at Huaqiangbei",
      "can I take a power bank on a flight in China",
      "how to get to Huaqiangbei from Hong Kong",
    ],
  },
  hero: {
    src: "/blog/huaqiangbei-electronics-market-guide/electronic-components-1200.webp",
    srcSet:
      "/blog/huaqiangbei-electronics-market-guide/electronic-components-800.webp 800w, /blog/huaqiangbei-electronics-market-guide/electronic-components-1200.webp 1200w",
    sizes: "(min-width: 44rem) 44rem, 100vw",
    alt: "Black and white close-up of a circuit board covered in small electronic components",
    width: 1200,
    height: 798,
    priority: true,
    credit: "Miguel Á. Padriñán",
    creditUrl: "https://www.pexels.com/@padrinan",
    sourceUrl:
      "https://www.pexels.com/photo/black-and-white-photography-of-a-mother-board-3520692/",
  },
  intro: [
    "This Huaqiangbei electronics market guide comes down to three decisions. Pick the building that sells what you want. Go on a weekday, once the stalls have opened. Agree the exact model, condition and quantity before you talk price. The rest is detail, and the detail is below.",
    "The sellers talk fast, the quotes are spoken, and the price moves with the question. So this guide covers the buildings, the route, the bargaining and the words on the price tag. That last part is the one most guides skip.",
  ],
  sections: [
    {
      id: "what-is-huaqiangbei",
      heading: "What Huaqiangbei is, and who shops there",
      paragraphs: [
        "Huaqiangbei is a stretch of Futian built around electronics. It started in 1979, when Guangdong moved three military factories from the mountainous north to Shenzhen. The merged company was called Huaqiang. A road split its site, and the northern part became Huaqiangbei, which means Huaqiang North. [Sixth Tone tells that history in full](https://www.sixthtone.com/news/1018763).",
        "Today it is mostly wholesale. By most counts there are more than twenty specialised markets, selling components, finished gadgets, phone parts and used devices. The buyers are repair technicians, hardware teams and importers. A visitor with one cable to replace is welcome too. You will just hear a higher number than someone buying a hundred.",
        "Sixth Tone estimates that 70 to 80 percent of the merchants come from the Chaoshan region of eastern Guangdong, and that their own dialect is commonly heard in the market. If the stall next door is not speaking Mandarin, that is usually why.",
      ],
      facts: [
        { label: "District", value: "Futian, around Huaqiang North Road" },
        { label: "Sells", value: "Components, gadgets, phone parts and used devices" },
        { label: "Buyers", value: "Single units and wholesale lots, at different prices" },
        { label: "Language", value: "Mandarin to customers, often another dialect between stalls" },
      ],
    },
    {
      id: "market-buildings",
      heading: "Which Huaqiangbei market building sells what",
      image: {
        src: "/blog/huaqiangbei-electronics-market-guide/gadget-shop-1200.webp",
        srcSet:
          "/blog/huaqiangbei-electronics-market-guide/gadget-shop-800.webp 800w, /blog/huaqiangbei-electronics-market-guide/gadget-shop-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A shopfront with glass cases of small electrical parts and a Turkish shop sign",
        width: 1200,
        height: 800,
        credit: "Onur",
        creditUrl: "https://www.pexels.com/@monurblc",
        sourceUrl:
          "https://www.pexels.com/photo/vintage-electrical-shop-front-with-various-products-34128760/",
      },
      paragraphs: [
        "Choose the building first. Each one has a speciality, and the floors above the ground floor specialise again. Walking into the wrong building costs you an hour, not money.",
        "These are the five that the guides to the district agree on. SEG Electronics Market is the place for components, boards and computer parts. Huaqiang Electronics World mixes components with small consumer gadgets. Yuanwang Digital Mall is for phones, tablets and their parts. Feiyang Times is where used devices and repair parts are sold. Longsheng is for cables, chargers and accessories.",
        "Floors change. Stalls move, tenants leave, and a floor number from a social media post is not a directory. Read the board by the lift when you arrive. Guides report that the ground floor of a large building is the most competitive, and that the upper floors narrow down to things like drone parts, security cameras and phone repair tools.",
        "Building names also come in two or three English spellings. Save the Chinese name from a map app, not from a blog, and show it to a driver.",
      ],
      facts: [
        { label: "Components and computer parts", value: "SEG Electronics Market" },
        { label: "Components and small gadgets", value: "Huaqiang Electronics World" },
        { label: "Phones, tablets and parts", value: "Yuanwang Digital Mall" },
        { label: "Used devices and repair parts", value: "Feiyang Times" },
        { label: "Cables, chargers and accessories", value: "Longsheng" },
        { label: "Always", value: "Read the building directory on arrival, because floors move" },
      ],
    },
    {
      id: "getting-there",
      heading: "How to get to Huaqiangbei",
      image: {
        src: "/blog/huaqiangbei-electronics-market-guide/shenzhen-street-1200.webp",
        srcSet:
          "/blog/huaqiangbei-electronics-market-guide/shenzhen-street-800.webp 800w, /blog/huaqiangbei-electronics-market-guide/shenzhen-street-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Traffic blurring past the curved green roof of the Shenzhen Civic Center in Futian",
        width: 1200,
        height: 800,
        credit: "Yuko Photography",
        creditUrl: "https://www.pexels.com/@yukophotography",
        sourceUrl:
          "https://www.pexels.com/photo/dynamic-cityscape-of-shenzhen-civic-center-36818919/",
      },
      paragraphs: [
        "Take the metro. Huaqiang Road and Huaqiang North are the two stations people use, and either puts you inside the district. The exit matters more than the station. The district is wide, and a wrong exit adds a long walk. Pick the exit for your first building on a map app before you go down the stairs.",
        "In a taxi, show the driver 华强北. It reads Huáqiáng Běi.",
        "From Hong Kong, both the Luohu and Futian crossings are a metro ride from the district. Our [Hong Kong to Shenzhen border crossing guide](/blog/hong-kong-shenzhen-border-crossing-guide) says which crossing suits where you are staying. From Shenzhen Bao'an airport, allow 40 to 60 minutes by most accounts, by taxi or metro.",
        "Hours differ by building and by stall. Most buildings open around ten and close in the evening, and some stalls open later. Late morning to late afternoon is the safe window. Weekdays are quieter than weekends. Confirm the hours for your building on the day.",
      ],
      facts: [
        { label: "Stations", value: "Huaqiang Road and Huaqiang North" },
        { label: "Taxi", value: "Show the driver 华强北" },
        { label: "From Bao'an airport", value: "40 to 60 minutes by most accounts" },
        { label: "Safe window", value: "Late morning to late afternoon, on a weekday" },
        { label: "Always", value: "Confirm the hours for your building on the day" },
      ],
    },
    {
      id: "bargaining",
      heading: "How bargaining works in Huaqiangbei",
      paragraphs: [
        "Bargaining is expected. It is not a performance. It is a quote, a counter and a decision, and it goes better when both sides are quoting the same thing.",
        "So fix the product first. Say the exact model, the quantity, the condition and what is in the box. A cheaper price at the next stall often means fewer parts or plainer packaging. It is rarely a better deal.",
        "Then ask for the price at your real quantity. One unit and a hundred units are different questions. Individual buyers usually hear a higher number than wholesale buyers, so ask for the single-unit price and the lot price separately. The gap tells you where you stand.",
        "Do not buy at the first counter. Visit two or three, and write each quote down. A phone calculator or a typed message is the usual way to trade numbers.",
        "There is no reliable percentage off. Any fixed figure you read online is a guess. Accessories leave more room than phones and laptops, where you should check the official price first.",
        "If a seller will not move, stop. Pushing a stall that has quoted its floor wastes both your time. And walk away from any claim you cannot check.",
      ],
      facts: [
        { label: "Fix first", value: "Model, quantity, condition and what is in the box" },
        { label: "Ask twice", value: "The single-unit price, then the price at your quantity" },
        { label: "Compare", value: "Two or three stalls, with each quote written down" },
        { label: "Walk away", value: "When a claim cannot be checked" },
      ],
    },
    {
      id: "price-tag-words",
      heading: "The Mandarin on the price tag, and what it means",
      paragraphs: [
        "A translation app gets you through the sentence. The trade words are where the price is hiding. A handful of them cover most of what a seller says about a product.",
        "Learn these and a quote starts to mean something. You will see them on tags and hear them across the counter.",
      ],
      list: {
        intro: "The words worth knowing, with the pinyin to say them.",
        items: [
          "现货, xiànhuò, means in stock now. Anything else may mean waiting.",
          "原装, yuánzhuāng, means original. Ask who says so, and whether it comes with the box.",
          "副厂, fùchǎng, means made by another factory. It is a third-party part, priced below the original, and it should be.",
          "翻新, fānxīn, means refurbished. It is a used unit that has been repaired and cleaned.",
          "国行, guóxíng, means the China-market version. 港版, gǎngbǎn, is the Hong Kong version. The version matters for warranty and for network bands.",
          "含税, hánshuì, means tax included. Ask whether the number you heard is the one that includes it.",
          "起订量, qǐdìngliàng, means minimum order quantity. Below it you pay more, or get a no.",
          "样品, yàngpǐn, means sample. A sample price is not the price of the order.",
          "批发价, pīfājià, is the wholesale price. 零售价, língshòujià, is the retail price. Know which one you were quoted.",
        ],
      },
      facts: [
        { label: "Can it be cheaper", value: "能便宜点吗, néng piányi diǎn ma" },
        { label: "May I test it", value: "可以试一下吗, kěyǐ shì yíxià ma" },
        { label: "Write it down", value: "A typed number on a screen cannot be misheard" },
      ],
    },
    {
      id: "testing-before-you-pay",
      heading: "Testing electronics before you pay",
      image: {
        src: "/blog/huaqiangbei-electronics-market-guide/phone-repair-1200.webp",
        srcSet:
          "/blog/huaqiangbei-electronics-market-guide/phone-repair-800.webp 800w, /blog/huaqiangbei-electronics-market-guide/phone-repair-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "Disassembled smartphone parts and small tools laid out on a blue repair mat",
        width: 1200,
        height: 800,
        credit: "Fotografia Lui Vlad",
        creditUrl: "https://www.pexels.com/@fotografia-lui-vlad-1445510816",
        sourceUrl:
          "https://www.pexels.com/photo/disassembled-smartphone-on-repair-workbench-31862950/",
      },
      paragraphs: [
        "A market's reputation does not certify the unit in your hand. Two chargers can look the same and differ in output, protocol support and build. Test the one you are given, not the one on display.",
        "Ask before you test or photograph stock. Not every counter has equipment for a proper test, and some will let you plug in your own.",
        "Be suspicious of a famous brand priced far below everywhere else. Counterfeits are common, and they rarely come with after-sales support. For components, ask for the manufacturer's documents with lot numbers, and keep the sample you tested so you can compare it with the order.",
      ],
      list: {
        intro: "For a used or refurbished phone, check these before you hand over money.",
        items: [
          "The screen, the cameras, the speakers and the charging port, one at a time.",
          "The serial number or IMEI, written onto the receipt.",
          "That the previous owner's account has been removed. For an iPhone, ask the seller to erase it and sign out of the old Apple account in front of you.",
          "Which market's version it is, and what that means for the warranty.",
        ],
      },
      facts: [
        { label: "Chargers", value: "Read the voltage and wattage on the label and match your device" },
        { label: "Storage", value: "Run a full write and read test on cards and drives" },
        { label: "Cameras", value: "Test focus, zoom, flash and the card type" },
        { label: "Keep", value: "The tested sample, for comparison with the order" },
      ],
    },
    {
      id: "power-banks-and-batteries",
      heading: "Taking power banks and batteries home",
      image: {
        src: "/blog/huaqiangbei-electronics-market-guide/chargers-cables-1200.webp",
        srcSet:
          "/blog/huaqiangbei-electronics-market-guide/chargers-cables-800.webp 800w, /blog/huaqiangbei-electronics-market-guide/chargers-cables-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A white power bank with blue charging cables on a white background",
        width: 1200,
        height: 800,
        credit: "Markus Winkler",
        creditUrl: "https://www.pexels.com/@markus-winkler-1430818",
        sourceUrl:
          "https://www.pexels.com/photo/white-power-bank-and-blue-coated-wires-4072683/",
      },
      paragraphs: [
        "Buy a power bank at Huaqiangbei and your trip home may start at airport security. Reports say that since 28 June 2025, Chinese aviation authorities have barred power banks without a clear 3C mark, or from recalled models, on mainland domestic flights. [Techlicious explains the rule](https://www.techlicious.com/tip/flying-within-china-your-power-bank-needs-a-3c-label/). Reports differ on how it applies to international flights, so check your airline before you pack.",
        "Look for the 3C mark printed on the power bank itself. If it is missing or unclear, do not count on carrying it.",
        "Batteries also change how a parcel ships. Declare them accurately. Get the carrier, the declared contents and the insurance in writing before you pay for shipping, and check that your hotel will accept the parcel.",
      ],
      facts: [
        { label: "Look for", value: "A clear 3C mark on the power bank" },
        { label: "Check", value: "Your airline's rules before you pack" },
        { label: "Ship only with", value: "A written quote naming carrier, contents and insurance" },
      ],
    },
    {
      id: "paying-and-receipts",
      heading: "Paying at Huaqiangbei, and what to get in writing",
      image: {
        src: "/blog/huaqiangbei-electronics-market-guide/qr-payment-1200.webp",
        srcSet:
          "/blog/huaqiangbei-electronics-market-guide/qr-payment-800.webp 800w, /blog/huaqiangbei-electronics-market-guide/qr-payment-1200.webp 1200w",
        sizes: "(min-width: 44rem) 44rem, 100vw",
        alt: "A customer holding a phone with a QR code over a payment terminal at a counter",
        width: 1200,
        height: 800,
        credit: "iMin Technology",
        creditUrl: "https://www.pexels.com/@imin-technology-276315592",
        sourceUrl:
          "https://www.pexels.com/photo/a-close-up-shot-of-a-person-scanning-a-qr-code-12935051/",
      },
      paragraphs: [
        "Payment acceptance varies by stall. Cash in renminbi is widely accepted, and the mobile wallets are common. Bring one method that works for visitors and a backup.",
        "Foreign cards can be linked to the wallets, and you do not need a Chinese bank account, according to the [official guidance for overseas visitors](https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html). Our [guide to paying in China as a foreigner](/blog/how-to-pay-in-china-as-a-foreigner) covers the setup, including the verification step. Do it before you arrive, not in the aisle.",
        "Before you pay a deposit, check that the name on the payment code matches the seller. A code on the counter that belongs to someone else is not your seller.",
        "Then ask for a receipt that names the seller, the item, its condition and the price. Confirm what is included, and whether tax documents are available. Return policies vary stall by stall, so ask before you pay.",
      ],
      facts: [
        { label: "Bring", value: "One payment method that works for visitors, and a backup" },
        { label: "Check", value: "The payee name matches the seller before any deposit" },
        { label: "Receipt", value: "Seller, item, condition and price" },
      ],
    },
    {
      id: "with-a-guide",
      heading: "Shopping Huaqiangbei with a Mandarin-speaking guide",
      paragraphs: [
        "A whole day inside one electronics market is a normal request for our guides. The job is the same each time. Hear the real price. Say your model number in Mandarin. Write down what was agreed while it can still be checked.",
        "Our guides speak English and Mandarin. If you send photos, model numbers or datasheets before you arrive, the terminology is prepared from them. The [business trip support](/business-trip) page covers sourcing and supplier visits. If you want Huaqiangbei as part of a wider day, the [private tour guide in Shenzhen](/private-tour-guide-shenzhen) page shows what that looks like.",
        "When you know what you want to buy, [send us the dates](/inquiry) and the list.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can tourists buy at Huaqiangbei?",
      answer:
        "Yes. Most stalls will sell a single unit, and many sell to individual visitors every day. You will usually hear a higher price than a wholesale buyer, so ask for the single-unit price and the lot price separately.",
    },
    {
      question: "What time does Huaqiangbei open?",
      answer:
        "It depends on the building and the stall. Most buildings open around ten and close in the evening, and some stalls open later. Late morning to late afternoon is the safe window, and you should confirm the hours for your building on the day.",
    },
    {
      question: "How long should I spend at Huaqiangbei?",
      answer:
        "Half a day covers one building and a walk down the street. Allow a full day if you are comparing several buildings or testing a lot of units. A day inside a single market is a normal request for our guides.",
    },
    {
      question: "Do I need a translator at Huaqiangbei?",
      answer:
        "A translation app is enough for a simple purchase. A Mandarin speaker earns their place when the specification, the quantity or a deposit is involved. The trade words on the tag, like original, refurbished and tax included, are where a misunderstanding costs money.",
    },
    {
      question: "Can I use WeChat Pay or Alipay at Huaqiangbei?",
      answer:
        "Acceptance varies by stall, but the mobile wallets are common and cash in renminbi is widely accepted. Foreign cards can be linked to the wallets without a Chinese bank account. Set it up before you arrive and carry a backup.",
    },
    {
      question: "Can I take a power bank on a flight in China?",
      answer:
        "Reports say that since 28 June 2025, power banks without a clear 3C mark, or from recalled models, are barred on mainland domestic flights. Reports differ on international flights. Check the mark on the power bank and your airline's rules before you pack.",
    },
    {
      question: "How do I get to Huaqiangbei from Hong Kong?",
      answer:
        "Cross at Luohu or Futian and take the metro to Huaqiang Road or Huaqiang North. Choose the station exit for your first building before you go down. Our border crossing guide covers which crossing to use.",
    },
  ],
};
