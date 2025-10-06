# Authentication Quick Reference

## 🚀 Quick Start Commands

```bash
# Install dependencies (already done)
npm install @supabase/supabase-js @supabase/ssr

# Start development server
npm run dev

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

---

## 🔑 Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL="https://vcfkftqemufahhjfxhck.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

---

## 📄 Auth Pages

| Page | URL | Description |
|------|-----|-------------|
| Login | `/auth/login` | User sign in |
| Signup | `/auth/signup` | User registration |
| Forgot Password | `/auth/forgot-password` | Password reset request |
| Reset Password | `/auth/reset-password` | Set new password |

---

## 🎣 Using the Auth Hook

### Import and Use

```typescript
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function MyComponent() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <a href="/auth/login">Sign In</a>
      )}
    </div>
  );
}
```

### Available Properties and Methods

```typescript
const {
  user,              // Current user object or null
  session,           // Current session or null
  loading,           // Boolean: true while checking auth state
  signUp,            // Function: (email, password, name) => Promise
  signIn,            // Function: (email, password) => Promise
  signOut,           // Function: () => Promise<void>
  resetPassword,     // Function: (email) => Promise
  updateProfile,     // Function: (data) => Promise
} = useAuth();
```

---

## 🔒 Protecting Pages

### Client Component (Recommended)

```typescript
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirectTo=/protected-page");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <div>Protected Content</div>;
}
```

### Server Component

```typescript
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedServerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <div>Protected Content for {user.email}</div>;
}
```

---

## 🛡️ Protecting API Routes

```typescript
// app/api/protected/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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

  // User is authenticated
  return NextResponse.json({
    message: "Success",
    userId: user.id,
  });
}
```

---

## 👤 User Object Structure

```typescript
interface User {
  id: string;                    // User UUID
  email: string;                 // User email
  email_confirmed_at?: string;   // Email verification timestamp
  phone?: string;                // Phone number (if provided)
  created_at: string;            // Account creation timestamp
  updated_at: string;            // Last update timestamp
  user_metadata: {               // Custom metadata
    name?: string;
    [key: string]: any;
  };
}
```

---

## 📝 Common Code Snippets

### 1. Sign Up Form

```typescript
const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const { error } = await signUp(email, password, name);

  if (error) {
    setError(error.message);
  } else {
    alert("Check your email to verify your account!");
    router.push("/auth/login");
  }

  setLoading(false);
};
```

### 2. Sign In Form

```typescript
const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const { error } = await signIn(email, password);

  if (error) {
    setError(error.message);
  }
  // Redirect happens automatically via AuthContext

  setLoading(false);
};
```

### 3. Password Reset Request

```typescript
const handleResetRequest = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const { error } = await resetPassword(email);

  if (error) {
    setError(error.message);
  } else {
    setMessage("Check your email for the reset link!");
  }

  setLoading(false);
};
```

### 4. Update User Profile

```typescript
const handleUpdateProfile = async () => {
  setLoading(true);

  const { error } = await updateProfile({
    name: newName,
    phone: newPhone,
  });

  if (error) {
    setError(error.message);
  } else {
    setMessage("Profile updated successfully!");
  }

  setLoading(false);
};
```

### 5. Check if User is Admin

```typescript
const { user } = useAuth();
const isAdmin = user?.user_metadata?.role === "admin";

if (!isAdmin) {
  return <div>Access denied</div>;
}
```

### 6. Conditional Rendering Based on Auth

```typescript
const { user } = useAuth();

return (
  <>
    {user ? (
      <UserDashboard user={user} />
    ) : (
      <GuestLanding />
    )}
  </>
);
```

### 7. Get User in Server Action

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";

export async function createOrder(orderData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Create order for user
  const order = await prisma.order.create({
    data: {
      ...orderData,
      userId: user.id,
    },
  });

  return order;
}
```

---

## 🔄 Session Management

### Manual Session Refresh

```typescript
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const { data: { session }, error } = await supabase.auth.refreshSession();
```

### Get Current Session

```typescript
const { session } = useAuth();

if (session) {
  console.log("Access Token:", session.access_token);
  console.log("Refresh Token:", session.refresh_token);
  console.log("Expires At:", session.expires_at);
}
```

---

## 🔍 Checking Auth State

### In Components

```typescript
const { user, loading } = useAuth();

if (loading) {
  return <LoadingSpinner />;
}

if (!user) {
  return <LoginPrompt />;
}

return <AuthenticatedContent />;
```

### In useEffect

