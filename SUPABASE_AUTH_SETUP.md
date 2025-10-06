# Supabase Authentication Setup Guide

## 🎉 Congratulations!

Your Supabase authentication system has been set up! Follow these steps to complete the configuration and start using authentication.

---

## 📋 Prerequisites

- ✅ Supabase account and project
- ✅ Database already configured with Prisma
- ✅ Authentication packages installed

---

## 🔧 Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Settings** → **API**
3. Copy the following credentials:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (the public API key)
   - **service_role** key (keep this secret!)

---

## 🔑 Step 2: Update Environment Variables

Open `.env.local` and replace the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://vcfkftqemufahhjfxhck.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_actual_anon_key_here"
SUPABASE_SERVICE_ROLE_KEY="your_actual_service_role_key_here"
```

**⚠️ Important:**
- The URL is already correct (matches your database URL)
- Replace `your_actual_anon_key_here` with your **anon public** key
- Replace `your_actual_service_role_key_here` with your **service_role** key
- **Never commit** `.env.local` to git (it's already in `.gitignore`)

---

## 🔐 Step 3: Configure Supabase Auth Settings

In your Supabase dashboard:

### Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure settings:
   - ✅ Enable email confirmations (recommended)
   - ✅ Enable secure email change
   - ✅ Enable secure password change

### Configure Email Templates (Optional but Recommended)

Go to **Authentication** → **Email Templates** and customize:
- **Confirm signup** - Email verification
- **Reset password** - Password reset
- **Magic link** - Passwordless login (optional)

### Set Site URL and Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `http://localhost:3000` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/login`
   - Add your production URLs later

---

## 🗄️ Step 4: Update Database Schema (Important!)

Since we're using Prisma with Supabase Auth, we need to ensure the User table uses the correct ID format.

### Update Prisma Schema

The User model in `prisma/schema.prisma` should already be configured correctly with `id String @id @default(cuid())`, but let's verify:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  // ... rest of fields
}
```

### Create Supabase Auth Trigger

Run this SQL in your Supabase SQL Editor to automatically create user profiles:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a trigger function to create User profile
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

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**What this does:**
- Automatically creates a User record in your database when someone signs up
- Links Supabase Auth user to your Prisma User model
- Syncs email and name from auth metadata

---

## 🧪 Step 5: Test Your Authentication

### Start the Development Server

```bash
npm run dev
```

### Test the Flow

1. **Sign Up**
   - Visit: http://localhost:3000/auth/signup
   - Create a new account
   - Check your email for verification (if enabled)

2. **Sign In**
   - Visit: http://localhost:3000/auth/login
   - Log in with your credentials

3. **Protected Routes**
   - Try accessing: http://localhost:3000/admin/dashboard
   - You should be redirected to login if not authenticated

---

## 🎨 Step 6: Update Your Components

### Update Header to Show User Info

Edit `src/components/layout/Header.tsx` to show logged-in user:

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header>
      {/* ... existing header code ... */}
      
      {user ? (
        <div className="dropdown">
          <button className="btn dropdown-toggle">
            {user.email}
          </button>
          <ul className="dropdown-menu">
            <li><Link href="/account">My Account</Link></li>
            <li><Link href="/orders">Orders</Link></li>
            <li><button onClick={signOut}>Sign Out</button></li>
          </ul>
        </div>
      ) : (
        <Link href="/auth/login">Sign In</Link>
      )}
    </header>
  );
}
```

---

## 🛒 Step 7: Enable User-Specific Features

Now that authentication is set up, you can implement:

### Cart Persistence

Store cart in database instead of localStorage:

```typescript
// In your cart context or component
const { user } = useAuth();

useEffect(() => {
  if (user) {
    // Fetch user's cart from database
    fetchUserCart(user.id);
  }
}, [user]);
```

### Wishlist

```typescript
// API route: /api/wishlist
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const wishlist = await prisma.wishlistItem.findMany({
    where: { wishlist: { userId: user.id } },
    include: { product: true }
  });

  return NextResponse.json(wishlist);
}
```

### User Addresses

```typescript
// Create address form
const { user } = useAuth();

const saveAddress = async (addressData) => {
  const response = await fetch('/api/addresses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...addressData,
      userId: user.id
    })
  });
};
```

---

## 🔒 Step 8: Protect API Routes

For API routes that need authentication:

```typescript
// Example: /api/orders/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  
  // Get authenticated user
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // User is authenticated, proceed with logic
  const orders = await prisma.order.findMany({
    where: { userId: user.id }
  });

  return NextResponse.json({ orders });
}
```

---

## 📱 Step 9: Create Account Pages

### My Account Page

Create `src/app/account/page.tsx`:

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirectTo=/account");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <h1>My Account</h1>
      <p>Welcome, {user.email}!</p>
      {/* Add account management UI */}
    </div>
  );
}
```

---

## 🚀 Step 10: Deploy to Production

### Environment Variables for Production

In your hosting platform (Vercel, Netlify, etc.), add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
DATABASE_URL=your_production_database_url
DIRECT_URL=your_production_direct_url
```

### Update Supabase Redirect URLs

Add your production URLs in Supabase dashboard:
- `https://yourdomain.com/auth/callback`
- `https://yourdomain.com/auth/login`
- `https://yourdomain.com`

---

## 🐛 Troubleshooting

### "Invalid API key" Error

- ✅ Check that NEXT_PUBLIC_SUPABASE_URL is correct
- ✅ Check that NEXT_PUBLIC_SUPABASE_ANON_KEY is the **anon public** key, not service_role

### Email Verification Not Working

- ✅ Check Supabase → Authentication → Email Templates
- ✅ Verify SMTP settings in Supabase
- ✅ Check spam folder

### User Not Created in Database

- ✅ Run the SQL trigger script (Step 4)
- ✅ Check Supabase logs for errors
- ✅ Verify User table exists in database

### Redirect Loop on Protected Routes

- ✅ Check middleware configuration
- ✅ Verify auth state is being set correctly
- ✅ Clear cookies and try again

### "Cannot read properties of undefined" Error

- ✅ Make sure AuthProvider wraps your app in layout.tsx
- ✅ Check that you're using useAuth() inside a component wrapped by AuthProvider

---

## 📚 Additional Features to Implement

### 1. Password Reset

Create `src/app/auth/forgot-password/page.tsx` for password reset flow.

### 2. Email Verification

Handle email verification callbacks in `src/app/auth/callback/route.ts`.

### 3. Social Authentication

Enable Google, GitHub, etc. in Supabase dashboard and add buttons to login/signup pages.

### 4. Profile Management

Create pages for users to update their profile, change password, manage addresses.

### 5. Order History

Show user's past orders using the Order model.

### 6. Wishlist UI

Create wishlist pages and components using the Wishlist model.

---

## 🎯 Next Steps

1. ✅ Complete Step 1-5 to get authentication working
2. ✅ Test signup/login flow
3. ✅ Update Header component to show user info
4. ✅ Implement cart persistence with user accounts
5. ✅ Create account management pages
6. ✅ Add wishlist functionality
7. ✅ Implement address management
8. ✅ Create order history page

---

## 📖 Resources

- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **Next.js App Router Auth**: https://supabase.com/docs/guides/auth/server-side/nextjs
- **Prisma with Supabase**: https://www.prisma.io/docs/guides/database/supabase

---

## 🆘 Need Help?

- Check Supabase logs: Dashboard → Logs
- Check browser console for errors
- Check server terminal for errors
- Review the authentication context in `src/contexts/AuthContext.tsx`

---

**Happy Coding! 🚀**

Your authentication system is now ready to power your e-commerce features!