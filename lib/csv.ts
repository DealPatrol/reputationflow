/** Quote a CSV cell and neutralize spreadsheet formula injection. */
export function csvCell(value: unknown) {
  const raw = value == null ? "" : String(value)
  const guarded = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw
  return `"${guarded.replace(/"/g, '""')}"`
}

export function csvRow(values: unknown[]) {
  return values.map(csvCell).join(",")
}
