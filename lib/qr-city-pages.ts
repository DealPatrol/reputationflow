/**
 * City pages only where the job changes the ask: climate, housing, or who the customer is.
 * "Google review QR code for [trade]" stays on the national industry page.
 * Do not fill in the missing trade/city pairs by renaming one of these.
 */

export interface QrCityPage {
  tradeSlug: string
  citySlug: string
  cityName: string
  title: string
  heading: string
  description: string
  query: string
  summary: string
  intro: string
  placements: [string, string, string]
  script: string
  timing: string
  faqs: { question: string; answer: string }[]
}

export const qrCityHub = {
  path: "/google-review-qr-by-city",
  title: "Google review QR codes by city",
  description:
    "Placement guides for a Google review QR code by trade and city: where the card goes on the job, when to follow up, and a script you can send yourself.",
  faqs: [
    {
      question: "Why is my city missing?",
      answer:
        "These pages are only for jobs where the city changes the ask. A Houston slab leak, a Chicago freeze, a Phoenix attic, and a Dallas hail roof are different visits. A city that would repeat one of those pages is not listed. Use the national trade page for the QR code, the script, and the timing.",
    },
    {
      question: "Should I open a Google profile for every city I serve?",
      answer:
        "No. Use the Google Business Profile you already have. A service-area business with one profile gets one review link. These pages are placement notes. They are not a new listing, and they are not a reason to open a profile in every town you drive to.",
    },
    {
      question: "Will the QR code post the review for me?",
      answer:
        "No. The code opens Google’s review form for the Place ID you paste. The customer writes and publishes the review. ReputationFlow does not submit reviews and does not pick the star rating.",
    },
  ],
}

