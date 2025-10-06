# Authentication Testing Checklist

## 🧪 Complete Testing Guide for Supabase Authentication

Use this checklist to ensure your authentication system is working correctly.

---

## ✅ Pre-Testing Setup

- [ ] Environment variables configured in `.env.local`
- [ ] Supabase URL is correct
- [ ] Supabase anon key is set
- [ ] Database trigger created for user profiles
- [ ] Email provider enabled in Supabase
- [ ] Development server running (`npm run dev`)

---

## 🔐 Authentication Flow Tests

### 1. User Registration (Sign Up)

- [ ] **Navigate to signup page** (`/auth/signup`)
- [ ] **Test validation errors**:
  - [ ] Submit with empty name → Shows error
  - [ ] Submit with invalid email → Shows error
  - [ ] Submit with password < 6 chars → Shows error
  - [ ] Submit with mismatched passwords → Shows error
  - [ ] Submit without accepting terms → Shows error
- [ ] **Test password strength indicator**:
  - [ ] Weak password (< 6 chars) → Red indicator
  - [ ] Fair password (6-9 chars) → Orange indicator
  - [ ] Good password (10-13 chars) → Blue indicator
  - [ ] Strong password (14+ chars) → Green indicator
- [ ] **Test successful signup**:
  - [ ] Fill in all fields correctly
  - [ ] Accept terms and conditions
  - [ ] Click "Create Account"
  - [ ] Success message appears
  - [ ] Redirects to login page
  - [ ] Check email for verification link (if enabled)
- [ ] **Verify database entry**:
  - [ ] Open Supabase dashboard → Authentication → Users
  - [ ] New user appears in list
  - [ ] Open Database → User table
  - [ ] User profile created with correct email and name

### 2. User Login (Sign In)

- [ ] **Navigate to login page** (`/auth/login`)
- [ ] **Test validation**:
  - [ ] Submit with empty fields → Shows error
  - [ ] Submit with invalid email → Shows error
  - [ ] Submit with wrong password → Shows "Invalid credentials"
  - [ ] Submit with non-existent email → Shows error
- [ ] **Test password visibility toggle**:
  - [ ] Password hidden by default
  - [ ] Click eye icon → Password visible
  - [ ] Click again → Password hidden
- [ ] **Test successful login**:
  - [ ] Enter correct credentials
  - [ ] Click "Sign In"
  - [ ] No error messages
  - [ ] Redirects to home page
  - [ ] User is authenticated
- [ ] **Test "Remember me" checkbox** (if implemented)
- [ ] **Test redirect after login**:
  - [ ] Visit protected page while logged out
  - [ ] Get redirected to login
  - [ ] After login, redirected back to original page

### 3. User Logout (Sign Out)

- [ ] **While logged in**:
  - [ ] Find logout button/link
  - [ ] Click sign out
  - [ ] Session cleared
  - [ ] Redirects to home page
  - [ ] Try accessing protected route → Redirected to login

### 4. Password Reset (if implemented)

- [ ] **Navigate to forgot password** (`/auth/forgot-password`)
- [ ] **Test validation**:
  - [ ] Submit with empty email → Shows error
  - [ ] Submit with invalid email → Shows error
- [ ] **Test successful request**:
  - [ ] Enter registered email
  - [ ] Submit form
  - [ ] Success message appears
  - [ ] Check email for reset link
  - [ ] Click reset link
  - [ ] Redirects to reset password page
  - [ ] Enter new password
  - [ ] Password updated successfully
  - [ ] Can login with new password

---

## 🔒 Protected Routes Tests

### Admin Dashboard Protection

- [ ] **While logged out**:
  - [ ] Visit `/admin/dashboard`
  - [ ] Redirected to login page
  - [ ] Login redirects back to admin dashboard
- [ ] **While logged in**:
  - [ ] Visit `/admin/dashboard`
  - [ ] Page loads successfully
  - [ ] Can perform admin actions

### Other Protected Routes

- [ ] `/account` - Redirects if not logged in
- [ ] `/orders` - Redirects if not logged in
- [ ] `/wishlist` - Accessible only when logged in
- [ ] `/addresses` - Accessible only when logged in

---

## 🎨 UI/UX Tests

### Header Component

- [ ] **When logged out**:
  - [ ] Shows "Sign In" link
  - [ ] Shows "Sign Up" link (if added)
  - [ ] User icon links to login
