# Deployment Guide

Complete guide to deploying ReputationFlow to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema initialized
- [ ] Email service tested (Resend)
- [ ] SMS service tested (Twilio) - optional
- [ ] Stripe configured (test mode)
- [ ] Review platform links tested
- [ ] Legal pages reviewed (Terms, Privacy)
- [ ] Analytics configured

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Framework will auto-detect as Next.js

### Step 3: Configure Environment Variables

Add all variables from `.env.local`:

**Required:**
- `DATABASE_URL`

**Recommended:**
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `NEXT_PUBLIC_APP_URL` (set to your vercel URL)

**Optional:**
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Step 4: Deploy

Click "Deploy" and wait for build to complete.

### Step 5: Initialize Database

1. Visit `https://your-domain.vercel.app/admin/init`
2. Click "Initialize Database"
3. Verify all tables created successfully

### Step 6: Test Core Functions

1. Create demo account at `/demo`
2. Test review collection flow
3. Send test campaign (email)
4. Verify feedback submission
5. Check analytics dashboard

## Custom Domain Setup

### In Vercel:

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records (provided by Vercel)

### Update Environment:

\`\`\`bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
\`\`\`

Redeploy after changing.

## Database Migration

### From Development to Production:

1. Export development data (if needed):
\`\`\`bash
pg_dump $DEV_DATABASE_URL > backup.sql
\`\`\`

2. Import to production:
\`\`\`bash
psql $PROD_DATABASE_URL < backup.sql
\`\`\`

3. Or use Neon's branch feature to promote dev → prod

## Stripe Setup (Production)

### Switch to Live Mode:

1. Get live API keys from Stripe dashboard
2. Update environment variables
3. Configure webhook endpoint:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.*`
4. Add webhook signing secret to env

### Test Payment Flow:

1. Create test subscription
2. Verify webhook receives events
3. Check database for subscription updates
4. Test cancellation flow

## Email Service (Resend)

### Production Setup:

1. Verify your domain in Resend
2. Set up DKIM, SPF, DMARC records
3. Test email deliverability
4. Monitor bounce rates

### Email Best Practices:

- Use verified domain for `EMAIL_FROM`
- Include unsubscribe links
- Monitor delivery rates
- Set up bounce handling

## Monitoring & Analytics

### Vercel Analytics:

Enable in Project Settings > Analytics

### Error Tracking:

Consider adding:
- Sentry
- LogRocket
- Datadog

### Uptime Monitoring:

- UptimeRobot
- Pingdom
- Better Uptime

## Security Hardening

### Headers:

Add to `next.config.js`:

\`\`\`js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ]
}
\`\`\`

### Rate Limiting:

Implement at API route level or use Vercel's Edge Config.

### Environment Variables:

- Never commit to git
- Use Vercel's encrypted storage
- Rotate keys regularly

## Backup Strategy

### Database Backups:

Neon provides automatic backups. Additionally:

\`\`\`bash
# Daily backup script
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
\`\`\`

### Code Backups:

- Git repository (GitHub/GitLab)
- Vercel deployment history
- Regular releases/tags

## Scaling Considerations

### Database:

- Neon autoscales compute
- Add read replicas if needed
- Monitor query performance
- Index frequently queried columns

### Serverless Functions:

- Vercel scales automatically
- Monitor execution time
- Optimize cold starts
- Consider Edge Runtime for global apps

### CDN & Assets:

- Use Vercel's CDN (automatic)
- Optimize images with next/image
- Enable gzip/brotli compression

## Troubleshooting

### Build Failures:

\`\`\`bash
# Check build logs
vercel logs your-deployment-url

# Local production build
npm run build
\`\`\`

### Database Connection Issues:

- Verify `DATABASE_URL` is correct
- Check Neon project status
- Test connection locally

### Email Not Sending:

- Verify API key is correct
- Check domain verification
- Review Resend logs
- Test with personal email first

### Stripe Webhooks Failing:

- Verify webhook URL is correct
- Check signing secret matches
- Review Vercel function logs
- Test with Stripe CLI locally

## Post-Deployment

### Monitoring Checklist:

- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Enable analytics
- [ ] Review security headers
- [ ] Test all critical paths
- [ ] Verify email deliverability
- [ ] Check payment processing
- [ ] Monitor database performance

### Marketing Setup:

- [ ] Submit sitemap to Google
- [ ] Set up Google Analytics
- [ ] Configure SEO meta tags
- [ ] Create social media cards
- [ ] Set up conversion tracking

## Maintenance

### Weekly:

- Review error logs
- Check uptime reports
- Monitor database usage
- Review email delivery rates

### Monthly:

- Update dependencies
- Review security advisories
- Analyze user metrics
- Backup critical data

### Quarterly:

- Security audit
- Performance review
- Feature usage analysis
- Cost optimization review

## Support Resources

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Neon Docs: [neon.tech/docs](https://neon.tech/docs)
- Resend Docs: [resend.com/docs](https://resend.com/docs)

---

**Questions?** Open an issue on GitHub or email support@reputationflow.app
\`\`\`

\`\`\`json file="" isHidden
