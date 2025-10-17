# What's Next? 🚀

## Immediate Actions (Do These First!)

### 1. ⚙️ Complete Supabase Setup (15 minutes)

**Why**: Without this, authentication won't work.

```bash
# Step-by-step:
1. Go to https://supabase.com/dashboard
2. Open your project (vcfkftqemufahhjfxhck)
3. Go to Settings → API
4. Copy these keys:
   - Project URL (already correct)
   - anon public key
   - service_role key
5. Update .env.local with these keys
6. Go to Authentication → Providers
7. Enable Email provider
8. Go to Authentication → URL Configuration
9. Add: http://localhost:3000/auth/callback
10. Run the SQL trigger (see SUPABASE_AUTH_SETUP.md Step 4)
```

**Result**: Authentication system fully operational

---

### 2. 🧪 Test Authentication (10 minutes)

```bash
# Start the server
npm run dev

# Test these:
1. Visit http://localhost:3000/auth/signup
2. Create a test account
3. Check your email (if verification enabled)
4. Login at http://localhost:3000/auth/login
5. Try accessing http://localhost:3000/admin/dashboard
6. Click logout
7. Verify you can't access admin anymore
```

**Result**: Confirmed working authentication

---

### 3. 🎨 Update Header Component (30 minutes)

**File**: `src/components/layout/Header.tsx`

Add this after the support section:

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

// Inside Header component:
const { user, signOut } = useAuth();

// Replace the user icon section with:
{user ? (
  <div className="dropdown">
    <button 
      className="btn btn-link text-decoration-none"
      data-bs-toggle="dropdown"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use xlinkHref="#user"></use>
      </svg>
      <span className="ms-2 d-none d-lg-inline">{user.email}</span>
    </button>
    <ul className="dropdown-menu dropdown-menu-end">
      <li className="dropdown-header">
        {user.email}
      </li>
      <li><hr className="dropdown-divider" /></li>
      <li>
        <Link href="/account" className="dropdown-item">
          My Account
        </Link>
      </li>
      <li>
        <Link href="/orders" className="dropdown-item">
          My Orders
        </Link>
      </li>
      <li>
        <Link href="/wishlist" className="dropdown-item">
          Wishlist
        </Link>
      </li>
      <li><hr className="dropdown-divider" /></li>
      <li>
        <button 
          onClick={signOut} 
          className="dropdown-item text-danger"
        >
          Sign Out
        </button>
      </li>
    </ul>
  </div>
) : (
  <Link href="/auth/login" className="btn btn-outline-primary">
    Sign In
  </Link>
)}
```

**Result**: Users can see their account and sign out

---

## Phase 1: User Features (Week 1)

### 4. 🛒 Cart Persistence (Priority: HIGH)

**Current Problem**: Cart lost on logout/refresh

**Solution**: Store cart in database for logged-in users

**Files to Create**:
- `src/app/api/cart/route.ts`
- `src/hooks/useCart.ts` (replace localStorage logic)

**Implementation**:

```tsx
// src/hooks/useCart.ts
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

