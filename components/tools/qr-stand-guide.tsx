export function QrStandGuide({ url }: { url?: string }) {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="stand-guide-title">
      <p className="text-sm font-semibold text-indigo-800">Print and NFC</p>
      <h2 id="stand-guide-title" className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
        A table tent, a card, or an NFC tag that opens the same link
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        The QR code and a blank NFC tag can both open one URL. Scanning or tapping does not publish a review. The customer still writes it on Google.
      </p>
      <ol className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
        <li>
          <span className="font-semibold text-slate-950">1. Print the table tent.</span> Use letter paper. Fold on the dashed line so both faces point outward, then set it where people already pause: the counter, the host stand, or the invoice clipboard.
        </li>
        <li>
          <span className="font-semibold text-slate-950">2. Or hand over the card.</span> The review card is about 3.5 by 2 inches. Leave it with the invoice if the customer is walking out.
        </li>
        <li>
          <span className="font-semibold text-slate-950">3. NFC is optional.</span> Buy a blank tag and write the same URL with your phone’s NFC app. ReputationFlow does not program the tag and does not sell stands.
        </li>
        <li>
          <span className="font-semibold text-slate-950">4. Test it.</span> Use a phone that is not the one you set up. The code and the tag should open the same page before the first customer sees them.
        </li>
      </ol>
      {url ? (
        <p className="mt-5 break-all rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-800">{url}</p>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-600">
          Write the review link from the tool above onto the tag. A homepage URL makes people hunt for the review button.
        </p>
      )}
    </section>
  )
}
