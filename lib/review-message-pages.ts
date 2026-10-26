export const REVIEW_MESSAGE_TOOL_PATH = "/tools/review-request-message"
export const REVIEW_MESSAGE_TOOL_TITLE = "Google review request message generator"
export const REVIEW_MESSAGE_TOOL_DESCRIPTION =
  "Free Google review request message generator. Type a business name, a trade, and a review link to copy a text and an email. Nothing is sent."

export interface ReviewMessageFaq {
  question: string
  answer: string
}

export interface ReviewMessagePage {
  slug: string
  industrySlug: string
  templateTrade: string
  title: string
  /** On-page heading when the title tag is shorter than the query. */
  heading?: string
  description: string
  keyword: string
  intro: string
  emailSubject: string
  sendWhen: string
  leaveOut: string
  channelNote: string
  faqs: ReviewMessageFaq[]
}

export const reviewMessagePages: ReviewMessagePage[] = [
  {
    slug: "plumber",
    industrySlug: "plumber",
    templateTrade: "Plumber",
    title: "Plumber review request text template",
    description:
      "A plumber review request text template and the matching email. Fill in the business name and Google review link, then send one message after the water is back on.",
    keyword: "plumber review request text template",
    intro:
      "This is the text and the email for a finished plumbing visit. Replace the names and paste the Google review link. Send one of them, not both, and not while the water is still on the floor.",
    emailSubject: "The repair at your place is finished",
    sendWhen:
      "Send it when the water is back on, the leak has stopped, or the new water heater is running, and you are still in the driveway. After a middle-of-the-night flood, wait until the next morning once they have said the floor stayed dry. One text to the person who met you at the door.",
    leaveOut:
      "Do not waive the dispatch fee, a coupon, or the next visit in exchange for the review. Do not name a star rating. Do not recap the parts you replaced. The link should open the review form, not your homepage.",
    channelNote:
      "Say the in-person line in the kitchen while they can see the water running. If they are in a hurry, stop. The text is the version you send from your own phone before the truck leaves. The email is for an address already on the invoice. Do not use all three for one job.",
    faqs: [
      {
        question: "When should a plumber send the review request text?",
        answer:
          "After the water is back on and the customer has seen it, or the next morning after an overnight call once they confirm the floor stayed dry. Do not send it while you are still shutting the water off.",
      },
      {
        question: "Should a plumber text mention the dispatch fee?",
        answer:
          "No. Leave the fee on the invoice. Do not offer to waive it, or anything else, for a review.",
      },
      {
        question: "Can a plumber text both the landlord and the tenant?",
        answer:
          "Text the person who hired you. Text both only when both hired you for the same job. One message is the whole ask.",
      },
    ],
  },
  {
    slug: "hvac",
    industrySlug: "hvac",
    templateTrade: "HVAC",
    title: "HVAC review request text template",
    description:
      "An HVAC review request text template and email for after the system is running. Fill in the company and the Google review link, and name the visit before you send it.",
    keyword: "hvac review request text template",
    intro:
      "This is the text and the email for an HVAC visit after the customer has felt the air change. The email still has the visit type in brackets. Keep one of tune-up, no-heat, or replacement, delete the others, and send a single message.",
    emailSubject: "Your system is running",
    sendWhen:
      "Ask after they have felt the air change on a no-cool call, a no-heat call, or a tune-up. On a changeout, wait until the old equipment is out of the driveway and you have walked the new system together. Do not ask in the middle of a replacement estimate.",
    leaveOut:
      "Do not offer a free filter, a waived diagnostic, or a maintenance-plan discount for a review. Do not stuff the text with model numbers. Delete the visit types you did not do so the email does not say tune-up, no-heat, and replacement at once.",
    channelNote:
      "If the customer is home, say the in-person line at the thermostat, then send one text the same day only if they asked you to. If they were at work, the text or the email is the ask. A second message the next week reads like a collection call.",
    faqs: [
      {
        question: "Should an HVAC tech send the text before the house is cool?",
        answer:
          "No. Confirm they felt the change, or that the heat is on, and then send one message. A review request in the middle of a callback asks them to praise a job you have not finished.",
      },
      {
        question: "What do I put in the HVAC visit bracket?",
        answer:
          "Replace the bracket with the visit you finished: tune-up, no-heat, or replacement. Leave the other words out. The generator does not know which job you ran.",
      },
      {
        question: "Can I ask for a review during an HVAC replacement estimate?",
        answer:
          "No. The estimate is a sales conversation. Ask after the install is running and the old equipment is gone.",
      },
    ],
  },
  {
    slug: "dentist",
    industrySlug: "dentists",
    templateTrade: "Dentist",
    title: "Dentist review request text template",
    description:
      "A dentist review request text template and email that thanks the patient for the visit and leaves the treatment out. Copy the message and send it yourself.",
    keyword: "dentist review request text template",
    intro:
      "This is the text and the email for after a dental visit. They thank the person for coming in and use the practice name. They do not name the treatment. Hand them the card at checkout, or send one message after they leave. Do not do both.",
    emailSubject: "Thank you for visiting [practice]",
    sendWhen:
      "The in-person line is for checkout, with the card, after they have paid. The text is for later the same day if you did not ask at the desk. Do not send it before the appointment, and do not send it from the chair.",
    leaveOut:
      "Do not name the tooth, the procedure, the images, or the insurance. Do not offer whitening, a discount, or a free visit for a review. Do not ask them to mention the treatment. The script already tells them to leave clinical details out of a public review.",
    channelNote:
      "The practice name replaces the practice bracket in both the text and the email. Your name is optional in person because the card is at the desk. If the front desk asked and they said they would do it later, one text with the link is the follow-through, not a new pitch.",
    faqs: [
      {
        question: "Can a dentist review request name the procedure?",
        answer:
          "No. Thank them for the visit. Leave the treatment, the tooth, and the insurance out of the text and the email. A public review is not the place for a chart note.",
      },
      {
        question: "Is the checkout card the same ask as the dentist text?",
        answer:
          "Yes. Use one. If they took the card, do not text them the same day. If they left without it, one text after they are gone is enough.",
      },
      {
        question: "Will ReputationFlow text dental patients?",
        answer:
          "No. Copy the message into the phone or the email program you already use. ReputationFlow does not send SMS. Professional can email a review link when you choose the patient. Starter does not send email.",
      },
    ],
  },
  {
    slug: "salon",
    industrySlug: "salons",
    templateTrade: "Salon",
    title: "Salon review request text template",
    description:
      "A salon review request text template and email for after the cut or color. Fill in the stylist, the salon, and the Google review link. You send it.",
    keyword: "salon review request text template",
    intro:
      "This is the text and the email for after a cut or color, once the person has seen the result. Use the stylist name and the salon name. If they already used the code at the desk, do not also send the text.",
    emailSubject: "Your visit at [salon]",
    sendWhen:
      "Ask in the chair or at the desk after they have looked in the mirror, not while the color is still processing and not on the way in. If they leave in a rush, one text that evening is the ask. Do not send another one the next week.",
    leaveOut:
      "Do not offer a free gloss, a discount on the next color, or a product in exchange for the review. Do not name a star rating. Do not describe their hair in the text in a way they would not want forwarded.",
    channelNote:
      "The stylist name replaces the stylist bracket. The salon name replaces the salon bracket. The in-person line points at the code at the desk. The text is only for someone who did not use that code and did not say no.",
    faqs: [
      {
        question: "Should a salon text a guest who already scanned the desk code?",
        answer:
          "No. The code was the ask. A text the same day is a second ask. Send the text only when they did not use the code.",
      },
      {
        question: "Whose name goes in a salon review request text?",
        answer:
          "The stylist who did the service, and the salon name. If the front desk is sending it, the stylist name still belongs in the message so the guest knows which chair.",
      },
      {
        question: "Can a salon offer a discount on the next visit for a Google review?",
        answer:
          "No. A gloss, a product, or a percent off the next color in exchange for a review is an incentive. Google’s policies prohibit that. Leave the price list out of the message.",
      },
    ],
  },
  {
    slug: "restaurant",
    industrySlug: "restaurants",
    templateTrade: "Restaurant",
    title: "Restaurant review request text template",
    description:
      "A restaurant review request text template and email for one message after the meal. Fill in the restaurant name and Google review link. You send it.",
    keyword: "restaurant review request text template",
    intro:
      "This is one text or one email after a meal. If the check already had the QR code, you already asked. Use this when they were not handed that check, or when they asked you to text the link.",
    emailSubject: "Thank you for eating at [restaurant]",
    sendWhen:
      "The in-person line is when you leave the check. The text is the same day, after they have gone, and only if the check did not already ask. Do not send it the next afternoon because the dining room was slow.",
    leaveOut:
      "Do not mention a dish they sent back, a comped item, or a coupon. Do not name a star rating. Do not add a second link to the reservation page. One Google review link is the message.",
    channelNote:
      "The text says it is the only message you will send about the review. Mean that. The email is for a catering ticket or a private dining contact you already have an address for, not for every two-top.",
    faqs: [
      {
        question: "Should a restaurant text guests who already had a QR code on the check?",
        answer:
          "No. The code on the check was the ask. Use the text when that code was not on the check, or when they asked you to text the link.",
      },
      {
        question: "Should the restaurant review text name the dish?",
        answer:
          "No. The restaurant name and the link are enough. A dish, a complaint, or a comp does not belong in the message.",
      },
      {
        question: "How many restaurant review texts should I send?",
        answer:
          "One. The script says it is the only message. Do not follow it the next day with a different wording of the same request.",
      },
    ],
  },
  {
    slug: "auto-repair",
    industrySlug: "auto-repair",
    templateTrade: "Auto repair",
    title: "Auto repair review request text template",
    description:
      "An auto repair review request text template and email for after the keys are handed over. Fill in the shop and the Google review link. You send it.",
    keyword: "auto repair review request text template",
    intro:
      "This is the text and the email for after the keys are back and the invoice is paid. It says the explanation was clear. It does not name a star rating, and it is not for an estimate they turned down.",
    emailSubject: "Your vehicle is ready",
    sendWhen:
      "Ask when you hand over the keys and they have paid, or in one text the same day if they picked up at the counter without a conversation. Do not send it when the car is still on the lift, and do not send it for a diagnosis they declined.",
    leaveOut:
      "Do not list the parts, the labor hours, or a recommended repair they did not approve. Do not offer a discount on the next oil change for a review. Do not tell them which star to pick. The script already says you do not suggest a rating.",
    channelNote:
      "The shop name replaces the shop bracket. The in-person line points at the code on the invoice they are holding. If the advisor already said it at the counter, skip the text. The email is for a fleet or a commercial account that pays from an inbox, not a second copy of the counter ask.",
    faqs: [
      {
        question: "When is a car ready for a review request text?",
        answer:
          "After the customer has the keys and the invoice is paid. Not while the vehicle is still in the bay, and not for an estimate they did not approve.",
      },
      {
        question: "Can an auto repair text suggest a star rating?",
        answer:
          "No. You can say the explanation was clear. You cannot tell them how many stars to leave. The email says the shop does not suggest a rating.",
      },
      {
        question: "Should I ask for a review on a declined auto repair?",
        answer:
          "No. A quote they turned down is not a finished job. Ask after work they approved and you completed.",
      },
    ],
  },
  {
    slug: "cleaning-service",
    industrySlug: "cleaning-service",
    templateTrade: "Cleaning service",
    title: "Cleaner review request text template",
    heading: "Cleaning service review request text template",
    description:
      "A cleaning service review request text template and email for the person who paid. Fill in the company and the Google review link, then send one message yourself.",
    keyword: "cleaning service review request text template",
    intro:
      "This is the text and the email for the person who paid for the clean. On a turnover, send it the same day. On a recurring home, send it after the first clean they have walked, not after every visit.",
    emailSubject: "Today's clean is finished",
    sendWhen:
      "If they are home and walking the house, the card on the counter is the ask and you do not also text. If they are out, one text to the person who paid is the ask. On a move-out clean, that text goes the same day because you will not see them next week.",
    leaveOut:
      "Do not attach this message to every invoice. Do not offer a free next clean for a review. The line about a room that needs another pass is how they tell you about a miss. It is not a request to keep that miss off Google.",
    channelNote:
      "The company name replaces the company bracket. Reply to a room they flag, and fix it, without asking them to change what they might write. The email is the better channel when the only contact you have is the property manager who paid.",
    faqs: [
      {
        question: "Who gets a cleaning service review request text on a turnover?",
        answer:
          "The person who paid, the same day. If a property manager paid and the tenant was not your customer, text or email the manager. Do not text every adult who happened to be in the unit.",
      },
      {
        question: "Should a recurring cleaner send a review text after every visit?",
        answer:
          "No. Ask after the first clean they have walked, or after the first month if they have not been home to see it. A review request on every invoice starts to feel like a collection note.",
      },
      {
        question: "What if a room needs another pass before I ask for a review?",
        answer:
          "Fix the room first. The script tells them they can reply about a miss. Do not ask them to leave that miss off the public review, and do not send the review link until the clean matches what they asked for.",
      },
    ],
  },
  {
    slug: "realtor",
    industrySlug: "realtor",
    templateTrade: "Realtor",
    title: "Realtor review request text template",
    description:
      "A realtor review request text template and email for after closing. Fill in the agent and the brokerage, leave the address out, and send one message yourself.",
    keyword: "realtor review request text template",
    intro:
      "This is the text and the email after closing, not after the first tour. It congratulates them and asks for a review of the work. It leaves the address and the price out unless they choose to put those in a public review.",
    emailSubject: "Congratulations on closing",
    sendWhen:
      "Send it after the keys are handed over and the closing is done. A tour, an open house, or an accepted offer is too early. You have not finished the job yet. One message to the client, not a copy to every relative who attended the walkthrough.",
    leaveOut:
      "Do not include the street address, the sale price, or the other agent’s name. Do not offer a closing gift, a rebate, or a referral fee in exchange for the review. Do not hand them a review you wrote.",
    channelNote:
      "Your name replaces the agent bracket. The brokerage name replaces the brokerage bracket. The in-person line is for the closing table if the moment is calm. If it is not, the text later that day is the better ask. Do not send the email as well.",
    faqs: [
      {
        question: "When should a realtor send a review request text?",
        answer:
          "After closing, once they have the keys. Do not send it after the first tour, an open house, or an offer that has not closed.",
      },
      {
        question: "Can a realtor review text include the property address?",
        answer:
          "Leave the address and the price out. The script says they can omit both unless they want those details public. Do not put them in the text you send.",
      },
      {
        question: "Who is named in a realtor review request?",
        answer:
          "The agent who did the work, and the brokerage. One message to the client. Do not copy every person who toured the house.",
      },
    ],
  },
]

