# ReputationFlow - Enterprise Reputation Management Platform

Transform customer feedback into 5-star reviews while protecting your online reputation.

## What is ReputationFlow?

ReputationFlow is a production-ready SaaS platform that acts as a smart review gatekeeper for your business. It routes happy customers (4-5 stars) to public review platforms like Google, Facebook, and Yelp, while capturing negative feedback privately for your team to address.

### Key Features

- **Smart Review Gatekeeper** - Filter negative reviews before they go public
- **Multi-Platform Routing** - Google, Facebook, Yelp integration
- **Automated Campaigns** - Email & SMS review requests with follow-ups
- **AI Response Generator** - Powered by Vercel AI SDK for intelligent replies
- **Real-Time Analytics** - NPS scoring, sentiment analysis, trend tracking
- **QR Code Generation** - Physical touchpoints for collecting reviews
- **Widget Builder** - Embeddable review widgets for your website
- **Review Monitoring** - Aggregate all reviews in one dashboard

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4
- **Database:** Neon (PostgreSQL)
- **Authentication:** Stack Auth (optional, works without it)
- **Email:** Resend
- **SMS:** Twilio  
- **Payments:** Stripe
- **Deployment:** Vercel

## Quick Start

### 1. Clone and Install

\`\`\`bash
git clone https://github.com/yourusername/reputationflow.git
cd reputationflow
npm install
\`\`\`

### 2. Environment Setup

Create `.env.local` file:

\`\`\`env
# Database (Required)
DATABASE_URL="your-neon-connection-string"

# Optional Services
RESEND_API_KEY="re_xxxxxxxxxxxxx"
EMAIL_FROM="reviews@yourdomain.com"

TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token"
TWILIO_PHONE_NUMBER="+1234567890"

STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxx"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\`

### 3. Initialize Database

Visit `http://localhost:3000/admin/init` after starting the dev server, or run the SQL script manually:

\`\`\`bash
# Copy the script from scripts/initialize-production.sql
# Paste into your Neon SQL Editor
# Execute
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

\`\`\`bash
# Or use Vercel CLI
vercel deploy --prod
\`\`\`

### Environment Variables for Production

All environment variables from `.env.local` plus:

- `DATABASE_URL` - Your Neon production database
- `NEXT_PUBLIC_APP_URL` - Your production domain
- `STRIPE_SECRET_KEY` - Live Stripe key (for production)
- Email and SMS credentials

### Database Setup

After deploying, initialize your production database:

1. Go to `https://yourdomain.com/admin/init`
2. Click "Initialize Database"
3. Or run the SQL script in your Neon console

## Project Structure

\`\`\`
reputationflow/
├── app/
│   ├── api/                  # API routes
│   │   ├── business/         # Business management
│   │   ├── campaigns/        # Campaign sending
│   │   ├── feedback/         # Feedback submission
│   │   ├── stripe/           # Stripe webhooks & checkout
│   │   └── admin/            # Admin utilities
│   ├── dashboard/            # Main dashboard
│   ├── demo/                 # Demo experience
│   ├── review/[businessId]/  # Public review pages
│   ├── admin/init/           # Database initialization
│   ├── auth/signin/          # Authentication
│   ├── terms/                # Terms of Service
│   └── privacy/              # Privacy Policy
├── components/
│   ├── ui/                   # Shadcn UI components
│   ├── *-view.tsx            # Feature view components
│   ├── sidebar.tsx           # Navigation
│   ├── feedback-flow.tsx     # Review collection flow
│   └── onboarding-tour.tsx   # New user onboarding
├── lib/
│   ├── db.ts                 # Database functions
│   ├── auth.ts               # Auth helpers
│   ├── validators.ts         # Input validation
│   ├── email-templates.ts    # Email/SMS templates
│   └── integrations/         # Third-party services
└── scripts/
    └── initialize-production.sql  # Database schema
\`\`\`

## API Documentation

### Campaign Management

**POST /api/campaigns/send**

Send review request to customer.

\`\`\`json
{
  "name": "John Doe",
  "contact": "john@example.com",
  "businessId": 1,
  "type": "email",
  "businessName": "My Business"
}
\`\`\`

### Feedback Submission

**POST /api/feedback/public**

Submit customer feedback (public endpoint).

\`\`\`json
{
  "businessId": 1,
  "rating": 5,
  "feedback_text": "Great service!",
  "type": "positive"
}
\`\`\`

### Business Management

**POST /api/business/update**

Update business settings.

\`\`\`json
{
  "businessId": 1,
  "business_name": "My Business",
  "google_link": "https://g.page/mybusiness",
  "facebook_link": "https://facebook.com/mybusiness"
}
\`\`\`

## Integrations

### Email (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key from dashboard
4. Add to environment variables

### SMS (Twilio)

1. Create account at [twilio.com](https://www.twilio.com)
2. Purchase phone number
3. Get credentials from console
4. Add to environment variables

### Payments (Stripe)

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys (test and live)
3. Set up webhook endpoint: `/api/stripe/webhook`
4. Add webhook secret to env

### Database (Neon)

1. Create project at [neon.tech](https://neon.tech)
2. Copy connection string
3. Run initialization script
4. Add to environment variables

## Features Guide

### For Business Owners

1. **Setup** - Add your review platform links (Google, Facebook, Yelp)
2. **Collect** - Share your unique review link or QR code
3. **Filter** - Negative feedback stays private, positive goes public
4. **Respond** - Use AI to craft professional responses
5. **Analyze** - Track NPS, sentiment, and trends

### For Developers

- Clean API design with TypeScript types
- Comprehensive error handling
- Input validation with Zod-style validators
- Database migrations with SQL
- Webhook integration examples
- Production-ready authentication flow

## Customization

### Branding

Update `app/page.tsx` and `app/layout.tsx` for branding:

\`\`\`tsx
export const metadata = {
  title: "Your Business Name",
  description: "Your description",
}
\`\`\`

### Email Templates

Customize in `lib/email-templates.ts`:

\`\`\`tsx
export const reviewRequestTemplate = {
  subject: "We'd love your feedback!",
  html: `<html>...</html>`,
}
\`\`\`

### Color Scheme

Update design tokens in `app/globals.css`:

\`\`\`css
@theme inline {
  --color-primary: #4f46e5;
  --color-accent: #8b5cf6;
}
\`\`\`

## Security Best Practices

- All inputs are validated and sanitized
- SQL injection protection via parameterized queries
- Rate limiting on public endpoints (recommended)
- Environment variables never exposed to client
- HTTPS required for production
- Regular security audits recommended

## Performance

- Server-side rendering for SEO
- Incremental static regeneration
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Edge runtime for global performance

## Support

- Documentation: [docs.reputationflow.app](#)
- Issues: [GitHub Issues](https://github.com/yourusername/reputationflow/issues)
- Email: support@reputationflow.app

## License

MIT License - see LICENSE file for details

## Roadmap

- Multi-user team collaboration
- Advanced analytics with charts (Recharts)
- Automated follow-up sequences
- White-label capabilities
- Mobile app (React Native)
- API webhooks for integrations
- Advanced AI features with RAG

---

**Built with Next.js 16, designed for scale.**

Deploy your own instance today and start protecting your online reputation.
