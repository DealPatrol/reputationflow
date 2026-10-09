import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { signupDestination } from "@/lib/signup"

export const metadata: Metadata = {
  title: "Create a free account",
  robots: { index: false, follow: false },
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  redirect(signupDestination(await searchParams))
}
