# API Testing Guide - Laksh-man E-commerce Platform

## Overview

This guide helps you test the migrated API endpoints that now use Supabase (PostgreSQL) instead of JSONBin, and Cloudinary for image hosting.

## Base URL

Development: `http://localhost:3000/api`
Production: `https://your-domain.com/api`

---

## API Endpoints

### 1. GET /api/products

Fetch all products with optional filtering, searching, and pagination.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| category | string | No | Filter by category (e.g., "sofas", "beds") |
| search | string | No | Search in product name, title, and category |
| limit | number | No | Number of products to return |
| offset | number | No | Number of products to skip (for pagination) |

#### Example Requests

```bash
# Fetch all products
curl http://localhost:3000/api/products

# Filter by category
curl http://localhost:3000/api/products?category=sofas

# Search products
curl http://localhost:3000/api/products?search=chair

# Pagination (get 10 products, skip first 5)
curl http://localhost:3000/api/products?limit=10&offset=5

# Combined filters
curl "http://localhost:3000/api/products?category=office&search=chair&limit=5"
```

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "1",
        "name": "Ergonomic Office Chair",
        "image": "https://res.cloudinary.com/your-cloud/image.jpg",
        "price": 6499,
        "originalPrice": 7999,
        "discount": 18,
        "rating": 4.6,
        "quantity": "1 Unit",
        "category": "office",
        "isNew": false,
        "isBestseller": true
      }
    ],
    "total": 15,
    "categories": [
      {
        "id": "sofas",
        "name": "Sofas & Seating",
        "image": "/images/category-sofas.png",
        "link": "#products"
      }
    ]
  }
}
```

#### Error Response (500)

```json
{
  "success": false,
  "error": "Failed to fetch products"
}
```

---

### 2. POST /api/products

Create a new product in the database.

#### Request Headers

```
Content-Type: application/json
```

#### Request Body

```json
{
  "name": "Modern L-Shaped Sofa",
  "price": "45999.99",
  "originalPrice": "59999.99",
  "discount": "23",
  "rating": "4.5",
  "category": "sofas",
  "image": "https://res.cloudinary.com/your-cloud/image.jpg",
  "description": "Premium quality modern sofa",
  "isNew": true,
  "isBestseller": false
}
```

#### Required Fields

- `name` (string)
- `price` (string/number)
- `category` (string)
- `image` (string - URL)

#### Optional Fields

- `originalPrice` (string/number)
- `discount` (string/number)
- `rating` (string/number, default: "4.0")
- `description` (string)
- `isNew` (boolean, default: false)
- `isBestseller` (boolean, default: false)
- `inventory` (number, default: 100)

#### Example Request

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Leather Sofa",
    "price": "89999",
    "originalPrice": "119999",
    "discount": "25",
    "category": "sofas",
    "image": "https://res.cloudinary.com/demo/image.jpg",
    "description": "Luxurious leather sofa",
    "isNew": true,
    "isBestseller": true
  }'
```

#### Success Response (200)

```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "id": "123",
    "name": "Premium Leather Sofa",
    "price": 89999,
    "originalPrice": 119999,
    "discount": 25,
    "rating": 4.0,
    "quantity": "1 Unit",
    "category": "sofas",
    "image": "https://res.cloudinary.com/demo/image.jpg",
    "isNew": true,
    "isBestseller": true
  }
}
```

#### Error Response (400)

```json
{
  "success": false,
  "error": "Missing required fields: name, price"
}
```

---

### 3. PUT /api/products

Update an existing product in the database.

#### Request Headers

```
Content-Type: application/json
```

#### Request Body

```json
{
  "id": "123",
  "name": "Updated Product Name",
  "price": "49999",
  "discount": "15",
  "isNew": false,
  "isBestseller": true
}
```

#### Required Fields

- `id` (string/number) - Product ID to update

#### Optional Fields

All product fields can be updated (name, price, image, category, etc.)

#### Example Request

```bash
curl -X PUT http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "id": "123",
    "name": "Updated Sofa Name",
    "price": "79999",
    "discount": "20"
  }'
```

#### Success Response (200)

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "123",
    "name": "Updated Sofa Name",
    "price": 79999,
    "discount": 20,
    "rating": 4.5,
    "quantity": "1 Unit",
    "category": "sofas",
    "image": "https://res.cloudinary.com/demo/image.jpg",
    "isNew": false,
    "isBestseller": true
  }
}
```

#### Error Response (404)

```json
{
  "success": false,
  "error": "Product not found"
}
```

---

### 4. DELETE /api/products

Delete a product from the database.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Product ID to delete |

#### Example Request

```bash
curl -X DELETE "http://localhost:3000/api/products?id=123"
```

#### Success Response (200)

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": "123",
    "name": "Deleted Product",
    "price": 79999
  }
}
```

#### Error Response (400)

```json
{
  "success": false,
  "error": "Product ID is required"
}
```

---

## Testing with JavaScript/TypeScript

### Fetch API Examples

#### Get Products

