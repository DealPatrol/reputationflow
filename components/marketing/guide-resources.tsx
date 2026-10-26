import Link from "next/link"
import { SignupLink } from "@/components/marketing/signup-link"
import { comparisons } from "@/lib/marketing-content"
import { SIGNUP_PATH } from "@/lib/signup"

export function GuideResources({
  signupLocation,
  includePack = true,
}: {
  signupLocation: string
  includePack?: boolean
}) {
  return (
    <>
      <p className="mt-10 text-sm leading-7 text-slate-600">
        Make the link and the QR code together with the{" "}
        <Link className="font-semibold text-indigo-700" href="/tools/qr-code">
          Google review QR code generator
        </Link>
        , or start from the{" "}
        <Link className="font-semibold text-indigo-700" href="/tools/google-review-link">
          Google review link generator
        </Link>
        .
        {includePack ? (
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
        </Link>
        , the{" "}
        <Link className="font-semibold text-indigo-700" href="/how-to-get-more-google-reviews-for">
          trade how-to guides
        </Link>
        , the{" "}
        <Link className="font-semibold text-indigo-700" href="/industries">
          trade pages
        </Link>
        , and the{" "}
        <Link className="font-semibold text-indigo-700" href="/google-review-qr-by-city">
          city QR guides
        </Link>
        .
      </p>
      <nav aria-label="Competitor comparisons" className="mt-6">
        <h2 className="text-base font-semibold text-slate-950">Comparing a named product</h2>
        <ul className="mt-2 space-y-2 text-sm leading-7">
          {comparisons.map((comparison) => (
            <li key={comparison.slug}>
              <Link className="font-semibold text-indigo-700" href={`/compare/${comparison.slug}`}>
                {comparison.name} alternative
              </Link>
            </li>
          ))}
          <li>
            <Link className="font-semibold text-indigo-700" href="/review-management-software">
              Review software compared
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
