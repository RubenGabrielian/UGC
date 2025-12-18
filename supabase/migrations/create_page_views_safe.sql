-- Safe migration: Only creates table if it doesn't exist, and adds missing columns
-- Use this if you want to preserve existing data

-- Create the page_views table if it doesn't exist
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  view_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Ensure one record per creator per day
  UNIQUE(creator_id, viewed_at)
);

-- Add creator_id column if it doesn't exist (in case table exists with different structure)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'page_views' AND column_name = 'creator_id'
    ) THEN
        ALTER TABLE page_views ADD COLUMN creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE;
        ALTER TABLE page_views ALTER COLUMN creator_id SET NOT NULL;
    END IF;
END $$;

-- Add viewed_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'page_views' AND column_name = 'viewed_at'
    ) THEN
        ALTER TABLE page_views ADD COLUMN viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW();
    END IF;
END $$;

-- Add view_count column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'page_views' AND column_name = 'view_count'
    ) THEN
        ALTER TABLE page_views ADD COLUMN view_count INTEGER NOT NULL DEFAULT 1;
    END IF;
END $$;

-- Create index for faster queries by creator and date
CREATE INDEX IF NOT EXISTS idx_page_views_creator_date ON page_views(creator_id, viewed_at DESC);

-- Create index for date filtering
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);

-- Create the RPC function to increment page views
CREATE OR REPLACE FUNCTION increment_page_view(p_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  today_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get the start of today (midnight UTC)
  today_start := DATE_TRUNC('day', NOW() AT TIME ZONE 'UTC') AT TIME ZONE 'UTC';
  
  -- Insert or update: if a record exists for today, increment the count; otherwise create a new one
  INSERT INTO page_views (creator_id, viewed_at, view_count)
  VALUES (p_id, today_start, 1)
  ON CONFLICT (creator_id, viewed_at)
  DO UPDATE SET 
    view_count = page_views.view_count + 1,
    updated_at = NOW();
END;
$$;

-- Set up Row Level Security (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can view their own page views" ON page_views;

-- Policy: Users can read their own page views
CREATE POLICY "Users can view their own page views"
  ON page_views
  FOR SELECT
  USING (auth.uid() = creator_id);
