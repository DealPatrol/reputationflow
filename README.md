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

Pro billing additionally requires:

- `STRIPE_SECRET_KEY` (prefer a restricted key with only the required permissions)
- `STRIPE_PRICE_ID_PRO`
- `STRIPE_WEBHOOK_SECRET`
- Stripe webhook endpoint: `/api/stripe/webhook`

AI, email, SMS, KV, and Blob credentials are optional and documented in `.env.example`.

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

Next.js 16, React 19, Neon Postgres, Groq, Resend, Twilio, Stripe, and Vercel.
