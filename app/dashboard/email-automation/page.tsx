import { redirect } from "next/navigation"

export default function EmailAutomationRedirect() {
  redirect("/dashboard?tab=campaigns")
}
