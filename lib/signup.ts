export const SIGNUP_PATH = "/signup"
export const PROFESSIONAL_PLAN = "professional"
export const BILLING_TAB_PATH = "/dashboard?tab=billing"

export function professionalSignupPath(): string {
  return `${SIGNUP_PATH}?plan=${PROFESSIONAL_PLAN}`
}

export function isProfessionalIntent(value: string | null): boolean {
  return value === PROFESSIONAL_PLAN
}

const SIGN_IN_PATH = "/auth/signin"

type SearchValue = string | string[] | undefined

export function signupDestination(searchParams: URLSearchParams | Record<string, SearchValue>): string {
  const params = new URLSearchParams()
  if (searchParams instanceof URLSearchParams) {
    searchParams.forEach((value, key) => {
      params.append(key, value)
    })
  } else {
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === "string") params.append(key, value)
      else if (Array.isArray(value)) {
        for (const item of value) params.append(key, item)
      }
    }
  }
  params.set("signup", "1")
  return `${SIGN_IN_PATH}?${params.toString()}`
}
