# Setup Instructions - Laksh-man E-commerce Platform

## Migration from JSONBin to Supabase + Cloudinary

This guide will help you complete the setup after migrating from JSONBin to Supabase (PostgreSQL) database and Cloudinary for image hosting.

## Prerequisites

1. Node.js 18.18.0 or higher
2. A Supabase account and project
3. A Cloudinary account
4. npm or yarn package manager

## Step 1: Install Dependencies

```bash
npm install cloudinary
# or
yarn add cloudinary
```

## Step 2: Environment Variables Setup

Update your `.env.local` file with the following credentials:

```env
# Supabase Database Configuration (Already configured)
DATABASE_URL="postgresql://postgres.vcfkftqemufahhjfxhck:lakshman@supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.vcfkftqemufahhjfxhck:lakshman@supabase@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"

# Cloudinary Configuration (YOU NEED TO UPDATE THESE)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"
```

## Step 3: Get Cloudinary Credentials

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Sign up or log in to your account
3. From the Dashboard, copy:
   - **Cloud Name** (e.g., `dxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)
4. Paste these values in your `.env.local` file

## Step 4: Create Cloudinary Upload Preset

1. Go to Settings → Upload in Cloudinary Dashboard
2. Scroll down to "Upload presets"
3. Click "Add upload preset"
4. Set the following:
   - **Preset name**: `ml_default` (or your custom name)
   - **Signing Mode**: `Unsigned`
   - **Folder**: `laksh-man-products` (optional)
5. Save the preset
6. If you use a different preset name, update it in the admin dashboard code (line where `upload_preset` is set)

## Step 5: Run Prisma Migrations

The database schema is already created, but you need to generate the Prisma client:

```bash
# Generate Prisma Client
npx prisma generate

# (Optional) If you need to apply migrations
npx prisma migrate deploy
```

## Step 6: Seed the Database (Optional)

If you want to migrate existing products from JSONBin to Supabase:

1. Create a seed script at `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Your existing products from JSONBin
  const products = [
    {
      title: "Royaloak L-Shaped Sofa",
      slug: "royaloak-l-shaped-sofa",
      name: "Royaloak L-Shaped Sofa",
      description: "Premium L-shaped sofa for your living room",
      priceCents: 2899900,
      originalPriceCents: 3599900,
      discount: 20,
      images: ["/images/thumb-bananas.png"],
      image: "/images/thumb-bananas.png",
      inventory: 10,
      category: "sofas",
      rating: 4.6,
      isNew: true,
      isBestseller: true,
    },
    // Add more products...
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // Add categories
  const categories = [
    {
      name: "Sofas & Seating",
      slug: "sofas",
      image: "/images/icon-vegetables-broccoli.png",
    },
    // Add more categories...
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

2. Run the seed:

```bash
npx prisma db seed
```

## Step 7: Build and Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Step 8: Test the Setup

1. Open http://localhost:3000
2. Navigate to http://localhost:3000/admin/dashboard
3. Try adding a new product with an image:
   - Click "Add Product"
   - Fill in the form
   - Upload an image (it will be uploaded to Cloudinary)
   - Click "Add Product"
4. Verify the product appears in the database and on the homepage

## Key Changes Made

### 1. Products API (`/api/products`)
- ✅ Now fetches from Supabase PostgreSQL database using Prisma
- ✅ Supports filtering, searching, and pagination
- ✅ CRUD operations work with the database
- ✅ Automatically transforms data to match frontend format

### 2. Admin Dashboard
- ✅ Replaced "Download JSON" button with "Update Database" button
- ✅ Added image upload functionality with Cloudinary integration
- ✅ Image preview before upload
- ✅ Support for both file upload and URL input
- ✅ Enhanced UI with better form validation
- ✅ Real-time feedback during image upload

### 3. Image Storage
- ✅ Images are now stored on Cloudinary
- ✅ Returns secure HTTPS URLs
- ✅ Automatic optimization and CDN delivery
- ✅ Next.js Image component configured for Cloudinary domains

### 4. Database Schema
- ✅ Complete Prisma schema with all e-commerce models
- ✅ Proper relationships and indexes
- ✅ Support for products, orders, reviews, cart, wishlist, etc.

## Troubleshooting

### Issue: Prisma Client not found
```bash
npx prisma generate
```

### Issue: Database connection error
- Check your DATABASE_URL in `.env.local`
- Ensure your IP is whitelisted in Supabase settings
- Verify the database is running

### Issue: Image upload fails
- Verify Cloudinary credentials in `.env.local`
- Check that the upload preset exists and is unsigned
- Ensure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is correct

### Issue: Images not displaying
- Add the image domain to `next.config.ts` under `images.remotePatterns`
- Clear Next.js cache: `rm -rf .next`
- Restart the development server

## Database Structure

### Products Table
- Stores all product information
- Prices stored in cents (divide by 100 for display)
- Supports multiple images (JSON field)
- Includes inventory tracking
- Optimized with indexes on category and slug

### Categories Table
- Manages product categories
- Includes active/inactive status
- Linked to products via category string

### Future Enhancements
- User authentication
- Order management
- Cart persistence
- Payment integration
- Product reviews system

## Production Deployment

### Environment Variables for Production
Make sure to set all environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & deploy → Environment
- Railway/Render: Environment Variables section

### Database
- Your Supabase database is production-ready
- Connection pooling is enabled via pgBouncer
- Direct URL for migrations available

### Images
- Cloudinary has a generous free tier
- Automatic image optimization
- Global CDN for fast delivery
- Consider upgrading plan for high traffic

## API Endpoints

### GET /api/products
Fetch products with optional filtering
- Query params: `category`, `search`, `limit`, `offset`
- Returns: `{ success, data: { products, total, categories } }`

### POST /api/products
Create a new product
- Body: Product data with image URL
- Returns: `{ success, message, data: product }`

### PUT /api/products
Update an existing product
- Body: Product data with id
- Returns: `{ success, message, data: product }`

### DELETE /api/products?id=X
Delete a product
- Query param: `id`
- Returns: `{ success, message, data: product }`

## Support

For issues or questions:
- Check the console for error messages
- Verify environment variables are set correctly
- Ensure database migrations are applied
- Test Cloudinary upload separately if image upload fails

## Next Steps

1. ✅ Configure Cloudinary credentials
2. ✅ Test product creation with image upload
3. ✅ Verify database updates work correctly
4. ⏳ Add authentication for admin panel
5. ⏳ Implement order management
6. ⏳ Add payment gateway integration

---

**Note**: This setup uses Prisma ORM for type-safe database access and Cloudinary for reliable image hosting. All data is now persisted in your Supabase PostgreSQL database instead of JSONBin.