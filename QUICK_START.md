# ReputationFlow - Quick Start Guide

Get your ReputationFlow instance running in production in 5 minutes.

## Prerequisites

- Vercel account (or any Next.js hosting)
- Neon database (PostgreSQL)
- Upstash Redis account
- Groq API key (free tier available)
- Vercel Blob storage
- Stripe account (optional, for payments)

## 1. Clone and Install

\`\`\`bash
git clone <your-repo>
cd reputationflow
npm install
\`\`\`

## 2. Set Environment Variables

All required environment variables are already configured in your Vercel project:

- `DATABASE_URL` - Neon PostgreSQL connection
- `KV_REST_API_URL` - Upstash Redis  
- `GROQ_API_KEY` - AI response generation
- `BLOB_READ_WRITE_TOKEN` - QR code storage
- `STRIPE_SECRET_KEY` - Payment processing (optional)

## 3. Initialize Database

Visit `/admin/init` after deployment or run:

\`\`\`bash
npm run db:init
\`\`\`

This creates all required tables:
- businesses
- feedback
- subscriptions

## 4. Deploy

\`\`\`bash
vercel deploy --prod
\`\`\`

## 5. Verify Setup

Visit `/admin/status` to check:
- All integrations are connected
- Database tables exist
- Services are operational

## Test the Application

1. Sign up at `/auth/signin`
2. Set up your business profile with review platform links
3. Get your unique review collection link
4. Generate QR codes for in-person use
5. Test the public review page at `/review/[businessId]`
6. Try AI response generation on feedback

## Production Checklist

- [ ] All environment variables set
- [ ] Database initialized
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Terms & Privacy pages reviewed
- [ ] Stripe webhooks configured (if using payments)
- [ ] Business profile completed

## Troubleshooting

**Database errors?**
- Check `/admin/status` for connection status
- Run SQL script manually in Neon console if needed

**AI not working?**
- Verify GROQ_API_KEY is set
- Check API quota at groq.com

**QR codes not saving?**
- Ensure BLOB_READ_WRITE_TOKEN is configured
- Check Vercel Blob dashboard for storage

## Support

For issues, check:
- `/admin/status` - System health dashboard
- Console logs for detailed error messages
- PRODUCTION_GUIDE.md for advanced configuration

## What's Included

Your production deployment includes:

- Full authentication system with secure cookie sessions
- PostgreSQL database with proper schema
- Redis caching for optimal performance
- AI-powered response generation via Groq
- QR code generation and cloud storage
- Shareable review collection links
- Analytics dashboard with CSV export
- Stripe payment integration (optional)
- Public review collection pages
- Mobile-responsive design throughout

You're ready to start collecting and managing customer feedback!
