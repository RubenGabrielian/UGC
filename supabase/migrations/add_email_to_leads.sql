-- Add missing columns to leads table (if needed)
-- This migration sets up Row Level Security (RLS) policies to allow contact form submissions
-- Note: The table already has brand_email and requested_service columns

-- Add comments for documentation
COMMENT ON COLUMN leads.brand_email IS 'Email address of the brand/company submitting the lead';
COMMENT ON COLUMN leads.requested_service IS 'Service package requested by the brand';

-- Enable Row Level Security if not already enabled
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Users can view their own leads" ON leads;

-- Create RLS policy: Anyone can insert leads (for contact forms)
-- This allows anonymous users to submit contact forms
CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  WITH CHECK (true);

-- Create RLS policy: Users can only view their own leads
-- This ensures creators can only see leads submitted to them
CREATE POLICY "Users can view their own leads"
  ON leads
  FOR SELECT
  USING (auth.uid() = creator_id);

-- If the table doesn't exist yet, create it with all required columns
-- Uncomment the following if you need to create the table from scratch:
/*
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_creator_id ON leads(creator_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policy: Users can only view their own leads
CREATE POLICY "Users can view their own leads"
  ON leads
  FOR SELECT
  USING (auth.uid() = creator_id);

-- Create RLS policy: Anyone can insert leads (for contact forms)
CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  WITH CHECK (true);
*/

