/** Local review check-in reminders. Scheduled on the device; no server or push service involved. */
export type ReminderFrequency = "off" | "daily" | "weekly"
export const REMINDER_FREQUENCIES: ReminderFrequency[] = ["off", "daily", "weekly"]
export const REMINDER_ID_MIN = 52000
export const REMINDER_ID_MAX = 52099
export const REMINDER_HOUR = 17 // 5 PM local time, near the end of most service days
export const REMINDER_WEEKDAY = 6 // Friday (1 = Sunday in iOS calendar components)

export interface ReminderNotification {
  id: number
  title: string
  body: string
  schedule: { on: { hour: number; minute: number; weekday?: number }; allowWhileIdle: boolean }
  extra: { path: string }
}

export function isReminderFrequency(value: unknown): value is ReminderFrequency {
  return typeof value === "string" && (REMINDER_FREQUENCIES as string[]).includes(value)
}

/**
 * Builds repeating calendar notifications. The text never includes customer names, ratings, or
 * feedback, because it can appear on the lock screen.
 */
export function buildReminderNotifications(frequency: ReminderFrequency, businessName: string): ReminderNotification[] {
  if (frequency === "off") return []
  const name = businessName.trim().slice(0, 60) || "your business"
  const on = frequency === "daily" ? { hour: REMINDER_HOUR, minute: 0 } : { weekday: REMINDER_WEEKDAY, hour: REMINDER_HOUR, minute: 0 }
  return [
    {
      id: REMINDER_ID_MIN,
      title: frequency === "daily" ? "Daily review check-in" : "Weekly review check-in",
      body: `Ask today's customers for a review of ${name}. Your QR code and scripts are ready in Counter Kit.`,
      schedule: { on, allowWhileIdle: true },
      extra: { path: "/dashboard?tab=counter" },
    },
  ]
}
