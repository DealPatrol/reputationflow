import { ImageResponse } from "next/og"

export const alt = "ReputationFlow — ask every customer for an honest Google review"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f172a",
          color: "white",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#c7d2fe" }}>ReputationFlow</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 650, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Ask every customer for an honest Google review.
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1", maxWidth: 860 }}>
            One link. The same public review buttons for every rating.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