export function reviewMessageHeading(page: ReviewMessagePage) {
  return page.heading ?? page.title
}

export function reviewMessagePath(page: Pick<ReviewMessagePage, "slug">) {
  return `/review-request-text/${page.slug}`
}

export function reviewMessagePageBySlug(slug: string) {
  return reviewMessagePages.find((page) => page.slug === slug) ?? null
}

export function reviewMessagePageByIndustry(industrySlug: string) {
  return reviewMessagePages.find((page) => page.industrySlug === industrySlug) ?? null
}

export function reviewMessagePageByTrade(trade: string) {
  return reviewMessagePages.find((page) => page.templateTrade === trade) ?? null
}

export function relatedReviewMessagePages(slug: string) {
  return reviewMessagePages.filter((page) => page.slug !== slug)
}

export function messageToolLinkForPath(pathname: string): { href: string; label: string } {
  const bare = pathname.split("?")[0]?.split("#")[0] ?? ""
  const normalized = bare.length > 1 ? bare.replace(/\/+$/, "") : bare
  const match = normalized.match(/^\/industries\/([a-z0-9-]+)(?:\/[a-z0-9-]+)?$/)
  const page = match ? reviewMessagePageByIndustry(match[1]) : null
  if (!page) {
    return { href: REVIEW_MESSAGE_TOOL_PATH, label: "Review request message generator" }
  }
  return { href: reviewMessagePath(page), label: reviewMessageHeading(page) }
}
