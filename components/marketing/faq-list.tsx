import type { FaqItem } from "@/lib/marketing-content"

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4">
          <summary className="cursor-pointer list-none text-base font-medium text-slate-950 [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.question}
              <span aria-hidden="true" className="text-slate-400 group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
