export interface IndustryPage {
  slug: string
  name: string
  businessLabel: string
  keyword: string
  title: string
  description: string
  guideHeading: string
  intro: string
  bestMoment: string
  sampleMessage: string
  moments: string[]
  tips: { title: string; body: string }[]
  faqs: { question: string; answer: string }[]
  seeAlso?: { slug: string; label: string; lead: string }
  spokes?: { slug: string; label: string }[]
}

export const industries: IndustryPage[] = [
  {
    slug: "plumber",
    name: "Plumbers",
    businessLabel: "plumbing company",
    keyword: "google review qr code for plumbers",
    title: "Google review QR code for plumbers",
    description:
      "How to get more Google reviews as a plumber. Ask after the water is back on, leave a QR code on the invoice, and send one short message the same day.",
    guideHeading: "How to get more Google reviews as a plumber",
    intro:
      "Homeowners pick a plumber from the Google listing while the faucet is still dripping, so the review has to be asked for before you leave the driveway.",
    bestMoment:
      "Ask when the water is back on, the leak has stopped, or the new water heater is running, and the customer is standing there watching it work. That is the moment they remember who showed up. If the call was a middle-of-the-night flood, wait until the next morning once they have confirmed the floor stayed dry.",
    sampleMessage:
      "Hi [first name], this is [your name] from [company]. The repair is finished and the water is back on. If you have a minute, a Google review helps a neighbor find a plumber who actually showed up: [link]. Thank you.",
    moments: [
      "Stick the QR code on the invoice you hand over, and leave a second card by the water heater or under the sink you worked on.",
      "Text the same link from the tech’s phone before the truck pulls away.",
      "On a callback, fix the leak first and ask only after the customer says it held.",
    ],
    tips: [
      {
        title: "Ask the person who called",
        body: "One request to the person who met you at the door is enough. Do not text every adult in the house, and do not ask the landlord and the tenant about the same job unless both hired you.",
      },
      {
        title: "Keep the message about the visit",
        body: "Name the street or say “your place.” Skip a paragraph about parts, warranties, and the next maintenance plan. The link should open the review form, not your homepage.",
      },
    ],
    faqs: [
      {
        question: "Where should a plumber put a Google review QR code?",
        answer:
          "On the invoice, and on a small card left at the fixture you repaired. A fridge magnet is easy to ignore. The invoice is in their hand while you are still in the kitchen.",
      },
      {
        question: "Should I ask for a review after an emergency call?",
        answer:
          "Yes, but not while water is still on the floor. If they thanked you on the way out, a same-day text is fine. If the visit was stressful, send it the next morning after they have had a quiet hour.",
      },
      {
        question: "Can I waive the dispatch fee for a five-star review?",
        answer:
          "No. Tie a fee, a coupon, or a free next visit to a review and you are offering an incentive. Ask because the listing is how the next leak finds you, and leave the price of the job out of the message.",
      },
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    businessLabel: "HVAC company",
    keyword: "google review qr code for hvac companies",
    title: "Google review QR code for HVAC companies",
    description:
      "How to get more Google reviews as an HVAC company. Ask when the system is running, put a QR code on the service sticker, and text one message the same day.",
    guideHeading: "How to get more Google reviews as an HVAC company",
    intro:
      "A no-cool call is won or lost on the Google listing before the dispatcher answers, so the review ask belongs at the end of the visit, not in a newsletter.",
    bestMoment:
      "Ask after the customer has felt the air change. That is the end of a no-cool or no-heat call, a tune-up, or a changeout, once you have shown them the thermostat and the filter. On an install, wait until the old equipment is out of the driveway and you have walked the new system together.",
    sampleMessage:
      "Hi [first name], [tech name] with [company]. Your system is running again. If the visit was useful, a Google review helps the next person whose house is too hot or too cold: [link].",
    moments: [
      "Point at the QR code on the service sticker you put on the air handler or the furnace.",
      "Send one text after you close the ticket, the same day, including when the customer was not home for the close.",
      "Do not ask in the middle of an estimate for a full replacement. Ask after they have approved the work and you have finished it.",
    ],
    tips: [
      {
        title: "Name the visit, not the model number",
        body: "“Tune-up,” “no heat,” or “replacement” is enough. A review request stuffed with equipment model numbers reads like a brochure and gets deleted.",
      },
      {
        title: "One link per Google profile",
        body: "Maintenance-plan customers and one-time calls use the same review link when they share one Google profile. A second brand or a second city profile needs its own link, and every customer of that profile still sees the public buttons.",
      },
    ],
    faqs: [
      {
        question: "Should the tech ask in the driveway or send a text later?",
        answer:
          "Ask in the house if the customer is there, then send one text the same day for anyone who was at work. A second text the following week is how review requests start to feel like collections.",
      },
      {
        question: "What if the house was still warm when I left?",
        answer:
          "Do not ask yet. Come back or talk them through the thermostat, confirm the temperature held, and send the link after that. A review request in the middle of a callback asks them to praise a job you have not finished.",
      },
      {
        question: "Can I offer a free filter for a review?",
        answer:
          "No. A filter, a diagnostic, or a maintenance-plan discount in exchange for stars is an incentive. Leave the filter price on the invoice and the review link next to it, with no bargain attached.",
      },
    ],
  },
  {
    slug: "electrician",
    name: "Electricians",
    businessLabel: "electrical company",
    keyword: "google review qr code for electricians",
    title: "Google review QR code for electricians",
    description:
      "How to get more Google reviews as an electrician. Ask when the lights or the panel are back on, put a QR code on the invoice, and wait for the inspection on permitted work.",
    guideHeading: "How to get more Google reviews as an electrician",
    intro:
      "People search for an electrician after a dead outlet or a panel that looks wrong, and they choose from a handful of recent Google reviews.",
    bestMoment:
      "Ask when the device works and the panel cover is back on. Walk them through what changed, show the tester if you used one, and then hand the link. On a permitted job, the cleaner moment is after the final inspection passes, because that is when the customer feels the work is actually done.",
    sampleMessage:
      "Hi [first name], this is [your name] at [company]. The electrical work at your place is finished and tested. If we left the site clean and explained what changed, a Google review helps the next homeowner: [link].",
    moments: [
      "Put the QR code on the invoice and on a card left at the panel for a service upgrade.",
      "Text the link when you send the photo of the finished work, if you already send one.",
      "For an EV charger or a lighting install, ask at the walkthrough when they have switched it on themselves.",
    ],
    tips: [
      {
        title: "Separate the estimate from the ask",
        body: "A panel quote is a sales conversation. The review ask comes after the work is installed and labeled, not while they are still deciding whether to hire you.",
      },
      {
        title: "Do not describe the hazard in the text",
        body: "“The work is finished and tested” is enough. A message that recaps a burnt breaker or a DIY mistake is not something they want to forward, and it is not what you want sitting in a screenshot.",
      },
    ],
    faqs: [
      {
        question: "Should electricians ask before or after inspection?",
        answer:
          "For a simple repair with no permit, ask when you pack up. For a service change, a charger, or anything that needs a green tag, ask after the inspector signs off. That is the day the customer stops worrying about it.",
      },
      {
        question: "Who should send the message, the owner or the tech?",
        answer:
          "The person who was in the house. A review request from a name they never met gets ignored. If office staff send it, use the tech’s first name in the first line.",
      },
      {
        question: "Can I discount the next call for a review?",
        answer:
          "No. Do not trade service-call pricing for stars. If you want more reviews, ask every finished job the same way, including the small outlet repairs.",
      },
    ],
  },
  {
    slug: "roofer",
    name: "Roofers",
    businessLabel: "roofing company",
    keyword: "google review qr code for roofers",
    title: "Google review QR code for roofers",
    description:
      "How to get more Google reviews as a roofer. Ask at the final walkthrough, put a QR code in the warranty packet, and text the homeowner once the crew is gone.",
    guideHeading: "How to get more Google reviews as a roofer",
    intro:
      "A roof is hired from photos and recent Google reviews, then judged on whether the yard was clean when the crew left.",
    bestMoment:
      "Ask at the final walkthrough, on the ground, after the magnets have picked up the nails and the homeowner has looked at the ridge, the flashing, and the gutters with you. Do not ask while people are still on the roof, and do not wait for the first big storm. They will forget who was up there.",
    sampleMessage:
      "Hi [first name], this is [your name] at [company]. We finished the roof and the crew is gone. If you are happy with the work and the cleanup, a Google review helps another homeowner choose a roofer: [link].",
    moments: [
      "Put the QR code in the warranty packet you hand them, not on a shingle sample that goes in the garage.",
      "Text the link when you send the final invoice.",
      "Send it to the person who signed and walked the roof with you. One request.",
    ],
    tips: [
      {
        title: "Leave insurance talk out of the ask",
        body: "The review message is about the roof and the cleanup. Do not mention claims, supplements, or deductibles. Those conversations belong on the phone, not in a text they might screenshot.",
      },
      {
        title: "Storm jobs and retail jobs use the same page",
        body: "Do not hide the Google button because a supplement was disputed. If something leaks later, reply in public with a time you can come look, and keep the public links on the page.",
      },
    ],
    faqs: [
      {
        question: "Should roofers ask for a review before the first rain?",
        answer:
          "Ask at the walkthrough. Offer to come back if something drips, and do not hold the request until the next season. You can still show up if a leak appears later.",
      },
      {
        question: "Can I offer to cover a deductible for a review?",
        answer:
          "No. A deductible, a free upgrade, or any price cut tied to stars is an incentive, and it can also create a problem with the carrier. Keep the contract and the review request separate.",
      },
      {
        question: "What belongs in the warranty packet besides the QR code?",
        answer:
          "The manufacturer warranty, your workmanship warranty, and a phone number for leaks. The QR card can say “Review the job” and nothing else. Do not attach a script for what they should write.",
      },
    ],
  },
  {
    slug: "painter",
    name: "Painters",
    businessLabel: "painting company",
    keyword: "google review qr code for painters",
    title: "Google review QR code for painters",
    description:
      "How to get more Google reviews as a painter. Ask at the daylight walkthrough after touch-ups, leave a QR code with the final invoice, and mention the cleanup.",
    guideHeading: "How to get more Google reviews as a painter",
    intro:
      "Painting reviews mention lines, color, and whether the crew left the floors clean. Ask while they can still see all three.",
    bestMoment:
      "Ask at the final walkthrough in daylight, after you have done the touch-ups they pointed out and the floors, outlets, and furniture are back. Evening light hides edges. If they work days and you finish at 4, text the link that evening and offer a Saturday walkthrough for anything you missed.",
    sampleMessage:
      "Hi [first name], this is [your name] at [company]. We finished the painting and packed up. If the lines and the cleanup look right, a Google review helps the next neighbor who is hiring a painter: [link].",
    moments: [
      "Clip the QR code to the final invoice and the leftover-paint labels.",
      "Ask the person who picked the colors and walked the rooms with you.",
      "On an exterior job, ask from the curb once the tape and the ladders are gone.",
    ],
    tips: [
      {
        title: "Do the punch list before the ask",
        body: "A review request sent while blue tape is still on the trim invites a review about the tape. Walk the rooms, fix the holidays, then send the link.",
      },
      {
        title: "Color complaints are not a reason to hide the link",
        body: "If they dislike a color they chose, talk about a repaint on the phone. The Google button stays on the page. Do not offer a free room in exchange for changing a star rating.",
      },
    ],
    faqs: [
      {
        question: "When should a painter send the review text?",
        answer:
          "The day you finish, after the walkthrough. A message a week later lands after they have stopped noticing the walls. If dry time means you come back to reinstall hardware, ask on that last trip.",
      },
      {
        question: "Should interior and exterior crews use different links?",
        answer:
          "Only if they are different Google profiles. One company profile means one review link, whether the job was a bedroom or the whole elevation.",
      },
      {
        question: "What if they want to wait and live with the color?",
        answer:
          "That is reasonable. Send the link anyway and tell them there is no rush, then stop. Do not schedule a series of reminders. One message plus the card on the invoice is the whole program.",
      },
    ],
  },
  {
    slug: "contractors",
    name: "Contractors",
    businessLabel: "contracting business",
    keyword: "google review qr code for contractors",
    title: "Google review QR code for contractors",
    description:
      "How to get more Google reviews as a contractor. Ask at the final walkthrough, text the link with the final invoice, and leave a QR card after the punch list.",
    guideHeading: "How to get more Google reviews as a contractor",
    intro:
      "Homeowners compare contractors on a handful of recent Google reviews, and the job ends at the final walkthrough, which is the moment they will actually write one.",
    bestMoment:
      "Ask when the punch list is done and you are standing in the finished room with the person who signed the contract. The dust should be gone and the subcontractors should be off the job. That walkthrough is the ask. The invoice text is only the backup if they did not do it while you were there.",
    sampleMessage:
      "Hi [first name], this is [your name] at [company]. We finished the [kitchen / bath / addition] and the punch list is complete. If the work and the cleanup were what you expected, a Google review helps the next homeowner: [link].",
    moments: [
      "Text the review link when you send the final invoice.",
      "Leave a printed QR card on the counter after the walkthrough.",
      "Ask the person who signed the contract, not every trade who worked in the house.",
    ],
    tips: [
      {
        title: "Name the project, not a discount",
        body: "“How was the kitchen?” is enough context. Do not offer money off the next job, a waived change order, or a free fixture in exchange for stars.",
      },
      {
        title: "Reply to the ordinary reviews too",
        body: "A calm public reply that offers a time to fix a leftover item is more useful than trying to keep that review off Google. Draft it, edit the specifics, and post it yourself.",
      },
    ],
    faqs: [
      {
        question: "Should I ask at the start of a remodel or the end?",
        answer:
          "The end. A review written after demolition describes noise and dust. A review written after the walkthrough describes the job you want the next customer to read.",
      },
      {
        question: "What if the project had change orders and tension?",
        answer:
          "Still ask, once the agreed work is done. Skipping anyone who was difficult is how a listing fills up with only the easy jobs, and it is also how people feel screened. The public links stay on the page either way.",
      },
      {
        question: "Can each project manager use a personal Google profile?",
        answer:
          "Use the company profile the homeowner can find. A second profile is for a second real location, not a separate page for every superintendent.",
      },
    ],
    spokes: [
      { slug: "plumber", label: "Plumbers" },
      { slug: "electrician", label: "Electricians" },
      { slug: "hvac", label: "HVAC" },
      { slug: "roofer", label: "Roofers" },
      { slug: "painter", label: "Painters" },
    ],
  },
  {
    slug: "landscaper",
    name: "Landscapers",
    businessLabel: "landscaping company",
    keyword: "google review qr code for landscapers",
    title: "Google review QR code for landscapers",
    description:
      "How to get more Google reviews as a landscaper. Ask at the install walkthrough, put a QR code with the plant list, and text the person who approved the plan.",
    guideHeading: "How to get more Google reviews as a landscaper",
    intro:
      "A landscape install is judged in person, in the yard, on the day the beds, the patio, or the lights are finished. That is when a Google review gets written.",
    bestMoment:
      "Ask at the install walkthrough, while you and the homeowner are standing in the yard looking at the finished work. Point out watering, the plant list, and what will settle in the first month, then hand them the link. Do not ask on the sales visit, and do not ask the day the excavator shows up.",
    sampleMessage:
      "Hi [first name], this is [your name] at [company]. We finished the [patio / planting / lighting] at your place. If you like how it turned out, a Google review helps other homeowners find a landscaper: [link].",
    moments: [
      "Staple the QR code to the plant list or the care sheet you leave on the counter.",
      "Text the person who approved the design, the day the crew demobilizes.",
      "For a multi-week hardscape job, ask once at the end, not after every delivery of stone.",
    ],
    tips: [
      {
        title: "Installs and mowing routes are different asks",
        body: "A design-build client should hear from the person who sold and walked the job. A weekly mow is a different business rhythm. If you do both, keep the wording specific to the work you just finished.",
      },
      {
        title: "Photos are optional",
        body: "You can ask if they are willing to share a photo of the finished yard. Do not make the review conditional on a photo, and do not hand them a caption to paste.",
      },
    ],
    faqs: [
      {
        question: "Should landscapers ask before the plants have settled?",
        answer:
          "Ask at the walkthrough about the install: communication, cleanup, and whether the plan matches what they approved. You can invite them to update the review later if they want to talk about how the garden looks in a season. Do not withhold the request until spring.",
      },
      {
        question: "Who gets the text on a couple’s account?",
        answer:
          "The person who met you for the design and signed the proposal. If both were at the walkthrough, one message to the shared email or the person who answers the phone is enough.",
      },
      {
        question: "Can I discount the next phase if they review this one?",
        answer:
          "No. A patio now and a planting later can both be asked about when each phase is done. Do not price phase two off the stars on phase one.",
      },
    ],
    seeAlso: {
      slug: "lawn-care",
      label: "Google review QR code for lawn care",
      lead: "Weekly mowing and treatment routes use a different ask. Read the",
    },
  },
  {
    slug: "lawn-care",
    name: "Lawn care",
    businessLabel: "lawn care company",
    keyword: "google review qr code for lawn care",
    title: "Google review QR code for lawn care",
    description:
      "How to get more Google reviews as a lawn care company. Ask after a visit they can see from the driveway, and text one link when the crew marks the property done.",
    guideHeading: "How to get more Google reviews as a lawn care company",
    intro:
      "Lawn care customers hire from the truck, the neighbor’s yard, and the Google listing. They rarely visit a website, so the ask has to ride along with a visit they can see.",
    bestMoment:
      "Ask after a visit the customer can see from the street: the first full mow, a seasonal cleanup, or a treatment once the yard looks finished. Skip the sales estimate. On a recurring route, ask after the first month of service, not after every Tuesday.",
    sampleMessage:
      "Hi [first name], [company] finished today’s visit at your place. If the lawn looks the way you wanted, a Google review helps a neighbor find a crew: [link]. Thank you.",
    moments: [
      "Text the link when the crew lead marks the property done.",
      "Leave a door hanger with the QR code on seasonal cleanups, when nobody is home.",
      "Ask new recurring customers once after the first month, then leave them alone.",
    ],
    tips: [
      {
        title: "One message, sent by a person",
        body: "ReputationFlow sends the email you trigger. It does not watch your routing software and text every stop. If your office texts from the route sheet, send one message per customer, not a blast every week.",
      },
      {
        title: "A missed yard is a phone call",
        body: "If a property was skipped, call them about the miss. You can still leave the Google link on the page. Do not bury a public review button because the week went badly.",
      },
    ],
    faqs: [
      {
        question: "How often should a lawn route ask for a Google review?",
        answer:
          "Once after the first month, and again at renewal if you want a fresh review. Weekly customers will tune out a text after every mow, and some will say so in the review.",
      },
      {
        question: "What if the customer is never home?",
        answer:
          "Use the door hanger on a cleanup, then one text the same day. Do not leave a hanger every visit. The hanger should have the QR code, your name, and a normal phone number.",
      },
      {
        question: "Should treatment customers and mow customers use the same link?",
        answer:
          "Yes, when they review the same company profile. Mention the visit they just received so the review is about fertilization or about mowing, not a generic “great service.”",
      },
    ],
    seeAlso: {
      slug: "landscaper",
      label: "Google review QR code for landscapers",
      lead: "Design and install work has its own walkthrough. Read the",
    },
  },
  {
    slug: "pest-control",
    name: "Pest control",
    businessLabel: "pest control company",
    keyword: "google review qr code for pest control",
    title: "Google review QR code for pest control",
    description:
      "How to get more Google reviews as a pest control company. Ask when the visit is explained, use a QR code on the service ticket, and skip the quarterly nag.",
    guideHeading: "How to get more Google reviews as a pest control company",
    intro:
      "Pest control is hired in a hurry and compared on Google. The review should talk about whether you showed up and explained the plan, not name the pest in a text the customer did not ask for.",
    bestMoment:
      "Ask when the technician has finished and has told the customer what was treated, what to expect next, and what to do before the follow-up. For a one-time infestation, wait until the follow-up visit confirms activity dropped, then ask. For a new quarterly account, ask after the first service, not after every quarter.",
    sampleMessage:
      "Hi [first name], [tech] from [company]. We finished today’s service. If we explained the plan clearly, a Google review helps a neighbor who needs the same kind of visit: [link].",
    moments: [
      "Print the QR code on the service ticket they sign.",
      "Text the link the same day if they were not home and you left a door tag.",
      "Ask again at renewal, a year later, if you want a newer review. Skip the months in between.",
    ],
    tips: [
      {
        title: "Do not name the pest in the text",
        body: "“Today’s service” is enough. A message that says roaches, bed bugs, or rodents is something people will not want on their phone, and it is a bad thing to have forwarded.",
      },
      {
        title: "Explain the lag before you ask",
        body: "Some treatments take days to show a result. Say that out loud, schedule the follow-up, and ask when you return. Asking them to report a result you told them not to expect yet produces confused reviews.",
      },
    ],
    faqs: [
      {
        question: "Should quarterly pest control customers get a review request every visit?",
        answer:
          "No. Ask after the initial service and when they renew. Four texts a year about the same Google link trains people to ignore you, including when you actually need to reach them about an interior visit.",
      },
      {
        question: "Can I offer a free reservice for a five-star review?",
        answer:
          "No. A reservice is part of the guarantee or it is not. Do not connect it to a star rating. If activity continues, come back because the job is not done, then ask.",
      },
      {
        question: "Should I ask customers to post photos?",
        answer:
          "No. Photos of pests, bait stations, or the inside of a home are a bad idea to request. A short review of whether the technician was on time and clear is the whole ask.",
      },
    ],
  },
  {
    slug: "cleaning-service",
    name: "Cleaning services",
    businessLabel: "cleaning service",
    keyword: "google review qr code for cleaning services",
    title: "Google review QR code for cleaning services",
    description:
      "How to get more Google reviews as a cleaning service. Ask after the first clean, text clients who were not home, and put a QR code on the leave-behind card.",
    guideHeading: "How to get more Google reviews as a cleaning service",
    intro:
      "A cleaning service is hired by people who will hand over a key. The Google review they trust mentions whether the house matched the notes, not a generic five stars.",
    bestMoment:
      "Ask after the first clean, once the client has walked the house, or by text the same day if they were at work. For recurring clients, ask after the first month. Do not attach a review request to every Tuesday invoice.",
    sampleMessage:
      "Hi [first name], [company] finished today’s clean. If the house matches what you asked for, a Google review helps someone else find a cleaning service: [link]. Reply here if a room needs another pass.",
    moments: [
      "Leave a small QR card on the counter with the notes from the clean. Pick it up next time if it is still there.",
      "Text the same day when the client is not home. That is most of a residential route.",
      "Ask the person who wrote the notes, not every roommate, unless the account is in a shared inbox they all use.",
    ],
    tips: [
      {
        title: "Invite the redo in the same message",
        body: "A line that says “reply if a room needs another pass” keeps the quality conversation on text, where you can fix it. It does not replace the Google link, and it should not say “tell us before you tell Google.”",
      },
      {
        title: "One company profile for the whole team",
        body: "Clients review the service, not each cleaner’s personal profile. Use the cleaner’s first name in the message if they know it. Keep the link pointed at the company listing.",
      },
    ],
    faqs: [
      {
        question: "How do I ask for a review when the client is never home?",
        answer:
          "Send one text the day of the first clean, and leave a single card. Include what you did in plain language, such as “kitchen, baths, and floors.” Do not send a photo of the inside of their house unless they asked you to.",
      },
      {
        question: "Should move-out cleans be asked the same way as weekly homes?",
        answer:
          "Ask the same day, because a move-out client will not be in that house next week. Send the link to the person who paid, and mention it was a move-out so the review describes the right job.",
      },
      {
        question: "Can I offer a free deep clean for a review?",
        answer:
          "No. A free deep clean, a discounted first month, or a gift card for stars is an incentive. If a first clean missed the mark, fix the rooms and ask after the redo.",
      },
    ],
  },
  {
    slug: "dentists",
    name: "Dental practices",
    businessLabel: "dental practice",
    keyword: "google review qr code for dentists",
    title: "Google review QR code for dentists",
    description:
      "How to get more Google reviews as a dentist. Ask at checkout after the visit, put a QR code on the card, and keep treatment details out of the message.",
    guideHeading: "How to get more Google reviews as a dentist",
    intro:
      "Patients decide on a dentist from the Google listing before they call. A short ask at checkout beats a stack of software the front desk will not open.",
    bestMoment:
      "Ask at checkout, after the patient is out of the chair and the visit is over. The front desk hands a card with the QR code while they schedule the next cleaning. Do not ask mid-procedure, and do not ask from the operatory while they are still numb.",
    sampleMessage:
      "Hi [first name], thank you for coming in to [practice] today. If you have a minute, a Google review helps other people choose a dentist: [link]. We read every one.",
    moments: [
      "Keep a QR card at checkout, next to the appointment book, and hand it to every patient the same way.",
      "Email the same link that afternoon for patients who booked online and left in a hurry.",
      "Put the link in post-visit instructions only after the visit, never in the reminder that goes out before they arrive.",
    ],
    tips: [
      {
        title: "Keep clinical details out of the ask",
        body: "The message should not mention a diagnosis, a tooth number, or a procedure. If a patient writes a private note, store it in the dashboard and do not repeat health information in a public reply.",
      },
      {
        title: "Reply on Google in the practice’s voice",
        body: "Use an AI draft only as a starting point, then edit it. Thank the patient, invite them to call the office, and do not confirm what was treated.",
      },
    ],
    faqs: [
      {
        question: "Should a dental office ask every patient or only hygiene visits?",
        answer:
          "Ask every patient who completed a visit, the same way. Limiting the ask to easy cleanings is a good way to train the front desk to guess who is “happy,” which is the habit to avoid.",
      },
      {
        question: "Can the message mention Invisalign, implants, or a specific treatment?",
        answer:
          "Leave treatment names out of the template. Patients can write whatever they want in their own review. Your text should thank them for the visit and include the link.",
      },
      {
        question: "Can we offer whitening or a gift card for a review?",
        answer:
          "No. Whitening, a waived copay, or a gift card for a review is an incentive. Ask at checkout because the listing is how the next patient finds the office.",
      },
    ],
  },
  {
    slug: "chiropractor",
    name: "Chiropractors",
    businessLabel: "chiropractic clinic",
    keyword: "google review qr code for chiropractors",
    title: "Google review QR code for chiropractors",
    description:
      "How to get more Google reviews as a chiropractor. Ask at the front desk when they book the next visit, and do not request a review after every adjustment.",
    guideHeading: "How to get more Google reviews as a chiropractor",
    intro:
      "A chiropractic clinic lives on the Google listing and on whether the front desk is easy to deal with. Ask there, not while someone is still on the table.",
    bestMoment:
      "Ask at the front desk when a patient is scheduling the next visit or checking out from a first appointment. Do not ask during the adjustment. For patients who come every week, ask after the first visit and again when a plan of care ends. An ask after every adjustment will annoy the people who like you.",
    sampleMessage:
      "Hi [first name], this is [clinic]. Thank you for coming in today. If the visit was easy to schedule and the team was clear, a Google review helps a neighbor find the office: [link].",
    moments: [
      "Stand a small QR code at the front desk, where they already have their phone out to book.",
      "Send one email the same day to new patients.",
      "Skip the request on a visit that was only a quick add-on to a weekly plan you already asked about.",
    ],
    tips: [
      {
        title: "Do not promise an outcome in the text",
        body: "The message can thank them for the visit. It should not say their pain will be gone, name a condition, or tell them what to write about results. They can describe their own experience if they want to.",
      },
      {
        title: "Same link for every provider in one office",
        body: "If the clinic has one Google profile, every chiropractor shares it. A second profile is for a second office, and that office still shows the public review links to every patient.",
      },
    ],
    faqs: [
      {
        question: "How often should a chiropractor ask a weekly patient for a review?",
        answer:
          "Twice in a plan of care is plenty: after the first visit, and when that plan ends. Weekly texts look automated and they crowd out real appointment reminders.",
      },
      {
        question: "Should I ask patients to describe their symptoms?",
        answer:
          "No. Do not steer the review toward a diagnosis or a before-and-after story. Thank them for the visit and stop. What they write is up to them.",
      },
      {
        question: "Can I comp an adjustment for a review?",
        answer:
          "No. A free visit, a waived re-exam, or a product credit tied to stars is an incentive. Keep the review card next to the scheduler and leave the fee schedule alone.",
      },
    ],
  },
  {
    slug: "med-spa",
    name: "Med spas",
    businessLabel: "med spa",
    keyword: "google review qr code for med spas",
    title: "Google review QR code for med spas",
    description:
      "How to get more Google reviews as a med spa. Ask at checkout after the client is dressed, keep treatment names out of the text, and use one QR code at the desk.",
    guideHeading: "How to get more Google reviews as a med spa",
    intro:
      "Med spa clients compare Google reviews before they book a consult. The useful ask is about the visit and the staff, and it happens at checkout, not in the treatment room.",
    bestMoment:
      "Ask at checkout, after a facial, a consult follow-up, or another visit where the client is dressed and paying. Do not ask in the treatment room. If a result takes days to show, ask them to review the visit and the team that day, and do not script what they should say about the result later.",
    sampleMessage:
      "Hi [first name], thank you for visiting [spa] today. If you have a minute, a Google review helps other people find the studio: [link]. We are glad you came in.",
    moments: [
      "Keep one QR stand at checkout, beside the card reader, for every provider.",
      "Email the link that afternoon to clients who booked online.",
      "Do not send a review request the same day as a visit the client experienced as painful or unfinished. Call them first.",
    ],
    tips: [
      {
        title: "Leave treatment names out of the template",
        body: "Your text should not name an injectable, a device, or a package. Clients may mention those in their own words. A public reply from the spa should thank them and invite a call, without confirming what was done.",
      },
      {
        title: "Do not ask for before-and-after photos",
        body: "A review does not need a photo of someone’s face. If a client offers one, that is their choice. Do not make it part of the request, and do not trade a complimentary treatment for the post.",
      },
    ],
    faqs: [
      {
        question: "When should a med spa ask if the result is not immediate?",
        answer:
          "Ask the day of the visit about scheduling, the staff, and whether they felt informed. Tell them they can add to the review later if they want to talk about the result. Do not wait two weeks and then send a message that assumes they loved it.",
      },
      {
        question: "Should providers have separate Google profiles?",
        answer:
          "Use the studio’s profile unless a provider truly operates a separate business with its own listing. Clients search for the spa they visited. One QR code at the desk keeps the reviews in that listing.",
      },
      {
        question: "Can we comp a treatment for a Google review?",
        answer:
          "No. A complimentary service, a discount on a package, or a free add-on for a review is an incentive. Ask at checkout the same way for every finished visit.",
      },
    ],
  },
  {
    slug: "vet",
    name: "Vets",
    businessLabel: "veterinary clinic",
    keyword: "google review qr code for vets",
    title: "Google review QR code for vets",
    description:
      "How to get more Google reviews as a vet. Ask at checkout after a routine visit, never after bad news, and keep the diagnosis out of the message.",
    guideHeading: "How to get more Google reviews as a vet",
    intro:
      "Pet owners choose a clinic from Google before they choose a doctor. The right ask is at checkout after an ordinary visit, and some days the right ask is no ask at all.",
    bestMoment:
      "Ask at checkout after a routine visit: wellness, vaccines, or a dental discharge when the pet is going home calm. The person who was in the room can mention it once, and the receptionist hands the card. Do not ask in the exam room after difficult news, and do not ask on the day of a euthanasia or while a pet is still hospitalized.",
    sampleMessage:
      "Hi [first name], thank you for bringing [pet name] to [clinic] today. If the visit was clear and the team was kind, a Google review helps another pet owner find the clinic: [link].",
    moments: [
      "Keep the QR code at checkout, not in the exam room.",
      "Email the link that afternoon after wellness and vaccine visits.",
      "If the owner was upset or the pet went home with a complicated plan, call about the pet first and skip the review request.",
    ],
    tips: [
      {
        title: "Some visits are not an ask",
        body: "Emergencies, euthanasia, and a pet that is still in the hospital are not review opportunities. The team should know they can skip the card without asking a manager. That judgment is part of running the front desk.",
      },
      {
        title: "Keep the diagnosis out of the message",
        body: "Use the pet’s name if you already use it in reminders. Do not name a condition, a surgery, or a medication. Public replies should thank the owner and offer the clinic phone number, nothing clinical.",
      },
    ],
    faqs: [
      {
        question: "Should a vet ask for a review after surgery?",
        answer:
          "Only after the pet is home and the owner has had the discharge call, and only if that call was calm. If there were complications, do not send the link. A wellness visit is the more reliable moment.",
      },
      {
        question: "Who is the right person to ask, the doctor or the desk?",
        answer:
          "The receptionist at checkout, with one sentence from the technician if they built the rapport. Doctors who ask in the exam room put the owner on the spot. The desk is easier to refuse, which is what you want.",
      },
      {
        question: "Can we waive an exam fee for a review?",
        answer:
          "No. An exam fee, a bag of food, or a nail trim in exchange for stars is an incentive. Hand the same card to every routine checkout.",
      },
    ],
  },
  {
    slug: "auto-repair",
    name: "Auto repair",
    businessLabel: "auto repair shop",
    keyword: "google review qr code for auto repair shops",
    title: "Google review QR code for auto repair shops",
    description:
      "How to get more Google reviews as an auto repair shop. Ask when you hand back the keys, put a QR code on the invoice, and let the advisor send one text.",
    guideHeading: "How to get more Google reviews as an auto repair shop",
    intro:
      "Drivers pick a shop from Google after the car is already making a noise. The review they trust says the advisor explained the work and the car left fixed.",
    bestMoment:
      "Ask when you return the keys and the customer has heard what you fixed, before they drive off. The service advisor is the right person. Do not ask while they are still deciding on a large estimate, and do not ask the technician to do it from the bay.",
    sampleMessage:
      "Hi [first name], [shop] here. Your vehicle is ready and the invoice is paid. If we explained the work clearly, a Google review helps the next driver who needs a shop: [link].",
    moments: [
      "Print the QR code on the invoice folder they leave with.",
      "Add one line to the “your car is ready” text instead of sending a second nag an hour later.",
      "After a comeback, ask only once the car has left and stayed fixed.",
    ],
    tips: [
      {
        title: "Ask oil changes and big jobs the same way",
        body: "A listing full of only brake jobs looks odd, and skipping the quick visits trains advisors to judge who deserves a review. Every paid invoice gets the same sentence.",
      },
      {
        title: "Do not point at a star rating",
        body: "Hand the folder, say the sentence, and stop. Suggested stars, a pre-written review on a clipboard, and “it helps us if you mention the advisor’s name” are pressure. The name can be in your text. The script should not be in theirs.",
      },
    ],
    faqs: [
      {
        question: "Should the advisor ask before the customer sees the final price?",
        answer:
          "No. Ask after they have approved the work, the car is done, and they have paid or signed. A review request sitting on top of a surprise total gets you a review about the surprise.",
      },
      {
        question: "What about customers who came back with the same problem?",
        answer:
          "Fix the comeback, confirm it held, then ask. Still show the public review links. Do not offer a free oil change to replace a review they already posted or to prevent one.",
      },
      {
        question: "Can each advisor use a personal review link?",
        answer:
          "Use the shop’s Google profile. Advisors can be named in the text. A personal profile splits the reviews the next driver is actually searching for.",
      },
    ],
  },
  {
    slug: "salons",
    name: "Salons",
    businessLabel: "salon",
    keyword: "google review qr code for salons",
    title: "Google review QR code for salons",
    description:
      "How to get more Google reviews as a salon. Ask at the mirror, keep a QR code at checkout, and email the same link once that afternoon.",
    guideHeading: "How to get more Google reviews as a salon",
    intro:
      "A salon’s Google listing is often the first page a new client sees. The best time to ask is while they are still at the chair, looking at the result.",
    bestMoment:
      "Ask when you hand them the mirror, then once more at checkout if they did not do it. Stop after that. Do not follow them to the door, and do not text again the next morning. Color clients who need to see the hair in daylight can get the same single email that afternoon, not a three-day sequence.",
    sampleMessage:
      "Hi [first name], it’s [stylist] at [salon]. Glad we got you in today. If you like the cut or the color, a Google review helps someone else find the chair: [link].",
    moments: [
      "Keep a QR stand at checkout, next to the card reader, for every stylist.",
      "Have the stylist ask once at the mirror. The desk does not ask a second time if the stylist already did.",
      "Email the same link that afternoon for clients who book online and rush out.",
    ],
    tips: [
      {
        title: "One link for every chair",
        body: "If the salon has one Google profile, everyone shares it. A second profile is a second location, and every client of that location still sees the public review buttons.",
      },
      {
        title: "Do not write the review for them",
        body: "Hand them the link. Suggested star ratings and a sentence about “the best balayage” are a bad idea. Private notes about a formula belong in your own book, not in a script you hand the client.",
      },
    ],
    faqs: [
      {
        question: "Should stylists ask before or after the client pays?",
        answer:
          "At the mirror first, because that is when they can see the work. Checkout is the backup, and it is where the QR code lives for clients who want to do it on the way to the car.",
      },
      {
        question: "What if the color needs a correction?",
        answer:
          "Fix the correction before you ask. If they are coming back in a few days, send the link after that visit. Asking them to review a service you have already agreed to redo puts them in an awkward spot.",
      },
      {
        question: "Can we offer a free gloss or a product for a review?",
        answer:
          "No. A free gloss, a retail gift, or a percent off the next visit for stars is an incentive. The mirror ask costs nothing and works more often.",
      },
    ],
    seeAlso: {
      slug: "barber",
      label: "Google review QR code for barbers",
      lead: "Barbershops have a faster chair and a different moment. Read the",
    },
  },
  {
    slug: "barber",
    name: "Barbers",
    businessLabel: "barbershop",
    keyword: "google review qr code for barbers",
    title: "Google review QR code for barbers",
    description:
      "How to get more Google reviews as a barber. Ask when the cape comes off, keep a QR code by the register, and text the regulars who book by phone.",
    guideHeading: "How to get more Google reviews as a barber",
    intro:
      "A barbershop is chosen from the Google listing and from whoever is in the chair by the window. The ask has to fit between haircuts, not after a long email sequence.",
    bestMoment:
      "Ask when you take the cape off and they check the lineup in the mirror, before the next person sits down. One sentence. If they are a weekly regular, ask the first time you cut them and then maybe twice a year, not every fade.",
    sampleMessage:
      "[First name], thanks for sitting with me at [shop]. If the cut is right, a Google review helps the shop: [link]. See you next time.",
    moments: [
      "Tape a small QR code by the register, where they already pay.",
      "Text clients who book by phone and leave before you can say it. One text, that day.",
      "Walk-ins get the same sentence as appointments. The shop profile is the same either way.",
    ],
    tips: [
      {
        title: "The shop listing beats a profile per chair",
        body: "Clients search for the shop. Use that Google profile unless a barber truly runs a separate listing with its own address. Put the barber’s name in the text so the review still mentions who cut the hair.",
      },
      {
        title: "Keep it to one sentence",
        body: "The chair turns over fast. A speech about algorithms and “it would mean a lot if you mentioned the beard” holds up the next cut. Cape off, mirror, link, done.",
      },
    ],
    faqs: [
      {
        question: "How often should a barber ask a weekly regular?",
        answer:
          "After the first cut, and a couple of times a year after that if their review is old. Every visit is too often, and regulars will joke about it in the review.",
      },
      {
        question: "Should walk-ins get a QR code or a text?",
        answer:
          "The QR code at the register, because you may not have their number. If they booked by text already, reply on that same thread once instead of starting a new one.",
      },
      {
        question: "Can I take a few dollars off the cut for a review?",
        answer:
          "No. A discount, a free beard trim, or a product tossed in for stars is an incentive. Charge the haircut and ask while they are looking in the mirror.",
      },
    ],
    seeAlso: {
      slug: "salons",
      label: "Google review QR code for salons",
      lead: "Salons that book longer color appointments have a separate page. Read the",
    },
  },
  {
    slug: "tattoo-shop",
    name: "Tattoo shops",
    businessLabel: "tattoo shop",
    keyword: "google review qr code for tattoo shops",
    title: "Google review QR code for tattoo shops",
    description:
      "How to get more Google reviews as a tattoo shop. Ask when the piece is finished and covered, put a QR code with the aftercare card, and do not require a healed photo.",
    guideHeading: "How to get more Google reviews as a tattoo shop",
    intro:
      "Tattoo clients read Google reviews to judge whether the shop is clean and whether the artist does the work in the photos. Ask when they have seen the piece, not days later as a condition of aftercare.",
    bestMoment:
      "Ask when you finish, they have seen the piece in the mirror, you have covered it, and you have explained aftercare. One ask at the desk while they pay. Do not text two days later to demand a healed photo. If they already said they would send one, a single reminder is enough.",
    sampleMessage:
      "[First name], thanks for sitting with [artist] at [shop]. If you are happy with the piece, a Google review helps someone else find the shop: [link]. Follow the aftercare we went over, and text the shop if something looks off.",
    moments: [
      "Put the QR code on the aftercare card they leave with. The card is already going in a pocket.",
      "Have the artist mention it once, then let the front desk point at the card while they pay.",
      "Use the shop’s Google profile. The artist’s name goes in the message, not in a separate listing, unless they really operate as a separate business.",
    ],
    tips: [
      {
        title: "Healed photos are optional",
        body: "Clients post healed work when they want to. Do not hold aftercare advice, a touch-up, or the stencil photo hostage until they review you. A touch-up policy can live on your site. It does not belong in the review sentence.",
      },
      {
        title: "Deposits are a different conversation",
        body: "No-show rules and deposit reminders should not be glued to the review link. The person who just sat for three hours gets a thank-you and a link, not a policy lecture.",
      },
    ],
    faqs: [
      {
        question: "Should a tattoo shop ask the day of the appointment or after it heals?",
        answer:
          "The day of, about the experience: cleanliness, the artist, and whether the piece matches what they asked for. Healing is not finished, so do not ask them to review the healed result that night. They can edit or add photos later on their own.",
      },
      {
        question: "What if the client wants changes before they leave?",
        answer:
          "Do the changes you agreed to, then ask. If they leave unhappy and you have a touch-up booked, wait until that visit. Asking in the middle of a disagreement gets a review about the disagreement.",
      },
      {
        question: "Can artists offer a discount on the next piece for a review?",
        answer:
          "No. A discount, a free flash piece, or shop credit for stars is an incentive. The aftercare card with a QR code is the ask.",
      },
    ],
  },
  {
    slug: "gym",
    name: "Gyms",
    businessLabel: "gym",
    keyword: "google review qr code for gyms",
    title: "Google review QR code for gyms",
    description:
      "How to get more Google reviews as a gym. Ask after the first week, not during the sales tour, and keep a QR code at the front desk.",
    guideHeading: "How to get more Google reviews as a gym",
    intro:
      "A gym’s Google reviews talk about coaches, crowding, and whether the trial matched the contract. Ask after a new member has actually worked out.",
    bestMoment:
      "Ask after the first week, when a new member has taken a class or met a coach. Do not ask during the sales tour, and do not ask on day one at the contract desk. The person who knows their name should send it: the coach, the front desk lead, or the manager who did the orientation.",
    sampleMessage:
      "Hi [first name], it’s [name] at [gym]. You have been in for a week. If the coaches and the schedule worked for you, a Google review helps someone nearby choose a gym: [link].",
    moments: [
      "Put a QR code at the front desk for members who will not read email.",
      "Send one email after day seven, not after every class.",
      "Ask again at the three-month mark only if you want a newer review. Then stop.",
    ],
    tips: [
      {
        title: "Do not ask from the sales desk",
        body: "A review written before the first workout is about the tour. The listing is more useful when it describes a class, a coach, or the room at 6 a.m. Wait until they have been in.",
      },
      {
        title: "Cancellations are not a review bargain",
        body: "Do not waive a cancellation fee, comp a month, or freeze a contract in exchange for stars. If someone is leaving angry, talk about the membership. The Google button stays on the page.",
      },
    ],
    faqs: [
      {
        question: "When should a gym ask a new member for a Google review?",
        answer:
          "After about a week, once they have used what they bought. Day one is too early. Day thirty is late enough that the trial emotion is gone and the email looks like billing.",
      },
      {
        question: "Should class studios and open gyms use the same wording?",
        answer:
          "Keep the link the same if the listing is the same. Change the sentence. A class studio can mention the coach and the schedule. An open gym can mention the desk and the hours. Do not send both versions to the same person.",
      },
      {
        question: "Can we offer a free month for a five-star review?",
        answer:
          "No. A free month, a guest pass bundle, or merch for a review is an incentive. Ask the members who already showed up.",
      },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    businessLabel: "restaurant",
    keyword: "google review qr code for restaurants",
    title: "Google review QR code for restaurants",
    description:
      "How to get more Google reviews as a restaurant. Put a QR code on the check presenter, mention it once when you drop the check, and skip the incentive.",
    guideHeading: "How to get more Google reviews as a restaurant",
    intro:
      "Guests already have a phone out when the check arrives. A QR code on the presenter beats a follow-up three days later that they will not open.",
    bestMoment:
      "Ask when you drop the check, once, with the same sentence every table. “If you have a minute, the QR code is for a Google review.” Then leave. Do not hover, and do not ask again when you pick up the card. Takeout can use the same code on the sticker or the receipt.",
    sampleMessage:
      "Thanks for eating with us at [restaurant] tonight. If you have a minute, a Google review helps other people find the place: [link]. This is the only message we will send about it.",
    moments: [
      "Print the QR code on the check presenter, and on the takeout sticker if that is most of your orders.",
      "Add the link to the receipt email if you already send one. Do not start a new email tool just for this.",
      "Train the closer to mention it once, the same way, every table, including the table that sent a dish back.",
    ],
    tips: [
      {
        title: "A late dish is not a reason to hide the link",
        body: "If the pasta was late, the guest can still publish that. Private feedback can be an extra note to the manager. It is not a substitute for the public page, and the server should not ask them to “tell us instead.”",
      },
      {
        title: "Answer reviews the next shift",
        body: "Draft a reply, edit the specifics, and post it on Google. Mention the location if you have more than one. Do not argue about a dish in public beyond a short invitation to call the manager.",
      },
    ],
    faqs: [
      {
        question: "Where should a restaurant put a Google review QR code?",
        answer:
          "On the check presenter, where the phone already is. A code on the front door is for people who have not eaten yet. A code on the bathroom mirror gets jokes. The presenter gets reviews.",
      },
      {
        question: "Should servers ask only tables that seemed happy?",
        answer:
          "No. The same sentence at every table is the policy. Choosing tables is how a staff starts steering reviews, and guests can tell when the ask suddenly appears only after a compliment.",
      },
      {
        question: "Can we comp dessert or a drink for a five-star review?",
        answer:
          "No. A free dessert, a percent-off card, or an entry in a drawing for stars can get the listing penalized. Ask because the next guest reads those reviews before they book.",
      },
    ],
  },
  {
    slug: "realtor",
    name: "Realtors",
    businessLabel: "real estate business",
    keyword: "google review qr code for realtors",
    title: "Google review QR code for realtors",
    description:
      "How to get more Google reviews as a realtor. Ask after closing, once the keys have changed hands, and keep the price and the address out of your text.",
    guideHeading: "How to get more Google reviews as a realtor",
    intro:
      "Buyers and sellers read an agent’s Google reviews before they answer a listing alert. The review is useful after closing, when the work is actually finished.",
    bestMoment:
      "Ask after closing, once the keys have changed hands and the commission conversation is done. Do not ask during a showing, in the middle of negotiations, or on the day an offer is rejected. One message to that client. Buyers and sellers each get their own ask, because they are different clients even on the same house.",
    sampleMessage:
      "Hi [first name], it’s [agent] with [brokerage]. Congratulations on closing. If I was useful from the first tour through the keys, a Google review helps the next person who is looking for an agent: [link].",
    moments: [
      "Send the link the day of closing, after you have texted the congratulations with no link attached, or fold it into that single note if you would rather send one message.",
      "Put the QR code on the closing-gift card only if the gift is your normal gift and is not conditioned on a review.",
      "Check your brokerage’s advertising rules before you answer a review with a sale price, a neighborhood claim, or a promise about the market.",
    ],
    tips: [
      {
        title: "Leave the address and the price out of the request",
        body: "Clients can mention the city or the kind of move if they want. Your text does not need the street address, the sale price, or a line about how much money you “got them.” That is their story to tell, and some of them would rather not.",
      },
      {
        title: "Do not coach the wording",
        body: "Do not send adjectives to paste, a star target, or a request to mention a protected characteristic or who lives on the block. Thank them, include the link, and let them write.",
      },
    ],
    faqs: [
      {
        question: "Should realtors ask for a Google review after the first showing?",
        answer:
          "No. A showing is not the job. Ask after closing, when they know whether you returned calls, explained the contract, and stayed useful through the inspection and the keys.",
      },
      {
        question: "What if the deal fell apart?",
        answer:
          "Do not ask. A review request after a failed contract feels like you are collecting a testimonial from a bad week. If you later close a different house with them, ask then.",
      },
      {
        question: "Can the closing gift depend on a review?",
        answer:
          "No. If you normally send a gift at closing, send it whether or not they review you. A gift, a rebate, or a commission credit in exchange for stars is an incentive. Confirm any gift or testimonial rule with your brokerage before you change the habit.",
      },
    ],
  },
]

export function industryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug) ?? null
}

export function relatedIndustries(slug: string, count = 3) {
  const index = industries.findIndex((industry) => industry.slug === slug)
  if (index === -1) return []
  return Array.from({ length: count }, (_, offset) => industries[(index + offset + 1) % industries.length])
}
