import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Seed Categories (Clothing categories from JSONBin)
  const categories = [
    {
      name: "Shirt",
      slug: "shirt",
      description: "Stylish shirts for all occasions",
      image: "/images/icon-vegetables-broccoli.png",
      isActive: true,
    },
    {
      name: "Shorts",
      slug: "shorts",
      description: "Comfortable shorts for everyday wear",
      image: "/images/icon-bread-baguette.png",
      isActive: true,
    },
    {
      name: "Pants",
      slug: "pants",
      description: "Quality pants and trousers",
      image: "/images/icon-soft-drinks-bottle.png",
      isActive: true,
    },
    {
      name: "Hoodie",
      slug: "hoodie",
      description: "Warm and cozy hoodies",
      image: "/images/icon-wine-glass-bottle.png",
      isActive: true,
    },
    {
      name: "Upper wear",
      slug: "upper",
      description: "Premium upper wear collection",
      image: "/images/icon-animal-products-drumsticks.png",
      isActive: true,
    },
    {
      name: "T-shirt",
      slug: "tshirt",
      description: "Trendy t-shirts for casual wear",
      image: "/images/icon-bread-herb-flour.png",
      isActive: true,
    },
    {
      name: "Shoes",
      slug: "shoes",
      description: "Footwear for every style",
      image: "/images/shoes.png",
      isActive: true,
    },
  ];

  console.log("Seeding categories...");
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    console.log(`✓ Category: ${category.name}`);
  }

  // Seed Products (Actual clothing products from JSONBin)
  const products = [
    {
      title: "Laksh-man Shoes Model N",
      slug: "laksh-man-shoes-model-n",
      name: "Laksh-man Shoes Model N",
      description:
        "Premium quality shoes with excellent comfort and durability. Perfect for daily wear.",
      priceCents: 488800, // 4888 * 100
      originalPriceCents: null,
      discount: 20,
      images: ["/images/thumb-bananas.png"],
      image: "/images/thumb-bananas.png",
      inventory: 15,
      category: "shoes",
      rating: 4.6,
      isNew: true,
      isBestseller: true,
      isFeatured: true,
    },
    {
      title: "Laksh-man Shirt Model S",
      slug: "laksh-man-shirt-model-s",
      name: "Laksh-man Shirt Model S",
      description:
        "Classic shirt with modern design. Made from high-quality fabric for all-day comfort.",
      priceCents: 40000, // 400 * 100
      originalPriceCents: null,
      discount: null,
      images: ["/images/thumb-biscuits.png"],
      image: "/images/thumb-biscuits.png",
      inventory: 25,
      category: "shirt",
      rating: 4.4,
      isNew: false,
      isBestseller: true,
      isFeatured: false,
    },
    {
      title: "Laksh-man Black Hoodie",
      slug: "laksh-man-black-hoodie",
      name: "Laksh-man Black Hoodie",
      description:
        "Stylish black hoodie perfect for casual wear. Comfortable and warm.",
      priceCents: 60000, // 600 * 100
      originalPriceCents: null,
      discount: 15,
      images: ["/images/thumb-cucumber.png"],
      image: "/images/thumb-cucumber.png",
      inventory: 20,
      category: "hoodie",
      rating: 4.5,
      isNew: true,
      isBestseller: false,
      isFeatured: false,
    },
    {
      title: "Laksh-man Peach Model P",
      slug: "laksh-man-peach-model-p",
      name: "Laksh-man Peach Model P",
      description:
        "Trendy peach colored apparel with modern design. Perfect for summer wear.",
      priceCents: 45900, // 459 * 100
      originalPriceCents: null,
      discount: 12,
      images: ["/images/thumb-milk.png"],
      image: "/images/thumb-milk.png",
      inventory: 18,
      category: "shoes",
      rating: 4.2,
      isNew: false,
      isBestseller: true,
      isFeatured: false,
    },
    {
      title: "Laksh-man Model G",
      slug: "laksh-man-model-g",
      name: "Laksh-man Model G",
      description:
        "Premium quality footwear with excellent design and comfort. Perfect for all occasions.",
      priceCents: 339800, // 3398 * 100
      originalPriceCents: null,
      discount: null,
      images: ["/images/1.jpg"],
      image: "/images/1.jpg",
      inventory: 12,
      category: "shoes",
      rating: 4.3,
      isNew: true,
      isBestseller: false,
      isFeatured: false,
    },
    {
      title: "Laksh-man Trousers Army",
      slug: "laksh-man-trousers-army",
      name: "Laksh-man Trousers Army",
      description:
        "Durable army-style trousers with multiple pockets. Perfect for outdoor activities.",
      priceCents: 79900, // 799 * 100
      originalPriceCents: null,
      discount: 18,
      images: ["/images/2.jpg"],
      image: "/images/2.jpg",
      inventory: 22,
      category: "pants",
      rating: 4.6,
      isNew: false,
      isBestseller: true,
      isFeatured: true,
    },
    {
      title: "Laksh-man Black Hoodie",
      slug: "laksh-man-black-hoodie",
      name: "Laksh-man Black Hoodie",
      description:
        "Another variant of our popular black hoodie. Soft fabric with excellent fit.",
      priceCents: 85900, // 859 * 100
      originalPriceCents: null,
      discount: null,
      images: ["/images/3.jpg"],
      image: "/images/3.jpg",
      inventory: 16,
      category: "hoodie",
      rating: 4.5,
      isNew: true,
      isBestseller: false,
      isFeatured: false,
    },
    {
      title: "Laksh-man Red Tshirt",
      slug: "laksh-man-red-tshirt",
      name: "Laksh-man Red Tshirt",
      description:
        "Vibrant red t-shirt made from premium cotton. Perfect for casual outings.",
      priceCents: 29900, // 299 * 100
      originalPriceCents: null,
      discount: null,
      images: ["/images/4.jpg"],
      image: "/images/4.jpg",
      inventory: 30,
      category: "tshirt",
      rating: 4.4,
      isNew: true,
      isBestseller: false,
      isFeatured: false,
    },
    {
      title: "Laksh-man Black Logo T-shirt",
      slug: "laksh-man-black-logo-t-shirt",
      name: "Laksh-man Black Logo T-shirt",
      description:
        "Classic black t-shirt with Laksh-man logo. Comfortable and stylish.",
      priceCents: 49900, // 499 * 100
      originalPriceCents: null,
      discount: 17,
      images: ["/images/5.jpg"],
      image: "/images/5.jpg",
      inventory: 28,
      category: "tshirt",
      rating: 4.7,
      isNew: false,
      isBestseller: true,
      isFeatured: true,
    },
    {
      title: "Laksh-man T-shirt",
      slug: "laksh-man-t-shirt",
      name: "Laksh-man T-shirt",
      description:
        "Simple and elegant t-shirt design. Perfect for everyday wear.",
      priceCents: 39900, // 399 * 100
      originalPriceCents: null,
      discount: null,
      images: ["/images/6.jpg"],
      image: "/images/6.jpg",
      inventory: 35,
      category: "tshirt",
      rating: 4.3,
      isNew: false,
      isBestseller: false,
      isFeatured: false,
    },
    {
      title: "Laksh-man Female T-shirt",
      slug: "laksh-man-female-t-shirt",
      name: "Laksh-man Female T-shirt",
      description:
        "Specially designed t-shirt for women. Comfortable fit with trendy design.",
      priceCents: 19900, // 199 * 100
      originalPriceCents: null,
      discount: 10,
      images: ["/images/thumb-orange-juice.png"],
      image: "/images/thumb-orange-juice.png",
      inventory: 40,
      category: "tshirt",
      rating: 4.4,
      isNew: true,
      isBestseller: false,
      isFeatured: false,
    },
    {
      title: "Laksh-man Pineapple t-shirt",
      slug: "laksh-man-pineapple-t-shirt",
      name: "Laksh-man Pineapple t-shirt",
      description:
        "Fun pineapple print t-shirt. Perfect for summer and beach wear.",
      priceCents: 55900, // 559 * 100
      originalPriceCents: null,
      discount: null,
      images: ["/images/thumb-raspberries.png"],
      image: "/images/thumb-raspberries.png",
      inventory: 24,
      category: "tshirt",
      rating: 4.5,
      isNew: true,
      isBestseller: false,
      isFeatured: false,
    },
    {
      title: "Laksh-man Polo Shirt",
      slug: "laksh-man-polo-shirt",
      name: "Laksh-man Polo Shirt",
      description:
        "Classic polo shirt with collar. Perfect for semi-formal occasions.",
      priceCents: 49900, // 499 * 100
      originalPriceCents: null,
      discount: 13,
      images: ["/images/thumb-tomatoes.png"],
      image: "/images/thumb-tomatoes.png",
      inventory: 20,
      category: "shirt",
      rating: 4.3,
      isNew: false,
      isBestseller: true,
      isFeatured: false,
    },
    {
      title: "Laksh-man Cyan Tshirt",
      slug: "laksh-man-cyan-tshirt",
      name: "Laksh-man Cyan Tshirt",
      description:
        "Fresh cyan colored t-shirt. Breathable fabric perfect for summer.",
      priceCents: 29900, // 299 * 100
      originalPriceCents: null,
      discount: 10,
      images: ["/images/thumb-tomatoketchup.png"],
      image: "/images/thumb-tomatoketchup.png",
      inventory: 32,
      category: "tshirt",
      rating: 4.5,
      isNew: false,
      isBestseller: true,
      isFeatured: false,
    },
    {
      title: "Laksh-man Black Shirt",
      slug: "laksh-man-black-shirt",
      name: "Laksh-man Black Shirt",
      description:
        "Classic black shirt with modern design. Perfect for formal and casual wear.",
      priceCents: 85800, // 858 * 100
      originalPriceCents: null,
      discount: 5,
      images: [
        "https://www.beyours.in/cdn/shop/files/black-classic-shirt.jpg?v=1744815740",
      ],
      image:
        "https://www.beyours.in/cdn/shop/files/black-classic-shirt.jpg?v=1744815740",
      inventory: 18,
      category: "shirt",
      rating: 4.5,
      isNew: false,
      isBestseller: false,
      isFeatured: false,
    },
  ];

  console.log("\nSeeding products...");
  let successCount = 0;
  for (const product of products) {
    try {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      });
      console.log(`✓ Product: ${product.name}`);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to seed product: ${product.name}`, error);
    }
  }

  console.log(`\n✅ Seeding completed!`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Products: ${successCount}/${products.length}`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
