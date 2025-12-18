-- Drop existing policies first (if they exist)
DROP POLICY IF EXISTS "Users can view their own page views" ON page_views;

-- Drop the table if it exists (to start fresh)
-- WARNING: This will delete all existing page view data!
-- If you want to keep existing data, comment out this line and manually alter the table instead
DROP TABLE IF EXISTS page_views CASCADE;

-- Create the page_views table
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  view_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Ensure one record per creator per day
  UNIQUE(creator_id, viewed_at)
);

-- Create index for faster queries by creator and date
CREATE INDEX IF NOT EXISTS idx_page_views_creator_date ON page_views(creator_id, viewed_at DESC);

-- Create index for date filtering
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);

-- Create the RPC function to increment page views
-- This function will insert a new view or increment the count for the current day
-- viewed_at is set to the start of the day for proper date grouping
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

-- Policy: Allow public read access for analytics (optional - remove if you want stricter access)
-- This allows the RPC function to work without authentication
-- The RPC function uses SECURITY DEFINER so it can insert/update regardless of RLS

-- Note: The increment_page_view function uses SECURITY DEFINER, which means it runs
-- with the privileges of the function owner (typically the postgres superuser),
-- so it can bypass RLS policies for inserts/updates.
