import { Resend } from "resend"

let resend: Resend | null = null

if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY)
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "ReputationFlow <notifications@reputationflow.com>"

export async function sendNegativeFeedbackAlert(
  ownerEmail: string,
  businessName: string,
  rating: number,
  feedbackText: string | null,
) {
  if (!resend) return
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating)
  const reviewText = feedbackText ? `<p style="background:#fff3f3;border-left:4px solid #e53e3e;padding:12px 16px;border-radius:4px;font-style:italic;">"${feedbackText}"</p>` : "<p style='color:#718096;'>No written feedback provided.</p>"

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ownerEmail,
    subject: `⚠️ New ${rating}-star review for ${businessName} — respond before it goes public`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f7fafc;margin:0;padding:0;">
        <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#e53e3e,#c53030);padding:32px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:24px;">⚠️ Negative Review Alert</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Act now to protect your reputation</p>
          </div>
          <div style="padding:32px;">
            <p style="color:#2d3748;font-size:16px;">A customer left a <strong>${rating}/5 star review</strong> for <strong>${businessName}</strong>:</p>
            <p style="font-size:28px;margin:8px 0;">${stars}</p>
            ${reviewText}
            <p style="color:#4a5568;margin-top:24px;">This review was captured <strong>privately</strong> by ReputationFlow and has <strong>not</strong> been posted publicly. Reach out to this customer to resolve their concern before it becomes a public review.</p>
            <div style="margin:32px 0;text-align:center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://reputationflow.com"}/dashboard" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">View in Dashboard →</a>
            </div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
            <p style="color:#a0aec0;font-size:12px;text-align:center;">You're receiving this because you have a ReputationFlow account. <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://reputationflow.com"}/dashboard" style="color:#667eea;">Manage notifications</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

export async function sendWelcomeEmail(
  ownerEmail: string,
  businessName: string,
  reviewLink: string,
) {
  if (!resend) return

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ownerEmail,
    subject: `Welcome to ReputationFlow — your review link is ready 🎉`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f7fafc;margin:0;padding:0;">
        <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:32px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:28px;">Welcome to ReputationFlow! 🚀</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Your reputation management is now active</p>
          </div>
          <div style="padding:32px;">
            <p style="color:#2d3748;font-size:16px;">Hi there! Your account for <strong>${businessName}</strong> is ready. Here's your unique review collection link:</p>
            <div style="background:#f7fafc;border:2px dashed #e2e8f0;border-radius:8px;padding:16px;text-align:center;margin:24px 0;">
              <p style="margin:0;font-size:13px;color:#718096;margin-bottom:8px;">Your Review Link</p>
              <a href="${reviewLink}" style="color:#667eea;font-weight:600;word-break:break-all;">${reviewLink}</a>
            </div>
            <h3 style="color:#2d3748;">Quick Start (3 steps):</h3>
            <ol style="color:#4a5568;line-height:2;">
              <li><strong>Share your link</strong> — add it to receipts, emails, and text messages</li>
              <li><strong>Connect your review platforms</strong> — link your Google, Facebook, or Yelp page in <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://reputationflow.com"}/dashboard" style="color:#667eea;">Settings</a></li>
              <li><strong>Watch your ratings climb</strong> — positive reviews route to Google, negatives stay private</li>
            </ol>
            <div style="margin:32px 0;text-align:center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://reputationflow.com"}/dashboard" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">Go to Dashboard →</a>
            </div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
            <p style="color:#a0aec0;font-size:12px;text-align:center;">Questions? Just reply to this email — we're here to help.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

export async function sendReviewRequest(
  customerEmail: string,
  customerName: string,
  businessName: string,
  reviewLink: string,
) {
  if (!resend) return

  await resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: `How was your experience at ${businessName}?`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f7fafc;margin:0;padding:0;">
        <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:32px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:24px;">How did we do? ⭐</h1>
          </div>
          <div style="padding:32px;">
            <p style="color:#2d3748;font-size:16px;">Hi ${customerName},</p>
            <p style="color:#4a5568;font-size:16px;line-height:1.6;">Thank you for choosing <strong>${businessName}</strong>! We'd love to hear about your experience. Your feedback helps us serve you better.</p>
            <p style="color:#4a5568;font-size:16px;line-height:1.6;">It only takes 30 seconds — and it means a lot to us.</p>
            <div style="margin:32px 0;text-align:center;">
              <a href="${reviewLink}" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:16px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:18px;">Share Your Review →</a>
            </div>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
            <p style="color:#a0aec0;font-size:12px;text-align:center;">You received this because you're a valued customer of ${businessName}. If you have questions, contact them directly.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}
