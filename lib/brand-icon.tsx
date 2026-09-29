import type { ReactElement } from "react"

/** Indigo rounded square with a filled star, matching the site header mark. */
export function brandIconMarkup(size: number): ReactElement {
  const star = Math.round(size * 0.52)
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#4f46e5",
        borderRadius: Math.round(size * 0.25),
      }}
    >
      <svg width={star} height={star} viewBox="0 0 24 24">
        <path
          fill="#ffffff"
          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
        />
      </svg>
    </div>
  )
}
