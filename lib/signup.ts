export const SIGNUP_PATH = "/signup"
export const PROFESSIONAL_PLAN = "professional"
export const BILLING_TAB_PATH = "/dashboard?tab=billing"
export const BILLING_CHECKOUT_FAILED_PATH = `${BILLING_TAB_PATH}&checkout=failed`

export type AfterAuthDestination = { type: "checkout" } | { type: "path"; path: string }

export function afterAuthDestination(input: { isSignUp: boolean; wantsProfessional: boolean }): AfterAuthDestination {
  if (input.isSignUp && input.wantsProfessional) return { type: "checkout" }
  if (input.wantsProfessional) return { type: "path", path: BILLING_TAB_PATH }
  if (input.isSignUp) return { type: "path", path: "/onboarding" }
  return { type: "path", path: "/dashboard" }
}

export const SETUP_CTA_LABEL = "Set up your Google review link free"
export const SETUP_CTA_NOTE = "No card. The next screen is the Google review link, then the QR code."

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
