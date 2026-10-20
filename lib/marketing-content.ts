import { guides } from "@/lib/guides"
import { industries, industryBySlug, relatedIndustries } from "@/lib/industries"
import { qrCityHub, qrCityPages, qrCityPath } from "@/lib/qr-city-pages"

export type { IndustryPage } from "@/lib/industries"
export { industries, industryBySlug, relatedIndustries }

export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: "Does every customer see the public review links?",
    answer:
      "Yes. Google, Facebook, and Yelp stay on the page for every rating. Private feedback is an additional box on that page. It does not replace those links, and ReputationFlow does not filter or delay public reviews.",
  },
  {
    question: "Will this post reviews for me?",
    answer:
      "No. Customers write and publish reviews on Google, Facebook, or Yelp themselves. ReputationFlow gives them a short path to those pages and stores any private note they choose to send you.",
  },
  {
    question: "What do I need before I can ask for reviews?",
    answer:
      "A Google Business Profile, and the review link or Place ID from the Ask for reviews screen. Facebook and Yelp links are optional. You can generate the Google link with the free tool on this site.",
  },
  {
    question: "Is the Starter plan actually free?",
    answer:
      "Yes. Starter includes one review link, a QR code, and your latest feedback. Professional is $20 per month for email requests, full history, CSV export, and AI response drafts. There is no trial period and no setup fee. You can cancel Professional in the Stripe customer portal.",
  },
  {
    question: "Can I offer a discount for a review?",
    answer:
      "Do not. Google’s policies prohibit incentives for reviews. ReputationFlow does not include coupon-for-review templates.",
  },
  {
    question: "Do you import my existing Google reviews?",
    answer:
      "No. The dashboard shows feedback customers submit through your ReputationFlow link. Open Google, Facebook, or Yelp directly to read reviews that were published there.",
  },
]

export interface ComparisonRow {
  topic: string
  theirs: string
  ours: string
}

export interface ComparisonPage {
  slug: string
  name: string
  title: string
  description: string
  summary: string
  /** Month and year the public source page was read. Prices change after this. */
  checked: string
  sourceUrl: string
  sourceLabel: string
  rows: ComparisonRow[]
  theyAre: string[]
  weAre: string[]
  chooseThem: string
  chooseUs: string
  faqs: FaqItem[]
}

