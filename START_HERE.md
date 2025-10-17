# 🚀 START HERE - Supabase Authentication Setup

Welcome! Your Laksh-man e-commerce platform now has a complete authentication system. Follow these steps to get started.

---

## ⚡ Quick Start (15 Minutes)

### Step 1: Get Supabase Credentials (5 min)

1. Go to https://supabase.com/dashboard
2. Open your project: **vcfkftqemufahhjfxhck**
3. Navigate to **Settings** → **API**
4. Copy these values:
   - **Project URL**: `https://vcfkftqemufahhjfxhck.supabase.co` (already set)
   - **anon public** key
   - **service_role** key (keep secret!)

### Step 2: Update Environment Variables (2 min)

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL="https://vcfkftqemufahhjfxhck.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="paste_your_anon_key_here"
SUPABASE_SERVICE_ROLE_KEY="paste_your_service_role_key_here"
```

### Step 3: Enable Email Authentication (3 min)

In your Supabase dashboard:

1. Go to **Authentication** → **Providers**
2. Click **Email** and enable it
3. ✅ Enable email confirmations (recommended)
4. Click **Save**

### Step 4: Configure URLs (2 min)

In Supabase dashboard:

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `http://localhost:3000`
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/login`
   - `http://localhost:3000`
4. Click **Save**

### Step 5: Create Database Trigger (3 min)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Paste this SQL:

```sql
-- Create trigger to auto-create User profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."User" (id, email, name, "createdAt", "updatedAt")
  VALUES (
    new.id::text,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', ''),
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. Click **Run**
5. You should see "Success. No rows returned"

---

## ✅ Test Your Setup (5 Minutes)

### Start the Server

```bash
npm run dev
```

### Test Authentication

1. **Sign Up**:
   - Visit: http://localhost:3000/auth/signup
   - Create a test account
   - Submit the form

2. **Check Email**:
   - Look for verification email (if enabled)
   - Click the link (or skip if verification is disabled)

3. **Sign In**:
   - Visit: http://localhost:3000/auth/login
   - Enter your credentials
   - Click "Sign In"

4. **Test Protected Route**:
   - Visit: http://localhost:3000/admin/dashboard
   - Should show admin page (you're logged in!)

5. **Test Logout**:
   - Find and click logout (when you add it to Header)
   - Try accessing admin again
   - Should redirect to login

---

## 🎉 Success! What Now?

### ✅ You Have Successfully Set Up:

- [x] Supabase Authentication
- [x] User Registration (Signup)
- [x] User Login (Signin)
- [x] Session Management
- [x] Protected Routes
- [x] Database Integration

### 📚 Read These Next:

1. **WHATS_NEXT.md** - Your development roadmap
2. **AUTH_QUICK_REFERENCE.md** - Code snippets you'll need
3. **SUPABASE_AUTH_SETUP.md** - Detailed setup guide

### 🛠️ Your Next Tasks:

1. **Update Header Component** (30 min)
   - Show user email when logged in
   - Add logout button
   - See: WHATS_NEXT.md → Task #3

2. **Implement Cart Persistence** (3-4 hours)
   - Store cart in database
   - Sync on login
   - See: WHATS_NEXT.md → Task #4

3. **Add Wishlist Feature** (2-3 hours)
   - Create wishlist page
   - Add wishlist buttons to products
   - See: WHATS_NEXT.md → Task #5

---

## 🔥 Quick Reference

### Using Auth in Components

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function MyComponent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={signOut}>Logout</button>
        </>
      ) : (
        <a href="/auth/login">Sign In</a>
      )}
    </div>
  );
}
```

### Protecting API Routes

```tsx
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // User is authenticated
  return NextResponse.json({ data: "Protected data" });
}
```

---

## 🐛 Troubleshooting

### "Invalid API key" Error
→ Check you're using the **anon** key, not service_role in `.env.local`

### User is null after login
→ Check browser cookies are enabled
→ Clear cookies and try again
→ Restart the dev server

### Email not sending
→ Check Supabase → Authentication → Email Templates
→ Verify SMTP settings
→ Check spam folder

### Can't create account
→ Check database trigger was created (Step 5)
→ Check Supabase logs for errors

### Redirect loop
→ Clear browser cookies
→ Check middleware.ts configuration
→ Restart dev server

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env.local` | Your Supabase credentials |
| `src/contexts/AuthContext.tsx` | Auth logic & useAuth hook |
| `src/middleware.ts` | Route protection |
| `src/app/auth/login/page.tsx` | Login page |
| `src/app/auth/signup/page.tsx` | Signup page |
| `src/lib/supabase/client.ts` | Client-side Supabase |
| `src/lib/supabase/server.ts` | Server-side Supabase |

---

## 🎓 Learn More

- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **Next.js Auth Guide**: https://supabase.com/docs/guides/auth/server-side/nextjs
- **Prisma Docs**: https://www.prisma.io/docs

---

## 📞 Need Help?

1. Check **SUPABASE_AUTH_SETUP.md** for detailed instructions
2. Check **AUTH_TESTING_CHECKLIST.md** for comprehensive testing
3. Check **AUTH_QUICK_REFERENCE.md** for code examples
4. Check Supabase dashboard logs for errors
5. Check browser console for client-side errors
6. Check terminal for server-side errors

---

## ✨ Features Available Now

### For Users:
- ✅ Create account
- ✅ Login/Logout
- ✅ Password reset (email-based)
- ✅ Email verification
- ✅ Secure sessions
- ✅ Profile management (ready to build)

### For Developers:
- ✅ `useAuth()` hook
- ✅ Protected routes via middleware
- ✅ Protected API endpoints
- ✅ Server-side auth
- ✅ Client-side auth
- ✅ Session management
- ✅ TypeScript support

---

## 🚀 You're All Set!

**Current Status**: ✅ Authentication System Implemented

**Your Next Action**: Complete the 5 setup steps above (15 minutes)

**Then**: Read WHATS_NEXT.md for your development roadmap

---

**Good luck building! 🎉**

---

*Last Updated: January 2025*  
*Authentication System Version: 1.0.0*