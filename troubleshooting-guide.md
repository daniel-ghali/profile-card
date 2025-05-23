# Troubleshooting: "Invalid login credentials" Error

## The Problem
You're getting "Invalid login credentials" even though you're using the same email/password from signup.

## Root Cause
This happens because **email confirmation is still enabled** in your Supabase settings, which means:
1. User account is created during signup
2. But the account remains "unconfirmed" 
3. Unconfirmed accounts cannot log in
4. Result: "Invalid login credentials" error

## Solution: Disable Email Confirmation

### Step 1: Go to Supabase Dashboard
1. Open your Supabase project dashboard
2. Navigate to **Authentication** in the left sidebar
3. Click on **Settings**

### Step 2: Disable Email Confirmation
1. Look for **"Enable email confirmations"** setting
2. **TURN IT OFF** (toggle to disabled)
3. Click **Save** at the bottom

### Step 3: Test Again
1. Try signing up with a new email
2. You should see a session created in the console
3. Login should work immediately

## Alternative: Confirm Existing Users

If you want to keep existing test accounts:

### Option A: Manually Confirm Users
1. Go to **Authentication** > **Users** in Supabase
2. Find your test user
3. Click on the user
4. Click **"Confirm user"** button

### Option B: Delete and Recreate
1. Go to **Authentication** > **Users**
2. Delete your test user
3. Disable email confirmation (Step 2 above)
4. Sign up again with the same email

## How to Verify It's Fixed

### During Signup:
- Check browser console
- You should see: `User session: [object Object]` (not null)
- You should see: `User email confirmed: [timestamp]` (not null)

### During Login:
- Should work immediately without errors
- Console should show: `Login successful with Supabase`

## Quick Test
1. Disable email confirmation in Supabase
2. Sign up with: `test@example.com` / `password123`
3. Login immediately with same credentials
4. Should work perfectly!

## Still Having Issues?

Check the browser console for detailed error messages. The app now provides specific guidance for common issues.
