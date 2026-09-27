export const DEMO_USER = {
  id: "demo-user",
  email: "demo@reputationflow.local",
  password: "demo-reputationflow",
  businessId: 1,
} as const

export function isDemoMode() {
  return !process.env.DATABASE_URL
}
