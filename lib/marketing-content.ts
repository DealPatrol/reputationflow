export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: "Does ReputationFlow hide negative reviews from Google?",
    answer:
      "No. Every customer sees the same Google, Facebook, and Yelp links, regardless of the rating they select. Private feedback is optional and sits beside those links. ReputationFlow does not filter, delay, or discourage public reviews.",
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

export interface IndustryPage {
  slug: string
  name: string
  keyword: string
  title: string
  description: string
  intro: string
  moments: string[]
  tips: { title: string; body: string }[]
}

export const industries: IndustryPage[] = [
  {
    slug: "dentists",
    name: "Dental practices",
    keyword: "review management for dentists",
    title: "Review requests for dental practices",
    description:
      "Ask patients for Google reviews after a visit without screening out unhappy patients. A compliant review link and QR code for dental offices.",
    intro:
      "Patients decide on a dentist from the Google listing before they ever call. A short, consistent ask after treatment is more useful than a stack of software the front desk will not open.",
    moments: [
      "Hand the QR code on the checkout card after a cleaning or treatment.",
      "Send one email the same day, addressed with the patient’s first name.",
      "Put the same link in appointment reminders only after the visit, not before.",
    ],
    tips: [
      {
        title: "Ask every patient the same way",
        body: "Do not sort patients into “happy” and “unhappy” paths. Google’s policies and the FTC’s review guidance both expect people to be able to publish an honest public review.",
      },
      {
        title: "Keep clinical details out of the ask",
        body: "Your request should not mention diagnosis or treatment. If a patient writes a private note, store it in the dashboard and reply without repeating health information in a public draft.",
      },
      {
        title: "Reply on Google in the dentist’s voice",
        body: "Use the AI draft as a starting point, then edit it. Thank the patient, invite them to call the office, and do not confirm treatment details in public.",
      },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors",
    keyword: "review management for contractors",
    title: "Review requests for contractors",
    description:
      "Get more Google reviews for a contracting business with one link you can text after the walkthrough and a QR code for the final invoice.",
    intro:
      "Homeowners compare contractors on a handful of recent Google reviews. The job ends at the final walkthrough, which is the moment they will actually write one.",
    moments: [
      "Text the review link when you send the final invoice.",
      "Leave a printed QR card in the kitchen after the punch list is done.",
      "Ask the person who signed the contract, not every subcontractor on the job.",
    ],
    tips: [
      {
        title: "One link for the whole crew",
        body: "Additional location links are for a second Google profile, not a different script for difficult jobs. Every customer gets the public links.",
      },
      {
        title: "Name the project, not a discount",
        body: "“How was the kitchen remodel?” is enough. Do not offer money off the next job in exchange for stars.",
      },
      {
        title: "Respond to the 3-star reviews",
        body: "A calm public reply that offers to fix a punch-list item is more useful than trying to keep that review off Google.",
      },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    keyword: "review management for restaurants",
    title: "Review requests for restaurants",
    description:
      "Put a Google review QR code on the check presenter and send the same link by email. Built for independent restaurants.",
    intro:
      "Guests already have their phone out when the check arrives. A QR code on the presenter beats a follow-up three days later that they will not open.",
    moments: [
      "Print the QR code on the check presenter or takeout sticker.",
      "Add the link to the receipt email if you already send one.",
      "Train the closer to mention it once, the same way, every table.",
    ],
    tips: [
      {
        title: "Do not route complaints away from Google",
        body: "If the pasta was late, the guest can still publish that. Private feedback is an extra note to the manager, not a substitute for the public page.",
      },
      {
        title: "Skip the incentive",
        body: "A free dessert for a 5-star review can get the listing penalized. Ask because you want the feedback.",
      },
      {
        title: "Answer reviews the next shift",
        body: "Draft a reply in ReputationFlow, edit the specifics, and post it on Google. Mention the location if you have more than one.",
      },
    ],
  },
  {
    slug: "salons",
    name: "Salons",
    keyword: "review management for salons",
    title: "Review requests for salons and barbers",
    description:
      "Ask salon and barber clients for a Google review at checkout with a QR code at the desk and an optional email the same afternoon.",
    intro:
      "A salon’s Google listing is often the first page a new client sees. The best time to ask is while they are still at the chair, looking at the result.",
    moments: [
      "Keep a small QR stand at checkout, next to the card reader.",
      "Have the stylist ask once, then stop. Do not follow them to the door.",
      "Email the same link that afternoon for clients who book online.",
    ],
    tips: [
      {
        title: "Same link for every chair",
        body: "If the salon has one Google profile, everyone shares it. A second profile needs its own link, and every client of that location still sees it.",
      },
      {
        title: "Private notes are for the owner",
        body: "A client can tell you the toner was off without that note replacing a public review. Read it, fix the next appointment, and reply if they left an email.",
      },
      {
        title: "Do not write the review for them",
        body: "Hand them the link. Suggested star ratings and pre-written reviews are a bad idea and against platform rules.",
      },
    ],
  },
  {
    slug: "lawn-care",
    name: "Lawn care",
    keyword: "review management for lawn care",
    title: "Review requests for lawn care companies",
    description:
      "Text a Google review link after a mow, cleanup, or estimate. A simple review workflow for lawn care and landscaping crews.",
    intro:
      "Lawn care customers rarely visit a website. They hire from the truck, the neighbor’s yard, and the Google listing. Ask after a visit they can see.",
    moments: [
      "Text the link when the crew lead marks the property done.",
      "Leave a door hanger with the QR code on seasonal cleanups.",
      "Ask after the first full service, not after the sales estimate.",
    ],
    tips: [
      {
        title: "One message, no sequence theater",
        body: "ReputationFlow sends the email you trigger. It does not pretend to watch your routing software and auto-text every stop.",
      },
      {
        title: "Include the public links even after a complaint",
        body: "If a yard was missed, the customer can still review you publicly. Call them about the miss, and leave the Google button on the page.",
      },
      {
        title: "Use the link on estimates you won",
        body: "New recurring customers are the ones neighbors will ask. A single request after the first month is enough.",
      },
    ],
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
      "The same public review links for every customer. No review gating.",
    ],
    chooseThem: "Choose Birdeye if you are comparing enterprise listing management, surveys, and a larger team workflow.",
    chooseUs:
      "Choose ReputationFlow if you run one or a few locations and you mainly need customers to find your Google review page.",
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
    { path: "/review-management-software", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools/google-review-link", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tools/qr-code", priority: 0.8, changeFrequency: "monthly" },
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

export function industryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug) ?? null
}

export function comparisonBySlug(slug: string) {
  return comparisons.find((comparison) => comparison.slug === slug) ?? null
}
