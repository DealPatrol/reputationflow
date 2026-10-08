import { industries, industryBySlug, relatedIndustries } from "@/lib/industries"

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

export interface ComparisonPage {
  slug: string
  name: string
  title: string
  description: string
  summary: string
  theyAre: string[]
  weAre: string[]
  chooseThem: string
  chooseUs: string
  faqs: FaqItem[]
}

export const comparisons: ComparisonPage[] = [
  {
    slug: "birdeye",
    name: "Birdeye",
    title: "Birdeye alternative for small businesses",
    description:
      "Compare ReputationFlow with Birdeye for a single-location business that needs review requests, a QR code, and private feedback.",
    summary:
      "Birdeye is a broad reputation suite used by multi-location teams. ReputationFlow is a narrower product: one review link, email requests, a QR code, and optional private feedback for $20 a month on the Professional plan.",
    theyAre: [
      "Listings, surveys, messaging, and reporting across many locations.",
      "Sold as a platform, often with a sales conversation and a higher annual contract.",
      "A fit when you need a team to manage listings and reviews in one large account.",
    ],
    weAre: [
      "A review request page and QR code you can share the same day.",
      "Starter is free. Professional is $20 per month and can be canceled in Stripe.",
      "The same public review links for every customer, with private feedback as an extra option on that page.",
    ],
    chooseThem: "Choose Birdeye if you are comparing enterprise listing management, surveys, and a larger team workflow.",
    chooseUs:
      "Choose ReputationFlow if you run one or a few locations and you mainly need customers to find your Google review page.",
    faqs: [
      {
        question: "Does this page quote Birdeye’s price?",
        answer:
          "No. Birdeye is sold as a broader platform and the price depends on the conversation you have with them. ReputationFlow publishes its own price: Starter is free, and Professional is $20 per month.",
      },
      {
        question: "Does ReputationFlow manage map listings the way a listings suite does?",
        answer:
          "No. It does not edit your Google Business Profile, post photos, or sync hours. You keep doing that in Google. ReputationFlow handles the review link, the QR code, and optional private notes.",
      },
    ],
  },
  {
    slug: "podium",
    name: "Podium",
    title: "Podium alternative for small businesses",
    description:
      "Compare ReputationFlow with Podium if you want review requests without a texting and payments suite.",
    summary:
      "Podium combines webchat, texting, payments, and reviews for local businesses. ReputationFlow does not replace your phone system or point of sale. It handles the review ask.",
    theyAre: [
      "A shared inbox for texts and webchat, plus payments and reviews.",
      "Built for businesses that want customer messaging in the same login as reviews.",
      "Priced as a broader communications product, not a single review link.",
    ],
    weAre: [
      "Email review requests on the Professional plan, sent when you choose the customer.",
      "A public page with Google, Facebook, and Yelp, plus an optional private note.",
      "No claim that we sync your existing Google reviews into the dashboard.",
    ],
    chooseThem: "Choose Podium if you need business texting, webchat, or payments together with reviews.",
    chooseUs: "Choose ReputationFlow if you already have a phone and a register, and you need a clean way to ask for reviews.",
    faqs: [
      {
        question: "Does ReputationFlow replace a business texting inbox?",
        answer:
          "No. Podium is the product people buy when texts, webchat, and payments sit in the same login as reviews. ReputationFlow does not text customers and does not take payments.",
      },
      {
        question: "Do you publish Podium’s current price?",
        answer:
          "No. Check Podium for the plan they sell today. ReputationFlow’s Professional plan is $20 per month through Stripe, and the Starter plan is free with no card.",
      },
    ],
  },
  {
    slug: "nicejob",
    name: "NiceJob",
    title: "NiceJob alternative for small businesses",
    description:
      "A NiceJob alternative for a small business that wants a Google review link and QR code without a review-marketing suite.",
    summary:
      "NiceJob is review-request software marketed to local service businesses. It is built around asking customers for reviews and using those reviews in marketing. ReputationFlow is narrower: one review link, a QR code, and optional private feedback. Professional is $20 a month. This page does not quote NiceJob’s price or customer counts.",
    theyAre: [
      "Review-request software aimed at local and home-service businesses.",
      "A product people shortlist when the main job is running review requests and showing reviews in marketing.",
      "Sold as its own review product, separate from your register or your scheduling login.",
    ],
    weAre: [
      "A free Starter link and QR code you can print the same day.",
      "Email requests only on the Professional plan, sent when you choose the customer. SMS is not included.",
      "The same Google, Facebook, and Yelp buttons for every customer. Private feedback is an extra box, not a replacement.",
    ],
    chooseThem:
      "Choose NiceJob if you want review-marketing software whose job is requesting reviews and republishing them.",
    chooseUs:
      "Choose ReputationFlow if you want a published price and a single page that sends every customer to the public review links.",
    faqs: [
      {
        question: "Do you publish NiceJob’s current price?",
        answer:
          "No. Check NiceJob for the number they charge today. ReputationFlow’s Starter plan is free. Professional is $20 per month and can be canceled in the Stripe customer portal.",
      },
      {
        question: "Does ReputationFlow text customers?",
        answer:
          "No. Many review-request products send texts. ReputationFlow does not. On Professional you can email the review link when you pick the customer. You can also text the link yourself from your own phone.",
      },
      {
        question: "Will ReputationFlow import the reviews NiceJob or Google already show?",
        answer:
          "No. The dashboard shows notes customers submit through your ReputationFlow link. Reviews published on Google stay on Google.",
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
    { path: "/tools/google-review-link", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tools/qr-code", priority: 0.8, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
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
    ...comparisons.map((comparison) => ({
      path: `/compare/${comparison.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ]
}

export function comparisonBySlug(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug) ?? null
}
