import Link from "next/link"
import { Star } from "lucide-react"

export const metadata = {
  title: "Privacy Policy - Feedbackr",
  description: "Privacy Policy for Feedbackr review routing platform",
}

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: December 2024</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                ReputationFlow ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you use our reputation
                management platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Personal Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">We collect information that you provide directly:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Account information (name, email, password)</li>
                <li>Business information (business name, contact details)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Customer feedback and review data that you collect</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Usage Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">We automatically collect certain information:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">We use collected information to:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send review requests on your behalf</li>
                <li>Generate AI-powered responses to feedback</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send administrative information and service updates</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues and fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-slate-600 leading-relaxed mb-4">We may share your information with:</p>

              <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Service Providers</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Third-party vendors who perform services on our behalf:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Payment processing (Stripe)</li>
                <li>Email delivery (Resend)</li>
                <li>SMS delivery (Twilio)</li>
                <li>Cloud hosting (Vercel, Neon)</li>
                <li>AI services (OpenAI)</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-800 mb-3 mt-6">Legal Requirements</h3>
              <p className="text-slate-600 leading-relaxed">
                We may disclose information if required by law or in response to valid requests by public authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure data centers and infrastructure</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your
                information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Retention</h2>
              <p className="text-slate-600 leading-relaxed">
                We retain your information for as long as necessary to provide our services and fulfill the purposes
                outlined in this policy. When you close your account, we will delete or anonymize your information
                within 90 days, except where we are required to retain it for legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
              <p className="text-slate-600 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to or restrict certain processing of your data</li>
                <li>Export your data in a portable format</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:privacy@reputationflow.app"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  privacy@reputationflow.app
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-slate-600 leading-relaxed mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                <li>Maintain your session and keep you logged in</li>
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our service</li>
                <li>Improve performance and user experience</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                You can control cookies through your browser settings, but disabling them may affect functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                ReputationFlow is not intended for use by children under 13 years of age. We do not knowingly collect
                information from children. If you believe we have collected information from a child, please contact us
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. International Data Transfers</h2>
              <p className="text-slate-600 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting
                the new policy on this page and updating the "Last updated" date. Your continued use after changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at:{" "}
                <a
                  href="mailto:privacy@reputationflow.app"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  privacy@reputationflow.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
          <p>&copy; 2025 ReputationFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
