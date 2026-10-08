export interface ReviewRequestTemplate {
  trade: string
  inPerson: string
  sms: string
  email: string
}

export const reviewRequestTemplates: ReviewRequestTemplate[] = [
  {
    trade: "Plumber",
    inPerson: "The water is back on. If you have a minute before I leave, a Google review helps a neighbor find a plumber. I can text you the link.",
    sms: "Hi [first name], this is [your name] from [company]. The repair is finished. If you have a minute, a Google review helps the next person with a leak: [link].",
    email: "Hi [first name], the repair at your place is finished and the water is back on. If the visit was useful, here is the link to leave a Google review: [link]. One review is enough. Thank you, [your name].",
  },
  {
    trade: "Dentist",
    inPerson: "You are all set at checkout. If you have a minute, this card opens our Google review page. You do not need to mention the treatment.",
    sms: "Hi [first name], thank you for coming in to [practice] today. If you have a minute, a Google review helps someone else choose a dentist: [link].",
    email: "Hi [first name], thank you for visiting [practice] today. If you are willing, you can leave a Google review here: [link]. Please do not include clinical details. We read every review. [practice]",
  },
  {
    trade: "Salon",
    inPerson: "Take a look in the mirror. If you like it, the code at the desk is for a Google review. I will not ask again on the way out.",
    sms: "Hi [first name], it’s [stylist] at [salon]. If you like the cut or color, a Google review helps someone else find the chair: [link].",
    email: "Hi [first name], glad we got you in today at [salon]. If you want to tell other people about the visit, here is the Google review link: [link]. One note is plenty. [stylist]",
  },
  {
    trade: "Restaurant",
    inPerson: "If you have a minute, the code on the check is a Google review. I will leave it with you.",
    sms: "Thanks for eating with us at [restaurant] tonight. If you have a minute, a Google review helps other people find the place: [link]. This is the only message we will send about it.",
    email: "Hi [first name], thank you for eating at [restaurant]. If the meal was worth mentioning, you can leave a Google review here: [link]. We read them at the next shift. [restaurant]",
  },
  {
    trade: "HVAC",
    inPerson: "The system is running and you can feel it. If that was the visit you needed, I can text the Google review link before I pull out.",
    sms: "Hi [first name], [tech name] with [company]. Your system is running again. If the visit was useful, a Google review helps the next house that is too hot or too cold: [link].",
    email: "Hi [first name], we finished the [tune-up / no-heat / replacement] visit and the system was running when we left. If you want to leave a Google review, the link is here: [link]. Thank you, [company].",
  },
  {
    trade: "Auto repair",
    inPerson: "You are paid up and the keys are yours. If we explained the work clearly, the code on the invoice is a Google review.",
    sms: "Hi [first name], [shop] here. Your vehicle is ready. If we explained the work clearly, a Google review helps the next driver: [link].",
    email: "Hi [first name], your vehicle is ready and the invoice is paid. If the explanation was clear, you can leave a Google review here: [link]. We do not suggest a star rating. [shop]",
  },
  {
    trade: "Cleaning service",
    inPerson: "We are finished. If you are walking the house now, the card on the counter is a Google review. If you are out, I will text the same link once.",
    sms: "Hi [first name], [company] finished today’s clean. If the house matches what you asked for, a Google review helps someone else choose a cleaner: [link]. Reply if a room needs another pass.",
    email: "Hi [first name], today’s clean is finished. If it matches your notes, here is a Google review link: [link]. If a room needs another pass, reply to this email and we will fix that separately. [company]",
  },
  {
    trade: "Realtor",
    inPerson: "Congratulations on closing. If I was useful from the first tour through the keys, I can text you a Google review link. No need to mention the address or the price.",
    sms: "Hi [first name], it’s [agent] with [brokerage]. Congratulations on closing. If I was useful, a Google review helps the next person looking for an agent: [link].",
    email: "Hi [first name], congratulations on closing. If you are willing to describe the work from the first tour through the keys, here is a Google review link: [link]. Leave the address and the price out unless you want them public. [agent]",
  },
]

export function templatePackText() {
  const lines = [
    "Google review request templates",
    "ReputationFlow",
    "",
    "Use one channel per customer. Replace the brackets. Send the text yourself. ReputationFlow does not text customers.",
    "Do not offer a discount, gift, or free service for a review. Do not tell the customer what star rating to pick or hand them a review you wrote.",
    "Ask every customer the same way, including after a difficult visit. A private note can sit next to the public links. It does not replace them.",
    "",
  ]

  for (const template of reviewRequestTemplates) {
    lines.push(template.trade.toUpperCase())
    lines.push(`In person: ${template.inPerson}`)
    lines.push(`Text: ${template.sms}`)
    lines.push(`Email: ${template.email}`)
    lines.push("")
  }

  lines.push("Make the link with the free Google review link generator, then put it on a QR code if you are handing someone a card.")
  return lines.join("\n")
}