- [ ] **When logged in**:
  - [ ] Shows user email or name
  - [ ] Shows account dropdown
  - [ ] Dropdown has "My Account" link
  - [ ] Dropdown has "Orders" link
  - [ ] Dropdown has "Sign Out" button
  - [ ] All links work correctly

### Navigation Links

- [ ] All auth pages have "Back to Home" link
- [ ] Login page has "Sign Up" link
- [ ] Signup page has "Sign In" link
- [ ] Forgot password link works from login page

---

## 🛒 Feature Integration Tests

### Cart Persistence

- [ ] **While logged out**:
  - [ ] Add items to cart
  - [ ] Cart stored in localStorage
  - [ ] Items persist on page reload
- [ ] **After login**:
  - [ ] localStorage cart migrated to database
  - [ ] Cart items visible after logout/login
  - [ ] Cart syncs across devices/browsers
- [ ] **Test cart operations**:
  - [ ] Add item to cart → Saves to database
  - [ ] Remove item from cart → Updates database
  - [ ] Update quantity → Updates database
  - [ ] Clear cart → Clears database

### Wishlist (if implemented)

- [ ] Can only access when logged in
- [ ] Add product to wishlist → Saves to database
- [ ] Remove from wishlist → Updates database
- [ ] Wishlist persists across sessions
- [ ] Wishlist syncs across devices

### User Addresses (if implemented)

- [ ] Can only access when logged in
- [ ] Add new address → Saves to database
- [ ] Edit address → Updates database
- [ ] Delete address → Removes from database
- [ ] Set default address → Updates database
- [ ] Addresses load on checkout page

### Order History (if implemented)

- [ ] Can only access when logged in
- [ ] Shows user's past orders
- [ ] Order details display correctly
- [ ] Can view order status
- [ ] Can track orders

---

## 🔌 API Route Tests

### Authentication API

Test with tools like Postman or curl:

#### 1. Protected API Routes

```bash
# Without authentication - should return 401
curl http://localhost:3000/api/cart

# With authentication - should return data
curl http://localhost:3000/api/cart \
  -H "Cookie: sb-access-token=YOUR_TOKEN"
```

- [ ] `/api/cart` - Requires authentication
- [ ] `/api/wishlist` - Requires authentication
- [ ] `/api/orders` - Requires authentication
- [ ] `/api/addresses` - Requires authentication
- [ ] `/api/products` - Public (no auth required)

#### 2. User-Specific Data

- [ ] User A can only see their own cart
- [ ] User A cannot access User B's orders
- [ ] User A cannot modify User B's data
- [ ] Admin routes check user role

---

## 🌐 Browser Compatibility Tests

Test in multiple browsers:

- [ ] **Chrome**:
  - [ ] Login works
  - [ ] Signup works
  - [ ] Session persists
  - [ ] Logout works
- [ ] **Firefox**:
  - [ ] All auth flows work
  - [ ] Cookies set correctly
- [ ] **Safari**:
  - [ ] Authentication functional
  - [ ] No cookie issues
- [ ] **Edge**:
  - [ ] All features working
- [ ] **Mobile Browsers** (Chrome/Safari):
  - [ ] Forms usable on mobile
  - [ ] No layout issues
  - [ ] Touch interactions work

---

## 📱 Responsive Design Tests

- [ ] **Mobile (< 768px)**:
  - [ ] Login form displays properly
  - [ ] Signup form displays properly
  - [ ] All fields accessible
  - [ ] Buttons appropriately sized
  - [ ] No horizontal scrolling
- [ ] **Tablet (768px - 991px)**:
  - [ ] Auth pages well-formatted
  - [ ] Navigation works
- [ ] **Desktop (> 992px)**:
  - [ ] Forms centered
  - [ ] Appropriate spacing
  - [ ] Professional appearance

---

## ⚡ Performance Tests

- [ ] **Initial page load**:
  - [ ] Auth pages load in < 2 seconds
  - [ ] No unnecessary API calls
- [ ] **Authentication checks**:
  - [ ] Fast session verification
  - [ ] No page flicker on protected routes
- [ ] **Token refresh**:
  - [ ] Session refreshes automatically
  - [ ] No interruption to user experience

---

## 🔍 Security Tests

### Session Management

- [ ] **Session timeout**:
  - [ ] Session expires after inactivity (check Supabase settings)
  - [ ] User prompted to re-login
- [ ] **Token security**:
  - [ ] Tokens stored in httpOnly cookies
  - [ ] Tokens not visible in localStorage
  - [ ] Tokens not exposed in client-side JS
- [ ] **CSRF protection**:
  - [ ] Forms protected against CSRF
  - [ ] State parameter used correctly