export function useCart() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch cart from database
      fetchCartFromDB(user.id);
    } else {
      // Use localStorage
      const stored = localStorage.getItem('cart');
      if (stored) setItems(JSON.parse(stored));
    }
  }, [user]);

  const addItem = async (product) => {
    if (user) {
      // Save to database
      await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
    } else {
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify([...items, product]));
    }
    setItems([...items, product]);
  };

  return { items, addItem, removeItem, updateQuantity };
}
```

**API Route**:

```tsx
// src/app/api/cart/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  return NextResponse.json({ cart });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity } = await request.json();

  // Get or create cart
  let cart = await prisma.cart.findUnique({
    where: { userId: user.id }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id }
    });
  }

  // Add item to cart
  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: parseInt(productId)
      }
    },
    update: {
      quantity: { increment: quantity }
    },
    create: {
      cartId: cart.id,
      productId: parseInt(productId),
      quantity
    }
  });

  return NextResponse.json({ success: true, cartItem });
}
```

**Estimated Time**: 3-4 hours  
**Difficulty**: Medium

---

### 5. 💝 Wishlist Feature (Priority: HIGH)

**Files to Create**:
- `src/app/wishlist/page.tsx`
- `src/app/api/wishlist/route.ts`
- `src/components/wishlist/WishlistButton.tsx`

**Wishlist Button** (add to product cards):

```tsx
// src/components/wishlist/WishlistButton.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function WishlistButton({ productId }: { productId: string }) {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleWishlist = async () => {
    if (!user) {
      window.location.href = '/auth/login?redirectTo=/wishlist';
      return;
    }

    setLoading(true);
    
    if (isInWishlist) {
      await fetch(`/api/wishlist/${productId}`, { method: 'DELETE' });
      setIsInWishlist(false);
    } else {
      await fetch('/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId })
      });
      setIsInWishlist(true);
    }
    
    setLoading(false);
  };

  return (
    <button 
      onClick={toggleWishlist}
      disabled={loading}
      className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
    >
      <svg width="20" height="20">
        <use xlinkHref="#heart"></use>
      </svg>
      {isInWishlist ? 'Remove' : 'Add to Wishlist'}
    </button>
  );
}
```

**Estimated Time**: 2-3 hours  
**Difficulty**: Easy

---

### 6. 👤 My Account Page (Priority: HIGH)

**File**: `src/app/account/page.tsx`

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AccountPage() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirectTo=/account");
    }
    if (user) {
      setName(user.user_metadata?.name || "");
      setPhone(user.user_metadata?.phone || "");
    }
  }, [user, loading, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error } = await updateProfile({ name, phone });
    
    if (!error) {
      alert("Profile updated!");
    } else {
      alert("Error: " + error.message);
    }
    
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <>
      <Header cartCount={0} cartTotal={0} />
      <div className="container py-5">
        <h1>My Account</h1>
        
        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Profile Information</h5>
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={user.email} 
                      disabled 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
```

**Estimated Time**: 2 hours  
**Difficulty**: Easy

---

## Phase 2: E-commerce Features (Week 2)

### 7. 📍 Address Management

**Files**:
- `src/app/account/addresses/page.tsx`
- `src/app/api/addresses/route.ts`

**Features**:
- Add new address
- Edit existing address
- Delete address
- Set default address
- Use address at checkout

**Estimated Time**: 4-5 hours  
**Difficulty**: Medium

---

### 8. 📦 Order History

**Files**:
- `src/app/orders/page.tsx`
- `src/app/orders/[orderId]/page.tsx`
- `src/app/api/orders/route.ts`

**Features**:
- List all user orders
- View order details
- Track order status
- Reorder functionality

**Estimated Time**: 5-6 hours  
**Difficulty**: Medium

---

### 9. ⭐ Product Reviews

**Files**:
- `src/app/api/reviews/route.ts`
- `src/components/products/ReviewForm.tsx`
- `src/components/products/ReviewList.tsx`

**Features**:
- Write reviews (logged-in users only)
- Rate products (1-5 stars)
- View reviews on product page
- Mark reviews as helpful

**Estimated Time**: 3-4 hours  
**Difficulty**: Medium

---

## Phase 3: Advanced Features (Week 3+)

### 10. 💳 Checkout & Payment

**Integration Options**:
- **Stripe** (International)
- **Razorpay** (India)
- **PayPal**

**Estimated Time**: 8-10 hours  
**Difficulty**: Hard

---

### 11. 🔐 Admin Role System

**Features**:
- Admin role in user metadata
- Admin-only routes
- Admin dashboard enhancements
- User management

**Estimated Time**: 4-5 hours  
**Difficulty**: Medium

---

### 12. 📧 Email Notifications

**Using**: Supabase Edge Functions or SendGrid

**Emails**:
- Welcome email
- Order confirmation
- Shipping updates
- Password reset
- Marketing emails (with unsubscribe)

