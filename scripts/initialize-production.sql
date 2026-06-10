-- ReputationFlow Database Schema
-- Run this script in your Neon database console

-- Drop existing tables (if recreating)
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS follow_up_settings CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table (stores hashed passwords)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Create businesses table
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  owner_email TEXT,
  google_link TEXT,
  facebook_link TEXT,
  yelp_link TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'inactive',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_businesses_user_id ON businesses(user_id);
CREATE UNIQUE INDEX idx_businesses_user_id_unique ON businesses(user_id);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled', 'past_due')),
  stripe_subscription_id TEXT,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(business_id)
);

CREATE INDEX idx_subscriptions_business_id ON subscriptions(business_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);

-- Create feedback table
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text TEXT,
  type TEXT NOT NULL CHECK (type IN ('positive', 'negative', 'neutral')),
  customer_email TEXT,
  responded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feedback_business_id ON feedback(business_id);
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_type ON feedback(type);

-- Create campaigns table
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'opened', 'review_left', 'failed')),
  follow_up_count INTEGER DEFAULT 0,
  last_sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_campaigns_business_id ON campaigns(business_id);
CREATE INDEX idx_campaigns_created_at ON campaigns(created_at DESC);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- Create follow_up_settings table
CREATE TABLE follow_up_settings (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT false,
  intervals TEXT DEFAULT '[3,7]',
  max_followups INTEGER DEFAULT 2,
  stop_on_response BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(business_id)
);

CREATE INDEX idx_follow_up_settings_business_id ON follow_up_settings(business_id);

-- Insert demo data
INSERT INTO businesses (user_id, business_name, google_link, facebook_link, is_premium)
VALUES 
  ('demo-user', 'Demo Restaurant', 'https://g.page/demo', 'https://facebook.com/demo', false)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO subscriptions (business_id, plan_type, status)
SELECT id, 'free', 'active'
FROM businesses
WHERE user_id = 'demo-user'
ON CONFLICT (business_id) DO NOTHING;

INSERT INTO follow_up_settings (business_id, enabled)
SELECT id, false
FROM businesses
WHERE user_id = 'demo-user'
ON CONFLICT (business_id) DO NOTHING;

-- Sample feedback for demo
INSERT INTO feedback (business_id, rating, feedback_text, type)
SELECT 
  b.id,
  5,
  'Absolutely amazing service! The staff was friendly and the experience exceeded my expectations.',
  'positive'
FROM businesses b
WHERE b.user_id = 'demo-user'
LIMIT 1;

INSERT INTO feedback (business_id, rating, feedback_text, type)
SELECT 
  b.id,
  3,
  'Service was okay but could be better. Wait time was longer than expected.',
  'negative'
FROM businesses b
WHERE b.user_id = 'demo-user'
LIMIT 1;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO your_user;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO your_user;

-- Success message
SELECT 'Database initialized successfully!' as message;