export const qrCityPages: QrCityPage[] = [
  {
    tradeSlug: "plumber",
    citySlug: "houston",
    cityName: "Houston",
    title: "Plumber Google review QR code in Houston",
    heading: "Plumber Google review QR code in Houston",
    description:
      "Houston plumbers: ask when the water is back and the floor can dry. Put the QR code on the invoice, not on wet carpet, and text once.",
    query: "plumber Google review QR code in Houston",
    summary: "Slab leaks, garage water heaters, and storm pump-outs.",
    intro:
      "Houston plumbing calls are usually a slab leak, a water heater in the garage, or a pump-out after water is already in the house. The Google search happens while the floor is still wet, so the review has to wait until the water is under control and go out before you are on the next freeway. A pier-and-beam house in an older neighborhood is a different repair from a slab in a subdivision. The ask is the same shape either way: one person, one link, after they can see that it is holding.",
    placements: [
      "Put the QR code on the invoice you hand them in the kitchen or the garage. A fridge magnet is easy to ignore once you are in the truck.",
      "On a water-heater job, leave a second card on the heater. In a Houston house that heater is often in the garage, which is where they will be standing the next time it acts up.",
      "On a slab leak, do not leave a card on wet carpet. Keep it with the invoice, and leave a card by the cleanout or the access only after that spot is dry enough for paper to survive.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The leak is stopped and the water is back on. If you are glad we did not open more of the floor than the repair needed, a Google review helps a neighbor in the same kind of house: [link].",
    timing:
      "If they were home for a straightforward repair, ask before the truck leaves and send one text the same day. If you were there in the night because water was coming through the ceiling, do not ask while they are still moving furniture. Text the next morning after they have said the ceiling stayed dry. One text. A second message the following week is how a review request starts to feel like a collection call.",
    faqs: [
      {
        question: "Should I ask after a storm pump-out in Houston?",
        answer:
          "Ask only after the water is out and they have had a quiet hour. A pump-out is not the moment they want to review anyone. If you also repaired the line that caused it, ask the next morning about the repair, not about the night they spent bailing.",
      },
      {
        question: "Who gets the text when a Houston property manager called?",
        answer:
          "The person who hired you. If a property manager called and the tenant let you in, send the request to the manager, because that is the customer on the invoice. Do not text the tenant as well about the same job.",
      },
      {
        question: "Can I waive the Houston leak-detection fee for a review?",
        answer:
          "No. A waived detection fee, a discount on the reroute, or a free next visit in exchange for stars is an incentive. Leave the price on the invoice and the QR code next to it, with no bargain attached.",
      },
    ],
  },
  {
    tradeSlug: "plumber",
    citySlug: "chicago",
    cityName: "Chicago",
    title: "Plumber Google review QR code in Chicago",
    heading: "Plumber Google review QR code in Chicago",
    description:
      "Chicago plumbers: ask after a frozen line has thawed and held. Leave the QR code on the invoice and the basement equipment, then text once.",
    query: "plumber Google review QR code in Chicago",
    summary: "Frozen lines, basement ejector pumps, and two-flats.",
    intro:
      "Chicago plumbing reviews are asked for on the coldest weeks, when a kitchen line freezes, a basement ejector pump quits, or an old galvanized stack starts leaking in a two-flat. The person searching Google is standing in a cold kitchen. They will remember who thawed the line and whether the basement was dry when you left. They will not remember a text that arrives in March.",
    placements: [
      "Put the QR code on the invoice, and leave a card on the basement water heater or on the ejector pump lid. That is the equipment they will look at if the same thing happens on the next cold night.",
      "Do not leave a card on a radiator or a windowsill. A thaw drips, and the card will be ruined before anyone scans it.",
      "In a two-flat, the card stays with the unit that hired you. Do not drop a second card in the other mailbox.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The line is thawed, I watched it hold, and the basement is dry. If that was the visit you needed, a Google review helps the next person whose kitchen sink freezes when the temperature drops: [link].",
    timing:
      "Do not ask while you are still heating the pipe. Ask when they have run the faucet and seen it hold. On an overnight freeze, leave without the ask and text the next morning, after they have used the water and confirmed nothing dripped through the night. One message. If the landlord hired you and the tenant was the person home, the text goes to the name on the invoice.",
    faqs: [
      {
        question: "Should a Chicago plumber wait until spring to ask for the review?",
        answer:
          "No. Ask the morning after the line is holding. Offer to come back if it lets go again. Waiting for a warm week means they no longer remember which company was in the basement.",
      },
      {
        question: "What if a Chicago two-flat had both units affected?",
        answer:
          "Send one request to the person who hired you. If each unit has its own owner and each one paid you for a separate repair, each owner can get a request for their own invoice. Do not text both of them about one shared bill.",
      },
      {
        question: "Can I discount a Chicago emergency thaw for a five-star review?",
        answer:
          "No. Do not trade the after-hours price for stars. Ask the same way you ask on a Tuesday valve repair, including the jobs that were small.",
      },
    ],
  },
  {
    tradeSlug: "plumber",
    citySlug: "phoenix",
    cityName: "Phoenix",
    title: "Plumber Google review QR code in Phoenix",
    heading: "Plumber Google review QR code in Phoenix",
    description:
      "Phoenix plumbers: ask after the hot water is actually hot, not from the attic. Put the QR code on the invoice and send one text the same day.",
    query: "plumber Google review QR code in Phoenix",
    summary: "Water heaters in the heat, hard water, and monsoon backups.",
    intro:
      "In Phoenix the review usually follows a water heater that died in the heat, a tank that failed from hard water, or a drain that backed up in a monsoon. The heater is often in a garage or an attic that is too hot to stand in. The customer did not watch the work. They will judge it at the tap, so the QR code belongs in their hand after the hot water is actually hot, not on a clipboard left in the attic.",
    placements: [
      "Hand the invoice with the QR code at the kitchen sink after you have run the hot side together. Do not leave the only copy on the attic access panel.",
      "A card on the water heater is useful when the heater is in the garage, where they can see it. Skip the card if the heater is in an attic they will not open.",
      "On a monsoon backup, put the code on the invoice only. A card next to a cleanout that just overflowed gets thrown out with the mess.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. Hot water is back at the kitchen, and the heater is running. If the job was what you expected, a Google review helps someone else whose tank quits in the summer: [link].",
    timing:
      "Ask the same day, after they have felt the hot water, and before you are across the valley. Do not ask from the attic or from the driveway while the house is still waiting on hot water. If the call was a backup and the floor is still wet, text the next morning after they say it stayed down. Do not send a second text the next week.",
    faqs: [
      {
        question: "Should a Phoenix plumber text if the customer was not home?",
        answer:
          "Send one text the same day to the person who scheduled the job. Name the visit, such as the water heater or the kitchen drain. Do not add a second text because they did not answer the first.",
      },
      {
        question: "Where does the QR code go if the Phoenix water heater is in the attic?",
        answer:
          "On the invoice, after you come down and run the hot water with them if they are home. An attic is a bad place for the only card. They will not climb up there to scan it.",
      },
      {
        question: "Can I offer a Phoenix tank flush in exchange for a review?",
        answer:
          "No. A flush, an anode, or a lower price in exchange for a review is an incentive. The review link sits on the invoice. The price of the job stays a separate line.",
      },
    ],
  },
  {
    tradeSlug: "plumber",
    citySlug: "miami",
    cityName: "Miami",
    title: "Plumber Google review QR code in Miami",
    heading: "Plumber Google review QR code in Miami",
    description:
      "Miami plumbers: ask the person who hired you, after the water is back. Put the QR code on that invoice, not in the condo lobby, and send one text.",
    query: "plumber Google review QR code in Miami",
    summary: "Salt-air water heaters, slab houses, and condo risers.",
    intro:
      "Miami plumbing jobs split in two. A house is often a slab leak or a water heater that rusted in the salt air. A condo is a unit shutoff, a riser, or a leak that reached the neighbor below. Those are different customers. The review goes to the person who hired you, on the Google profile for that business, not to every unit that lost water for an hour.",
    placements: [
      "Put the QR code on the invoice for the person who signed. In a house, that is the owner. In a condo, that is the unit owner or the association, whichever one is the customer.",
      "Do not leave a card on the lobby desk, in the elevator, or with the concierge. The lobby is not the customer, and a card there asks the wrong people to review the wrong visit.",
      "On a house water heater, a card on the heater in the garage is fine. On a condo heater inside a closet, the invoice is enough. Do not post a card where the building treats paper as a notice.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. Water is back on in your place and the shutoff is open. I am asking only you, not the rest of the building. If the work was done right, a Google review helps the next person who has to choose a plumber: [link].",
    timing:
      "If the job was their unit and they were home, ask before you leave and text once the same day. If a riser or a main shutoff took the building down, do not ask in the hallway while neighbors are still waiting. Text the customer the next morning. If the association hired you, the text goes to the manager who signed, one time, and not to the residents.",
    faqs: [
      {
        question: "A Miami association paid, but the unit owner let me in. Who gets the link?",
        answer:
          "The association, if the association is the customer on the invoice. The unit owner can still review you if they find you on their own. You do not send a request to both of them for the same job.",
      },
      {
        question: "Should I ask after a Miami leak that reached the unit below?",
        answer:
          "Not until the water is stopped and you have told the customer what you actually repaired. A review request in the middle of a neighbor dispute gets answered with the dispute. Ask the customer the next day, and leave the neighbor’s damage out of the text.",
      },
      {
        question: "Can I credit a Miami after-hours fee if they review us?",
        answer:
          "No. Do not trade the fee for stars. The invoice can show the fee and the QR code on the same page, with no sentence that starts with “if you review us.”",
      },
    ],
  },
  {
    tradeSlug: "hvac",
    citySlug: "phoenix",
    cityName: "Phoenix",
    title: "HVAC Google review QR code in Phoenix",
    heading: "HVAC Google review QR code in Phoenix",
    description:
      "Phoenix HVAC: ask after the house has actually cooled. Put the QR code on the air-handler sticker and the invoice, then text once the same day.",
    query: "HVAC Google review QR code in Phoenix",
    summary: "Summer no-cool calls, attic equipment, and roof condensers.",
    intro:
      "From late spring through September, a Phoenix no-cool call is decided on the Google listing before the dispatcher answers. The equipment is often in an attic or on a roof the customer will not visit with you. They know the job is finished when a room actually drops, not when you say the part is in. Ask then, and put the QR code where they can see it from the hallway, not only on the condenser in the sun.",
    placements: [
      "Point to the QR code on the service sticker on the air handler, and put the same code on the invoice. The handler is the unit they can reach. The roof condenser is a bad place for the only code.",
      "If they were not home, the invoice and one text are the ask. Do not also leave a door hanger that repeats it.",
      "Do not put the code on an estimate for a full replacement. The ask waits until the new system has run and the old equipment is out of the yard.",
    ],
    script:
      "Hi [first name], [tech name] with [company]. The house is cooling and I checked a vent before I left. If the visit got the temperature down, a Google review helps the next person whose AC quits in the heat: [link].",
    timing:
      "Ask in the house only after they have stood under a supply vent and felt the change. A driveway conversation while the thermostat still shows the high temperature is too early. Send a same-day text for anyone who was at work. If you left and the house had not dropped yet, do not send the link. Confirm it held, then send one text. No second text the next week.",
    faqs: [
      {
        question: "The Phoenix house was still warm when I closed the ticket. Do I ask?",
        answer:
          "No. Confirm the temperature came down first. A review request in the middle of a callback asks them to praise a job you have not finished.",
      },
      {
        question: "Should Phoenix maintenance-plan customers get a request every visit?",
        answer:
          "No. Ask after the first completed visit, and again much later if you want a newer review. A tune-up every spring does not get a text every spring.",
      },
      {
        question: "Can I leave a filter in Phoenix as a thank-you for the review?",
        answer:
          "No. A filter, a diagnostic, or a maintenance-plan discount in exchange for stars is an incentive. The filter price stays on the invoice. The QR code sits next to it with nothing attached.",
      },
    ],
  },
  {
    tradeSlug: "hvac",
    citySlug: "houston",
    cityName: "Houston",
    title: "HVAC Google review QR code in Houston",
    heading: "HVAC Google review QR code in Houston",
    description:
      "Houston HVAC: ask after the air is cold and the drain line is clear. QR code on the invoice and the handler sticker. One text the same day.",
    query: "HVAC Google review QR code in Houston",
    summary: "Humidity, condensate clogs, and stained ceilings.",
    intro:
      "Houston no-cool calls are tied to humidity, a clogged condensate line, and ceilings that stain when the drain pan overflows. People hire you because the last company left the ceiling wet, not because of a model number. The review ask belongs after they have felt cold air and you have shown them the drain line is clear, which is the part they can check without going into the attic.",
    placements: [
      "Put the QR code on the invoice and on the service sticker on the air handler. If the handler is in a closet, the sticker is easy to scan. If it is in the attic, the invoice is the copy they will actually use.",
      "Show them the clear drain line, then hand the invoice. The code should be in their hand while you are still there to point at it.",
      "Do not stick a card on a wet ceiling tile or on the thermostat. A thermostat card gets ignored, and a wet tile ruins the code.",
    ],
    script:
      "Hi [first name], this is [tech name] at [company]. The system is cooling and the drain line is clear. If we stopped the drip and the house feels right, a Google review helps a neighbor whose AC is leaking into the ceiling: [link].",
    timing:
      "Ask the same day, after the air has changed and they have seen the drain. If the call started as a wet ceiling, do not ask until you have shown them it has stopped dripping. If you only went in the attic and they never saw you, one text the same day that names the visit is the whole follow-up. Do not ask during a replacement estimate, even if the house is hot and they are ready to talk about a new system.",
    faqs: [
      {
        question: "A Houston customer wants a replacement quote. When do I ask for the review?",
        answer:
          "After the new system is installed and running, if they hire you to replace it. The estimate visit does not get a review request. You have not finished a job yet.",
      },
      {
        question: "What if the Houston ceiling stain is still there?",
        answer:
          "You can ask about the repair once the leak has stopped. Do not ask them to review the stain. The text should say the system is cooling and the drain is clear. Talk about drywall separately if that is work you do.",
      },
      {
        question: "Can I discount a Houston drain cleaning if they post today?",
        answer:
          "No. Do not tie the price of the drain, the coil, or the next maintenance visit to a review. Ask every finished call the same way.",
      },
    ],
  },
  {
    tradeSlug: "hvac",
    citySlug: "chicago",
    cityName: "Chicago",
    title: "HVAC Google review QR code in Chicago",
    heading: "HVAC Google review QR code in Chicago",
    description:
      "Chicago HVAC: ask when the heat is warm, not at 2 a.m. QR code on the furnace or boiler and the invoice. Text the next morning if it was overnight.",
    query: "HVAC Google review QR code in Chicago",
    summary: "No-heat calls, boilers, radiators, and bungalow furnaces.",
    intro:
      "A Chicago heating review is won on a no-heat call in January, usually a furnace in a bungalow or a boiler and radiators in a two-flat or a graystone. The house is cold when you arrive. The customer is not going to scan anything until a register or a radiator is actually warm. Overnight calls are common. The ask does not belong at 2 a.m.",
    placements: [
      "Put the QR code on the service sticker on the furnace or the boiler, and on the invoice. The basement is where they will go the next time the heat stops, so the sticker is the useful one.",
      "Do not leave the card on a cold radiator you have not brought back. Leave it on the equipment you serviced.",
      "In a two-flat, one card for the unit that hired you. The other unit does not get a card in the vestibule.",
    ],
    script:
      "Hi [first name], [tech name] with [company]. The heat is back. I checked a register before I left. If the house is warm, a Google review helps the next person whose heat quits on a cold night: [link].",
    timing:
      "If they are home and the heat is up, ask before you leave the basement and text once the same day. If the call was overnight, get the heat going and text the next morning. Do not ask while the house is still cold, and do not ask in the middle of an estimate to replace a boiler. One text. Name “no heat” or “tune-up,” not the model number.",
    faqs: [
      {
        question: "Does a Chicago boiler ask differ from a forced-air ask?",
        answer:
          "The moment changes and the rule does not. Ask when they can feel heat, at a radiator or at a register. The QR code goes on the equipment you worked on and on the invoice.",
      },
      {
        question: "A Chicago house will take hours to warm up. Do I wait in the driveway?",
        answer:
          "No. Show them the system is firing, tell them a cold house takes time to catch up, and send the text once they confirm it is warming. If you cannot confirm that before you leave, the next-morning text is the ask. Do not send it before they have felt heat.",
      },
      {
        question: "Can I waive a Chicago diagnostic for a review?",
        answer:
          "No. Leave the diagnostic price on the invoice. The review link is not a coupon, and a free filter is not a thank-you for stars.",
      },
    ],
  },
  {
    tradeSlug: "hvac",
    citySlug: "denver",
    cityName: "Denver",
    title: "HVAC Google review QR code in Denver",
    heading: "HVAC Google review QR code in Denver",
    description:
      "Denver HVAC: ask after a full heating cycle, not during a hail estimate. QR code on the furnace sticker and the invoice. Leave the claim out of the text.",
    query: "HVAC Google review QR code in Denver",
    summary: "Cold-snap furnaces, altitude, and hail-damaged condensers.",
    intro:
      "Denver heating calls pile up on the first hard cold snap, and a lot of the condensers you see in the spring were dented by hail. The customer wants warm vents. They do not want a review request while you are still looking at a hail-damaged condenser they have not agreed to replace. Altitude can change how a furnace is set up. It does not belong in the text.",
    placements: [
      "Put the QR code on the furnace sticker. In Denver that furnace is often in a basement or a closet, which is a place they can scan. Put the same code on the invoice.",
      "Do not put the review card on a hail-damaged condenser. That unit may still be a quote, and a card on it asks them to review an estimate.",
      "If you replaced the system, the code goes in the packet you hand them at the walkthrough, after the old equipment is gone.",
    ],
    script:
      "Hi [first name], this is [tech name] at [company]. The furnace has run a full cycle and the vents are warm. If the house is comfortable, a Google review helps a neighbor whose heat quits on the next cold snap: [link].",
    timing:
      "Ask after one full heating cycle, not when you first get the burners lit. Same-day text if they felt the air. If the visit was a hail inspection and you did not repair anything, do not ask for a review of an estimate. Ask after the repair is finished, or skip the ask if they hire someone else. Keep the carrier, the claim, and the deductible out of the text.",
    faqs: [
      {
        question: "Hail dented a Denver condenser and the furnace was a separate visit. Which one gets the QR code?",
        answer:
          "The visit you finished. A hail inspection that ends in a quote does not get a review request. A furnace repair that ends with warm vents does. Do not mention the claim in the message.",
      },
      {
        question: "Should a Denver HVAC text mention altitude?",
        answer:
          "No. “The vents are warm” is the whole story. A paragraph about elevation or how the furnace is set up reads like a brochure and gets deleted.",
      },
      {
        question: "Can I connect a Denver review to the hail deductible?",
        answer:
          "No. Do not connect a review to a claim, a deductible, or a repair price. If you want the review, ask after the finished repair and leave the insurance talk on the phone.",
      },
    ],
  },
  {
    tradeSlug: "roofer",
    citySlug: "dallas",
    cityName: "Dallas",
    title: "Roofer Google review QR code in Dallas",
    heading: "Roofer Google review QR code in Dallas",
    description:
      "Dallas roofers: ask on the ground after the crew and the nails are gone. Put the QR code in the warranty packet, not on the insurance paperwork.",
    query: "roofer Google review QR code in Dallas",
    summary: "Hail replacements, ground walkthroughs, and warranty packets.",
    intro:
      "Dallas roof reviews are mostly a hail story. The homeowner has often had several companies in the driveway, and they are tired of claim talk before anyone has looked at the ridge. Your review is not part of the claim. It is about whether the crew cleaned up and whether the roof you installed matches what you walked with them. Ask on the ground, after the magnets, when the crew is gone.",
    placements: [
      "Put the QR code in the warranty packet you hand them at the end of the walkthrough. A shingle sample in the garage is where packets go to be forgotten. The packet in their hand is the one they will open.",
      "A second code on the final invoice is enough. Do not also leave a yard sign that says to review you and keep it up for a month.",
      "Do not put the code on the insurance paperwork or the supplement. Those pages should not mention a review at all.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The roof is on, the crew is gone, and we walked the ridge and the gutters together. If the work and the cleanup were what you wanted, a Google review helps another homeowner pick a roofer: [link].",
    timing:
      "Ask at the walkthrough, on the ground, the day the crew finishes. Text once when you send the final invoice if they did not scan the code in the driveway. Do not wait for the next hailstorm to prove the roof. Do not ask on a tarp-only day, and do not ask when you drop off an estimate. One person gets the text: the person who signed and walked it.",
    faqs: [
      {
        question: "Should a Dallas roofer ask before the insurance check arrives?",
        answer:
          "Yes, if the roof is finished and you have walked it. The review is about the job and the cleanup. The check is a separate conversation, and it does not belong in the text.",
      },
      {
        question: "What if a Dallas homeowner hired us for the inspection and someone else replaced the roof?",
        answer:
          "Do not ask them to review a roof you did not install. If they paid you for the inspection, you can ask once about the inspection, and the message should say that. Do not write it as if you replaced the roof.",
      },
      {
        question: "Can a Dallas roofer offer to cover a deductible for a review?",
        answer:
          "No. Leave deductibles, upgrades, and any offer to cover a deductible out of the review ask. The QR code goes in the warranty packet with no bargain printed on it.",
      },
    ],
  },
  {
    tradeSlug: "roofer",
    citySlug: "denver",
    cityName: "Denver",
    title: "Roofer Google review QR code in Denver",
    heading: "Roofer Google review QR code in Denver",
    description:
      "Denver roofers: ask when the permanent roof is on and the driveway is clear. QR code in the packet at the truck. A tarp visit does not get the ask.",
    query: "roofer Google review QR code in Denver",
    summary: "Hail, steep pitches, and tarp visits that are not the ask.",
    intro:
      "Denver roofs take hail and they take steep pitches, and a winter leak can start as a tarp before the crew is scheduled for the real roof. The homeowner is not coming up the ladder with you. They will judge the job from the driveway: nails gone, dumpster gone, and someone who showed them what changed. Ask there. A tarp-only visit is not the review.",
    placements: [
      "Hand the warranty packet with the QR code at the truck, after you have walked the ground together. Do not leave it under a doormat.",
      "Skip the shingle sample as the home for the code. It ends up in the garage.",
      "On a steep or multi-story house, do not expect them to scan anything left on the roof. The code is a ground-level object: the packet or the invoice.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The crew is off the roof and the driveway is clear. We walked what you can see from the ground. If the cleanup and the work were right, a Google review helps another homeowner: [link].",
    timing:
      "Ask when the permanent roof is finished, not when the tarp goes on, and not while people are still tied off. If weather forced a temporary dry-in, the text waits until the real roof is on and the yard is clean. Do not hold the request until the next snow. Offer to come back if something leaks. One text to the person who signed.",
    faqs: [
      {
        question: "The Denver pitch was too steep to walk the ridge from the ground. When do I ask?",
        answer:
          "Ask after the crew is down and you have shown them the photos you already take, plus the eaves and the driveway. Do not ask them to climb. The review is still about the finished roof and the cleanup.",
      },
      {
        question: "Hail dented Denver gutters and they have not hired us for the roof. Do I leave a card?",
        answer:
          "No. An estimate does not get a review card. If they hire you and you finish the roof, the packet gets the QR code then.",
      },
      {
        question: "Should a Denver roofing text name the insurance carrier?",
        answer:
          "No. The text is about the crew being gone and the driveway being clear. Claims, carriers, and deductibles stay off the message.",
      },
    ],
  },
  {
    tradeSlug: "roofer",
    citySlug: "miami",
    cityName: "Miami",
    title: "Roofer Google review QR code in Miami",
    heading: "Roofer Google review QR code in Miami",
    description:
      "Miami roofers: ask the person who signed, after tile and nails are off the ground. QR code in that warranty packet, not on unit doors or at the pool.",
    query: "roofer Google review QR code in Miami",
    summary: "Tile and flat roofs, wind, and association customers.",
    intro:
      "Miami roofs are tile, flat, and wind. A house and a condo tower are not the same customer. On a house, you ask the person who walked the yard with you. On a condo, the association hired you or a resident did, and those are different invoices. A QR code in the mail room asks the wrong people to review a roof they did not contract.",
    placements: [
      "Put the QR code in the warranty packet you hand to the person who signed. For a house, that is the owner in the driveway. For an association, that is the manager, with the invoice.",
      "On a flat roof, walk them to a drain they can see and then hand the packet. Standing water is the complaint they understand. The code belongs with that conversation, not on a hatch they are not allowed to open.",
      "Do not leave cards on unit doors, and do not post one by the pool. One customer, one code.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The roof work is finished and we walked the drains and the ground. If the crew left the place clean, a Google review helps another owner choose a roofer: [link].",
    timing:
      "Ask at the ground walkthrough the day the crew leaves. Tile pieces and nails come off the lawn before the ask. If the association is the customer, one message to the manager. Do not follow it with a message in the board chat. If you only did a temporary dry-in before a storm, ask after the permanent repair. Keep deductibles and carriers out of the text.",
    faqs: [
      {
        question: "Miami residents are asking the crew who to review. What do I tell them?",
        answer:
          "If the association is the customer, say so and give the manager the link. Do not hand residents a card for a contract they did not sign. If a resident hired you for a separate repair on their own terrace, that resident gets their own request for that job.",
      },
      {
        question: "Should a Miami roofer wait through the next hurricane season to ask?",
        answer:
          "No. Ask when the work is finished and the grounds are clean. You can still come back if wind pulls something up later. Waiting a season is how they forget which company was on the roof.",
      },
      {
        question: "Can a Miami roof warranty depend on a review?",
        answer:
          "No. The warranty is part of the job they already paid for. Do not print that a review activates the warranty, and do not withhold paperwork until they post.",
      },
    ],
  },
  {
    tradeSlug: "roofer",
    citySlug: "houston",
    cityName: "Houston",
    title: "Roofer Google review QR code in Houston",
    heading: "Roofer Google review QR code in Houston",
    description:
      "Houston roofers: ask at the walkthrough once the yard is clear. Put the QR code in the warranty packet. A tarp visit waits until the repair is done.",
    query: "roofer Google review QR code in Houston",
    summary: "Wind-lifted shingles, flashing leaks, and oak debris in the gutters.",
    intro:
      "Houston roof jobs are wind-lifted shingles, pipe flashings that fail in the humidity, and gutters full of oak debris. The homeowner often cannot get on the roof and should not. They will remember whether the yard was cleared and whether you showed them the flashings in a photo. Ask after that walk, the day the crew leaves, not after the next thunderstorm.",
    placements: [
      "Put the QR code in the warranty packet at the walkthrough, and on the final invoice. The packet is what they are holding while you show photos of the ridge and the flashings.",
      "Do not staple the code to a shingle wrapper in the garage, and do not leave a yard sign as the only ask.",
      "If the gutters were part of the job, you can mention them in person. The printed code still says only how to leave a review. No star and no sample sentence.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The crew is gone and the yard is clear. We looked at the flashings and the gutters before I left. If that matches what you see, a Google review helps a neighbor who needs a roofer: [link].",
    timing:
      "Ask at the walkthrough. One text with the final invoice if they want the link in writing. If the first visit was a tarp after a storm, do not ask yet. Ask when the shingles or the section you replaced are finished. Do not wait for the next storm to test it. Insurance, supplements, and deductibles stay out of the message. One recipient: the person who signed.",
    faqs: [
      {
        question: "Houston oaks will fill the gutters again. Should I wait to ask?",
        answer:
          "No. Ask when you leave and the gutters are clean that day. Leaves coming back are not a reason to delay the request, and they are not a reason to hide the link if someone complains later. Reply with a time you can come look.",
      },
      {
        question: "Part of a Houston roof was an insurance repair and part was retail. Do I print two codes?",
        answer:
          "No. One finished roof, one packet, one Google profile. Do not print two codes that open two listings unless the customer really hired two businesses. Use the profile for the company that did the work.",
      },
      {
        question: "Can I offer a free Houston gutter cleaning next season for a review?",
        answer:
          "No. A free cleaning, a waived deductible, or an upgrade in exchange for a review is an incentive. If a maintenance visit is already part of the warranty, say that in the warranty. Do not attach it to stars.",
      },
    ],
  },
  {
    tradeSlug: "electrician",
    citySlug: "houston",
    cityName: "Houston",
    title: "Electrician Google review QR in Houston",
    heading: "Electrician Google review QR code in Houston",
    description:
      "Houston electricians: ask when the device works, or after a panel inspection. Put the QR code on the invoice and the panel door. Send one text.",
    query: "electrician Google review QR code in Houston",
    summary: "Storm outages, generator interlocks, and permitted panels.",
    intro:
      "After a Houston storm, the electrical call is often a dead house, a generator interlock, or a panel that needs a permit. A single outlet is a same-day ask once the device works. A panel, an interlock, or an EV charger is not finished when the tools are packed. It is finished when they have used it, and on permitted work when the inspection has passed. The QR code belongs on the invoice and at the panel they will open the next time the lights blink.",
    placements: [
      "Put the QR code on the invoice and leave a card on the panel door for a panel, an interlock, or a surge device. The panel is often in the garage, which is a place they can scan without a ladder.",
      "For an outlet or a fixture, the invoice is enough. Do not leave a card on every device you touched.",
      "Do not put the code on the permit card or the inspection sticker. Those stay official. The review card is a separate piece of paper.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The electrical work at your place is finished and tested. If we left the site clean and showed you what changed, a Google review helps the next homeowner: [link].",
    timing:
      "For an outlet, a switch, or a fixture, ask when the cover is on and they have tried it. For a panel, a generator interlock, or anything that needs an inspection, ask after the inspection, or after you have started the generator with them if no inspection is left. Do not ask while the house is still dark. Do not describe a burnt breaker or a backfed panel in the text. One message to the person who met you.",
    faqs: [
      {
        question: "A Houston generator interlock runs, but inspection is next week. Can I ask now?",
        answer:
          "Wait for the inspection if that tag is still outstanding. That is the day they stop worrying. If you ask the day it first runs, say the work is installed and tested, and do not pretend the inspection already happened.",
      },
      {
        question: "A Houston property manager called and the tenant was home. Who gets the QR code?",
        answer:
          "The customer on the invoice. If the manager is the customer, the invoice goes to the manager and you do not also text the tenant. Leave a panel card only when that panel is part of the customer’s place.",
      },
      {
        question: "Can I discount the next Houston service call for a review?",
        answer:
          "No. Do not trade the service-call price for stars. Outlet repairs and panel jobs get the same kind of ask, with no coupon on either one.",
      },
    ],
  },
  {
    tradeSlug: "electrician",
    citySlug: "chicago",
    cityName: "Chicago",
    title: "Electrician Google review QR in Chicago",
    heading: "Electrician Google review QR code in Chicago",
    description:
      "Chicago electricians: ask the person who hired you, after the panel cover is on. QR code on the invoice and the basement panel, not in a shared vestibule.",
    query: "electrician Google review QR code in Chicago",
    summary: "Basement panels, older two-flats, and service changes.",
    intro:
      "Chicago electrical work that turns into a review is usually an old panel in a basement, a circuit that keeps tripping in a two-flat, or a permitted service change on a brick building. The customer did not follow you into a lecture about old wiring, and the text should not finish that lecture. They need the cover back on and the lights they called about working. Ask the person who hired you, not both units by default.",
    placements: [
      "Put the QR code on the invoice and on a card at the panel door in the basement, next to the breakers they will open again. That is the useful spot in a bungalow or a two-flat.",
      "Do not leave a card in the shared vestibule. It asks the unit that did not hire you.",
      "On a permitted service change, keep the review card off the inspection paperwork. Hand it to the person who walked the finished panel with you.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The panel cover is back on and the circuits we talked about are on. If we explained what changed and left the basement clean, a Google review helps the next owner of an older building: [link].",
    timing:
      "For a repair with no permit, ask when the device works and you are packing up. For a service change or anything that needs inspection, ask after the inspector signs off. If the person who lives there was at work, one text the same day in the tech’s name. Do not text both apartments unless both are your customer on separate jobs.",
    faqs: [
      {
        question: "A Chicago basement panel serves both units, but only the first floor hired me. Who do I ask?",
        answer:
          "The first-floor customer who hired you. Do not ask the upstairs tenant to review a job they did not schedule. If the building owner hired you for the whole panel, ask the owner.",
      },
      {
        question: "Should a Chicago electrician describe the old wiring in the text?",
        answer:
          "No. “The work is finished and tested” is enough. A text that recaps brittle wiring or a previous owner’s additions is not something they want screenshotted, and it is not the review.",
      },
      {
        question: "Can I waive a Chicago electrical diagnostic if they post this week?",
        answer:
          "No. The diagnostic stays on the invoice. The QR code is not a discount.",
      },
    ],
  },
  {
    tradeSlug: "electrician",
    citySlug: "phoenix",
    cityName: "Phoenix",
    title: "Electrician Google review QR in Phoenix",
    heading: "Electrician Google review QR code in Phoenix",
    description:
      "Phoenix electricians: ask after they try the breaker or charger, not from the attic. QR code on the invoice and the garage panel, then one text.",
    query: "electrician Google review QR code in Phoenix",
    summary: "Attic runs, garage EV chargers, and pool equipment pads.",
    intro:
      "Phoenix electrical calls put you in attics and at pool equipment pads in heat the customer will not stand in for long. They did not watch the wire pull. They will believe the job when they flip the breaker, start the charger, or see the pool timer do what you said. Ask after that, on the ground, with the invoice in their hand. An attic is the wrong place for the only QR code.",
    placements: [
      "Hand the invoice with the QR code after they have operated the repair: the breaker, the EV charger, or the pool timer. A card on the garage panel is the right second spot for a panel or a charger.",
      "Do not leave the card on the attic deck or on the roof. They will not go get it.",
      "At a pool pad, ask the homeowner. If a pool tech let you in, that person is not the customer unless they hired you.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The electrical work is finished, and you tried it before I left. If we left the place clean, a Google review helps the next homeowner whose breaker or charger needs help: [link].",
    timing:
      "Come out of the attic before you ask. Same day, after they have tried the repair, with one text if they were not the person standing there. Permitted work, including many chargers and panel upgrades, waits until the inspection passes. Do not ask during the estimate, and do not describe an overheated breaker in the message.",
    faqs: [
      {
        question: "The Phoenix attic was too hot for the customer. Is the invoice enough?",
        answer:
          "Yes. The invoice and one text are the ask. Show them the result at a switch, a charger, or a panel they can reach. Do not send them into the attic to scan a code.",
      },
      {
        question: "Who do I ask on a Phoenix pool equipment repair?",
        answer:
          "The homeowner who hired you, at the equipment pad, after you have shown them the timer or the breaker. Do not hand the card to the pool cleaner who opened the gate unless that person is your customer.",
      },
      {
        question: "Can a Phoenix review be exchanged for a free breaker?",
        answer:
          "No. Leave the price on the invoice. Ask the same way on a small repair and on a panel. A service-call credit for stars is an incentive.",
      },
    ],
  },
  {
    tradeSlug: "electrician",
    citySlug: "miami",
    cityName: "Miami",
    title: "Electrician Google review QR code in Miami",
    heading: "Electrician Google review QR code in Miami",
    description:
      "Miami electricians: ask the customer on the invoice, not the concierge. QR code on that invoice. Permitted work waits until the inspection passes.",
    query: "electrician Google review QR code in Miami",
    summary: "Salt air, surge calls, and condo access windows.",
    intro:
      "Miami electrical work is salt air, surge damage, and high-rises where you may only get into the unit during a building window. The person who can review you is the one who hired you. That is often the unit owner, and sometimes the association for a meter room or a house panel. It is not the concierge, and it is not the building chat. Ask after the device works, and on permitted work after inspection.",
    placements: [
      "Put the QR code on the invoice you give the customer. In a house, a card on the panel is fine if they can stand in front of it, including a garage panel.",
      "In a condo, do not leave a card with the concierge, on the mailroom board, or in the elevator. If the association hired you for the electrical room, the manager gets the invoice and the code.",
      "Keep the review card off the permit and the inspection sticker.",
    ],
    script:
      "Hi [first name], this is [your name] at [company]. The electrical work in your place is finished and tested. I am sending this only to you. If we showed you what changed and left the unit clean, a Google review helps the next owner: [link].",
    timing:
      "If the owner is home, ask when they have tried the device, the same day. If the building only gave you a morning window and the owner was out, one text that day to the owner, not to the front desk. Permitted work waits for the inspection. If a surge call left them dealing with damaged equipment, skip a cheerful ask that afternoon. You can send the link the next day. Do not recap the surge or the neighbor’s unit in the text.",
    faqs: [
      {
        question: "A Miami association required the repair and the owner paid me. Who is the review for?",
        answer:
          "The person on the invoice. If the owner paid you, ask the owner. If the association paid you, ask the manager. Do not ask both for one invoice, and do not ask the front desk to pass a card around.",
      },
      {
        question: "Should a Miami electrician wait a season to see if salt damage stays fixed?",
        answer:
          "No. Ask when this visit is finished and tested. If something fails later, you come back, and you can reply on the review then. Waiting a season loses the ask.",
      },
      {
        question: "Can I credit a Miami surge device if they review the call?",
        answer:
          "No. The device is something they buy or they do not. It is not a reward for stars. The QR code can sit on the same invoice with no condition printed on it.",
      },
    ],
  },
]

const pagesByKey = new Map(qrCityPages.map((page) => [`${page.tradeSlug}/${page.citySlug}`, page]))

export function qrCityPath(page: Pick<QrCityPage, "tradeSlug" | "citySlug">) {
  return `/industries/${page.tradeSlug}/${page.citySlug}`
}

export function qrCityPage(tradeSlug: string, citySlug: string) {
  return pagesByKey.get(`${tradeSlug}/${citySlug}`) ?? null
}

export function qrCityPagesForTrade(tradeSlug: string) {
  return qrCityPages.filter((page) => page.tradeSlug === tradeSlug)
}

export function otherQrCities(page: QrCityPage) {
  return qrCityPages.filter((item) => item.tradeSlug === page.tradeSlug && item.citySlug !== page.citySlug)
}

export function otherTradesInQrCity(page: QrCityPage) {
  return qrCityPages.filter((item) => item.citySlug === page.citySlug && item.tradeSlug !== page.tradeSlug)
}

export function qrCityTradeOrder() {
  const seen: string[] = []
  for (const page of qrCityPages) {
    if (!seen.includes(page.tradeSlug)) seen.push(page.tradeSlug)
  }
  return seen
}
