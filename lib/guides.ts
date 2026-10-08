import { longtailGuides } from "@/lib/longtail-guides"

export type GuideClusterId = "ask" | "reply" | "policy" | "distribution"

export interface GuideSection {
  title: string
  paragraphs: string[]
}

export interface GuideFaq {
  question: string
  answer: string
}

export interface GuidePage {
  slug: string
  cluster: GuideClusterId
  title: string
  description: string
  intro: string
  sections: GuideSection[]
  faqs: GuideFaq[]
}

export interface GuideListing {
  path: string
  title: string
  description: string
  cluster: GuideClusterId
}

export const guideGroups: { id: GuideClusterId; title: string; description: string }[] = [
  {
    id: "ask",
    title: "How to ask",
    description: "Scripts, timing, texts, and emails. The trade pages say when each job should use them.",
  },
  {
    id: "reply",
    title: "How to reply",
    description: "Public replies, including templates for restaurants, contractors, dentists, and salons.",
  },
  {
    id: "policy",
    title: "Rules",
    description: "What Google and the FTC prohibit, fake-review reports, and why a review quota is not published.",
  },
  {
    id: "distribution",
    title: "Links and QR codes",
    description: "Where the code goes, including invoices and businesses with more than one location.",
  },
]

export const guides: GuidePage[] = [
  {
    slug: "how-to-ask-customers-for-reviews",
    cluster: "ask",
    title: "How to ask customers for reviews",
    description:
      "Scripts for asking a customer for a Google review in person, by text, and by email, without a star target or a discount.",
    intro:
      "The ask is one sentence, a link that opens the review form, and then you stop. These scripts are the words. The link comes from your Google Business Profile or the free generator on this site.",
    sections: [
      {
        title: "In person",
        paragraphs: [
          "Say it while the customer can still see the finished work, then hand them the card or the phone. “If you have a minute, a Google review helps the next person find us. The link is on this card.”",
          "Do not stay and watch them type. Do not suggest five stars. If they say they are in a hurry, that is a no. One sentence is the whole script.",
        ],
      },
      {
        title: "By text",
        paragraphs: [
          "Send the text from your own phone. ReputationFlow does not send SMS. Use their first name, your name, and the link. “Hi [first name], this is [your name] at [business]. If you have a minute, a Google review helps other people find us: [link].”",
          "Send it once, the same day. A second text the next week reads like a collection notice.",
        ],
      },
      {
        title: "By email",
        paragraphs: [
          "Subject: How was your visit at [business]? Body: thank them for the specific visit, give the link, and say they can write whatever was true. Do not attach a coupon.",
          "On the Professional plan, ReputationFlow can send that email when you choose the customer. Starter does not send email. You can still copy the script into the mail program you already use.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should the script tell them what to write?",
        answer:
          "No. A script for you is fine. A script for them is not. Do not hand over suggested sentences or a star rating.",
      },
      {
        question: "Can I text and email the same person?",
        answer:
          "Pick one. If you already asked at the counter, do not follow with a text unless they asked you to send the link.",
      },
      {
        question: "Where are the trade-specific versions?",
        answer:
          "The free template pack has in-person, text, and email wording for several trades. The trade guides on this site say when to use them.",
      },
    ],
  },
  {
    slug: "incentivizing-reviews-ftc-rules",
    cluster: "policy",
    title: "Is it legal to incentivize Google reviews?",
    description:
      "What the FTC review rule and Google’s policies mean if you want to offer a discount, gift, or free service for a review. Not legal advice.",
    intro:
      "This is general information about public rules, not legal advice for your business. Two different rules apply at the same time: the Federal Trade Commission’s review rule, and Google’s content policies for Business Profile reviews.",
    sections: [
      {
        title: "What the FTC prohibits",
        paragraphs: [
          "The FTC’s Rule on the Use of Consumer Reviews and Testimonials bans fake reviews and reviews that pretend someone used a business when they did not. It also bans buying or selling reviews, and it bans compensation that is conditioned on a particular sentiment, positive or negative.",
          "The Endorsement Guides are the other FTC document people mean. If a reviewer has a material connection to the business, such as a free item or a family relationship, that connection has to be disclosed clearly. Disclosure does not make a fake review acceptable.",
        ],
      },
      {
        title: "What Google prohibits on top of that",
        paragraphs: [
          "Google’s policies say not to offer money, discounts, or free goods in exchange for a review. That includes an offer for any honest review, not only an offer for five stars. A coupon that is legal to disclose under the FTC framework can still get a Google review removed or the profile restricted.",
          "ReputationFlow does not include coupon-for-review templates. Do not add one to the text yourself.",
        ],
      },
      {
        title: "What you can do instead",
        paragraphs: [
          "Ask every customer the same way, with a link to the review form. Reply to the reviews you get. Fix the problem offline if there was one. Those steps do not require an incentive.",
          "If a lawyer or a platform’s current policy page disagrees with a shortcut you found on social media, follow the policy page. Rules are updated. Check the FTC and Google pages before you change an offer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a gift card for any star rating allowed?",
        answer:
          "Google still treats an incentive for a review as a policy problem, including an incentive that does not demand five stars. Do not offer it.",
      },
      {
        question: "Does this page quote fines or case results?",
        answer:
          "No. Penalty amounts and case outcomes change, and this page does not publish figures. Read the FTC’s own rule page for the current enforcement language.",
      },
      {
        question: "Can I require employees to review the business?",
        answer:
          "No. Reviews should come from customers who had the experience. An employee review, or a review you wrote yourself, is not a customer review.",
      },
    ],
  },
  {
    slug: "how-to-remove-a-fake-google-review",
    cluster: "policy",
    title: "How to remove a fake Google review",
    description:
      "How to report a Google review that violates policy, what Google will not remove, and how to reply while you wait. No removal promises.",
    intro:
      "You can report a review that breaks Google’s policies. You cannot make Google delete a review because it is unflattering or because you remember the visit differently. Google decides. This page does not promise a removal.",
    sections: [
      {
        title: "Report it from the Business Profile",
        paragraphs: [
          "Open the review in your Business Profile manager. Use the flag or the three-dot menu on that review and choose the report option. Pick the reason that matches the policy problem, such as spam, a conflict of interest, or content that is not about a real visit.",
          "“I disagree” is not a policy reason. If the person was a customer and simply had a bad time, the report is the wrong tool. Reply instead.",
        ],
      },
      {
        title: "Say what is fake, briefly",
        paragraphs: [
          "If you have a concrete mismatch, use it in the report: no record of the name, the review describes a service you do not offer, or it was posted by someone with a conflict you can describe. Do not invent a story to make the report sound stronger.",
          "A public reply can go up while the report is open. Keep the reply factual. Do not accuse a named person of fraud in public unless you are prepared for that sentence to stay up if Google leaves the review.",
        ],
      },
      {
        title: "What this product will not do",
        paragraphs: [
          "ReputationFlow does not file the report, contact Google, or sell review removal. Anyone who guarantees a takedown is selling something this product does not do.",
          "If the review is a threat, a private-data leak, or something you think is defamation, that is outside a Business Profile flag. Talk to a lawyer. This page is not that advice.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does Google take to decide?",
        answer:
          "Google does not publish a clock that you can plan around, and this page will not invent one. Check the review later. Send the report once, not ten times in a day.",
      },
      {
        question: "Should I reply before the report is decided?",
        answer:
          "Yes, if future customers will see the review in the meantime. A short reply that offers a phone number is more useful than a silent listing. Use the response examples if you need wording.",
      },
      {
        question: "Can I pay to have a negative review removed?",
        answer:
          "Do not. Paying the reviewer to delete or change a review is an incentive. Paying a third party for a guaranteed removal is not a feature of Google or of ReputationFlow.",
      },
    ],
  },
  {
    slug: "google-review-response-examples",
    cluster: "reply",
    title: "Google review response examples",
    description:
      "Short Google review replies for a thank-you, a mixed review, and a bad visit. Edit them, then post the reply on Google yourself.",
    intro:
      "A public reply is a few sentences. Thank them or acknowledge the problem, sign your name, and move anything private to a phone call. Paste the reply into Google yourself. These are examples, not a script the customer should see in advance. Trade-specific replies for a bad restaurant, contracting, dental, or salon review are separate guides.",
    sections: [
      {
        title: "A straightforward thank-you",
        paragraphs: [
          "“Hi [name], I’m [your name] at [business]. Thank you for taking the time. We’re glad the [visit] worked out, and we hope to see you again.”",
          "Do not repeat private details they did not put in the review. Do not offer a discount for the next visit inside the reply. A thank-you is enough.",
        ],
      },
      {
        title: "A mixed review",
        paragraphs: [
          "“Hi [name], I’m [your name]. Thank you for the kind words about [the part they liked]. I’m sorry [the specific problem they named] got in the way. If you want us to look at that, call [phone].”",
          "Answer the complaint they actually wrote. Do not pivot the whole reply into a sales pitch.",
        ],
      },
      {
        title: "A bad visit",
        paragraphs: [
          "“Hi [name], I’m [your name] at [business]. I’m sorry this missed the mark. Please call me at [phone] and I will look at it myself.”",
          "Longer wording for a wrong-business review, a billing fight, or a review with no comment is on the negative-review template page. Professional can draft a reply from a private note. You still edit it and post it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should every review get a reply?",
        answer:
          "Reply to the ones future customers will read, especially the critical ones. A short thank-you on a positive review is useful. You do not need a paragraph.",
      },
      {
        question: "Can I copy these examples word for word?",
        answer:
          "Replace the brackets with the truth. If a sentence does not match the visit, delete it. Identical replies on every review look unread.",
      },
      {
        question: "Does ReputationFlow publish the reply?",
        answer:
          "No. You post it on Google. The product can store a draft on the Professional plan. It does not log into your Business Profile.",
      },
    ],
  },
  {
    slug: "how-many-google-reviews-to-rank",
    cluster: "policy",
    title: "How many Google reviews do I need to rank?",
    description:
      "Google does not publish a minimum review count for local ranking. What to work on instead of chasing a number nobody has published.",
    intro:
      "There is no published number of Google reviews that guarantees a local ranking. Google has not given businesses a quota. Anyone who names a cutoff is guessing, and this page will not guess with them.",
    sections: [
      {
        title: "What Google has actually said",
        paragraphs: [
          "Google’s own local-ranking description talks about relevance, distance, and prominence. Reviews can feed prominence, along with other information on the web about the business. That description does not include a minimum review count, a star-rating target, or a promise that more reviews move you up by a set amount.",
          "Distance still matters. A business closer to the person searching can outrank a business with a longer review list. No review campaign removes that.",
        ],
      },
      {
        title: "What is worth doing anyway",
        paragraphs: [
          "Finish the Business Profile: name, category, hours, phone, and photos that match the storefront. Ask every customer for a review with a direct link, and reply to the reviews you have. Those are actions you control.",
          "A recent honest review is useful to a person choosing a business, whether or not it moves a map pin. Write the ask for the human reader. Do not write it for a number you cannot see.",
        ],
      },
      {
        title: "What to ignore",
        paragraphs: [
          "Ignore advice that says you need a specific count, a perfect average, or a burst of reviews in one week. Bursts of similar reviews can look like a campaign Google did not ask for. Steady asks after real visits are the safer habit.",
          "ReputationFlow does not report your Google ranking and does not import your Google review total. The dashboard counts feedback left on your ReputationFlow page.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will you tell me a target number if I say my city and category?",
        answer:
          "No. The number is not published, and a city or category does not create one. We do not make city pages or category quotas.",
      },
      {
        question: "Do star ratings change the rank by themselves?",
        answer:
          "Google has not published a formula that turns an average into a rank change. Chasing stars with incentives can violate Google’s policies and the FTC’s review rule. Ask for an honest review instead.",
      },
      {
        question: "Should I buy reviews to catch a competitor?",
        answer:
          "No. Bought reviews are fake reviews. They are a policy problem on Google and a legal problem under the FTC’s review rule.",
      },
    ],
  },
  {
    slug: "review-qr-code-ideas",
    cluster: "distribution",
    title: "Review QR code ideas",
    description:
      "Practical places to put a Google review QR code: the check, the invoice, a table tent, a service sticker, and a card at the desk.",
    intro:
      "A QR code works when the phone is already out and the visit is finished. These are placements local businesses can print this week. None of them depend on a claimed scan rate, because we do not have one to publish.",
    sections: [
      {
        title: "Where the phone is already out",
        paragraphs: [
          "Put the code on the check presenter, the card reader stand, or the invoice the customer is holding. A restaurant guest is looking at the check. A plumber’s customer is looking at the bill in the kitchen. That is the moment.",
          "The free QR tool on this site can download a letter-size table tent with a fold line, or a smaller review card. Use the business name on the card so they know which listing they are opening.",
        ],
      },
      {
        title: "Where you leave something behind",
        paragraphs: [
          "A service sticker on an air handler, a card in a warranty packet, a door hanger after a cleanup, or an aftercare card at a tattoo shop. One card. Do not leave a new hanger every week.",
          "Point the code at a direct review link, or at your ReputationFlow page if you also want Facebook and Yelp on the same screen. A code that opens your homepage makes people hunt.",
        ],
      },
      {
        title: "What to leave off the card",
        paragraphs: [
          "Do not print a star target, a suggested sentence, or a discount. “Scan to leave a Google review” is the whole instruction.",
          "Keep the printed code large enough to scan at arm’s length. If you shrink the card until the pattern is a speck, people will not try twice.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should the code open Google or my review page?",
        answer:
          "Open Google directly if Google is the only place you care about. Open your ReputationFlow page if you want Google, Facebook, and Yelp together, with a private note beside those buttons.",
      },
      {
        question: "Can I put the code in an email signature?",
        answer:
          "A link is better in email. A QR code is for a printed or on-screen moment when tapping a link is harder than scanning. The generator still makes the link you paste into the signature.",
      },
      {
        question: "Do you publish a best placement by scan count?",
        answer:
          "No. We have not measured scan totals for these placements, so we will not rank them with numbers. Put the code where the customer is already holding the bill or the card.",
      },
    ],
  },
  {
    slug: "when-to-ask-for-a-google-review",
    cluster: "ask",
    title: "When to ask for a Google review",
    description:
      "Ask after the customer has seen the finished work, once, and not in the middle of a complaint or a sale.",
    intro:
      "The useful moment is the end of a real visit. Earlier than that, they have nothing to describe. Later than that, they have moved on. The trade pages on this site name the moment for specific jobs. This page is the general rule.",
    sections: [
      {
        title: "After they can see the result",
        paragraphs: [
          "Ask when the water is back on, the haircut is in the mirror, the check is on the table, or the keys are in their hand. They can connect the review to something that just happened.",
          "On a job with a punch list, ask after the punch list, not after demolition. On a permitted job, the cleaner moment is often after the inspection, because that is when they feel finished.",
        ],
      },
      {
        title: "Not during the sale or the argument",
        paragraphs: [
          "Do not ask on the estimate, the sales tour, or while they are deciding whether to hire you. Do not ask while you are still fixing a complaint. Finish the fix, confirm it held, then ask if you still should.",
          "Some visits should not get an ask at all. A vet clinic should not ask on the day of a euthanasia or while a pet is hospitalized. Use the same judgment in any business when the person is upset or in the middle of bad news.",
        ],
      },
      {
        title: "Once",
        paragraphs: [
          "Weekly customers, members, and maintenance plans do not need a request every visit. Ask after the first completed visit, and again much later if you want a newer review. Say it once and stop.",
          "If they decline, that is the end of the sequence. Do not hand the request to a coworker to try again.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I wait a week so they have perspective?",
        answer:
          "Usually no. A week later they do not remember who did the work. Ask the day it is finished, unless the result itself takes time to judge and you told them that.",
      },
      {
        question: "What if the visit went badly?",
        answer:
          "Fix what you can, and still show them the public review link if they are on your review page. Do not hide Google because the visit was hard. You can skip a cheerful verbal ask while they are still angry.",
      },
      {
        question: "Where do I see the moment for my trade?",
        answer:
          "The industries index has a page per trade, with the best moment and a sample message. Start there if you want the version for a plumber, a salon, a gym, or another local job.",
      },
    ],
  },
  {
    slug: "google-review-policy-mistakes",
    cluster: "policy",
    title: "Google review policy mistakes to stop making",
    description:
      "Common ways local businesses get review requests wrong: gating, selective asks, pre-written reviews, and reviewing themselves.",
    intro:
      "Most review trouble is not a clever tactic that almost worked. It is a habit that filters who gets asked, or that writes the review for the customer. Stop those. The rest of the program is a link and a sentence.",
    sections: [
      {
        title: "Asking only the happy customers",
        paragraphs: [
          "If the staff decides who “deserves” a review, the listing stops describing the business people actually visit. Ask the same way after every finished job, including the ordinary ones and the difficult ones.",
          "A page that hides Google, Facebook, or Yelp after a low rating is the same mistake in software. ReputationFlow keeps those buttons on the page for every rating. A private note is an extra box.",
        ],
      },
      {
        title: "Writing the review for them",
        paragraphs: [
          "Do not hand someone a paragraph to paste or a card that says “tell them we were five stars.” They can mention a staff name if they want. You do not assign the sentence.",
          "Do not review your own business, and do not ask employees, agencies, or friends who were not customers to fill the listing.",
        ],
      },
      {
        title: "Paying for the outcome",
        paragraphs: [
          "A discount, a free dessert, a waived fee, or a gift card tied to a review is an incentive. Google’s policies prohibit that. The FTC’s review rule also bans compensation that requires a particular sentiment, and it bans fake reviews outright.",
          "If a vendor offers to generate reviews, buy accounts, or guarantee a rating, do not hire them for that. Ask the customers you already served.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a private feedback box the same as gating?",
        answer:
          "Not by itself. Gating is when a low rating removes the public links or sends the person to a different path. A private note that sits on the same page as Google, Facebook, and Yelp does not do that.",
      },
      {
        question: "Can the kiosk at the counter highlight five stars?",
        answer:
          "No. A screen that coaches the star rating is the same problem as a spoken script. Hand them the link and let them choose.",
      },
      {
        question: "What should I do this week instead?",
        answer:
          "Make the direct review link, print one QR code, and use one sentence with every customer at the end of the visit. The free tools on this site do the link and the code without an account.",
      },
    ],
  },
  ...longtailGuides,
]

const cornerstoneGuides: GuideListing[] = [
  {
    path: "/how-to-get-more-google-reviews",
    title: "How to get more Google reviews",
    description: "The basic workflow: a finished profile, a direct link, one ask, and a public reply.",
    cluster: "ask",
  },
  {
    path: "/how-to-respond-to-negative-google-reviews",
    title: "How to respond to negative Google reviews",
    description: "Templates for a bad visit, a billing dispute, and a review that may be the wrong business.",
    cluster: "reply",
  },
]

export const guideCluster: GuideListing[] = [
  ...cornerstoneGuides,
  ...guides.map((guide) => ({
    path: `/guides/${guide.slug}`,
    title: guide.title,
    description: guide.description,
    cluster: guide.cluster,
  })),
]

export function guideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug) ?? null
}

export function relatedGuides(slug: string, count = 3) {
  const current = guideBySlug(slug)
  if (!current) return guides.slice(0, count)
  const sameCluster = guides.filter((guide) => guide.slug !== slug && guide.cluster === current.cluster)
  const otherClusters = guides.filter((guide) => guide.slug !== slug && guide.cluster !== current.cluster)
  return [...sameCluster, ...otherClusters].slice(0, count)
}
