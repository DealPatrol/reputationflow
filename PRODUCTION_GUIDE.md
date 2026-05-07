# ReputationFlow - Production Deployment Guide

## Overview
ReputationFlow is a complete, production-ready SaaS application for managing online reputation, collecting reviews, and analyzing customer feedback.

## Architecture

### Backend Stack
- **Authentication**: Cookie-based sessions with HTTP-only cookies
- **Database**: Neon PostgreSQL with serverless architecture
- **Payments**: Stripe integration for subscription billing
- **AI**: Groq for AI-powered response generation
- **Storage**: Vercel Blob for QR codes and assets
- **Cache**: Upstash Redis for performance

### Frontend Stack
- **Framework**: Next.js 16+ with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix primitives
- **State Management**: React hooks + Server Components
- **Forms**: react-hook-form with Zod validation

## Database Setup

### 1. Initialize Database

Run the SQL script to create all required tables:

```bash
# Navigate to Neon dashboard
# Execute: scripts/initialize-production.sql
```

Or use the admin UI:
```
https://your-app.vercel.app/admin/init
```

### 2. Database Schema

Tables created:
- \`businesses\` - Business profiles and settings
- \`subscriptions\` - Payment and plan management
- \`feedback\` - Customer feedback and ratings
- \`campaigns\` - Review request campaigns
- \`follow_up_settings\` - Automated follow-up configuration

## Environment Variables

### Required for Production

```env
# Database (Neon)
DATABASE_URL="postgresql://..."

# App Configuration
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# AI (Groq - auto-configured in v0)
GROQ_API_KEY="gsk_..."

# Storage (Vercel Blob - auto-configured in v0)
BLOB_READ_WRITE_TOKEN="..."

# Cache (Upstash Redis - auto-configured in v0)
KV_REST_API_URL="..."
KV_REST_API_TOKEN="..."
```

### Optional Integrations

```env
# AI Features (for response generation)
# Uses Vercel AI Gateway by default, no API keys needed

# Stack Auth (if using instead of custom auth)
NEXT_PUBLIC_STACK_PROJECT_ID="..."
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="..."
STACK_SECRET_SERVER_KEY="..."
```

## Deployment Steps

### 1. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all required variables from .env.example
3. Redeploy to apply changes

### 3. Set up Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: \`https://your-domain.com/api/stripe/webhook\`
3. Select events:
   - \`checkout.session.completed\`
   - \`customer.subscription.updated\`
   - \`customer.subscription.deleted\`
4. Copy webhook signing secret to \`STRIPE_WEBHOOK_SECRET\`

### 4. Configure Email Sending

#### Option A: Resend (Recommended)
1. Sign up at resend.com
2. Verify your domain
3. Create API key
4. Add to \`RESEND_API_KEY\`

#### Option B: Other Providers
Update \`lib/integrations/resend.ts\` to use your preferred email service.

### 5. Configure SMS (Optional)

1. Sign up for Twilio account
2. Get phone number
3. Add credentials to environment variables
4. Update \`lib/integrations/twilio.ts\` if needed

## Features Checklist

### Core Features
- ✅ User authentication (email/password with secure cookies)
- ✅ Business profile management
- ✅ Review collection links
- ✅ Feedback gatekeeper (positive → platforms, negative → private)
- ✅ Analytics dashboard
- ✅ Data export (CSV)

### Premium Features
- ✅ AI-powered response generation (Groq)
- ✅ Advanced analytics
- ✅ Review monitoring
- ✅ QR code generation with cloud storage
- ✅ Custom widgets
- ✅ Redis caching for performance

### Integrations
- ✅ Stripe payments
- ✅ Neon database
- ✅ Groq AI
- ✅ Vercel Blob storage
- ✅ Upstash Redis cache

## Testing

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

### Test Flows

1. **Sign Up Flow**
   - Visit /auth/signin
   - Create account
   - Verify redirect to dashboard

2. **Review Collection**
   - Go to Collection Links
   - Open preview or QR code link
   - Submit test feedback (5 stars → redirects to Google)
   - Submit test feedback (3 stars → private feedback form)

3. **Campaign Sending**
   - Go to Campaigns
   - Add customer email
   - Verify email sent (check logs in demo mode)

4. **Subscription Flow**
   - Go to Billing
   - Click Upgrade
   - Complete Stripe checkout
   - Verify premium features unlocked

## Monitoring

### Error Tracking

Add Sentry or similar:

```bash
npm install @sentry/nextjs
```

### Analytics

Add Vercel Analytics (automatically enabled on Vercel)

### Database Monitoring

Use Neon dashboard to monitor:
- Query performance
- Connection pool usage
- Storage usage

## Security Checklist

- ✅ HTTP-only cookies for sessions
- ✅ CSRF protection via SameSite cookies
- ✅ Input validation with Zod
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS prevention (sanitized inputs)
- ✅ Rate limiting (via Vercel)
- ✅ Environment variables for secrets
- ✅ Stripe webhook signature verification

## Performance Optimization

### Already Implemented
- Server Components for better performance
- Edge runtime for API routes
- Lazy loading for components
- Image optimization with Next.js Image
- Database connection pooling (Neon)

### Recommended
- Add CDN for static assets
- Enable Vercel Edge Caching
- Implement ISR for public pages
- Add database indexes (already in schema)

## Troubleshooting

### Common Issues

**Database connection errors**
- Verify DATABASE_URL is correct
- Check Neon project is active
- Run initialization script

**Stripe webhooks not working**
- Verify webhook URL is correct
- Check STRIPE_WEBHOOK_SECRET is set
- Review webhook events in Stripe dashboard

**Email not sending**
- Verify RESEND_API_KEY is valid
- Check domain verification in Resend
- Look for logs with [v0] prefix

**Session not persisting**
- Ensure cookies are enabled
- Check NEXT_PUBLIC_APP_URL matches domain
- Verify secure: true in production

## Support

For issues:
1. Check console logs (filter by "[v0]")
2. Review error boundaries in UI
3. Check Vercel deployment logs
4. Verify environment variables

## License

MIT License - See LICENSE file for details
