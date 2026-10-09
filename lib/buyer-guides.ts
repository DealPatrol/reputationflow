import type { GuidePage } from "@/lib/guides"

/** Buyer-intent guides: choosing software, starting from zero reviews, and replying to praise. */
export const buyerGuides: GuidePage[] = [
  {
    slug: "how-to-choose-review-management-software",
    cluster: "policy",
    title: "How to choose review management software for a small business",
    description:
      "A buyer checklist for review request software: review gating, pricing, what gets sent, where data goes, and when a simple link is enough.",
    intro:
      "Most local businesses need three things from review software: a fast way to ask, a page that follows Google's rules, and a place to read what customers tell you. Use this checklist before you sign a contract with any vendor, including this one.",
    sections: [
      {
        title: "1. Check how it treats low ratings",
        paragraphs: [
          "Ask the vendor what a customer sees after picking one or two stars. If the public review buttons disappear, or the customer is steered to a private form only, that is review gating. Google's review policy prohibits selectively soliciting positive reviews, and the FTC's 2024 rule on consumer reviews targets review suppression.",
          "A compliant page shows the same public review links at every rating. A private feedback box can sit next to them, never in place of them.",
        ],
      },
      {
        title: "2. Read the price, not the demo",
        paragraphs: [
          "Look for a published monthly price, what each plan includes, and whether there is a setup fee or annual contract. If pricing is only available on a sales call, ask for it in writing before the demo.",
          "Count the locations you have today. Per-location pricing can multiply the bill quickly for a business with several addresses.",
        ],
      },
      {
        title: "3. Match the channels to how you already work",
        paragraphs: [
          "Decide how you actually reach customers: at the counter, on an invoice, by text, or by email. A QR code and a short link cover the counter and invoices. Email requests help when you finish jobs remotely. Some platforms add SMS, which usually raises the price and brings consent rules.",
          "Point-of-sale and CRM integrations matter if you send hundreds of requests a week. A five-person shop usually does fine with a link and one sentence.",
        ],
      },
      {
        title: "4. Ask where customer data goes",
        paragraphs: [
          "Read the privacy policy for the list of service providers, how long data is kept, and how you can export or delete it. Payment details should be handled by a processor like Stripe rather than stored by the review tool.",
          "Make sure you can export your feedback history if you leave.",
        ],
      },
      {
        title: "5. Decide whether a link is enough",
        paragraphs: [
          "If you only need customers to land on your Google review form, the free review link generator and QR code generator on this site may be all you need. Paid software earns its price when you want a history of private feedback, email requests, and reply drafts in one place.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is review gating?",
        answer:
          "Review gating means showing public review options only to customers who report a good experience. Google's policy prohibits it. A compliant tool shows the same public review links at every star rating.",
      },
      {
        question: "Do I need software to get Google reviews?",
        answer:
          "No. A direct Google review link and a consistent ask are enough to start. Software helps when you want request tracking, private feedback history, and reply drafts in one dashboard.",
      },
      {
        question: "How much does ReputationFlow cost?",
        answer:
          "Starter is free with one review link and QR code. Professional is a flat monthly price listed on the pricing page, billed through Stripe, with no setup fee.",
      },
      {
        question: "Should review software write reviews for customers?",
        answer:
          "No. Customers should write their own words. Pre-written reviews or suggested star ratings conflict with Google policy and FTC guidance.",
      },
    ],
  },
  {
    slug: "how-to-get-google-reviews-for-a-new-business",
    cluster: "ask",
    title: "How to get your first Google reviews as a new business",
    description:
      "A step-by-step plan for a new local business with zero Google reviews: verify the profile, make a direct link, and ask every real customer.",
    intro:
      "A new Business Profile with no reviews looks empty to people comparing options. The fix is not a launch promotion or a request to friends. It is a verified profile and a consistent ask to every real customer from day one.",
    sections: [
      {
        title: "Finish and verify the profile first",
        paragraphs: [
          "Complete the business name, category, hours, service area or address, phone, website, and photos in Google Business Profile, then finish verification. Reviews can only help a profile people can find and trust.",
          "Pick the primary category that matches what customers search for, such as Plumber or Dentist, rather than a broad label.",
        ],
      },
      {
        title: "Make one direct review link",
        paragraphs: [
          "Copy the review link from your Business Profile, or use the free Google review link generator on this site. Turn it into a QR code for the counter, invoices, and business cards.",
        ],
      },
      {
        title: "Ask every real customer, the same way",
        paragraphs: [
          "Ask at the end of every job or visit with one sentence and the link. Asking everyone, rather than only the customers you think are happy, keeps you within Google's rules and gives you an honest picture.",
          "Do not ask friends, family, or employees to post reviews, and do not offer a discount in exchange. Google can remove reviews that break its policies, and the FTC prohibits fake or bought reviews.",
        ],
      },
      {
        title: "Reply to every review",
        paragraphs: [
          "Answer each review from your Business Profile within a few days. A short, specific thank-you shows future customers that a real owner is paying attention.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can friends and family leave my first reviews?",
        answer:
          "Only if they were genuine customers. Reviews from people with a conflict of interest, such as employees or relatives who did not buy anything, go against Google's review policy.",
      },
      {
        question: "Can I offer a discount for a review?",
        answer:
          "No. Google prohibits offering incentives for reviews, and the FTC's consumer review rule restricts incentives tied to review content.",
      },
      {
        question: "How fast should a new business expect reviews?",
        answer:
          "It depends on how many customers you serve and how consistently you ask. There is no fixed number. Ask every customer and the count grows with your volume.",
      },
    ],
  },
  {
    slug: "how-to-respond-to-positive-google-reviews",
    cluster: "reply",
    title: "How to respond to positive Google reviews (with examples)",
    description:
      "Short, specific reply examples for 4 and 5-star Google reviews that thank the customer and help the next reader, without sounding copied.",
    intro:
      "A reply to a good review is not for the reviewer alone. It is for every future customer reading your profile. Keep it short, specific, and human.",
    sections: [
      {
        title: "The three-part reply",
        paragraphs: [
          "Thank them by first name, mention one specific detail from their review, and close with a plain invitation back. Three sentences is plenty.",
          "Example: “Thanks, Maria. Glad the water heater swap went quickly and the crew cleaned up after. We're here whenever you need us again.”",
        ],
      },
      {
        title: "Examples by situation",
        paragraphs: [
          "Repeat customer: “Thanks for coming back again, James. It's always good to see you. See you next month.”",
          "Mentions a staff member: “Thank you, Priya. I'll pass this on to Alex, who will be glad to hear it.”",
          "Four stars with a suggestion: “Thanks for the review and the tip about weekend hours, Dan. We're looking at it.”",
        ],
      },
      {
        title: "What to leave out",
        paragraphs: [
          "Do not paste the same reply on every review. Do not add keyword lists or links. Never share private details such as appointment specifics or health information, especially for medical and dental practices.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I reply to every positive review?",
        answer:
          "Yes, when you can. A short, specific reply shows future customers that the business is attentive.",
      },
      {
        question: "Can I use a template for positive replies?",
        answer:
          "Use a template as a starting point, then add one detail from the review so each reply reads as written for that person.",
      },
      {
        question: "Can ReputationFlow draft replies?",
        answer:
          "On Professional, ReputationFlow can draft a reply that you edit and then paste onto Google, Facebook, or Yelp yourself. Nothing is posted automatically.",
      },
    ],
  },
]
