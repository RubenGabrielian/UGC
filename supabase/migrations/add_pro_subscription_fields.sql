-- Add Pro subscription fields to profiles table
-- This migration adds is_pro and subscription_status columns to track user subscriptions

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_pro BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_variant_id TEXT;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_is_pro ON profiles(is_pro);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_id ON profiles(subscription_id);

-- Add comment for documentation
COMMENT ON COLUMN profiles.is_pro IS 'Whether the user has an active Pro subscription';
COMMENT ON COLUMN profiles.subscription_status IS 'Current subscription status (active, cancelled, expired, etc.)';
COMMENT ON COLUMN profiles.subscription_id IS 'LemonSqueezy subscription ID';
COMMENT ON COLUMN profiles.subscription_variant_id IS 'LemonSqueezy variant ID for the subscription';
