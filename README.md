# Laksh-man - Premium Furniture & Home Decor E-commerce

A modern, responsive e-commerce website built with Next.js 14, featuring a complete furniture and home decor shopping experience with admin management capabilities. Now powered by Supabase PostgreSQL database and Cloudinary CDN for images.

> **✨ Recently Upgraded**: 
> - Migrated from JSONBin to Supabase PostgreSQL database
> - Integrated Cloudinary CDN for image hosting
> - **NEW: Complete Supabase Authentication System** for user accounts, cart persistence, wishlists, and more!

## 🚀 Features

### Frontend Features
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Product Catalog** - Browse furniture by categories with filtering and search
- **Product Tabs** - All products, New Arrivals, and Bestsellers
- **Shopping Cart** - Add/remove products with quantity management
- **Category Carousel** - Interactive category browsing with Swiper.js
- **Newsletter Signup** - Email subscription with discount offers
- **Animated UI** - Smooth animations using AOS (Animate On Scroll)
- **Modern UX** - Bootstrap 5 components with custom styling
- **User Authentication** - Complete login/signup system with Supabase
- **User Accounts** - Profile management and personalized experience

### Backend Features
- **Admin Dashboard** - Complete product and category management
- **REST API** - Full CRUD operations for products
- **Supabase Authentication** - Secure user authentication and session management
- **Database Storage** - PostgreSQL with Prisma ORM
- **Image Management** - Cloudinary CDN for product images
- **Real-time Updates** - Dynamic content loading
- **Protected Routes** - Middleware-based authentication for secure pages

### Authentication Features
- **User Registration** - Sign up with email and password
- **User Login** - Secure login with session management
- **Password Reset** - Email-based password recovery
- **Email Verification** - Optional email confirmation
- **Profile Management** - Update user information
- **Session Persistence** - Stay logged in across browser sessions
- **Protected Routes** - Automatic redirect for unauthorized access
- **Cart Persistence** - Save cart items to database (ready to implement)
- **Wishlist Support** - User-specific wishlists (ready to implement)
- **Order History** - Track past orders (ready to implement)

### Technical Features
- **Next.js 15** - App Router with TypeScript
- **Supabase PostgreSQL** - Enterprise-grade database with Prisma ORM
- **Supabase Auth** - Secure authentication with SSR support
- **Cloudinary CDN** - Professional image hosting and optimization
- **Server-Side Rendering** - Optimized performance and SEO
- **API Routes** - RESTful API with full CRUD operations
- **Protected API Routes** - Authentication middleware for secure endpoints
- **Component Architecture** - Modular and reusable components
- **Bootstrap 5** - Responsive CSS framework
- **Custom CSS** - Tailored styling preserving original design
- **TypeScript** - Full type safety throughout the application

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase PostgreSQL
- **ORM**: Prisma Client
- **Authentication**: Supabase Auth (@supabase/ssr)
- **Image Hosting**: Cloudinary CDN
- **Styling**: Bootstrap 5 + Custom CSS
- **Animations**: AOS (Animate On Scroll)
- **Carousel**: Swiper.js
- **Icons**: Iconify
- **Image Optimization**: Next.js Image component + Cloudinary
- **Development**: ESLint, PostCSS, Autoprefixer
</parameter>

<old_text line=66>
3. **Configure environment variables**
   
   Update `.env.local` with your Cloudinary credentials:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laksh-man-next-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update `.env.local` with your Cloudinary credentials:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

4. **Setup database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Seed database with sample products
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Configure Supabase Authentication**
   
   Follow the detailed setup in `SUPABASE_AUTH_SETUP.md`:
   - Enable email authentication in Supabase dashboard
   - Configure redirect URLs
   - Create database trigger for user profiles
   
