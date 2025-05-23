# Supabase Configuration for School Project (No Security)

## Step 1: Disable Email Confirmation

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Settings**
3. Find **"Enable email confirmations"**
4. **TURN IT OFF** (disable it)
5. Click **Save**

## Step 2: Set Up Database

1. Go to **SQL Editor** in your Supabase Dashboard
2. Copy and paste the contents of `supabase-setup.sql`
3. Click **Run** to execute the SQL

## Step 3: Verify Settings

### Authentication Settings:
- ✅ Email confirmations: **DISABLED**
- ✅ Enable signup: **ENABLED**
- ✅ Enable manual linking: **ENABLED** (optional)

### Database:
- ✅ `profiles` table created
- ✅ Row Level Security disabled
- ✅ Full access granted to everyone

## Step 4: Test Your Application

1. Try signing up with any email (no confirmation needed)
2. Login immediately after signup
3. Check if profile data appears on page.html

## What This Setup Does:

### ✅ Enabled Features:
- Supabase Authentication (without email confirmation)
- Database storage for user profiles
- Automatic user ID generation
- Profile data persistence

### ❌ Disabled Security Features:
- Email confirmation
- Row Level Security
- Access restrictions
- Data validation

## Perfect for School Projects!

This setup gives you:
- Real database functionality
- Professional backend (Supabase)
- No complex security setup
- Immediate functionality
- Easy demonstration

Your application will work exactly like a real web app but without the security complexity!
