# Laksh-man - Premium Furniture & Home Decor E-commerce

A modern, responsive e-commerce website built with Next.js 14, featuring a complete furniture and home decor shopping experience with admin management capabilities.

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

### Backend Features
- **Admin Dashboard** - Complete product and category management
- **REST API** - Full CRUD operations for products
- **JSON Data Storage** - File-based data management
- **Image Management** - Support for product images
- **Real-time Updates** - Dynamic content loading

### Technical Features
- **Next.js 14** - App Router with TypeScript
- **Server-Side Rendering** - Optimized performance and SEO
- **API Routes** - Built-in backend functionality
- **Component Architecture** - Modular and reusable components
- **Bootstrap 5** - Responsive CSS framework
- **Custom CSS** - Tailored styling preserving original design

## 🛠️ Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Bootstrap 5 + Custom CSS
- **Animations**: AOS (Animate On Scroll)
- **Carousel**: Swiper.js
- **Icons**: Iconify
- **Image Optimization**: Next.js Image component
- **Data Storage**: JSON files
- **Development**: ESLint, PostCSS, Autoprefixer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laksh-man-next-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

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
public/
├── data/
│   └── products.json           # Product and category data
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
- **Product CRUD**: Add, edit, delete products
- **Data Export**: Download product data as JSON

## 🔧 API Endpoints

### Products API (`/api/products`)
- `GET` - Fetch all products with filtering
- `POST` - Add new product
- `PUT` - Update existing product
- `DELETE` - Remove product

#### Query Parameters
- `category` - Filter by category
- `search` - Search in product names
- `limit` - Limit number of results
- `offset` - Pagination offset

#### Example Usage
```javascript
// Fetch all products
const response = await fetch('/api/products');

// Filter by category
const response = await fetch('/api/products?category=sofas');

// Search products
const response = await fetch('/api/products?search=chair');
```

## 📊 Data Structure

### Product Schema
```json
{
  "id": "string",
  "name": "string",
  "image": "string (URL)",
  "price": "number",
  "originalPrice": "number (optional)",
  "discount": "number (optional)",
  "rating": "number",
  "quantity": "string",
  "category": "string",
  "isNew": "boolean",
  "isBestseller": "boolean"
}
```

### Category Schema
```json
{
  "id": "string",
  "name": "string",
  "image": "string (URL)",
  "link": "string"
}
```

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

## 🔐 Admin Access

Access the admin dashboard at `/admin/dashboard`

### Admin Features
- View all products in a table format
- Add new products with form validation
- Edit existing products
- Delete products with confirmation
- Export product data as JSON
- Category management

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

Built with ❤️ using Next.js and TypeScript