import type { GuidePage } from "@/lib/guides"

export const tradeReplyGuides: Record<string, { path: string; label: string }> = {
  restaurants: {
    path: "/guides/negative-google-review-responses-restaurants",
    label: "Restaurant reply templates",
  },
  contractors: {
    path: "/guides/negative-google-review-responses-contractors",
    label: "Contractor reply templates",
  },
  dentists: {
    path: "/guides/negative-google-review-responses-dentists",
    label: "Dentist reply templates",
  },
  salons: {
    path: "/guides/negative-google-review-responses-salons",
    label: "Salon reply templates",
  },
  "auto-repair": {
    path: "/guides/negative-google-review-responses-auto-repair",
    label: "Auto repair reply templates",
  },
  hvac: {
    path: "/guides/negative-google-review-responses-hvac",
    label: "HVAC reply templates",
  },
}

export const longtailGuides: GuidePage[] = [
  {
    slug: "review-request-text-message-templates",
    cluster: "ask",
    title: "Review request text message templates",
    description:
      "Short text scripts for asking a customer for a Google review after the visit, when they asked you to send the link, and when you should not text again.",
    intro:
      "A review text is one or two sentences and a link. Send it from your own phone. ReputationFlow does not send SMS. These are scripts for you to edit, not reviews written for the customer.",
    sections: [
      {
        title: "The same-day text",
        paragraphs: [
          "Send it after the work is finished and you have left, or while you are still packing up if they asked you to text the link. “Hi [first name], this is [your name] at [business]. If you have a minute, a Google review helps other people find us: [link].”",
          "Use their first name, your name, and the write-a-review link. Do not add a star rating, a suggested sentence, or a coupon. One text. If they do not answer, that is the end of the text thread.",
        ],
      },
      {
        title: "When they asked you to send it",
        paragraphs: [
          "If you asked in person and they said “text me the link,” send only the link and a short reminder of that conversation. “Hi [first name], here’s the Google review link I mentioned: [link]. Thank you.”",
          "That message is not a second ask. You already asked. Do not follow it the next day with a different version of the same request.",
        ],
      },
      {
        title: "Texts to skip",
        paragraphs: [
          "Do not text again a week later because the first one was ignored. Do not text every adult on the account. Do not text during a complaint, a refund, or while you are still fixing the job.",
          "If the only number you have is a front desk or a spouse who was not there, use email or the card you already left. A text to the wrong person is how a short ask becomes an angry review.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will ReputationFlow send these texts?",
        answer:
          "No. Copy the script into the phone you already use. On the Professional plan the product can email a review link when you choose the customer. It never sends SMS.",
      },
      {
        question: "How long should the text be?",
        answer:
          "One or two sentences plus the link. If the message needs a scroll to find the URL, cut it. The link should be the write-a-review URL, not your homepage.",
      },
      {
        question: "Can I name the star rating I hope for?",
        answer:
          "No. Do not write “five stars” or “if you loved it.” Ask for a Google review and stop. The customer picks the rating.",
      },
    ],
  },
  {
    slug: "review-request-email-templates",
    cluster: "ask",
    title: "Review request email templates",
    description:
      "Subject lines and short email bodies for asking a customer for a Google review after a visit, an appointment, or a job that took weeks.",
    intro:
      "Email is the right channel when you already have the address from the invoice or the booking, and a text would be a surprise. These templates are starting points. Replace the brackets. Do not attach a discount.",
    sections: [
      {
        title: "Subject lines that say what the email is",
        paragraphs: [
          "Use a subject the customer can recognize: “How was your visit at [business]?” or “The [job] at your place is finished.” Avoid “Last chance,” “We need you,” or a subject that hides the ask.",
          "One email is the program. A second email the next week, with a new subject, reads like a collection notice. If they asked you to email the link, the subject can be “The Google review link you asked for.”",
        ],
      },
      {
        title: "A short body",
        paragraphs: [
          "Thank them for the specific visit, give the link, and say they can write whatever was true. “Hi [first name], thank you for coming in to [business] today. If you have a minute, you can leave a Google review here: [link]. One note is enough. [your name]”",
          "For a job that lasted weeks, name the project and the fact that it is finished. “Hi [first name], the [kitchen / repair / install] is complete. If you are willing, here is the Google review link: [link]. Thank you, [your name].”",
        ],
      },
      {
        title: "Who sends it",
        paragraphs: [
          "On Starter, copy the email into the mail program you already use. Starter does not send email. On Professional, ReputationFlow can send the review link when you choose the customer. The message still goes to the same public page.",
          "Send it to the person who was there. Do not add a second address “so someone sees it.” Do not put a star target in the signature.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should the email include Facebook and Yelp too?",
        answer:
          "The ReputationFlow page already lists the public links you saved, including Facebook and Yelp if you added them. The email only needs that one page URL. You do not have to paste three links into the body.",
      },
      {
        question: "Can I offer a coupon in the same email?",
        answer:
          "Not for the review. A receipt or a normal thank-you can mention a standing offer you give every customer. Do not write that the offer depends on leaving a review.",
      },
      {
        question: "What if I only have a text number?",
        answer:
          "Use the text templates and send it from your phone. Do not invent an email address from a name. ReputationFlow does not look up contact details for you.",
      },
    ],
  },
  {
    slug: "negative-google-review-responses-restaurants",
    cluster: "reply",
    title: "Restaurant Google review reply templates",
    description:
      "Public reply templates for a long wait, a cold dish, a wrong order, and a reservation problem. Edit them, then post the reply on Google yourself.",
    intro:
      "These replies are for a restaurant review that is already public. They are templates, not quotes from real guests. The general process is on the negative-review guide. This page is only the dining-room situations.",
    sections: [
      {
        title: "A long wait or a cold dish",
        paragraphs: [
          "“Hi [name], I’m [your name] at [restaurant]. I’m sorry the wait ran long / the [dish] was not hot. If you are willing, call me at [phone] and I will look at that ticket. Thank you for telling us.”",
          "Do not argue the ticket time in public, and do not name the server as the problem. Offer a phone call. You can invite them back to remake the dish. Do not write that the remake depends on them changing the review.",
        ],
      },
      {
        title: "A wrong order or a reservation",
        paragraphs: [
          "“Hi [name], I’m [your name] at [restaurant]. I’m sorry we got the order wrong / the reservation was not at the table you expected. Please call [phone] and I will find the check. I won’t go through the whole tab on this page.”",
          "If you comp or redo something, do it because the meal was wrong, not because a star rating moved. Say that in the kitchen, not as a bargain in the reply.",
        ],
      },
      {
        title: "What to leave off the page",
        paragraphs: [
          "Do not post the guest’s phone number, a card dispute, or a medical note about an allergy beyond what they already wrote. If they described an allergy, invite them to call and keep the clinical detail off the reply.",
          "A review of a different restaurant, or a review that describes a dish you do not serve, can be reported through Google’s own flag. ReputationFlow does not file that report. A public reply can still say you cannot find the visit.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I offer a free meal to remove the review?",
        answer:
          "No. Fix the meal if it was wrong, and let them decide whether to update the review. A free meal in exchange for a deletion is an incentive.",
      },
      {
        question: "Who should sign the reply?",
        answer:
          "A person with a name: the manager on duty or the owner. “Management” is harder to trust, and it gives the next guest nobody to call.",
      },
      {
        question: "Can ReputationFlow post this on Google?",
        answer:
          "No. You paste it into the Business Profile yourself. Professional can draft a reply from a private note for you to edit. The draft is not published for you.",
      },
    ],
  },
  {
    slug: "negative-google-review-responses-contractors",
    cluster: "reply",
    title: "Contractor Google review reply templates",
    description:
      "Public reply templates for a punch-list complaint, a late job, a messy site, and a subcontractor problem. Edit them before you post on Google.",
    intro:
      "These are for a general contractor answering a review that is already on the company profile. They are templates with brackets, not stories from a real job. Specialty trades have their own ask pages. This page is the public reply.",
    sections: [
      {
        title: "A punch list or a late finish",
        paragraphs: [
          "“Hi [name], I’m [your name] at [company]. I’m sorry the [item] was still open at the walkthrough / the finish ran past the date we gave you. Please call me at [phone] and I will set a time to close it. I won’t argue the schedule on this page.”",
          "Name the kind of work only as far as they already did. Do not paste the contract, the change-order total, or the other homeowner’s address.",
        ],
      },
      {
        title: "Dust, damage, or a subcontractor",
        paragraphs: [
          "“Hi [name], I’m [your name] at [company]. I’m sorry the house was left dusty / something was damaged. Call [phone] and I will look at it myself. If a subcontractor did that part, I still want the call to come to me.”",
          "Do not blame a named subcontractor in public. You can sort that out on the phone. A reply that points at someone else is what the next homeowner remembers.",
        ],
      },
      {
        title: "A review that is not your job",
        paragraphs: [
          "If the review describes a trade you did not perform or a town you do not work in, say you cannot find the project and give a phone number. Use Google’s report flow if it is the wrong business. Do not promise the review will come down.",
          "ReputationFlow does not contact Google for you and does not sell removal.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should the reply quote the contract?",
        answer:
          "No. A public reply is not the place for clause numbers, retainage, or the price. Offer a call. Keep the paperwork in your own file.",
      },
      {
        question: "Can I waive a change order if they edit the review?",
        answer:
          "No. Finish the work you agreed to. Do not price a change order off a star rating.",
      },
      {
        question: "Is this the same as the plumber or roofer page?",
        answer:
          "No. Those pages are about when that trade should ask for a review. This page is only the public reply after a hard review of a contracting company.",
      },
    ],
  },
  {
    slug: "negative-google-review-responses-dentists",
    cluster: "reply",
    title: "Dentist Google review reply templates",
    description:
      "Public reply templates for a long wait, a billing dispute, and a painful visit. Keep treatment details off the page. Not clinical or legal advice.",
    intro:
      "A dental review is public, and the reply is public. These templates avoid treatment details on purpose. This is not clinical advice and not legal advice. If you are unsure what you can confirm about a patient, ask your own counsel before you post.",
    sections: [
      {
        title: "A wait or a painful visit",
        paragraphs: [
          "“Hi [name], I’m [your name] at [practice]. I’m sorry the visit ran long / you left uncomfortable. Please call me at [phone]. I don’t want to discuss the appointment on a public page.”",
          "Do not name a tooth, a procedure, a diagnosis, or a medication in the reply, even if the reviewer did. You can acknowledge that the visit was a bad experience without confirming care.",
        ],
      },
      {
        title: "A bill",
        paragraphs: [
          "“Hi [name], I’m [your name] at [practice]. I want to sort out the bill with you. Please call [phone] and have the statement handy. I won’t discuss the amount here.”",
          "Do not argue insurance, write off a balance in the reply, or offer to change the review in exchange for a refund. A billing fix is a phone call.",
        ],
      },
      {
        title: "What not to confirm",
        paragraphs: [
          "Do not write “we saw you on Tuesday for a crown” or anything else that tells the public they are a patient and what was done. A short apology and a phone number is the whole public reply.",
          "Staff reviews and reviews you wrote yourself do not belong on the profile. If a review describes a service you do not offer, use Google’s report flow. This product does not file it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I say whether they are a patient?",
        answer:
          "This page will not give you a rule for your state. The safe public reply does not confirm care. Call them, and ask your own counsel if a reviewer has already posted clinical detail.",
      },
      {
        question: "Should I ask them to delete a review about pain?",
        answer:
          "No. You can invite them to call and, if you resolve it, they can update the review if they want to. Do not offer a refund or a free visit for a deletion.",
      },
      {
        question: "Who signs it?",
        answer:
          "A named person at the practice: the owner dentist or the office manager. Do not have the front desk post a reply that describes the appointment.",
      },
    ],
  },
  {
    slug: "negative-google-review-responses-salons",
    cluster: "reply",
    title: "Salon Google review reply templates",
    description:
      "Public reply templates for a color complaint, a cut, a long wait, and a stylist the guest did not expect. Edit them, then post on Google yourself.",
    intro:
      "These templates are for a salon answering a review that is already public. They are not real guest reviews. A barbershop has a different ask page. This page is the reply after a hard salon review.",
    sections: [
      {
        title: "Color or a cut they do not like",
        paragraphs: [
          "“Hi [name], I’m [your name] at [salon]. I’m sorry the color / the cut was not what you wanted. Please call me at [phone] and we will look at it. I don’t want to troubleshoot the formula on this page.”",
          "You can offer to correct the service because the result was wrong. Do not write that the correction happens only if they delete or change the review.",
        ],
      },
      {
        title: "A wait or the wrong stylist",
        paragraphs: [
          "“Hi [name], I’m [your name] at [salon]. I’m sorry you waited / you were not in [stylist]’s chair. Call [phone] and I will look at the book. We’ll sort the next appointment offline.”",
          "Do not describe another guest’s appointment to explain the delay. Do not post the stylist’s personal number if the shop number is the right one.",
        ],
      },
      {
        title: "Photos and formulas",
        paragraphs: [
          "Do not post a before-and-after in the reply to prove your side. Do not publish the color formula. If they want a correction, that conversation is in the salon.",
          "A one-line thank-you is still right for the ordinary reviews on the same profile. This page is only the hard ones.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should each stylist reply on a personal profile?",
        answer:
          "Reply on the shop profile the guest can find, and sign with your name. A second Google profile is for a second real location, not a separate page for every chair.",
      },
      {
        question: "Can I comp the service if they take the review down?",
        answer:
          "No. Correct the hair if you are willing to, and leave the review where they put it. A comp tied to a deletion is an incentive.",
      },
      {
        question: "What if the review is about a barber, not this salon?",
        answer:
          "Say you cannot find the appointment and give the shop number. If it is the wrong business, use Google’s report flow. A barbershop ask is a different page on this site.",
      },
    ],
  },
  {
    slug: "google-review-qr-code-on-invoices",
    cluster: "distribution",
    title: "Google review QR code on invoices",
    description:
      "Where to put a Google review QR code on an invoice or receipt, what caption to print, and how big the code needs to be to scan.",
    intro:
      "The invoice is already in the customer’s hand when they pay. That is a better place for a review QR code than a homepage or a magnet they will not keep. This page is about the paper. The broader placement list is the QR code ideas guide.",
    sections: [
      {
        title: "Where on the page",
        paragraphs: [
          "Put the code in a blank corner of the invoice or on the payment receipt, away from the total and the card line. The customer should be able to scan it without covering the amount they are paying.",
          "One code. If you also want Facebook and Yelp, point the code at your ReputationFlow page, which lists those links. A second code for a different site makes people guess.",
        ],
      },
      {
        title: "The caption",
        paragraphs: [
          "Print “Scan to leave a Google review” and your business name. Do not print a star target, a sample sentence, or a discount. The caption is the instruction. The customer writes the review.",
          "If the code opens your ReputationFlow page rather than Google directly, say “Scan to leave a review” so you are not promising a Google form when the page also shows Facebook and Yelp.",
        ],
      },
      {
        title: "Size and the file",
        paragraphs: [
          "Keep the printed code large enough to scan at arm’s length. If you shrink it until it sits inside a footer line, people will not try twice. The free QR generator on this site downloads a PNG and can also make a table tent if the invoice is the wrong surface.",
          "Generate the code from the write-a-review URL or from your ReputationFlow link. Do not code your homepage and hope they find the review button.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should the code be on every invoice?",
        answer:
          "Yes, on the invoices for finished work. Do not add it to an estimate or a past-due notice. The ask belongs with a completed visit, not with a bill they are upset about.",
      },
      {
        question: "Can I use the same file for the truck and the invoice?",
        answer:
          "Yes, if both should open the same review link. Reprint it when the link changes. An old code that opens a retired profile is worse than no code.",
      },
      {
        question: "Does ReputationFlow print the invoice?",
        answer:
          "No. You put the downloaded PNG into the invoice template you already use. The product makes the link and the QR code. It does not replace your billing software.",
      },
    ],
  },
  {
    slug: "google-review-requests-for-multiple-locations",
    cluster: "distribution",
    title: "Google review requests for multiple locations",
    description:
      "How to ask for Google reviews when a business has more than one location: one profile and one link per real place, and what ReputationFlow stores on a plan.",
    intro:
      "Each real location has its own Google Business Profile and its own review link. A QR code for the downtown shop should not open the review form for the shop across town. This page does not publish city pages or a quota of reviews per location.",
    sections: [
      {
        title: "One profile, one link",
        paragraphs: [
          "Open the Business Profile for the location the customer actually visited. Use Ask for reviews on that profile, or paste that Place ID into the free generator. Repeat for the next location. Do not reuse one short link for two addresses.",
          "Staff should know which code is on the counter. A card that says the street name under the QR code stops a customer from reviewing the wrong place.",
        ],
      },
      {
        title: "What the product stores",
        paragraphs: [
          "Starter includes one review link. Professional adds additional location links on the same ReputationFlow page, and it is $20 per month. The customer still chooses which public link to open. The product does not merge two Google profiles into one.",
          "If the locations are separate brands with separate owners, use separate accounts. Additional links are for locations of the business on that account, not a directory of other companies.",
        ],
      },
      {
        title: "The ask stays local",
        paragraphs: [
          "Name the visit and the location in the text or email you send yourself. “Thanks for coming in on [street]” is enough. Do not blast every customer from every shop with one message.",
          "ReputationFlow does not send SMS, and it does not watch your locations to decide who to ask. You choose the customer and the link.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can two locations share a review count?",
        answer:
          "Not on Google. Reviews attach to the profile the customer opened. Sending people to the other profile does not move those reviews, and this page will not pretend it does.",
      },
      {
        question: "Should a service area with no storefront use a separate link per town?",
        answer:
          "Use the Google profile that matches how you are listed. A service-area business with one profile gets one review link. Do not create a profile per town to collect reviews. This site does not publish town pages.",
      },
      {
        question: "Where do I make the second link?",
        answer:
          "Use the free Google review link generator once per Place ID. Save the first on your ReputationFlow page. Additional location links are a Professional feature.",
      },
    ],
  },
  {
    slug: "negative-google-review-responses-auto-repair",
    cluster: "reply",
    title: "Auto repair shop Google review reply templates",
    description:
      "Public reply templates for an auto repair shop: a price surprise, a repeat repair, a car that was not ready, and a review from someone you cannot find.",
    intro:
      "These replies are for an auto repair review that is already public. They are templates for you to edit, not quotes from real customers. Post the reply on Google yourself.",
    sections: [
      {
        title: "A bill higher than the estimate",
        paragraphs: [
          "“Hi [name], I’m [your name] at [shop]. I’m sorry the final bill was a surprise. Please call me at [phone] and I will walk through the work order with you line by line.”",
          "Do not post the invoice, the parts list, or the customer’s vehicle details in public. Explain the line items on the phone, where you can answer follow-up questions.",
        ],
      },
      {
        title: "The same problem came back",
        paragraphs: [
          "“Hi [name], I’m sorry the [problem] came back after the repair. Bring it in or call [phone] and I will have [tech or owner] look at it first.”",
          "Do not argue warranty terms in the reply. If the repair has a warranty, explain it in person. Do not make a free fix depend on the review being changed.",
        ],
      },
      {
        title: "The car was not ready, or you cannot find the visit",
        paragraphs: [
          "“Hi [name], I’m sorry the car was not ready when we said it would be. That is on us to communicate. Please call [phone] so I can look at what happened.”",
          "If you cannot find a work order, say so politely and invite a call. A review that is not about your shop can be reported through Google’s own flag. ReputationFlow does not file that report.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I reply to every one-star review?",
        answer:
          "Reply to the ones that describe a real visit. Keep it short, sign your name, and move the details to a phone call.",
      },
      {
        question: "Can I offer a discount if they change the review?",
        answer: "No. Fix the car if the work was wrong. A discount in exchange for a better rating is an incentive.",
      },
      {
        question: "Can ReputationFlow post the reply for me?",
        answer:
          "No. You paste it into your Google Business Profile yourself. Professional can draft a reply from private feedback for you to edit.",
      },
    ],
  },
  {
    slug: "negative-google-review-responses-hvac",
    cluster: "reply",
    title: "HVAC Google review reply templates",
    description:
      "Public reply templates for an HVAC company: a missed appointment window, a system still not cooling, a price complaint, and a tech complaint.",
    intro:
      "These replies are for an HVAC review that is already public. Edit them before you post. They are templates, not real customer quotes.",
    sections: [
      {
        title: "A missed window or a no-show",
        paragraphs: [
          "“Hi [name], I’m [your name] at [company]. I’m sorry we missed the window you were given. Please call me at [phone] and I will get you on the schedule.”",
          "Do not blame the dispatcher or the weather in public. One sentence of apology and a phone number is enough.",
        ],
      },
      {
        title: "Still not cooling or heating",
        paragraphs: [
          "“Hi [name], I’m sorry the system is still not working the way it should. Call [phone] and I will send someone back to look at it.”",
          "Keep model numbers, refrigerant details, and the customer’s address off the page. Those belong in the service call.",
        ],
      },
      {
        title: "A complaint about a technician or the price",
        paragraphs: [
          "“Hi [name], thank you for telling us. I want to hear what happened. Please call me at [phone].”",
          "Do not name the technician in the reply, and do not post the quote. Talk to your tech before you call the customer back.",
        ],
      },
    ],
    faqs: [
      {
        question: "How fast should I reply?",
        answer: "Within a day or two is a good habit. A late reply is still better than none.",
      },
      {
        question: "Should I mention the tech by name?",
        answer: "No. Sign the reply with your own name and keep staff names off the public page.",
      },
      {
        question: "Does ReputationFlow catch unhappy customers first?",
        answer:
          "It can collect optional private feedback on your review page. Every customer can still choose to leave a public Google review.",
      },
    ],
  },
  {
    slug: "how-to-respond-to-a-google-review-with-no-text",
    cluster: "reply",
    title: "How to respond to a Google review with no text",
    description:
      "What to write when a customer leaves only a star rating: short replies for five stars, one star, and ratings you cannot match to a customer.",
    intro:
      "Many Google reviews are a star rating with no words. You can still reply. Keep it short, because there is nothing specific to answer.",
    sections: [
      {
        title: "Four or five stars, no text",
        paragraphs: [
          "“Thank you, [name]. We appreciate you taking the time to rate [business].”",
          "Do not invent details about the visit. If you know who it was, a specific thank-you is fine. If not, keep it general.",
        ],
      },
      {
        title: "One or two stars, no text",
        paragraphs: [
          "“Hi [name], I’m sorry your visit was not what you hoped. I’d like to hear what happened. Please call me at [phone].”",
          "Do not ask them to explain in public, and do not guess what went wrong. A calm reply also shows the next reader how you handle problems.",
        ],
      },
      {
        title: "A rating you cannot match to a customer",
        paragraphs: [
          "Reply the same way and invite a call. Do not accuse the reviewer of being fake in public.",
          "If you believe the rating breaks Google’s rules, you can report it through Google’s own flag. ReputationFlow does not file that report.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it worth replying to a star-only review?",
        answer: "Yes. A short reply shows people reading your profile that someone is paying attention.",
      },
      {
        question: "Can I ask them to add text to the review?",
        answer:
          "Do not pressure them. You can invite a call if the rating was low. Asking them to change their rating is not allowed.",
      },
      {
        question: "Can ReputationFlow draft these replies?",
        answer:
          "Professional can draft a reply from private feedback for you to edit. You post every reply on Google yourself.",
      },
    ],
  },
]
