-- Add is_read column to leads table
-- This migration adds a boolean column to track whether a lead has been read by the creator

-- Add is_read column if it doesn't exist (defaults to false for new leads)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS is_read BOOLEAN NOT NULL DEFAULT false;

-- Create index for faster queries on unread leads
CREATE INDEX IF NOT EXISTS idx_leads_is_read ON leads(creator_id, is_read) WHERE is_read = false;

-- Add comment for documentation
COMMENT ON COLUMN leads.is_read IS 'Whether the creator has read this lead';

