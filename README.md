# ReputationFlow

ReputationFlow helps local businesses request honest public reviews, collect optional private feedback, monitor results, and draft responses.

## Compliant review flow

Every customer sees the same Google, Facebook, and Yelp review links regardless of the rating they select. Private feedback is optional and appears alongside those public links. ReputationFlow does not suppress, delay, or discourage public reviews based on sentiment.

## Features

- Public review links and QR codes
- Optional private customer feedback
- Email review requests and owner alerts
- Analytics and AI-assisted response drafts
- Stripe Checkout and Customer Portal for the Pro plan
- Keyless demo mode when integrations are not configured

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run migrate
npm run dev
```

`npm run migrate` is the only database initialization path. It applies the idempotent schema in `scripts/migrate.sql`; there are no public database-init endpoints.

For a keyless demo, omit `DATABASE_URL`, Stripe, and Groq variables and run `npm run dev`. Visit `/demo`, or sign in with:

- Email: `demo@reputationflow.local`
- Password: `demo-reputationflow`

Demo mode uses sample data, deterministic AI response drafts, and disables account creation and billing.

## Environment

Copy `.env.example`. Production requires:

- `DATABASE_URL`
- `AUTH_SECRET` (at least 32 random characters)
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SITE_URL` (canonical origin for SEO, sitemap, and shared review links; use the custom domain once it is attached)

Pro billing additionally requires:

- `STRIPE_SECRET_KEY` (prefer a restricted key with only the required permissions)
- `STRIPE_PRICE_ID_PRO`
- `STRIPE_WEBHOOK_SECRET`
- Stripe webhook endpoint: `/api/stripe/webhook`

AI, email, KV, and Blob credentials are optional and documented in `.env.example`. ReputationFlow does not send SMS.

## Ads tags

Meta Pixel, GA4, and Google Ads load only when the matching `NEXT_PUBLIC_` variable is set. See `.env.example`. Change those variables and redeploy; they are inlined at build time.

- Lead fires after a template-pack or free-tool email is stored.
- Signup fires after account creation succeeds.
- Purchase fires only after the Stripe webhook has marked the subscription Professional and active. The browser tag runs when that customer loads the dashboard with `?success=true`. Closing the tab before then means the browser tag does not fire. There is no server-side Measurement Protocol call.

`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, and `fbclid` are stored on `leads` and `users` from the first page that carried them. Run `npm run migrate` so those columns exist.

`/ads/contractors`, `/ads/restaurants`, and `/ads/home-services` are noindex landing pages with one signup button. Their canonicals point at the matching organic page. They are not in the sitemap.

## Template pack leads

`/google-review-request-templates` offers a plain-text pack of in-person, text, and email scripts. The download does not require an email or an account.

If someone submits an email, the app stores a row in the existing `leads` table with source `review-templates`. There is no separate mailing list or email vendor beyond Resend. When `RESEND_API_KEY` and `EMAIL_FROM` are set, that same request emails the pack. If email is not configured, the signup is still stored and the page tells the person to download the file. Demo mode (no `DATABASE_URL`) cannot store leads. The download still works.

Never commit real credentials. Keep separate test and live Stripe keys. Configure tax registrations before enabling Stripe Tax; this integration does not enable automatic tax.

## Commands

```bash
npm run lint
npm run type-check
npm run build
npm test
```

## Stripe events

Subscribe the webhook endpoint to:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Webhook signatures are verified before processing. Event IDs are persisted in `stripe_webhook_events` so retries are idempotent.

## Stack

Next.js 16, React 19, Neon Postgres, Groq, Resend, Stripe, and Vercel.