```javascript
async function getProducts(category = null, search = null) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  
  const response = await fetch(`/api/products?${params.toString()}`);
  const data = await response.json();
  
  if (data.success) {
    console.log('Products:', data.data.products);
    console.log('Total:', data.data.total);
  } else {
    console.error('Error:', data.error);
  }
}

// Usage
getProducts('sofas', 'leather');
```

#### Add Product

```javascript
async function addProduct(productData) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  
  const result = await response.json();
  
  if (result.success) {
    console.log('Product added:', result.data);
  } else {
    console.error('Error:', result.error);
  }
}

// Usage
addProduct({
  name: 'New Product',
  price: '29999',
  category: 'office',
  image: 'https://example.com/image.jpg',
});
```

#### Update Product

```javascript
async function updateProduct(id, updates) {
  const response = await fetch('/api/products', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updates }),
  });
  
  const result = await response.json();
  
  if (result.success) {
    console.log('Product updated:', result.data);
  } else {
    console.error('Error:', result.error);
  }
}

// Usage
updateProduct('123', { price: '39999', discount: '10' });
```

#### Delete Product

```javascript
async function deleteProduct(id) {
  const response = await fetch(`/api/products?id=${id}`, {
    method: 'DELETE',
  });
  
  const result = await response.json();
  
  if (result.success) {
    console.log('Product deleted:', result.data);
  } else {
    console.error('Error:', result.error);
  }
}

// Usage
deleteProduct('123');
```

---

## Image Upload Flow

### How Image Upload Works

1. **User selects image** in admin dashboard
2. **Image is uploaded to Cloudinary** via client-side API call
3. **Cloudinary returns secure URL** (e.g., `https://res.cloudinary.com/...`)
4. **URL is saved to database** via POST/PUT request

### Cloudinary Upload Example

```javascript
async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Your Cloudinary preset
  formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  
  const data = await response.json();
  return data.secure_url; // Returns: https://res.cloudinary.com/...
}

// Usage
const imageUrl = await uploadImageToCloudinary(selectedFile);
// Then save the imageUrl to your product
```

---

## Testing Checklist

### Initial Setup
- [ ] Install dependencies (`npm install cloudinary`)
- [ ] Configure environment variables in `.env.local`
- [ ] Run Prisma generate (`npx prisma generate`)
- [ ] Seed database (`npx prisma db seed`)
- [ ] Start development server (`npm run dev`)

### API Testing
- [ ] GET /api/products - Fetch all products
- [ ] GET /api/products?category=sofas - Filter by category
- [ ] GET /api/products?search=chair - Search products
- [ ] GET /api/products?limit=5&offset=10 - Pagination
- [ ] POST /api/products - Create new product
- [ ] PUT /api/products - Update product
- [ ] DELETE /api/products?id=X - Delete product

### Admin Dashboard Testing
- [ ] Open admin dashboard (`/admin/dashboard`)
- [ ] Click "Add Product" button
- [ ] Fill in product details
- [ ] Upload an image (should upload to Cloudinary)
- [ ] Submit form (should save to database)
- [ ] Verify product appears in table
- [ ] Click "Edit" on a product
- [ ] Update product details
- [ ] Change image (should upload new one to Cloudinary)
- [ ] Save changes
- [ ] Click "Delete" on a product
- [ ] Confirm deletion
- [ ] Verify product is removed

### Frontend Testing
- [ ] Open homepage (`/`)
- [ ] Products should load from database
- [ ] Categories should display
- [ ] Product cards should show correct data
- [ ] Images should load from Cloudinary

---

## Common Issues & Solutions

### Issue: Prisma Client not found
```bash
npx prisma generate
```

### Issue: Database connection error
- Check DATABASE_URL in `.env.local`
- Ensure Supabase database is running
- Verify IP is whitelisted in Supabase

### Issue: Image upload fails
- Verify Cloudinary credentials
- Check upload preset exists and is unsigned
- Ensure CORS is enabled in Cloudinary settings

### Issue: 500 Error on API calls
- Check server console for detailed error
- Verify database schema is up to date
- Run `npx prisma migrate deploy`

---

## Data Format Reference

### Price Format
- Stored in database: **cents** (e.g., 2999900 for ₹29,999.00)
- Displayed to user: **rupees** (divide by 100)
- API accepts: **rupees** (converted to cents internally)

### Image URLs
- Local images: `/images/product.jpg`
- Cloudinary images: `https://res.cloudinary.com/your-cloud/...`
- External images: Any valid HTTPS URL

### Category IDs
Valid categories: `sofas`, `beds`, `dining`, `wardrobes`, `office`, `decor`, `outdoor`, `revolving-chair`

---

## Performance Tips

1. **Use pagination** for large product lists
2. **Cache categories** - they rarely change
3. **Optimize images** - Cloudinary handles this automatically
4. **Index frequently queried fields** - already done in schema
5. **Use connection pooling** - configured via DATABASE_URL

---

## Next Steps

After successful testing:
1. Add authentication to admin dashboard
2. Implement order management
3. Add payment gateway integration
4. Set up automated backups for Supabase
5. Monitor Cloudinary usage and optimize

---

**Note**: All prices in the API are in rupees (₹), but stored as cents in the database for precision.