7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 📚 Documentation Guides
- **QUICKSTART.md** - Get started in 5 minutes
- **SETUP_INSTRUCTIONS.md** - Detailed setup guide
- **API_GUIDE.md** - Complete API documentation
- **MIGRATION_SUMMARY.md** - Database migration details
- **SUPABASE_AUTH_SETUP.md** - Authentication setup guide
- **AUTH_QUICK_REFERENCE.md** - Authentication code snippets
- **AUTH_TESTING_CHECKLIST.md** - Complete testing checklist
- **AUTH_IMPLEMENTATION_SUMMARY.md** - Auth system overview

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── admin/dashboard/         # Admin dashboard pages
│   ├── api/products/           # API routes
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── error.tsx               # Error page
│   └── not-found.tsx           # 404 page
├── components/                  # Reusable components
│   ├── cart/                   # Shopping cart components
│   ├── categories/             # Category-related components
│   ├── common/                 # Common components
│   ├── layout/                 # Layout components
│   ├── newsletter/             # Newsletter components
│   ├── products/               # Product-related components
│   └── search/                 # Search components
prisma/
├── schema.prisma               # Database schema
├── seed.ts                     # Database seeding
└── migrations/                 # Database migrations
public/
├── data/
│   └── products.json           # Legacy data (kept for reference)
└── images/                     # Static images
```

## 🎯 Key Components

### Product Management
- **ProductTabs**: Displays products in tabs (All, New, Bestsellers)
- **ProductCard**: Individual product display with cart functionality
- **CategoryCarousel**: Interactive category browsing

### Shopping Experience
- **Header**: Navigation, search, and cart
- **Cart**: Shopping cart with item management
- **Search**: Product search with suggestions
- **Newsletter**: Email subscription form

### Admin Panel
- **AdminDashboard**: Complete product management interface
- **Product CRUD**: Add, edit, delete products with database persistence
- **Image Upload**: Upload images directly to Cloudinary CDN
- **Database Updates**: Sync and refresh data from Supabase

## 🔧 API Endpoints

### Products API (`/api/products`)
All endpoints now use Supabase PostgreSQL database with Prisma ORM.

- `GET` - Fetch all products with filtering, search, and pagination
- `POST` - Add new product to database
- `PUT` - Update existing product in database
- `DELETE` - Remove product from database

#### Query Parameters
- `category` - Filter by category
- `search` - Search in product names and descriptions
- `limit` - Limit number of results
- `offset` - Pagination offset

#### Example Usage
```javascript
// Fetch all products from database
const response = await fetch('/api/products');

// Filter by category
const response = await fetch('/api/products?category=sofas');

// Search products
const response = await fetch('/api/products?search=chair');

