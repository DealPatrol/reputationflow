import Link from "next/link"

export function CtaBand({
  title = "Set up your review link today",
  body = "Create a free account, add your Google review link, and share one page with every customer.",
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="bg-indigo-700">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/auth/signin?signup=1" className="rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-indigo-700">
            Start free
          </Link>
          <Link href="/pricing" className="rounded-lg border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white">
            View pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
