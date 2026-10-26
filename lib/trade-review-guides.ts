/**
 * Long-tail guides for "how to get more Google reviews for [trade]".
 * The industry page still owns the QR-code query. These pages own the ask:
 * timing, scripts, one follow-up, and a review that is already public.
 * Do not add a trade by renaming one of these. Do not invent counts or rankings.
 */

export interface TradeReviewStep {
  name: string
  text: string
}

export interface TradeReviewTemplate {
  label: string
  body: string
}

export interface TradeReviewFaq {
  question: string
  answer: string
}

export interface TradeReviewGuide {
  slug: string
  industrySlug: string
  /** Words that finish the query "how to get more Google reviews for ___". */
  queryName: string
  /** Short name for breadcrumbs and the hub list. */
  name: string
  title: string
  description: string
  intro: string
  steps: TradeReviewStep[]
  whenToAsk: string[]
  placement: string[]
  templates: TradeReviewTemplate[]
  followUp: string[]
  badReview: string[]
  avoid: string[]
  faqs: TradeReviewFaq[]
  /** Another guide in this set that a reader in this trade should see. */
  pairedSlug?: string
  reply?: { path: string; label: string }
}

export const tradeReviewGuideHub = {
  path: "/how-to-get-more-google-reviews-for",
  title: "How to get more Google reviews for a trade",
  description:
    "Trade-by-trade guides for more Google reviews: when to ask, text and email wording, one follow-up, and a public reply when a review is already up.",
  intro:
    "The useful ask is different for a plumber in a driveway, a stylist at a mirror, and a server dropping a check. These guides are the words and the timing. The QR-code pages are where the card goes, including the cities where the job itself changes.",
  faqs: [
    {
      question: "Why are only some trades listed?",
      answer:
        "These are the jobs where the moment to ask is different enough to need its own page. A trade that would repeat one of them does not get a separate URL. The QR-code page for every trade is still on the industries list.",
    },
    {
      question: "What if my city is not on a guide?",
      answer:
        "City pages exist only where the visit changes, such as a Houston slab leak or a Dallas hail roof. Adding a town name to an ask that is otherwise the same is not a new guide. Use the trade guide, then the QR page for where the card goes.",
    },
    {
      question: "Can I pay people to leave the review?",
      answer:
        "No. Do not offer a discount, a gift, or a free service for a review, including an offer that does not name a star rating. Ask every finished visit the same way. Google’s policies prohibit incentives for reviews.",
    },
  ],
}