// Pagination
const response = await fetch('/api/products?limit=10&offset=0');
```

For detailed API documentation, see **API_GUIDE.md**.

## 📊 Database Structure

### Product Model (Prisma)
```prisma
model Product {
  id                  Int       @id @default(autoincrement())
  title               String
  slug                String    @unique
  name                String?
  description         String
  priceCents          Int
  originalPriceCents  Int?
  discount            Int?
  images              Json
  image               String?
  inventory           Int
  category            String
  rating              Float     @default(4.0)
  isNew               Boolean   @default(false)
  isBestseller        Boolean   @default(false)
  isFeatured          Boolean   @default(false)
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
}
```

### Category Model (Prisma)
```prisma
model Category {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  slug        String   @unique
  description String?
  image       String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Note**: The database schema includes additional models for Users, Orders, Reviews, Cart, Wishlist, and Addresses. See `prisma/schema.prisma` for the complete schema.

## 🎨 Styling

The project uses a combination of:
- **Bootstrap 5** for responsive grid and components
- **Custom CSS** preserving the original design
- **CSS Variables** for consistent theming
- **Responsive Design** with mobile-first approach

### Color Palette
- Primary: `#FFC43F` (Accent Yellow)
- Dark: `#222222`
- Light: `#ffffff`
- Success: `#a3be4c`

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for production:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_GA_TRACKING_ID=your-ga-tracking-id
```

### Deployment Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Self-hosted**

## 🔐 Authentication & Access

### User Authentication

- **Sign Up**: `/auth/signup` - Create new account
- **Sign In**: `/auth/login` - Login to existing account
- **Protected Routes**: Automatically redirect to login if not authenticated

### Admin Access

Access the admin dashboard at `/admin/dashboard` (requires authentication)

### Admin Features
- View all products from database in a table format
- Add new products with image upload to Cloudinary
- Edit existing products with database persistence
- Delete products with confirmation
- Update database with latest data from Supabase
- Real-time image preview before upload
- Category management
- Product statistics and quick stats

### Image Upload
- Drag and drop or browse to select images
- Automatic upload to Cloudinary CDN
- Image preview before submission
- Secure HTTPS URLs
- Automatic image optimization

**✅ Security**: Authentication system is now implemented! Admin routes are protected by middleware.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: 992px - 1199px
- **Large Desktop**: ≥ 1200px

## 🎯 Performance Optimizations

- **Next.js Image Component** for optimized images
- **Server-Side Rendering** for better SEO
- **Component Code Splitting** for faster loading
- **CSS Optimization** with PostCSS
- **Font Optimization** with Google Fonts
- **Lazy Loading** for images and components

## 🧪 Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma client
- `npx prisma db seed` - Seed database with sample data
- `npx prisma studio` - Open database GUI
- `npx prisma migrate dev` - Create/apply migrations

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Consistent component structure
- Proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🔄 Recent Upgrades

This project has been upgraded to a modern, production-ready architecture:

### Database & Storage
- **Database**: Supabase PostgreSQL with Prisma ORM
- **Images**: Cloudinary CDN for optimized delivery
- **API**: Custom Next.js API routes with full CRUD

### Authentication System (NEW!)
- **Auth Provider**: Supabase Authentication
- **Features**: Login, Signup, Password Reset, Session Management
- **Security**: Protected routes, secure API endpoints, httpOnly cookies
- **Integration**: Ready for cart persistence, wishlists, orders, and addresses

For details, see:
- **MIGRATION_SUMMARY.md** - Database migration overview
- **SUPABASE_AUTH_SETUP.md** - Authentication setup guide
- **AUTH_IMPLEMENTATION_SUMMARY.md** - Auth system overview

## 🚀 Production Deployment

### Required Environment Variables
```env
DATABASE_URL=your_supabase_connection_url
DIRECT_URL=your_supabase_direct_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Deployment Steps
1. Set environment variables on hosting platform
2. Run `npm run build`
3. Deploy to Vercel, Netlify, or your preferred platform
4. Run database migrations if needed
5. Seed production database (optional)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and inquiries:
- Email: support@lakshman.com
- Phone: +91-9525507352
- Website: [lakshman.com](https://lakshman.com)

## 🙏 Acknowledgments

- Original HTML/CSS design preserved and enhanced
- Bootstrap team for the CSS framework
- Next.js team for the amazing framework
- Swiper.js for the carousel component
- AOS for scroll animations

---

## 🎯 Next Steps

### Authentication (✅ Complete)
- [x] User registration and login
- [x] Session management
- [x] Protected routes and API endpoints
- [x] Password reset flow
- [x] Email verification support

### High Priority
- [ ] Implement cart persistence with user accounts
- [ ] Add wishlist functionality
- [ ] Create user profile management pages
- [ ] Implement address management
- [ ] Add order history page

### Medium Priority
- [ ] Add payment gateway integration (Stripe/Razorpay)
- [ ] Implement order tracking system
- [ ] Add product reviews system
- [ ] Create admin role management
- [ ] Implement email notifications

### Future Enhancements
- [ ] Social authentication (Google, GitHub)
- [ ] Advanced search and filters
- [ ] Product recommendations
- [ ] Loyalty program
- [ ] Mobile app

---

Built with ❤️ using Next.js, TypeScript, Supabase, and Cloudinary