# Supabase Database Migrations

## Setup Instructions

### 1. Check Current Structure (Optional but Recommended)

If you're getting errors or the table already exists, first check the current structure:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the contents of `migrations/check_page_views_structure.sql`
6. Click **Run** to see the current table structure

### 2. Run the Migration

**Option A: Fresh Start (Recommended if you don't have existing data)**
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the contents of `migrations/create_page_views.sql`
6. Click **Run** to execute the migration

**Option B: Safe Migration (Preserves existing data)**
If the table already exists and you want to preserve data:
1. Use `migrations/create_page_views_safe.sql` instead
2. This will add missing columns without dropping the table

### 2. Verify the Setup

After running the migration, verify that:

1. The `page_views` table exists:
   ```sql
   SELECT * FROM page_views LIMIT 1;
   ```

2. The `increment_page_view` function exists:
   ```sql
   SELECT routine_name 
   FROM information_schema.routines 
   WHERE routine_name = 'increment_page_view';
   ```

3. Test the function (replace `YOUR_USER_ID` with an actual profile ID):
   ```sql
   SELECT increment_page_view('YOUR_USER_ID'::uuid);
   ```

### 3. What This Migration Creates

- **`page_views` table**: Stores page view analytics
  - `id`: Primary key (UUID)
  - `creator_id`: Foreign key to `profiles(id)`
  - `viewed_at`: Timestamp of when the view was recorded
  - `view_count`: Number of views for that timestamp
  - `created_at`: When the record was created
  - `updated_at`: When the record was last updated

- **`increment_page_view(p_id)` function**: RPC function to record page views
  - Takes a creator profile ID as parameter
  - Increments the view count for today, or creates a new record if none exists
  - Uses `SECURITY DEFINER` to bypass RLS for inserts/updates

- **Indexes**: For fast queries by creator and date

- **RLS Policies**: Users can only view their own page views

### Troubleshooting

If you encounter errors:

1. **"relation profiles does not exist"**: Make sure your `profiles` table exists first
2. **"permission denied"**: Check that you're running the migration as a database admin
3. **"function already exists"**: The migration uses `CREATE OR REPLACE`, so it's safe to run multiple times