export const tradeReviewGuides: TradeReviewGuide[] = [
  {
    slug: "plumbers",
    industrySlug: "plumber",
    queryName: "plumbers",
    name: "Plumbers",
    title: "How to get more Google reviews for plumbers",
    description:
      "When plumbers should ask for a Google review, wording for the driveway, a text, and an email, and how to answer a review that says the leak came back.",
    intro:
      "A homeowner searches for a plumber while the water is still off. The review gets written if you ask once the repair is holding, with a link that opens the form, and then you leave.",
    steps: [
      {
        name: "Ask when the water is holding",
        text: "Ask the person who met you once the faucet, drain, or heater is working and they can see it. After a night flood, wait until the next morning.",
      },
      {
        name: "Hand the link or send one text",
        text: "Put the review link on the invoice and leave a card at the dry fixture. If they were not home, send one text the same day from your own phone.",
      },
      {
        name: "Stop after that message",
        text: "If they asked you to text the link, that text is the ask. Do not send a different version the following week because the first one was ignored.",
      },
      {
        name: "Answer a callback in public, then fix it",
        text: "If a review says the leak returned, reply with your name and a phone number. Come back and repair it. Do not offer to change the bill if they change the review.",
      },
    ],
    whenToAsk: [
      "Ask when they can see the result: water running, the drain going down, or the new heater lit. You are still the person who did the work. A faucet, a clog, and a water-heater swap all use that same moment.",
      "A middle-of-the-night flood is a later ask. Stop the water, get them through the night, and text the next morning after they say the floor stayed dry. Asking while they are moving furniture gets you a review about the night.",
      "The name on the invoice gets the one request. If a property manager called and a tenant let you in, write to the manager. Do not also text the tenant about the same job.",
    ],
    placement: [
      "Put the QR code on the invoice you hand them, and leave a card at the fixture once that spot is dry: under the sink, on the heater, or by the cleanout.",
      "A magnet on the fridge is easy to ignore after you are in the truck. Use it only as a second copy, next to the invoice they are already holding.",
    ],
    templates: [
      {
        label: "In person",
        body: "Water is back on and I watched it hold. If you have a minute, a Google review helps a neighbor find a plumber. The link is on this invoice. I can text it if that is easier.",
      },
      {
        label: "Text",
        body: "Hi [first name], this is [your name] at [company]. Water is back on at your place and I watched it hold. If you have a minute, a Google review helps the next person searching with a leak: [link].",
      },
      {
        label: "Email",
        body: "Hi [first name], the repair at your place is finished and the water is holding. If the visit was useful, you can leave a Google review here: [link]. One note is enough. Thank you, [your name].",
      },
    ],
    followUp: [
      "Pick one channel. If you already asked at the sink, do not email that night as well. A text is for the person who was not home, or for someone who said to send the link.",
      "Do not write again a week later. A missed review is not an unpaid invoice. If the leak returns, that is a callback, and the ask waits until the callback has held overnight.",
    ],
    badReview: [
      "Reply on the review, in your name: “Hi [name], I am [your name] at [company]. I am sorry it leaked again. Call [phone] and I will come look. I will not argue the first visit on this page.”",
      "Leave their floor plan, the price, and anyone else’s name out of the reply. If you cannot find the job, say that and give the phone number. Report a review once when it describes work you do not do. You cannot make Google remove a review because you disagree with it.",
    ],
    avoid: [
      "Do not offer to waive the dispatch fee, the after-hours charge, or a future visit for a review. The listing is how the next leak finds you. The price of this job stays on the invoice.",
      "The customer who is unhappy about a callback gets the same link as the customer who thanked you at the door. Do not send one of them to a private note and the other to Google.",
    ],
    faqs: [
      {
        question: "When should a plumber ask for a Google review?",
        answer:
          "When the water is back and they can see it holding. After an overnight flood, ask the next morning once they say it stayed dry.",
      },
      {
        question: "How many follow-ups should a plumber send?",
        answer:
          "One message, the same day, or the next morning after a night call. Do not send another version the following week.",
      },
      {
        question: "Can a plumber waive a fee for a five-star review?",
        answer:
          "No. Do not offer a waived dispatch fee, a discount, or a free visit for a review. Ask the same way on small jobs and large ones.",
      },
      {
        question: "Who gets the plumber’s review text on a rental?",
        answer:
          "The person on the invoice. If a property manager hired you, that is the request. Do not also text the tenant about the same bill.",
      },
    ],
  },
  {
    slug: "roofers",
    industrySlug: "roofer",
    queryName: "roofers",
    name: "Roofers",
    title: "How to get more Google reviews for roofers",
    description:
      "Ask for a roofer Google review at the ground walkthrough, after the nails are up. One invoice text, and a public reply that leaves the claim off the page.",
    intro:
      "A roof is hired from recent reviews and then judged on the cleanup. Ask on the ground, after the crew is gone and the homeowner has looked at the ridge, the flashing, and the yard with you.",
    steps: [
      {
        name: "Ask at the ground walkthrough",
        text: "Wait until the crew is off the roof, the nail sweep is done, and the homeowner has walked the job with you. Do not ask from the ladder.",
      },
      {
        name: "Put the link in the packet you hand them",
        text: "The warranty packet and the final invoice are what they keep. A shingle sample in the garage is not.",
      },
      {
        name: "Text once, the day you finish",
        text: "Send one text to the person who signed, the day the crew leaves. Do not hold it for the first rain, and do not text again when storm season starts.",
      },
      {
        name: "Answer a leak review with a time to come back",
        text: "If a review mentions a drip, reply with a phone number and a day you can look. Do not discuss a claim, a deductible, or a supplement in public.",
      },
    ],
    whenToAsk: [
      "The walkthrough is the ask. You are both looking at finished work, the magnets have been across the driveway, and the crew trucks are gone. That is the day they remember who was on the roof.",
      "Do not ask while people are still loading shingles, and do not wait for a storm to “prove” the roof. Offer to come back if something drips. The review request does not have to wait for weather.",
      "One request goes to the person who signed and walked it with you. A spouse who was not there does not need a second message about the same roof.",
    ],
    placement: [
      "Staple the QR code inside the warranty packet, and put the same link on the final invoice you send that day.",
      "Skip a sticker on a shingle board they will store. They will not be holding that board when they decide to write.",
    ],
    templates: [
      {
        label: "In person",
        body: "The crew is gone and we walked the ridge, the flashing, and the cleanup. If that matches what you expected, a Google review helps another homeowner pick a roofer. The link is in this packet.",
      },
      {
        label: "Text",
        body: "Hi [first name], this is [your name] at [company]. The roof is finished and the crew has left. If the work and the cleanup were what you wanted, a Google review helps the next homeowner: [link].",
      },
      {
        label: "Email",
        body: "Hi [first name], we finished the roof and the nail sweep. The warranty packet has the same link as this email. If you are willing, you can leave a Google review here: [link]. Thank you, [your name].",
      },
    ],
    followUp: [
      "The walkthrough sentence and the invoice text are one ask if you send the text only because they were not the person holding the packet. Do not do both to the same person on the same afternoon.",
      "A leak later is a repair visit, not a reason to resend the review link. Fix the drip, then you can ask about that visit if it was a new appointment. Do not write “update your stars” in the message.",
    ],
    badReview: [
      "Reply short: “Hi [name], I am [your name] at [company]. I am sorry you found a problem after we left. Call [phone] and I will set a time to look at it. I will not go through paperwork on this page.”",
      "Keep insurance, supplements, and deductibles off the public reply and out of the original ask. Those conversations belong on the phone. A review that describes a roof you did not install gets one report and a reply that you cannot find the job.",
    ],
    avoid: [
      "Do not offer to cover a deductible, discount a repair, or eat a change order for a review. Storm jobs and retail jobs use the same public page.",
      "Do not ask only the easy retail roofs and skip the jobs that had a punch list. The homeowner on a difficult job still gets the link after the walkthrough, the same way.",
    ],
    faqs: [
      {
        question: "Should roofers wait for the first rain before asking for a review?",
        answer:
          "No. Ask at the walkthrough the day you finish. Offer a return visit if something drips later. Waiting a season means they no longer remember the crew.",
      },
      {
        question: "How should a roofer follow up on the review ask?",
        answer:
          "One text the day the crew leaves, to the person who signed. Do not send another when the next storm is in the forecast.",
      },
      {
        question: "Can a roofer tie a discount to a Google review?",
        answer:
          "No. Do not offer a discount, a covered deductible, or a free repair for a review. Leave the price on the invoice.",
      },
      {
        question: "Should the review text mention an insurance claim?",
        answer:
          "No. The message is about the finished roof and the cleanup. Claim and supplement talks stay on the phone, not in a text someone might screenshot.",
      },
    ],
  },
  {
    slug: "hvac",
    industrySlug: "hvac",
    queryName: "HVAC",
    name: "HVAC",
    title: "How to get more Google reviews for HVAC",
    description:
      "Ask for an HVAC Google review after the customer feels the air. One same-day text, and a return visit when a review says the house is still hot.",
    intro:
      "People call an HVAC company from the listing when the house is already uncomfortable. Ask after they have felt the system run, not in the middle of a replacement estimate.",
    steps: [
      {
        name: "Ask after they feel the air",
        text: "On a no-cool, no-heat, or tune-up, ask once the customer has stood at the register or the thermostat with you. On a changeout, ask after the old equipment is out of the driveway.",
      },
      {
        name: "Show the sticker, then text if they were out",
        text: "Point at the QR code on the service sticker if they are home. If they were at work, one text when you close the ticket is the whole follow-up.",
      },
      {
        name: "Do not ask a house that is still wrong",
        text: "If the temperature has not held, come back or walk them through the thermostat first. The ask waits until the system is actually doing the job.",
      },
      {
        name: "Reply to a comfort complaint with a time",
        text: "A review that says the house is still hot gets your name, a phone number, and a time you can return. Do not blame the dispatcher in public.",
      },
    ],
    whenToAsk: [
      "The moment is physical. They can feel cooler air, heat at the register, or they have watched you set the thermostat after a tune-up. That is when the visit is real to them.",
      "An install waits until the walkthrough of the new system, with the old unit gone. An estimate for a full replacement is a sales conversation. The review ask is after the work they approved is finished.",
      "Maintenance-plan visits and one-time calls use the same Google profile when they share one listing. Say which visit it was. “Tune-up” or “no heat” is enough. Model numbers are not.",
    ],
    placement: [
      "The service sticker on the air handler or the furnace is the copy they will see at the next filter change. Point to it before you leave.",
      "The invoice still gets the code. A text the same day covers the customer who was not home when you closed the system up.",
    ],
    templates: [
      {
        label: "In person",
        body: "You can feel it at the register now. If that was the visit you needed, a Google review helps the next house that is too hot or too cold. I can text the link before I pull out.",
      },
      {
        label: "Text",
        body: "Hi [first name], [tech name] at [company]. The system was running when I left, and we looked at the thermostat together. If the visit helped, a Google review is here: [link].",
      },
      {
        label: "Email",
        body: "Hi [first name], we finished the [tune-up / no-heat / replacement] and the system was running at the end of the visit. If you want to leave a Google review, the link is here: [link]. Thank you, [company].",
      },
    ],
    followUp: [
      "Home customers get the sentence in the house. Customers who were out get one text the same day. They do not get both, and they do not get a second note next week.",
      "A system that is still short of the temperature is not ready for an ask. Confirm it held, then send the one message. A maintenance-plan drop-off where nobody saw you can use that same single text, not a text after every filter.",
    ],
    badReview: [
      "“Hi [name], I am [your name] at [company]. I am sorry the house was still uncomfortable. Call [phone] and I will come check the system. I will not troubleshoot the whole unit on this page.”",
      "Do not name the technician as the problem, and do not recap a refrigerant charge or a price in the reply. If you already fixed it, you can say you returned. You still do not ask them to edit the stars in exchange for that visit. Reply templates for this trade are linked below.",
    ],
    avoid: [
      "Do not offer a free filter, a waived diagnostic, or a maintenance-plan discount for a review. Leave the filter price on the invoice and the link beside it.",
      "A no-cool call that took two visits gets the ask after it is actually cool, the same way a tune-up does. Do not save the link for the easy maintenance stops.",
    ],
    faqs: [
      {
        question: "When should an HVAC tech ask for a Google review?",
        answer:
          "After the customer has felt the air or walked the new system. Not during a replacement estimate, and not while the house is still at the wrong temperature.",
      },
      {
        question: "Should HVAC send a review text if the customer was at work?",
        answer:
          "Yes. One text the same day, when you close the ticket. Do not send a second text the next week.",
      },
      {
        question: "Can an HVAC company give a free filter for a review?",
        answer:
          "No. Do not offer a free filter, a waived diagnostic, or a plan discount for a review.",
      },
      {
        question: "Do tune-ups and installs use different Google links?",
        answer:
          "Use the link for the Google profile they would find. One profile means one link. Mention the visit so the review is about a tune-up or a replacement, whichever you just finished.",
      },
    ],
    reply: {
      path: "/guides/negative-google-review-responses-hvac",
      label: "HVAC reply templates",
    },
  },
  {
    slug: "lawn-care",
    industrySlug: "lawn-care",
    queryName: "lawn care",
    name: "Lawn care",
    title: "How to get more Google reviews for lawn care",
    description:
      "Lawn care reviews come after a visit the customer can see, not after every mow. Wording for the first month, a cleanup hanger, and a skipped week.",
    intro:
      "Lawn customers hire from the truck, a neighbor’s yard, and the listing. They will ignore a text after every Tuesday. Ask after a visit they can see, then leave the route alone.",
    steps: [
      {
        name: "Ask after a visible visit",
        text: "Use the first full mow they can see from the street, a seasonal cleanup, or a treatment once the yard looks finished. Skip the sales estimate.",
      },
      {
        name: "Ask a route once, then at renewal",
        text: "New weekly customers get one request after the first month. The next ask is at renewal if you want a newer review. Not after every stop.",
      },
      {
        name: "One hanger, then one text",
        text: "On a cleanup where nobody is home, leave one door hanger with the code and your phone number, and send one text that day. Do not hanger every visit.",
      },
      {
        name: "A missed week is a phone call",
        text: "If you skipped a property, call about the miss. The review link can stay on your page. Do not bury it because the week went badly, and do not ask them to praise the miss.",
      },
    ],
    whenToAsk: [
      "The customer has to be able to see the work from the driveway or the sidewalk. A first mow, a leaf cleanup, or a treatment that has the yard looking finished qualifies. A drive-by they slept through does not, until the text that same day.",
      "Recurring routes burn trust when every visit includes a review ask. Once after the first month is the program. A renewal, a season later, is the next time.",
      "Mowing and treatment can share one Google profile. Name the visit in the message so the review is about the work you just did. Install projects are a different ask, on the landscaper guide.",
    ],
    placement: [
      "Text the link when the crew lead marks the property done, for the visits you have decided to ask about. Do not blast the whole route sheet every week.",
      "A door hanger belongs on a seasonal cleanup when the house is empty. It needs the QR code, your name, and a normal phone number. It does not need a star rating.",
    ],
    templates: [
      {
        label: "In person",
        body: "Today’s visit is done and you can see it from the driveway. If that is the lawn you wanted, a Google review helps a neighbor find a crew. I will text the link once.",
      },
      {
        label: "Text",
        body: "Hi [first name], [company] finished today’s visit at your place. If the lawn looks the way you asked, a Google review helps a neighbor choose a crew: [link]. This is the only review text we will send about this visit.",
      },
      {
        label: "Email",
        body: "Hi [first name], today’s [mow / cleanup / treatment] is finished. If it matches what you wanted, a Google review is here: [link]. If a section needs another pass, reply and we will schedule that separately. [company].",
      },
    ],
    followUp: [
      "The hanger and the same-day text are one ask for a cleanup, because the hanger is how they find the code and the text is how they open it. Do not add an email the next morning.",
      "Do not ask again because a month produced no review. Wait until renewal. A skipped property gets a call about the grass, and the review request waits until you have actually serviced it.",
    ],
    badReview: [
      "“Hi [name], I am [your name] at [company]. I am sorry we missed the week or the cut was not what you asked for. Call [phone] and I will put the property back on the schedule. I will not argue the route on this page.”",
      "Do not name the crew member as the problem in public. If the review is about a yard you do not service, say you cannot match the address and give the phone number. Still show the public review links on your page after a bad week.",
    ],
    avoid: [
      "Do not offer a free month, a skipped invoice, or a free aeration for a review. The route price stays the route price.",
      "Every finished visit you chose to ask about gets the same sentence, including the ordinary mows. Do not text only the yards that look perfect in your photo.",
    ],
    faqs: [
      {
        question: "How often should lawn care ask a weekly customer for a review?",
        answer:
          "Once after the first month, and again at renewal if you want a newer review. A text after every mow teaches people to ignore you.",
      },
      {
        question: "What if the lawn customer is never home?",
        answer:
          "Leave one door hanger on a cleanup, then one text the same day. Do not leave a hanger on every visit.",
      },
      {
        question: "Can a lawn company comp a month for a Google review?",
        answer:
          "No. Do not offer a free month, a waived visit, or a discount for a review.",
      },
      {
        question: "Should mowing and treatment customers use the same link?",
        answer:
          "Yes, when they review the same company profile. Name the visit so the review is about the work you just finished.",
      },
    ],
    pairedSlug: "landscapers",
  },
  {
    slug: "landscapers",
    industrySlug: "landscaper",
    queryName: "landscapers",
    name: "Landscapers",
    title: "How to get more Google reviews for landscapers",
    description:
      "Landscapers should ask at the install walkthrough, not the sales visit. One text when the crew leaves, and a reply if plants or drainage are the complaint.",
    intro:
      "A landscape install is judged in the yard on the day the beds, the patio, or the lights are finished. That walkthrough is the review. The sales visit is not.",
    steps: [
      {
        name: "Ask in the finished yard",
        text: "Stand with the homeowner, point out watering and what will settle in the first month, then hand the link. Do not ask the day the excavator arrives.",
      },
      {
        name: "One ask for the whole project",
        text: "A multi-week hardscape gets one request at the end, not a text after every delivery of stone.",
      },
      {
        name: "Text the person who approved the plan",
        text: "Send one text the day the crew demobilizes, to the person who signed. If both owners walked it, one message to the person who answers is enough.",
      },
      {
        name: "A plant or drainage complaint gets a site visit",
        text: "Reply with a phone number and a day you can look at the yard. Do not discount the next phase so they will edit the review.",
      },
    ],
    whenToAsk: [
      "The walkthrough is when the plan and the yard are in the same place. You have already talked about water, the plant list, and the first month. Then you ask. A design meeting and a demolition day are too early.",
      "Phase two gets its own ask when phase two is done. It does not get a cheaper price because phase one has stars. Weekly mowing, if you also run a route, uses the lawn care guide instead of this one.",
      "Commercial and HOA work goes to the person who signed the proposal, not to every resident. One request for that contract.",
    ],
    placement: [
      "Staple the QR code to the plant list or the care sheet you leave on the counter. That sheet is what they will pick up when something wilts.",
      "Text the same link the day the crew leaves. The sales portfolio they saw at the first meeting is the wrong place for the code.",
    ],
    templates: [
      {
        label: "In person",
        body: "This is the finished [patio / planting / lighting], and we walked the watering. If it matches the plan you approved, a Google review helps another homeowner find a landscaper. The link is on the care sheet.",
      },
      {
        label: "Text",
        body: "Hi [first name], this is [your name] at [company]. We finished the [patio / planting / lighting] and the crew is gone. If it matches what you approved, a Google review is here: [link].",
      },
      {
        label: "Email",
        body: "Hi [first name], the install is complete and the care sheet is on the counter. If you are willing to describe the project, a Google review is here: [link]. You can mention a photo if you want. You do not have to. [your name].",
      },
    ],
    followUp: [
      "The walkthrough and a text the same day are one ask only if they asked you to send the link, or they were not the person in the yard. Otherwise the conversation in the yard was enough.",
      "Do not write again when the plants have had a month to settle. You can invite them, in the first message, to add to the review later if they want. Do not withhold the ask until spring.",
    ],
    badReview: [
      "“Hi [name], I am [your name] at [company]. I am sorry the [plants / drainage / patio] is not what you expected. Call [phone] and I will come look. I will not redo the design argument on this page.”",
      "Do not post their plant list, the contract total, or a neighbor’s address. If a plant fails later, that is a warranty or a conversation you already promised, not a bargain for a new star rating.",
    ],
    avoid: [
      "Do not offer to discount the next phase, throw in lighting, or waive a change order for a review of this phase.",
      "Do not ask only the jobs that photographed well. A muddy week still gets the link at the real walkthrough, the same way a clean patio does. Do not hand them a caption to paste under a photo.",
    ],
    faqs: [
      {
        question: "When should a landscaper ask for a Google review?",
        answer:
          "At the install walkthrough, in the yard, after the crew is done. Not on the sales visit and not on the first day of demolition.",
      },
      {
        question: "Should landscapers wait until the plants have settled?",
        answer:
          "No. Ask about the install, the cleanup, and whether the yard matches the plan. They can add a later note if they want. Do not hold the request until the next season.",
      },
      {
        question: "Can a landscaper discount the next phase for a review?",
        answer:
          "No. Do not offer a discount on phase two, a free upgrade, or a waived change order for a review.",
      },
      {
        question: "Who gets the text on a couple’s landscape project?",
        answer:
          "The person who signed and walked the job. If both were there, one message to the person who answers the phone is enough.",
      },
    ],
    pairedSlug: "lawn-care",
  },
  {
    slug: "electricians",
    industrySlug: "electrician",
    queryName: "electricians",
    name: "Electricians",
    title: "How to get more Google reviews for electricians",
    description:
      "Electricians should ask when the device works, and after the green tag on permitted work. Scripts, one text, and a reply that does not recap the hazard.",
    intro:
      "People hire an electrician from a handful of recent reviews after an outlet dies or a panel looks wrong. Ask when the work is finished and tested, not while they are still deciding on a quote.",
    steps: [
      {
        name: "Ask when it works",
        text: "For a repair with no permit, ask when the device works and the cover is back on. For a service change, a charger, or anything that needs inspection, ask after the inspector signs off.",
      },
      {
        name: "Leave the link at the panel or on the invoice",
        text: "The invoice gets the code. A service upgrade can also take a card at the panel. Send one text with the finished-work photo if you already send that photo.",
      },
      {
        name: "Keep the hazard out of the message",
        text: "“The work is finished and tested” is the whole description. Do not recap a burnt breaker or a DIY mistake in a text they might forward.",
      },
      {
        name: "A tripped breaker review gets a call, not a debate",
        text: "Reply with your name and a phone number. Do not explain the circuit in public, and do not offer the next call free if they change the review.",
      },
    ],
    whenToAsk: [
      "A dead outlet, a switch, or a fixture is ready when you have tested it with them and you are packing up. The person who was in the house should be the name on the message. Office staff can send it if the first line uses the tech’s name.",
      "Permitted work feels unfinished until the green tag. Asking the day you land the panel, before inspection, asks them to review a job the city has not accepted. Ask the day it passes.",
      "A panel quote is a sales call. The review is after the work is installed and labeled. EV chargers and lighting ask at the walkthrough, after the customer has switched them on.",
    ],
    placement: [
      "Print the QR code on the invoice. On a service upgrade, leave a second card at the panel, where they will be standing if a breaker trips later.",
      "If you already text a photo of the finished work, put the link in that text. Do not send a photo and then a separate review text an hour later.",
    ],
    templates: [
      {
        label: "In person",
        body: "It is on, I tested it, and the cover is back. If we explained what changed, a Google review helps the next homeowner. The link is on the invoice.",
      },
      {
        label: "Text",
        body: "Hi [first name], this is [your name] at [company]. The electrical work at your place is finished and tested. If we left the site clean and explained the change, a Google review is here: [link].",
      },
      {
        label: "Email",
        body: "Hi [first name], the electrical work is finished and tested. If the visit was clear, you can leave a Google review here: [link]. You do not need to describe the repair. Thank you, [your name].",
      },
    ],
    followUp: [
      "One message from the person who was there, the day the work is actually done. For a permitted job, that day is the inspection, not the rough-in.",
      "Do not email a week later if the text was quiet. If a breaker trips after you leave, that is a return visit. Ask only after the return visit has held, and do not mention stars in that message.",
    ],
    badReview: [
      "“Hi [name], I am [your name] at [company]. I am sorry this did not stay resolved. Call [phone] and I will come test it. I will not draw the circuit on this page.”",
      "Do not describe the hazard, the panel brand, or what you think they did before you arrived. A review about a town or a trade you do not cover gets a short note that you cannot find the job, and one report if it is the wrong business.",
    ],
    avoid: [
      "Do not offer to discount the next call or waive a trip for a review. Small outlet repairs and service upgrades get the same sentence once each job is finished.",
      "Do not ask only the customers who said the price was fair. The customer who flinched at the total still sees the same Google link after the work is done and paid.",
    ],
    faqs: [
      {
        question: "Should electricians ask before or after inspection?",
        answer:
          "Before you leave, on a repair with no permit. After the inspector signs off, on a service change, a charger, or any job that needs a green tag.",
      },
      {
        question: "Who should send the electrician’s review text?",
        answer:
          "The person who was in the house. If the office sends it, the first line should use that tech’s name. A name they never met gets ignored.",
      },
      {
        question: "Can an electrician discount the next call for a review?",
        answer:
          "No. Do not offer a discount, a waived trip, or a free device for a review.",
      },
      {
        question: "Should the text describe what was dangerous?",
        answer:
          "No. Say the work is finished and tested. A recap of a burnt breaker or a mistake is a bad thing to have forwarded, and it is more detail than a review request needs.",
      },
    ],
  },
  {
    slug: "auto-repair",
    industrySlug: "auto-repair",
    queryName: "auto repair",
    name: "Auto repair",
    title: "How to get more Google reviews for auto repair",
    description:
      "Ask for an auto repair Google review when the keys go back and the invoice is paid. Comeback timing, and a reply that keeps the bill off the page.",
    intro:
      "Drivers pick a shop from the listing after the car is already making a noise. The review they trust is about a clear explanation and a car that left fixed.",
    steps: [
      {
        name: "Ask when you hand back the keys",
        text: "The advisor asks after the customer has heard what was fixed and has paid or signed. Not while they are still deciding on a large estimate, and not from the bay.",
      },
      {
        name: "Use the ready text you already send",
        text: "Add the link to the “your car is ready” message. A second text an hour later is a nag.",
      },
      {
        name: "Comebacks wait until the car stays fixed",
        text: "If they returned with the same problem, repair it and confirm it held. Then ask. Do not ask on the morning they brought it back.",
      },
      {
        name: "Move a billing argument to the phone",
        text: "A public reply gives your name and a number and asks them to have the invoice handy. Do not debate the total on the listing.",
      },
    ],
    whenToAsk: [
      "The counter is the moment: keys, explanation, payment. Oil changes and large jobs get the same sentence. Skipping the quick visits trains advisors to guess who “deserves” a review.",
      "Use the shop’s Google profile. Advisors can be named in the text. A personal profile for each advisor splits the reviews the next driver is searching for.",
      "Fleet and commercial accounts get one request to the person who approved the invoice. Do not text every driver about a single bill unless each driver is the customer on their own ticket.",
    ],
    placement: [
      "Print the QR code on the invoice folder they leave with. That folder is in their hand at the counter.",
      "The ready text is the digital copy. Do not also email an hour later unless they asked you to send the link to a different address.",
    ],
    templates: [
      {
        label: "In person",
        body: "You are paid up and the keys are yours. We went through what we fixed. If that explanation was clear, the code on the invoice is a Google review.",
      },
      {
        label: "Text",
        body: "Hi [first name], [shop] here. Your vehicle is ready and the invoice is paid. If we explained the work clearly, a Google review helps the next driver: [link].",
      },
      {
        label: "Email",
        body: "Hi [first name], your vehicle is ready and we walked through the work at pickup. If that was clear, a Google review is here: [link]. We do not suggest a star rating. [shop].",
      },
    ],
    followUp: [
      "The counter sentence or the ready text, not both, unless they asked for the link in a text because they will write it at home. Then the text is the one message.",
      "Do not send a reminder three days later. A car that comes back is a repair first. After it has stayed fixed, you can ask once about that return visit. Do not offer a free oil change so they will edit what they already wrote.",
    ],
    badReview: [
      "“Hi [name], I am [your name] at [shop]. I want to sort this out with you. Call [phone] and have the invoice handy. I will not discuss the amount on this page.”",
      "If the car came back, say you want to see it and give a time. Do not blame the technician in public. A review you cannot match to a ticket gets a note that you cannot find the visit, and one report if it is another shop.",
    ],
    avoid: [
      "Do not offer a free oil change, a discounted diagnostic, or a loaner in exchange for a review. Comebacks get repaired because the car is not right, not because a star rating moved.",
      "Do not point at a star rating on the folder, and do not hand them a sentence to paste about the advisor. The advisor’s name can be in your text. The script is not theirs to copy.",
    ],
    faqs: [
      {
        question: "When should an auto repair shop ask for a Google review?",
        answer:
          "When the keys go back and the customer has paid or signed, after they have heard what was fixed. Not during the estimate.",
      },
      {
        question: "Should the shop send a second review text later?",
        answer:
          "No. Put the link in the ready message. Do not text again an hour later or three days later.",
      },
      {
        question: "Can a shop offer a free oil change for a review?",
        answer:
          "No. Do not offer a free service, a discount, or a loaner for a review, including a review they already posted.",
      },
      {
        question: "Should each advisor have a personal review link?",
        answer:
          "No. Use the shop profile drivers already find. You can put the advisor’s name in the message.",
      },
    ],
    reply: {
      path: "/guides/negative-google-review-responses-auto-repair",
      label: "Auto repair reply templates",
    },
  },
  {
    slug: "dentists",
    industrySlug: "dentists",
    queryName: "dentists",
    name: "Dentists",
    title: "How to get more Google reviews for dentists",
    description:
      "Ask for a dentist Google review at checkout, out of the chair. Leave treatment names out, send one afternoon email, and do not confirm care in a reply.",
    intro:
      "Patients decide on a dentist from the listing before they call. A short ask at checkout beats a script in the chair. Leave the procedure out of the message.",
    steps: [
      {
        name: "Ask at checkout, every completed visit",
        text: "The front desk hands the card while they schedule the next visit. Do not ask in the operatory, and do not limit the ask to easy cleanings.",
      },
      {
        name: "Keep clinical details out of the template",
        text: "Thank them for the visit and give the link. Do not name a tooth, a diagnosis, or a procedure. They can write whatever they choose.",
      },
      {
        name: "One email that afternoon if they rushed",
        text: "Patients who book online and leave in a hurry can get the same link by email that afternoon. Not in the reminder that goes out before they arrive.",
      },
      {
        name: "A public reply does not confirm treatment",
        text: "Thank them, invite a call to the office, and do not repeat health information. A billing complaint moves to the phone with the statement, not onto the listing.",
      },
    ],
    whenToAsk: [
      "Checkout is the moment they are dressed, the visit is over, and someone is already talking about the next appointment. Mid-procedure, and any minute they are still numb in the chair, is the wrong time.",
      "Hygiene, a filling, and a longer appointment get the same card. Training the desk to guess who feels “fine” is the habit that makes a listing unrepresentative.",
      "The message is about the visit and the office, not about Invisalign, implants, or whitening. If a patient writes a private note, keep health details out of any public reply.",
    ],
    placement: [
      "Keep the QR card at checkout, next to the appointment book, and hand it to every patient the same way.",
      "The afternoon email is the backup for people who left before the desk could speak. It is one email. It is not a series.",
    ],
    templates: [
      {
        label: "In person",
        body: "You are all set. If you have a minute, this card opens our Google review page. You do not need to mention the treatment. Thank you for coming in.",
      },
      {
        label: "Text",
        body: "Hi [first name], thank you for coming in to [practice] today. If you have a minute, a Google review helps someone else choose a dentist: [link]. Please leave clinical details out of the review.",
      },
      {
        label: "Email",
        body: "Hi [first name], thank you for visiting [practice] today. If you are willing, a Google review is here: [link]. One or two sentences is enough, and you do not need to name the treatment. [practice].",
      },
    ],
    followUp: [
      "The card at checkout is the ask. The afternoon email replaces the card only when they did not get the card. Do not do both, and do not email again the next week.",
      "A patient who is coming back because something hurts gets the ask after that return visit is complete, not in the message that schedules the return. Do not offer whitening or a waived fee so they will change a review.",
    ],
    badReview: [
      "“Hi [name], I am [your name] at [practice]. I am sorry this visit was a bad experience. Please call the office at [phone] and we will talk with you. I will not discuss treatment on this page.”",
      "Do not confirm what was done, apologize for a specific tooth, or argue a clinical point in public. A billing review gets the same shape: a phone number and a request to have the statement ready. Reply templates for dental reviews are linked below.",
    ],
    avoid: [
      "Do not offer whitening, a waived copay, or a gift card for a review. Ask because the listing is how the next patient finds the office.",
      "Do not send unhappy patients to a private form and everyone else to Google. The public links stay on the page for every rating. A private note can sit beside them.",
    ],
    faqs: [
      {
        question: "When should a dental office ask for a Google review?",
        answer:
          "At checkout, after the patient is out of the chair, on every completed visit. Not during treatment and not only after hygiene.",
      },
      {
        question: "Should a dentist email a review link the next day?",
        answer:
          "Only the same afternoon, and only if they left before checkout could ask. Do not send it the next week, and do not put it in the reminder before they arrive.",
      },
      {
        question: "Can a dental practice offer whitening for a review?",
        answer:
          "No. Do not offer whitening, a waived fee, or a gift card for a review.",
      },
      {
        question: "Can the review request name the procedure?",
        answer:
          "No. Thank them for the visit and include the link. Patients can describe the visit in their own words if they want to. Your template should not.",
      },
    ],
    reply: {
      path: "/guides/negative-google-review-responses-dentists",
      label: "Dentist reply templates",
    },
  },
  {
    slug: "restaurants",
    industrySlug: "restaurants",
    queryName: "restaurants",
    name: "Restaurants",
    title: "How to get more Google reviews for restaurants",
    description:
      "Restaurants should ask once, when the check lands, at every table. Dine-in and takeout wording, no free dessert, and a reply for a wait or a wrong dish.",
    intro:
      "Guests already have a phone out when the check arrives. One sentence then is the program. A message three days later is easy to ignore, and a free dessert for stars is a policy problem.",
    steps: [
      {
        name: "Say it when you drop the check",
        text: "One sentence, every table, including the table that sent a dish back. Then leave. Do not hover, and do not ask again when you pick up the card.",
      },
      {
        name: "Put the code on the presenter",
        text: "The check presenter is where the phone already is. Takeout can use the same code on the receipt or the sticker. A code on the front door is for people who have not eaten.",
      },
      {
        name: "One receipt message, not a new sequence",
        text: "If you already email a receipt, the link can live there. Do not start a second email three days later to people who said the meal was good.",
      },
      {
        name: "Answer a bad meal before the next shift ends",
        text: "A long wait or a wrong dish gets a short public reply and a phone number for the manager. Do not comp something in the reply in exchange for an edit.",
      },
    ],
    whenToAsk: [
      "Drop the check, say the sentence, walk away. The guest writes it or they do not. Standing there while they type makes the review about the hovering.",
      "The same sentence goes to every table the closer runs. Choosing the tables that complimented the server is how a staff starts steering the listing. Guests can tell when the ask appears only after praise.",
      "Takeout is the receipt or the bag sticker, plus the one message you already send when the order is ready if that message is how you reach them. It is not a text the next afternoon.",
    ],
    placement: [
      "Print the QR code on the check presenter. For takeout, put it on the sticker or the receipt the guest actually keeps.",
      "A bathroom mirror and the front door are the wrong surfaces. One is a joke, and the other asks people who have not eaten.",
    ],
    templates: [
      {
        label: "In person",
        body: "If you have a minute, the code on the check is a Google review. I will leave it with you.",
      },
      {
        label: "Text",
        body: "Hi [first name], this is [restaurant]. Thank you for coming in tonight. If the meal is worth mentioning, a Google review helps the next guest: [link]. We will not text about it again.",
      },
      {
        label: "Email",
        body: "Hi [first name], thank you for eating at [restaurant]. If the meal is worth a note, a Google review is here: [link]. We read them at the next shift. [restaurant].",
      },
    ],
    followUp: [
      "There is no second ask. The check, the receipt email you already send, or one takeout message. Pick the one that matches how they ordered. Do not stack them.",
      "A dish you are remaking is a kitchen problem. Invite them to talk to a manager. The review link stays available. You do not ask them to hold the review until you comp something, and you do not email the table the next day.",
    ],
    badReview: [
      "“Hi [name], I am [your name] at [restaurant]. I am sorry the wait ran long / the order was wrong. Call [phone] and I will look at that check. I will not go through the whole tab on this page.”",
      "Do not name a server as the cause, and do not argue ticket times in public. You can invite them back to remake a dish because the meal was wrong. Do not write that the remake depends on them changing the review. Restaurant reply templates are linked below.",
    ],
    avoid: [
      "Do not offer a free dessert, a drink, or an entry in a drawing for a review. Ask because the next guest reads the listing before they book.",
      "A late dish is not a reason to hide the link or to say “tell us instead of Google.” Private feedback can be an extra note to the manager. The public buttons stay on the page.",
    ],
    faqs: [
      {
        question: "When should a restaurant ask for a Google review?",
        answer:
          "When you drop the check, once, at every table. Takeout uses the receipt or the sticker, not a text the next day.",
      },
      {
        question: "Should servers ask only tables that seemed happy?",
        answer:
          "No. The same sentence at every table. Choosing tables is how a staff starts steering reviews.",
      },
      {
        question: "Can a restaurant comp dessert for a five-star review?",
        answer:
          "No. Do not offer a free dessert, a drink, or a drawing entry for a review.",
      },
      {
        question: "Where should the restaurant QR code go?",
        answer:
          "On the check presenter, or on the takeout receipt. Not on the front door and not as the only code on a bathroom mirror.",
      },
    ],
    reply: {
      path: "/guides/negative-google-review-responses-restaurants",
      label: "Restaurant reply templates",
    },
  },
  {
    slug: "salons",
    industrySlug: "salons",
    queryName: "salons",
    name: "Salons",
    title: "How to get more Google reviews for salons",
    description:
      "Salons should ask at the mirror, then stop. One afternoon email for color, a correction before the ask, and a reply that does not bargain.",
    intro:
      "A salon’s listing is often the first page a new client sees. Ask while they are still at the chair, looking at the result. One email that afternoon covers color that needs daylight. A three-day sequence does not.",
    steps: [
      {
        name: "Ask at the mirror",
        text: "The stylist asks when they hand over the mirror. Checkout asks only if the stylist did not. Do not follow the client to the door.",
      },
      {
        name: "One link for the profile clients already find",
        text: "If the salon has one Google profile, every chair uses it. A stylist who truly has a separate listing can ask for that listing. Do not ask the same client to review both.",
      },
      {
        name: "Color that needs daylight gets one afternoon email",
        text: "Send it the same day, once. Do not text again the next morning, and do not run a three-day sequence.",
      },
      {
        name: "Fix a correction before you ask",
        text: "If they are coming back to adjust the color, the ask waits until that visit is done. A public reply offers a call. It does not trade a gloss for an edited review.",
      },
    ],
    whenToAsk: [
      "The mirror is when they can see the cut or the color. That is the stylist’s sentence, once. The desk does not repeat it if the stylist already asked. Checkout is only the backup, and it is where the QR code sits for someone who wants to do it in the car.",
      "Clients who book online and rush out can get one email that afternoon. Color clients who need to see the hair in daylight use that same single email, not a reminder the next morning and another two days later.",
      "Booth renters and employees may have different listings. Use the profile a new client would actually find for that chair. Opening a second profile only to collect reviews splits the salon people are searching for.",
    ],
    placement: [
      "A QR stand at checkout, next to the card reader, works for every stylist on a shared profile.",
      "The stylist can also text the link from their own phone the same day if the client asked them to. That text replaces the email. It does not stack on top of it.",
    ],
    templates: [
      {
        label: "In person",
        body: "Take a look in the mirror. If you like it, the code at the desk is a Google review. I will not ask again on the way out.",
      },
      {
        label: "Text",
        body: "Hi [first name], it is [stylist] at [salon]. If you like the cut or the color, a Google review helps someone else find the chair: [link].",
      },
      {
        label: "Email",
        body: "Hi [first name], glad we got you in today at [salon]. If you want to tell other people about the visit, a Google review is here: [link]. One note is plenty. [stylist].",
      },
    ],
    followUp: [
      "Mirror, or checkout, or one afternoon email. One of those. A client who already heard it at the chair does not get the email.",
      "A correction is scheduled first. The review ask goes out after they have seen the adjusted color, as a single message. Do not send the original ask and then a second ask that says “now that we fixed it.”",
    ],
    badReview: [
      "“Hi [name], I am [stylist] at [salon]. I am sorry the color or the cut was not what you wanted. Call [phone] and we will look at it with you. I will not go through the formula on this page.”",
      "Do not argue about a photo, and do not name another client. A formula belongs in your book, not in the reply. If you are fixing it, say they can call to book that visit. Do not write that the fix depends on a new star rating. Salon reply templates are linked below.",
    ],
    avoid: [
      "Do not offer a free gloss, a product, or money off the next visit for a review. The mirror ask does not need a gift attached.",
      "Do not hand them a sentence about the color service to paste, and do not ask only the clients who smiled at the mirror. A visit you are still correcting waits. Every other finished visit gets the same sentence.",
    ],
    faqs: [
      {
        question: "When should a salon ask for a Google review?",
        answer:
          "At the mirror, when the client can see the result. Checkout is the backup if the stylist did not ask. Not on the way to the door, and not again the next morning.",
      },
      {
        question: "How should a salon follow up with a color client?",
        answer:
          "One email the same afternoon if they need to see the hair in daylight. Not a sequence across three days. If a correction is booked, wait until that visit is done.",
      },
      {
        question: "Can a salon offer a free gloss for a review?",
        answer:
          "No. Do not offer a free gloss, a retail product, or a discount on the next visit for a review.",
      },
      {
        question: "Should every stylist use a separate Google profile?",
        answer:
          "Use the profile new clients already find. A shared salon listing means one link. Ask a client to review a stylist’s own listing only when that listing is the real one, and do not ask them to review both.",
      },
    ],
    reply: {
      path: "/guides/negative-google-review-responses-salons",
      label: "Salon reply templates",
    },
  },
]

const guidesBySlug = new Map(tradeReviewGuides.map((guide) => [guide.slug, guide]))

export function tradeReviewGuidePath(guide: Pick<TradeReviewGuide, "slug">) {
  return `${tradeReviewGuideHub.path}/${guide.slug}`
}

export function tradeReviewGuideBySlug(slug: string) {
  return guidesBySlug.get(slug) ?? null
}

export function tradeReviewGuideForIndustry(industrySlug: string) {
  return tradeReviewGuides.find((guide) => guide.industrySlug === industrySlug) ?? null
}

export function relatedTradeReviewGuides(slug: string, count = 3) {
  const current = tradeReviewGuideBySlug(slug)
  if (!current) return tradeReviewGuides.slice(0, count)
  const paired = current.pairedSlug ? tradeReviewGuides.filter((guide) => guide.slug === current.pairedSlug) : []
  const rest = tradeReviewGuides.filter((guide) => guide.slug !== slug && guide.slug !== current.pairedSlug)
  return [...paired, ...rest].slice(0, count)
}
