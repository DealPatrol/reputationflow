export interface AdLanding {
  slug: string
  title: string
  description: string
  canonicalPath: string
  eyebrow: string
  headline: string
  lede: string
  points: string[]
}

export const adLandings: AdLanding[] = [
  {
    slug: "contractors",
    title: "Get more Google reviews for contractors",
    description:
      "A review link and QR code for a contracting business. Ask at the final walkthrough. One page, one button, no incentive.",
    canonicalPath: "/industries/contractors",
    eyebrow: "For contractors",
    headline: "Get more Google reviews for your contracting business",
    lede:
      "Homeowners write the review at the final walkthrough, when the punch list is done and they are standing in the finished room. ReputationFlow gives you one link and a QR code for that moment.",
    points: [
      "Paste the Google review link from your Business Profile. The same public buttons stay on the page for every customer.",
      "Download the QR code and leave it with the final invoice. ReputationFlow does not text customers.",
      "Starter is free. Professional is $20 per month if you later want to email the link yourself.",
    ],
  },
  {
    slug: "restaurants",
    title: "Get more Google reviews for restaurants",
    description:
      "A review link and QR code for a restaurant. Put it on the check. One page, one button, no incentive.",
    canonicalPath: "/industries/restaurants",
    eyebrow: "For restaurants",
    headline: "Get more Google reviews for your restaurant",
    lede:
      "Guests decide while the check is in their hand. A QR code on the presenter opens the review form before they stand up. ReputationFlow keeps Google, Facebook, and Yelp on that page for every guest.",
    points: [
      "One link for the dining room. You do not need a separate ask for a slow night or a busy one.",
      "Print the code for the check presenter. The product does not text guests and does not post reviews.",
      "Starter is free. Professional is $20 per month when you want to email a guest the same link.",
    ],
  },
  {
    slug: "home-services",
    title: "Get more Google reviews for home service businesses",
    description:
      "A review link and QR code for plumbers, HVAC companies, and electricians. Ask when the work is finished. One page, one button.",
    canonicalPath: "/how-to-get-more-google-reviews",
    eyebrow: "For home services",
    headline: "Get more Google reviews for your home service business",
    lede:
      "The useful moment is when the water is back on, the system is running, or the lights work, and the customer is still there. ReputationFlow turns your Google review link into a page and a QR code you can leave on the invoice.",
    points: [
      "Use the company Google profile the customer can find. One location, one review link.",
      "Text the link from your own phone if you want. ReputationFlow does not send SMS.",
      "Starter is free and includes the link and QR code. Professional is $20 per month for email requests.",
    ],
  },
]

export function adLandingBySlug(slug: string) {
  return adLandings.find((landing) => landing.slug === slug) ?? null
}
