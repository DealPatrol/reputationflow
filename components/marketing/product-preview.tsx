export function ProductPreview() {
  const platforms = ["Google", "Facebook", "Yelp"]

  return (
    <figure className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-40px_rgba(15,23,42,0.55)]">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <p className="ml-2 truncate text-xs font-medium text-slate-500">Customer review page</p>
        </div>
        <div className="px-5 py-6 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-800">What the customer sees</p>
          <p className="mt-3 text-sm text-slate-500">How was your visit?</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Your business</p>
          <div className="mt-4 flex gap-1 text-amber-500" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="text-xl leading-none">
                ★
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-500">Sample stars. The customer picks the rating on the real page.</p>
          <div className="mt-5 space-y-2">
            {platforms.map((platform) => (
              <div
                key={platform}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900"
              >
                <span>Leave a {platform} review</span>
                <span className="text-slate-400">Open</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-dashed border-slate-300 px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Private note, optional</p>
            <p className="mt-1 text-sm text-slate-600">A note for the business. It does not hide the buttons above.</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-6 text-slate-600">
        The same buttons appear for every rating. A private comment is optional and does not hide these links.
      </figcaption>
    </figure>
  )
}
