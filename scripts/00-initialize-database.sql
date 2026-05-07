-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS follow_up_settings CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;

-- Create businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  google_link TEXT,
  facebook_link TEXT,
  yelp_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,
  feedback_text TEXT,
  type TEXT NOT NULL CHECK (type IN ('positive', 'negative')),
  source TEXT DEFAULT 'direct',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_contact TEXT NOT NULL,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('email', 'sms')),
  status TEXT DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create follow_up_settings table
CREATE TABLE follow_up_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT false,
  first_reminder_days INTEGER DEFAULT 3,
  second_reminder_days INTEGER DEFAULT 7,
  max_reminders INTEGER DEFAULT 2,
  stop_on_response BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(business_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_businesses_user_id ON businesses(user_id);
CREATE INDEX idx_feedback_business_id ON feedback(business_id);
CREATE INDEX idx_campaigns_business_id ON campaigns(business_id);
CREATE INDEX idx_subscriptions_business_id ON subscriptions(business_id);

-- Insert a demo business for testing
INSERT INTO businesses (user_id, business_name, google_link, facebook_link, yelp_link)
VALUES (
  'demo-user-123',
  'Demo Restaurant',
  'https://g.page/demo-restaurant',
  'https://facebook.com/demo-restaurant',
  'https://yelp.com/biz/demo-restaurant'
) ON CONFLICT (user_id) DO NOTHING;

-- Get the demo business ID and create subscription
DO $$
DECLARE
  demo_business_id UUID;
BEGIN
  SELECT id INTO demo_business_id FROM businesses WHERE user_id = 'demo-user-123';
  
  IF demo_business_id IS NOT NULL THEN
    INSERT INTO subscriptions (business_id, plan_type, status)
    VALUES (demo_business_id, 'free', 'active')
    ON CONFLICT DO NOTHING;
    
    INSERT INTO follow_up_settings (business_id, enabled)
    VALUES (demo_business_id, false)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
