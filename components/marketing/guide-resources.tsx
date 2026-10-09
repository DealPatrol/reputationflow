import Link from "next/link"
import { SignupLink } from "@/components/marketing/signup-link"
import { SIGNUP_PATH } from "@/lib/signup"

export function GuideResources({
  signupLocation,
  includePack = true,
}: {
  signupLocation: string
  includePack?: boolean
}) {
  return (
    <p className="mt-10 text-sm leading-7 text-slate-600">
      Build the URL with the{" "}
      <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
        Google review link generator
      </Link>{" "}
      and put it on a card with the{" "}
      <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
        QR code generator
      </Link>
      .{includePack ? (
        <>
          {" "}
          Copy the wording from the{" "}
          <Link className="font-semibold text-indigo-700" href="/google-review-request-templates">
            Google review request templates
          </Link>
          .
        </>
      ) : null}{" "}
      <SignupLink className="font-semibold text-indigo-700" href={SIGNUP_PATH} location={signupLocation}>
        Create a free account
      </SignupLink>{" "}
      to keep the link and the QR code on one page. More writing is in the{" "}
      <Link className="font-semibold text-indigo-700" href="/guides">
        guides
      </Link>{" "}
      and the{" "}
      <Link className="font-semibold text-indigo-700" href="/industries">
        trade pages
      </Link>
      .
    </p>
  )
}