**Estimated Time**: 6-8 hours  
**Difficulty**: Medium

---

## 📚 Learning Resources

### Supabase Auth
- Docs: https://supabase.com/docs/guides/auth
- Video: https://www.youtube.com/watch?v=6ow_jW4epf8

### Prisma with Next.js
- Docs: https://www.prisma.io/docs/guides/database/supabase
- Tutorial: https://www.prisma.io/nextjs

### Payment Integration
- Stripe: https://stripe.com/docs/payments/checkout
- Razorpay: https://razorpay.com/docs/payment-gateway/

---

## 🎯 Success Criteria

### Week 1 Goals
- ✅ Authentication working
- ✅ Header shows user menu
- ✅ Cart persists for logged-in users
- ✅ Wishlist functional
- ✅ Account page created

### Week 2 Goals
- ✅ Address management complete
- ✅ Order history visible
- ✅ Reviews can be posted
- ✅ Checkout flow designed

### Week 3 Goals
- ✅ Payment integration
- ✅ Order tracking
- ✅ Email notifications
- ✅ Admin enhancements

---

## 💡 Pro Tips

### Development Workflow

1. **Always test both states**:
   - Logged in
   - Logged out

2. **Use Prisma Studio**:
   ```bash
   npx prisma studio
   ```
   Great for viewing/editing database records

3. **Check Supabase logs**:
   Dashboard → Logs → Filter by "Auth"

4. **Use TypeScript**:
   Let it guide you - if types are correct, code usually works

5. **Test on mobile**:
   Use Chrome DevTools device emulation

---

## 🚨 Common Pitfalls to Avoid

1. ❌ **Forgetting to check user authentication**
   ```tsx
   // BAD
   const cart = await prisma.cart.findMany();
   
   // GOOD
   const { user } = await supabase.auth.getUser();
   if (!user) return error;
   const cart = await prisma.cart.findMany({
     where: { userId: user.id }
   });
   ```

2. ❌ **Not handling loading states**
   ```tsx
   // BAD
   const { user } = useAuth();
   return <div>Welcome {user.email}</div>;
   
   // GOOD
   const { user, loading } = useAuth();
   if (loading) return <div>Loading...</div>;
   if (!user) return <div>Please login</div>;
   return <div>Welcome {user.email}</div>;
   ```

3. ❌ **Exposing sensitive data**
   ```tsx
   // BAD - Returns all user data
   return NextResponse.json({ users });
   
   // GOOD - Only return what's needed
   return NextResponse.json({ 
     users: users.map(u => ({ id: u.id, email: u.email }))
   });
   ```

---

## 📞 Need Help?

### Documentation
- `SUPABASE_AUTH_SETUP.md` - Setup guide
- `AUTH_QUICK_REFERENCE.md` - Code snippets
- `AUTH_TESTING_CHECKLIST.md` - Testing guide

### Debugging
1. Check browser console
2. Check server terminal
3. Check Supabase dashboard logs
4. Review the auth context code
5. Test with `npx prisma studio`

### Community
- Supabase Discord: https://discord.supabase.com
- Next.js Discord: https://nextjs.org/discord
- Stack Overflow: Tag [supabase] [next.js]

---

## ✅ Daily Checklist

Start each coding session:

- [ ] Server running (`npm run dev`)
- [ ] Logged in to test account
- [ ] Browser console open
- [ ] Prisma Studio available
- [ ] Git changes committed

End each coding session:

- [ ] Features tested (logged in/out)
- [ ] No console errors
- [ ] Code commented
- [ ] Git committed with clear message
- [ ] Documentation updated

---

## 🎉 You're Ready to Build!

Start with tasks 1-3 today, then move to Phase 1 features. Each feature builds on the previous one, so follow the order for best results.

Remember: **Build, Test, Commit, Repeat!**

Good luck! 🚀

---

**Last Updated**: January 2025  
**Your Next Action**: Complete Supabase setup (Task #1)