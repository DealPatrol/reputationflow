export type Article = {
  slug: string
  title: string
  description: string
  category: string
  publishedAt: string
  readTime: string
  intro: string
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  faqs: { question: string; answer: string }[]
}

export const ARTICLES: Article[] = [
  {
    slug: "review-management-software-small-business-guide",
    title: "Review Management Software for Small Businesses: A Practical Guide",
    description: "Learn what review management software does, what to look for, and how to build a consistent feedback process without adding busywork.",
    category: "Review management",
    publishedAt: "2026-09-13",
    readTime: "8 min read",
    intro: "Online reviews are not a one-time marketing project. They are an operating system for learning what customers value, responding when expectations are missed, and making it easy for satisfied customers to share honest feedback. The right software turns that process into a repeatable habit.",
    sections: [
      { heading: "What review management software should handle", paragraphs: ["A useful platform brings review requests, private feedback, public review links, and response tracking into one workflow. It should reduce the number of tabs your team needs without hiding the customer journey.", "Look for clear reporting, simple links you can share after an appointment or purchase, and controls that let every customer access the same review opportunity."], bullets: ["Send consistent review invitations after a real customer interaction", "Collect private comments so your team can learn and follow up", "Track response rates and recurring themes", "Link customers to the public platforms that matter to your business"] },
      { heading: "A simple workflow for a small team", paragraphs: ["Start with one moment in the customer journey: the receipt, appointment follow-up, or order confirmation. Send a short message asking for honest feedback, then make the next step obvious.", "Your internal process matters as much as the software. Assign an owner for replies, set a response target, and review feedback during a weekly team huddle."], bullets: ["Invite every eligible customer", "Ask for an honest rating and comment", "Offer a public review link and a private contact option to everyone", "Close the loop when a customer raises a concern"] },
      { heading: "How to compare tools", paragraphs: ["Avoid choosing on feature count alone. Compare setup time, message customization, integrations, analytics, and whether the product supports transparent review requests. A low-cost tool that your team actually uses is more valuable than a complex system that becomes another abandoned dashboard."] },
      { heading: "The metrics that matter", paragraphs: ["Measure invitation delivery, response rate, review volume, average rating, time to respond, and the themes appearing in private feedback. These metrics tell you both whether the process is working and where the customer experience needs attention."] },
    ],
    faqs: [
      { question: "Is review management software only for large businesses?", answer: "No. Small businesses often benefit the most because a lightweight workflow helps a small team consistently ask, listen, and respond." },
      { question: "Should I ask only happy customers for reviews?", answer: "No. Invite customers consistently and give everyone a clear opportunity to share honest feedback. Selective review requests can violate platform policies." },
    ],
  },
  {
    slug: "get-more-google-reviews-without-violating-policies",
    title: "How to Get More Google Reviews Without Violating Google’s Policies",
    description: "A compliant, practical process for asking customers for honest Google reviews while improving the experience behind the rating.",
    category: "Google reviews",
    publishedAt: "2026-09-13",
    readTime: "7 min read",
    intro: "More reviews are valuable when they reflect real customer experiences. The safest growth strategy is simple: ask eligible customers consistently, never condition service on a review, and make the public review option available without filtering who gets access.",
    sections: [
      { heading: "Ask everyone, not just likely promoters", paragraphs: ["Your request process should be based on a completed transaction or interaction, not on a private rating threshold. Consistency protects trust and gives your business a more representative view of customer sentiment."] },
      { heading: "Ask at the right moment", paragraphs: ["Send the request soon after the customer has experienced the value you provide. For a restaurant, that may be after the visit. For a salon or dental office, it may be after the appointment and follow-up.", "Keep the request short, identify your business clearly, and include one direct link to your Google Business Profile review flow."] },
      { heading: "Make honest feedback useful", paragraphs: ["A public review invitation and a private contact option can coexist. Give every customer both options so a concern can reach your team quickly without preventing a public review. Your job is to resolve problems, not to control what customers say."] },
      { heading: "Avoid risky incentives and pressure", paragraphs: ["Do not offer gifts for positive reviews, ask customers to change or remove honest feedback, or tell them what rating to leave. Train staff to invite honest feedback in neutral language."] },
    ],
    faqs: [
      { question: "Can I offer a discount for leaving a Google review?", answer: "Avoid incentives tied to reviews or positive sentiment. They can undermine authenticity and conflict with platform rules." },
      { question: "Can I collect private feedback before sharing a review link?", answer: "You can collect feedback, but do not use a rating threshold to prevent customers from accessing the public review option. Make the same opportunity available to everyone." },
    ],
  },
  {
    slug: "customer-feedback-vs-online-reviews",
    title: "Customer Feedback vs. Online Reviews: What Businesses Should Measure",
    description: "Understand the difference between private customer feedback and public reviews, and use both to improve your customer experience.",
    category: "Customer experience",
    publishedAt: "2026-09-13",
    readTime: "6 min read",
    intro: "Public reviews influence future buyers, while private feedback helps your team see what happened behind the rating. Strong businesses use both signals together instead of treating one as a replacement for the other.",
    sections: [
      { heading: "Public reviews show trust in the market", paragraphs: ["Reviews on Google and other platforms help prospective customers understand what to expect. Track volume, recency, rating distribution, and the topics customers mention repeatedly."] },
      { heading: "Private feedback shows where to improve", paragraphs: ["Private comments often contain specific details customers may not include publicly. Look for patterns in wait times, communication, quality, cleanliness, billing, or follow-up."] },
      { heading: "Build one feedback loop", paragraphs: ["Use public reviews to understand reputation and private feedback to improve operations. Share themes with the team, choose one improvement to test, and measure whether the same issue appears less often next month."] },
      { heading: "A practical scorecard", paragraphs: ["Start with five numbers: review invitations sent, response rate, public review volume, average rating, and unresolved private issues. Add customer effort or repeat purchase measures when your business has reliable data."] },
    ],
    faqs: [
      { question: "Which matters more: a high rating or more reviews?", answer: "Both matter, but recency and authenticity are important too. Use the combination that best reflects your customers and gives prospects useful context." },
      { question: "How often should we review feedback?", answer: "Monitor urgent issues continuously and review trends at least monthly. A short weekly review is useful for teams that receive frequent feedback." },
    ],
  },
]

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug)
}
