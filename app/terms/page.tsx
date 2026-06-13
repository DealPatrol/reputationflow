import Link from "next/link"
import { Star } from "lucide-react"

export const metadata = {
  title: "Terms of Service - Feedbackr",
  description: "Terms of Service for Feedbackr review routing platform",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 p-2 rounded-lg">
              <Star size={20} className="text-white" fill="currentColor" />
            </div>
            <span className="font-bold text-lg">Feedbackr</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Go to Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-500 mb-8">Last updated: December 2024</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using Feedbackr, you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Feedbackr provides a reputation management platform that helps businesses:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Collect and manage customer feedback</li>
                <li>Route positive reviews to public platforms</li>
                <li>Capture negative feedback privately</li>
                <li>Send automated review requests via email and SMS</li>
                <li>Monitor online reviews across multiple platforms</li>
                <li>Generate AI-powered responses to customer feedback</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To use Feedbackr, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any information to keep it accurate and current</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Not share your account credentials with others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Acceptable Use</h2>
              <p className="text-slate-600 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Use the service for any unlawful purpose</li>
                <li>Send spam or unsolicited communications</li>
                <li>Manipulate or fabricate reviews</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
                <li>Use the service to collect personal information about others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Payment and Subscriptions</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Feedbackr offers both free and paid subscription plans:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Subscription fees are billed in advance on a monthly basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>You may cancel your subscription at any time</li>
                <li>Upon cancellation, you retain access until the end of the billing period</li>
                <li>We reserve the right to modify pricing with 30 days notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed">
                All content, features, and functionality of Feedbackr are owned by us and protected by
                international copyright, trademark, and other intellectual property laws. You retain ownership of any
                content you submit through the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data and Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Your use of Feedbackr is also governed by our Privacy Policy. We collect, use, and protect your
                data as described in that policy. You are responsible for ensuring you have proper consent to collect
                and process customer feedback through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Termination</h2>
              <p className="text-slate-600 leading-relaxed">
                We may terminate or suspend your account and access to the service immediately, without prior notice,
                for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or
                for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                Feedbackr is provided "as is" without warranties of any kind. We shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages resulting from your use or inability
                to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes.
                Your continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Information</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have questions about these Terms of Service, please contact us at:{" "}
                <a href="mailto:legal@reputationflow.app" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  legal@reputationflow.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
          <p>&copy; 2025 Feedbackr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
