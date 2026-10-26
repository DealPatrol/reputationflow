export interface ReviewGoalState {
  month: string
  target: number
  asked: number
}

const MAX_COUNT = 500

export function monthKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${date.getFullYear()}-${month}`
}

export function storageKey(businessId: string | number): string {
  return `rf-review-goal:${businessId}`
}

function clampCount(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(parsed)) return 0
  return Math.max(0, Math.min(MAX_COUNT, Math.round(parsed)))
}

export function parseReviewGoal(raw: string | null, month: string): ReviewGoalState {
  if (!raw) return { month, target: 0, asked: 0 }
  try {
    const data = JSON.parse(raw) as Partial<ReviewGoalState>
    const target = clampCount(data.target)
    if (data.month !== month) return { month, target, asked: 0 }
    return { month, target, asked: clampCount(data.asked) }
  } catch {
    return { month, target: 0, asked: 0 }
  }
}

export function goalRatio(state: ReviewGoalState): number {
  if (state.target <= 0) return 0
  return Math.min(1, state.asked / state.target)
}

export function withAsked(state: ReviewGoalState, delta: number): ReviewGoalState {
  return { ...state, asked: clampCount(state.asked + delta) }
}

export function withTarget(state: ReviewGoalState, target: number): ReviewGoalState {
  return { ...state, target: clampCount(target) }
}