```typescript
useEffect(() => {
  if (!loading) {
    if (user) {
      // User is logged in
      fetchUserData(user.id);
    } else {
      // User is logged out
      clearUserData();
    }
  }
}, [user, loading]);
```

---

## 🚨 Error Handling

### Common Error Messages

| Error Code | Message | Cause |
|------------|---------|-------|
| `invalid_credentials` | Invalid login credentials | Wrong email/password |
| `email_exists` | Email already registered | Duplicate signup |
| `weak_password` | Password too weak | Password < 6 characters |
| `user_not_found` | User not found | Email doesn't exist |
| `invalid_token` | Invalid or expired token | Bad reset link |

### Handle Errors Gracefully

```typescript
const { error } = await signIn(email, password);

if (error) {
  switch (error.message) {
    case "Invalid login credentials":
      setError("Email or password is incorrect");
      break;
    case "Email not confirmed":
      setError("Please verify your email first");
      break;
    default:
      setError("An error occurred. Please try again.");
  }
}
```

---

## 📊 Database Queries with Auth

### Get User's Cart

```typescript
const { user } = useAuth();

const cart = await prisma.cart.findUnique({
  where: { userId: user!.id },
  include: {
    items: {
      include: { product: true }
    }
  }
});
```

### Get User's Orders

```typescript
const orders = await prisma.order.findMany({
  where: { userId: user!.id },
  orderBy: { createdAt: 'desc' },
  include: {
    items: {
      include: { product: true }
    }
  }
});
```

### Create User Address

```typescript
const address = await prisma.address.create({
  data: {
    userId: user!.id,
    fullName: data.fullName,
    phone: data.phone,
    addressLine1: data.addressLine1,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    isDefault: true,
  }
});
```

---

## 🎨 UI Examples

### User Dropdown Menu

```tsx
const { user, signOut } = useAuth();

<div className="dropdown">
  <button className="btn dropdown-toggle">
    {user?.email}
  </button>
  <ul className="dropdown-menu">
    <li><Link href="/account">My Account</Link></li>
    <li><Link href="/orders">My Orders</Link></li>
    <li><Link href="/wishlist">Wishlist</Link></li>
    <li><hr className="dropdown-divider" /></li>
    <li><button onClick={signOut}>Sign Out</button></li>
  </ul>
</div>
```

### Auth Guard Component

```tsx
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  return <>{children}</>;
}

// Usage
<AuthGuard>
  <ProtectedContent />
</AuthGuard>
```

---

## 🔧 Debugging Tips

### 1. Check Auth State

```typescript
const { user, session, loading } = useAuth();

console.log("User:", user);
console.log("Session:", session);
console.log("Loading:", loading);
```

### 2. Check Supabase Logs

- Go to Supabase Dashboard → Logs
- Filter by "Auth" to see authentication events
- Check for failed login attempts, signups, etc.

### 3. Check Cookies

- Open Browser DevTools → Application → Cookies
- Look for cookies starting with `sb-`
- Verify they're being set and sent

### 4. Common Issues

```typescript
// Issue: User is null but should be logged in
// Solution: Check if cookies are being blocked

// Issue: Redirect loop on protected pages
// Solution: Check middleware configuration

// Issue: Session not persisting
// Solution: Verify Supabase URL and keys are correct

// Issue: "Invalid API key" error
// Solution: Use ANON key, not SERVICE_ROLE key in client
```

---

## 📚 Additional Resources

- **Setup Guide**: `SUPABASE_AUTH_SETUP.md`
- **Testing Checklist**: `AUTH_TESTING_CHECKLIST.md`
- **Supabase Docs**: https://supabase.com/docs/guides/auth
- **Next.js Auth Guide**: https://supabase.com/docs/guides/auth/server-side/nextjs

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot login | Check email/password, verify email if required |
| User null after refresh | Check cookies, verify auth tokens |
| Protected route accessible | Check middleware, verify auth guard |
| API returns 401 | Add auth check to API route |
| Session expires too quickly | Check Supabase JWT expiry settings |
| Email not sending | Check Supabase SMTP settings |

---

## ✅ Checklist for New Features

When adding auth to a new feature:

- [ ] Check if user is authenticated
- [ ] Handle loading state
- [ ] Handle unauthenticated state
- [ ] Add appropriate redirects
- [ ] Protect API routes
- [ ] Test with logged in/out users
- [ ] Test error scenarios
- [ ] Add user-specific data queries
- [ ] Implement proper authorization

---

**Last Updated**: January 2025
**Version**: 1.0.0