### Password Security

- [ ] Passwords not visible in network requests
- [ ] Passwords hashed in database
- [ ] Password reset tokens expire
- [ ] Password requirements enforced

### Authorization

- [ ] Users can only access their own data
- [ ] Admin routes require admin role
- [ ] API routes validate user permissions
- [ ] SQL injection prevented (Prisma handles this)

---

## 🐛 Error Handling Tests

### Network Errors

- [ ] **Offline mode**:
  - [ ] Appropriate error message when offline
  - [ ] Form doesn't break
  - [ ] Retry mechanism works
- [ ] **Slow connection**:
  - [ ] Loading states show
  - [ ] Timeout handled gracefully
  - [ ] User not left in broken state

### Validation Errors

- [ ] All form errors display clearly
- [ ] Error messages are helpful
- [ ] Errors clear when user corrects input
- [ ] Multiple errors shown at once

### Server Errors

- [ ] 500 errors handled gracefully
- [ ] User-friendly error messages
- [ ] Error logged for debugging
- [ ] Fallback UI shown

---

## 🔄 Edge Cases

### Email Verification

- [ ] Unverified user can/cannot login (based on settings)
- [ ] Verification email resend works
- [ ] Expired verification links handled
- [ ] Already verified users handled

### Concurrent Sessions

- [ ] User logged in on multiple devices
- [ ] Logout on one device doesn't break others (or does, based on design)
- [ ] Data syncs across sessions

### Special Characters

- [ ] Email with + works
- [ ] Name with special characters (ñ, é, etc.)
- [ ] Password with special characters
- [ ] SQL-safe (Prisma handles this)

### Rate Limiting

- [ ] Multiple failed login attempts handled
- [ ] Signup rate limiting (if implemented)
- [ ] Password reset rate limiting (if implemented)

---

## 📊 Data Integrity Tests

### User Profile

- [ ] User created in auth.users (Supabase)
- [ ] User created in public.User (Database)
- [ ] IDs match between tables
- [ ] Email synced correctly
- [ ] Name saved properly
- [ ] Timestamps correct

### Cascade Deletes

- [ ] Delete user → Cart deleted
- [ ] Delete user → Wishlist deleted
- [ ] Delete user → Addresses deleted
- [ ] Delete user → Orders preserved (or marked)

---

## 🚀 Production Readiness

### Environment Configuration

- [ ] Production env vars set
- [ ] Production Supabase URLs configured
- [ ] Redirect URLs updated for production domain
- [ ] CORS configured correctly
- [ ] Rate limits configured

### Monitoring

- [ ] Error logging set up (Sentry, etc.)
- [ ] Auth events logged
- [ ] Failed login attempts tracked
- [ ] Performance monitoring enabled

### Backup & Recovery

- [ ] Database backups configured
- [ ] User data recovery process documented
- [ ] Password reset flow tested in production
- [ ] Account recovery options available

---

## 📝 Documentation Checklist

- [ ] README updated with auth setup instructions
- [ ] Environment variables documented
- [ ] API routes documented
- [ ] Protected routes listed
- [ ] User roles documented (if applicable)
- [ ] Troubleshooting guide created

---

## ✅ Sign-Off Checklist

Before deploying to production:

- [ ] All critical tests passed
- [ ] No console errors in browser
- [ ] No server errors in terminal
- [ ] Email delivery tested
- [ ] Password reset flow works
- [ ] Protected routes secure
- [ ] User data privacy compliant
- [ ] Terms & Privacy Policy linked
- [ ] Performance acceptable
- [ ] Security review completed

---

## 🎯 Test Results Summary

| Test Category | Total Tests | Passed | Failed | Notes |
|--------------|-------------|--------|--------|-------|
| Sign Up | | | | |
| Sign In | | | | |
| Sign Out | | | | |
| Protected Routes | | | | |
| API Routes | | | | |
| UI/UX | | | | |
| Security | | | | |
| Performance | | | | |

---

## 🐛 Known Issues

Document any issues found during testing:

1. **Issue**: 
   - **Impact**: 
   - **Status**: 
   - **Workaround**: 

---

## 📞 Support

If you encounter issues during testing:

1. Check browser console for errors
2. Check server terminal for errors
3. Review Supabase logs
4. Check `SUPABASE_AUTH_SETUP.md` for troubleshooting
5. Review authentication context code

---

**Last Updated**: [Date]  
**Tested By**: [Your Name]  
**Environment**: [Development/Staging/Production]