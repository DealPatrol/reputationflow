export const CARD_COLOR_PRESETS = [
  { id: "ink", label: "Ink", value: "#142033" },
  { id: "indigo", label: "Indigo", value: "#3730a3" },
  { id: "forest", label: "Forest", value: "#14532d" },
  { id: "wine", label: "Wine", value: "#7f1d1d" },
] as const

export const DEFAULT_CARD_COLOR = CARD_COLOR_PRESETS[0].value

export function normalizeHexColor(value: string): string | null {
  const match = /^#?([0-9a-fA-F]{6})$/.exec(value.trim())
  if (!match) return null
  return `#${match[1].toLowerCase()}`
}
