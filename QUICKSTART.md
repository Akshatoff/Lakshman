# Quick Start Guide - Laksh-man E-commerce

Get your Laksh-man furniture store up and running in 5 minutes!

## 🚀 Quick Setup (5 steps)

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages including Cloudinary SDK.

### Step 2: Configure Environment Variables

Open `.env.local` and update with your Cloudinary credentials:

```env
# Get these from https://cloudinary.com/console
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

**Don't have Cloudinary account?**
1. Go to https://cloudinary.com/users/register/free
2. Sign up (it's free)
3. Copy your credentials from the dashboard

### Step 3: Setup Cloudinary Upload Preset

1. Login to Cloudinary Dashboard
2. Go to Settings → Upload
3. Scroll to "Upload presets"
4. Click "Add upload preset"
5. Configure:
   - Preset name: `ml_default`
   - Signing Mode: **Unsigned** (important!)
   - Click Save

### Step 4: Generate Prisma Client & Seed Database

```bash
# Generate Prisma Client
npx prisma generate

# Seed database with sample products
npx prisma db seed
```

### Step 5: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## ✅ Verify Setup

### Check Homepage
- Visit: http://localhost:3000
- You should see products loading from database
- Categories should display

### Check Admin Dashboard
- Visit: http://localhost:3000/admin/dashboard
- You should see 15 sample products
- Categories should show 8 categories

### Test Image Upload
1. Click "Add Product" in admin dashboard
2. Fill in product details
3. Upload an image file
4. Click "Add Product"
5. Image should upload to Cloudinary
6. Product should appear in the list

---

## 🎯 What Changed?

### Before (JSONBin)
- ❌ Products stored in JSON file
- ❌ Limited to JSONBin API
- ❌ Images stored locally
- ❌ No real database

### After (Supabase + Cloudinary)
- ✅ Products in PostgreSQL database
- ✅ Full CRUD operations
- ✅ Images on Cloudinary CDN
- ✅ Scalable and production-ready

---

## 🔧 Admin Dashboard Features

### Product Management
- **Add Products**: Upload images to Cloudinary automatically
- **Edit Products**: Update any product field including images
- **Delete Products**: Remove products from database
- **Update Database**: Refresh data from Supabase

### What You Can Do
1. ✅ Add new products with image upload
2. ✅ Edit existing products
3. ✅ Delete products
4. ✅ Mark products as "New" or "Bestseller"
5. ✅ Set discounts and original prices
6. ✅ Organize by categories

### Image Upload
- **Supported formats**: JPG, PNG, WEBP, GIF
- **Max size**: 10MB (Cloudinary free tier)
- **Storage**: Automatic upload to Cloudinary
- **URLs**: Secure HTTPS URLs returned
- **CDN**: Global delivery via Cloudinary CDN

---

## 📊 Sample Data

After seeding, you'll have:
- **15 Products** across all categories
- **8 Categories** (Sofas, Beds, Dining, etc.)
- **Sample images** (will be replaced when you upload new ones)

---

## 🐛 Troubleshooting

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Cannot connect to database"
- Your Supabase database is already configured
- Check if DATABASE_URL is correct in `.env.local`
- Ensure no firewall is blocking connection

### "Image upload fails"
1. Check Cloudinary credentials in `.env.local`
2. Verify upload preset `ml_default` exists
3. Ensure preset is **Unsigned**
4. Check browser console for errors

### "No products showing"
```bash
# Seed the database
npx prisma db seed
```

### "Module not found: cloudinary"
```bash
npm install cloudinary
```

---

## 📝 Testing Your Setup

### 1. Test Product Creation
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": "9999",
    "category": "sofas",
    "image": "https://via.placeholder.com/400"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Product added successfully",
  "data": { ... }
}
```

### 2. Test Product Fetching
```bash
curl http://localhost:3000/api/products
```

Expected response:
```json
{
  "success": true,
  "data": {
    "products": [...],
    "total": 16,
    "categories": [...]
  }
}
```

---

## 🎨 Customization

### Change Categories
Edit `prisma/seed.ts` and update the categories array, then:
```bash
npx prisma db seed
```

### Add More Products
Use the admin dashboard at `/admin/dashboard`

### Change Image Upload Preset
Update the preset name in:
- `src/app/admin/dashboard/page.tsx` (line ~90)

---

## 📦 Production Deployment

### Before Deploying
1. ✅ Set environment variables in hosting platform
2. ✅ Verify Cloudinary credentials work
3. ✅ Test all API endpoints
4. ✅ Run production build locally

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm start
```

### Environment Variables for Production
Add these to your hosting platform (Vercel, Netlify, etc.):
```
DATABASE_URL=your_supabase_url
DIRECT_URL=your_supabase_direct_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🔐 Security Notes

### Cloudinary
- ✅ Uses unsigned upload preset (safe for client-side)
- ✅ API Secret never exposed to frontend
- ✅ Only NEXT_PUBLIC_* variables sent to browser

### Database
- ✅ Supabase handles connection security
- ✅ Connection pooling enabled
- ✅ No SQL injection risk (Prisma handles this)

### Admin Dashboard
- ⚠️ **Important**: Add authentication before production
- Currently accessible to anyone at `/admin/dashboard`
- Consider adding NextAuth.js or similar

---

## 📚 What's Next?

### Recommended Next Steps
1. **Add Authentication**
   - Install NextAuth.js
   - Protect admin routes
   - Add user login

2. **Implement Orders**
   - Use existing Order schema
   - Add cart persistence
   - Order history page

3. **Add Payment Gateway**
   - Stripe integration
   - Razorpay for India
   - PayPal option

4. **Enhance Search**
   - Full-text search in database
   - Filter by price range
   - Sort options

---

## 🆘 Need Help?

### Check These First
1. Console errors in browser
2. Terminal errors in VS Code
3. Network tab in DevTools
4. Prisma Studio: `npx prisma studio`

### Common Commands
```bash
# View database in browser
npx prisma studio

# Reset database (careful!)
npx prisma migrate reset

# Check database status
npx prisma migrate status

# Format Prisma schema
npx prisma format
```

---

## ✨ Features Overview

### Current Features
- ✅ Product browsing with categories
- ✅ Search and filter products
- ✅ Shopping cart (localStorage)
- ✅ Admin dashboard with CRUD
- ✅ Image upload to Cloudinary
- ✅ Responsive design
- ✅ Database persistence

### Ready to Implement (Schema exists)
- Orders and order tracking
- User accounts and profiles
- Product reviews and ratings
- Wishlist functionality
- Multiple addresses per user
- Cart persistence in database

---

## 🎉 You're All Set!

Your Laksh-man furniture store is now running with:
- ✅ Supabase PostgreSQL database
- ✅ Cloudinary image hosting
- ✅ Full CRUD operations
- ✅ Admin dashboard
- ✅ Sample products loaded

**Start customizing your store now!**

Visit:
- **Store**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/dashboard
- **Database**: Run `npx prisma studio`

---

## 📖 More Documentation

- `SETUP_INSTRUCTIONS.md` - Detailed setup guide
- `API_GUIDE.md` - Complete API documentation
- `README.md` - Project overview
- Prisma docs: https://www.prisma.io/docs
- Cloudinary docs: https://cloudinary.com/documentation
- Next.js docs: https://nextjs.org/docs

Happy building! 🚀