export const comparisons: ComparisonPage[] = [
  {
    slug: "podium",
    name: "Podium",
    title: "Podium alternative for small businesses",
    description:
      "Podium bundles reviews with texting, phones, chat, and payments, and its pricing page says to talk to sales. ReputationFlow is $20 a month for the review ask.",
    summary:
      "Podium is a customer-communication platform. Its public pricing page lists reviews, phones, website chat, an inbox, payments, and text marketing, and says to talk to sales for plan details. It does not list a monthly price. ReputationFlow does not replace your phone or your register. It is the review link, the QR code, and optional email requests.",
    checked: "October 2026",
    sourceUrl: "https://www.podium.com/pricing",
    sourceLabel: "Podium pricing page",
    rows: [
      {
        topic: "Price",
        theirs: "The pricing page says to talk to their sales team. No monthly price is listed there.",
        ours: "Starter is free. Professional is $20 a month through Stripe. No setup fee.",
      },
      {
        topic: "What you are buying",
        theirs: "Review requests by text, plus phones, website chat, a shared inbox, payments, and text marketing.",
        ours: "A review page, a QR code, and email requests on Professional. No texting, phones, chat, or payments.",
      },
      {
        topic: "How you cancel",
        theirs: "Not stated as a self-serve portal on the pricing page we checked. Ask them before you sign.",
        ours: "Cancel Professional in the Stripe customer portal. Access lasts through the period already paid.",
      },
    ],
    theyAre: [
      "A platform for local businesses that want texts, calls, webchat, and payments in the same login as reviews.",
      "Sold through a sales conversation. The public pricing page does not show a dollar amount.",
      "A fit when the review ask is only one piece of a larger inbox and payments product.",
    ],
    weAre: [
      "One page that shows Google, Facebook, and Yelp to every customer, plus an optional private note.",
      "A free Starter plan with no card. Professional is $20 a month and there is no extra trial.",
      "Email requests only, and only when you choose the customer. You can still text the link from your own phone.",
    ],
    chooseThem: "Choose Podium if you want business texting, phones, website chat, or payments together with reviews.",
    chooseUs:
      "Choose ReputationFlow if you already have a phone and a way to get paid, and you want a published $20 price for the review ask.",
    faqs: [
      {
        question: "Is ReputationFlow cheaper than Podium?",
        answer:
          "Podium’s pricing page, checked in October 2026, does not list a monthly price. It tells you to talk to sales. ReputationFlow Professional is $20 per month on this site, and Starter is free. Compare that published price with the quote Podium gives you.",
      },
      {
        question: "Does ReputationFlow include the Podium inbox, phones, or payments?",
        answer:
          "No. Those are Podium products. ReputationFlow does not text customers, take phone calls, run website chat, or accept payments.",
      },
      {
        question: "Can I try the review link without a sales call?",
        answer:
          "Yes. Create a free Starter account, or use the free Google review QR code generator on this site with no account. Choosing Professional opens Stripe checkout as soon as the account exists. There is no trial on top of Starter.",
      },
    ],
  },
  {
    slug: "birdeye",
    name: "Birdeye",
    title: "Birdeye alternative for small businesses",
    description:
      "Birdeye is a multi-location reputation platform and does not list a flat monthly price. ReputationFlow is $20 a month for a review link and QR code.",
    summary:
      "Birdeye’s site describes the product as a platform for multi-location brands, including review generation and listings. The pricing page groups plans by location count, from 1–3 locations up to 1,000+, and says you pay for what you deploy under one contract. It does not list a flat monthly price. ReputationFlow is a single published price for the review ask.",
    checked: "October 2026",
    sourceUrl: "https://birdeye.com/pricing/",
    sourceLabel: "Birdeye pricing page",
    rows: [
      {
        topic: "Price",
        theirs: "Organized by location count. The public pricing page does not list a flat monthly dollar amount.",
        ours: "Starter is free. Professional is $20 a month, not a per-location quote.",
      },
      {
        topic: "What you are buying",
        theirs:
          "A multi-location platform. The homepage describes review generation and listings work across locations.",
        ours: "A review link, a QR code, optional private feedback, and email requests. No listings management.",
      },
      {
        topic: "Contract",
        theirs: "The pricing page says one platform and one contract.",
        ours: "Month to month through Stripe. No setup fee. Cancel in the customer portal.",
      },
    ],
    theyAre: [
      "Built for brands with many locations. The homepage addresses multi-location teams.",
      "Priced by how many locations you deploy, with the public page stopping short of a single monthly number.",
      "A fit when listings, reviews, and reporting need to live in one large account.",
    ],
    weAre: [
      "A review request page and QR code you can share the same day.",
      "The same public review links for every customer. A private note is an extra box, not a replacement.",
      "No editing of your Google Business Profile, photos, or hours. You still do that in Google.",
    ],
    chooseThem: "Choose Birdeye if you need listings and review operations for many locations under one contract.",
    chooseUs:
      "Choose ReputationFlow if you run one shop, or a few, and the job is getting customers to your Google review page.",
    faqs: [
      {
        question: "Why doesn’t this page quote a Birdeye dollar amount?",
        answer:
          "The Birdeye pricing page we checked in October 2026 groups plans by location count and does not show a flat monthly price. Quoting a number we did not see would be a guess. ReputationFlow’s own price is on this site: Starter is free, and Professional is $20 per month.",
      },
      {
        question: "Does ReputationFlow manage map listings?",
        answer:
          "No. It does not edit your Google Business Profile, post photos, or sync hours. It handles the review link, the QR code, and optional private notes.",
      },
      {
        question: "Is there a free way to make the QR code before I pick a product?",
        answer:
          "Yes. The Google review QR code generator on this site makes a printable code with no account. A free Starter account keeps that link on your own review page.",
      },
    ],
  },
  {
    slug: "nicejob",
    name: "NiceJob",
    title: "NiceJob alternative for small businesses",
    description:
      "NiceJob lists Starter at $75 a month and Pro at $125 for SMS and email review marketing. ReputationFlow is $20 a month, with a free plan and no texts.",
    summary:
      "NiceJob is reputation-marketing software for service businesses. On the pricing page we checked, Starter is $75 per month and Pro is $125 per month, in US dollars. Both include SMS and email review requests. Pro adds rebooking, referrals, email broadcasts, AI replies, and competitor tracking. ReputationFlow is narrower and cheaper: a free review link, and $20 a month when you want email requests.",
    checked: "October 2026",
    sourceUrl: "https://get.nicejob.com/pricing",
    sourceLabel: "NiceJob pricing page",
    rows: [
      {
        topic: "Price",
        theirs: "Starter $75 per month. Pro $125 per month. Both figures are labeled USD on their pricing page.",
        ours: "Starter is free, with no card. Professional is $20 per month.",
      },
      {
        topic: "How requests go out",
        theirs: "SMS and email review requests are listed on Starter and Pro.",
        ours: "Email on Professional, sent when you choose the customer. No SMS. Text the link from your own phone if you want.",
      },
      {
        topic: "Trial and contract",
        theirs: "The page says no contract and cancel anytime. The FAQ says billing starts when a 14-day trial ends.",
        ours: "No trial on top of the free plan. Cancel Professional in the Stripe customer portal.",
      },
    ],
    theyAre: [
      "Review marketing for local and home-service businesses, including SMS and email asks.",
      "A published price: $75 a month to start, $125 a month for the Pro plan, as of October 2026.",
      "Extra Pro tools for referrals, repeat bookings, website review widgets, and competitor tracking.",
    ],
    weAre: [
      "A free Starter link and QR code you can print the same day.",
      "The same Google, Facebook, and Yelp buttons for every customer. Private feedback is an extra box.",
      "Reply drafts on Professional that you edit and paste yourself. Nothing is posted for you.",
    ],
    chooseThem:
      "Choose NiceJob if you want SMS campaigns, review widgets, referrals, or the other marketing tools on their Pro plan.",
    chooseUs:
      "Choose ReputationFlow if a review link, a QR code, and optional email are enough, and you want the lower published price.",
    faqs: [
      {
        question: "Are the NiceJob prices on this page still current?",
        answer:
          "They matched get.nicejob.com/pricing when we read it in October 2026: Starter $75 per month and Pro $125 per month, in US dollars. Check that page before you buy. ReputationFlow Professional is $20 per month, and Starter is free.",
      },
      {
        question: "Does ReputationFlow send review texts the way NiceJob does?",
        answer:
          "No. NiceJob lists SMS and email requests on its paid plans. ReputationFlow does not text customers. On Professional you can email the link when you pick the customer.",
      },
      {
        question: "Will ReputationFlow import the reviews already on Google?",
        answer:
          "No. The dashboard shows notes customers submit through your ReputationFlow link. Reviews published on Google stay on Google.",
      },
    ],
  },
  {
    slug: "grade-us",
    name: "Grade.us",
    title: "Grade.us alternative for a small shop",
    description:
      "Grade.us is review software agencies white-label for clients. ReputationFlow is $20 a month for a shop that wants the review link and QR code itself.",
    summary:
      "Grade.us describes itself as the review management platform for marketing agencies. The product can be white-labeled, and the pricing page is built around seats, locations, and an agency plan. A shop owner who only needs to ask for reviews is a different buyer. ReputationFlow is that simpler tool, at a published $20 a month.",
    checked: "October 2026",
    sourceUrl: "https://www.grade.us/home/plans/",
    sourceLabel: "Grade.us pricing page",
    rows: [
      {
        topic: "Who it is for",
        theirs:
          "The homepage calls it the review platform for marketing agencies, with white-label options for client work.",
        ours: "The owner of the shop uses it. There is no white-label or agency reseller plan.",
      },
      {
        topic: "Price",
        theirs:
          "The pricing page publishes plan amounts and a monthly/annual toggle that says annual billing saves 20%. The agency calculator is labeled $400 or more per month for 10 or more seats. White Label Premium is listed at $440 per year.",
        ours: "Starter is free. Professional is $20 a month. No white-label fee and no per-seat agency plan.",
      },
      {
        topic: "Trial and canceling",
        theirs:
          "A 14-day trial, with no card, for 3 seats. Their FAQ says to cancel by emailing support, and that they do not offer refunds.",
        ours: "Starter needs no card and does not expire. Professional has no trial. Cancel in the Stripe customer portal.",
      },
    ],
    theyAre: [
      "Review funnels, email and text campaigns, monitoring, widgets, and QR codes, organized so an agency can run many clients.",
      "White Label Basic on the plans they describe, with the dashboard logo reserved for a paid premium add-on.",
      "A fit when you sell review management to other businesses under your own brand.",
    ],
    weAre: [
      "One review page and one QR code for your own customers.",
      "Email requests on Professional. No texting product and no review-monitoring suite.",
      "A price you can read before you create an account.",
    ],
    chooseThem: "Choose Grade.us if you are an agency and you want to white-label review software for clients.",
    chooseUs:
      "Choose ReputationFlow if you are the plumber, cleaner, or shop owner, and you want to ask for reviews yourself.",
    faqs: [
      {
        question: "Why isn’t a single Grade.us monthly price quoted here?",
        answer:
          "The pricing page we checked in October 2026 shows dollar amounts next to a monthly/annual toggle, and it says annual billing saves 20%. The number on screen depends on that toggle, so this page does not repeat it as the monthly price. Two figures are written out in their own words: the agency calculator says $400 or more per month for 10 or more seats, and White Label Premium is $440 per year. Read their pricing page for the one-location amount before you compare it with $20.",
      },
      {
        question: "Does ReputationFlow white-label the dashboard for agencies?",
        answer:
          "No. Grade.us is built for that. ReputationFlow is one account for one business, under the ReputationFlow name.",
      },
      {
        question: "Can I make a Google review QR code without either product?",
        answer:
          "Yes. The free QR code generator on this site does that with no account. Grade.us also lists QR codes inside its paid platform.",
      },
    ],
  },
]

export interface SitemapEntry {
  path: string
  priority: number
  changeFrequency: "weekly" | "monthly" | "yearly"
}

export function indexablePaths(): SitemapEntry[] {
  const staticPaths: SitemapEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/how-to-get-more-google-reviews", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-to-respond-to-negative-google-reviews", priority: 0.8, changeFrequency: "monthly" },
    { path: "/review-management-software", priority: 0.9, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tools", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tools/google-review-link", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tools/qr-code", priority: 0.9, changeFrequency: "monthly" },
    { path: qrCityHub.path, priority: 0.8, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
    { path: "/guides", priority: 0.8, changeFrequency: "monthly" },
    { path: "/google-review-request-templates", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ]

  return [
    ...staticPaths,
    ...industries.map((industry) => ({
      path: `/industries/${industry.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...qrCityPages.map((page) => ({
      path: qrCityPath(page),
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    ...comparisons.map((comparison) => ({
      path: `/compare/${comparison.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...guides.map((guide) => ({
      path: `/guides/${guide.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ]
}

export function comparisonBySlug(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug) ?? null
}
