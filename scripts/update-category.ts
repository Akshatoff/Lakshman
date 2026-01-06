// scripts/update-categories.ts
// Run this script to update your database with new categories

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting category update...");

  // Define all new categories with their subcategories
  const categories = [
    // Men's Clothing
    {
      name: "Men's T-Shirts",
      slug: "men-tshirts",
      description: "Men's casual and formal t-shirts",
      isActive: true,
    },
    {
      name: "Men's Pants",
      slug: "men-pants",
      description: "Men's trousers and jeans",
      isActive: true,
    },
    {
      name: "Men's Shirts",
      slug: "men-shirts",
      description: "Men's formal and casual shirts",
      isActive: true,
    },
    {
      name: "Men's Jackets",
      slug: "men-jackets",
      description: "Men's jackets and outerwear",
      isActive: true,
    },

    // Women's Clothing
    {
      name: "Women's T-Shirts",
      slug: "women-tshirts",
      description: "Women's casual and formal t-shirts",
      isActive: true,
    },
    {
      name: "Women's Pants",
      slug: "women-pants",
      description: "Women's trousers and jeans",
      isActive: true,
    },
    {
      name: "Women's Dresses",
      slug: "women-dresses",
      description: "Women's dresses for all occasions",
      isActive: true,
    },
    {
      name: "Women's Skirts",
      slug: "women-skirts",
      description: "Women's skirts collection",
      isActive: true,
    },

    // Kids' Clothing
    {
      name: "Kids' T-Shirts",
      slug: "kids-tshirts",
      description: "Kids' comfortable t-shirts",
      isActive: true,
    },
    {
      name: "Kids' Pants",
      slug: "kids-pants",
      description: "Kids' pants and jeans",
      isActive: true,
    },
    {
      name: "Kids' Dresses",
      slug: "kids-dresses",
      description: "Kids' dresses and frocks",
      isActive: true,
    },
    {
      name: "Kids' Sets",
      slug: "kids-sets",
      description: "Kids' matching sets",
      isActive: true,
    },

    // Sportswear
    {
      name: "Running",
      slug: "running",
      description: "Running shoes and gear",
      isActive: true,
    },
    {
      name: "Cricket",
      slug: "cricket",
      description: "Cricket equipment and clothing",
      isActive: true,
    },
    {
      name: "Football",
      slug: "football",
      description: "Football gear and apparel",
      isActive: true,
    },
    {
      name: "Basketball",
      slug: "basketball",
      description: "Basketball shoes and clothing",
      isActive: true,
    },

    // Footwear
    {
      name: "Sports Shoes",
      slug: "sports-shoes",
      description: "Athletic and sports footwear",
      isActive: true,
    },
    {
      name: "Casual Shoes",
      slug: "casual-shoes",
      description: "Casual everyday shoes",
      isActive: true,
    },

    // Accessories
    {
      name: "Cricket Bats",
      slug: "cricket-bat",
      description: "Professional cricket bats",
      isActive: true,
    },
    {
      name: "Cricket Balls",
      slug: "cricket-ball",
      description: "Cricket balls for all formats",
      isActive: true,
    },
    {
      name: "Gloves",
      slug: "gloves",
      description: "Sports gloves",
      isActive: true,
    },
    {
      name: "Backpacks",
      slug: "backpack",
      description: "Sports and casual backpacks",
      isActive: true,
    },

    // Home Furniture
    {
      name: "Home Chairs",
      slug: "home-chairs",
      description: "Comfortable home seating",
      isActive: true,
    },
    {
      name: "Home Tables",
      slug: "home-tables",
      description: "Dining and coffee tables",
      isActive: true,
    },
    {
      name: "Sofas",
      slug: "home-sofas",
      description: "Comfortable sofas and couches",
      isActive: true,
    },
    {
      name: "Beds",
      slug: "home-beds",
      description: "Quality beds and mattresses",
      isActive: true,
    },
    {
      name: "Home Storage",
      slug: "home-storage",
      description: "Storage solutions for home",
      isActive: true,
    },

    // Office Furniture
    {
      name: "Office Chairs",
      slug: "office-chairs",
      description: "Ergonomic office seating",
      isActive: true,
    },
    {
      name: "Office Desks",
      slug: "office-desks",
      description: "Professional office desks",
      isActive: true,
    },
    {
      name: "Office Cabinets",
      slug: "office-cabinets",
      description: "Office storage cabinets",
      isActive: true,
    },
    {
      name: "Conference Tables",
      slug: "office-tables",
      description: "Meeting and conference tables",
      isActive: true,
    },
    {
      name: "Office Storage",
      slug: "office-storage",
      description: "Office storage solutions",
      isActive: true,
    },
  ];

  console.log(`📝 Creating ${categories.length} categories...`);

  // Create categories
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const category of categories) {
    try {
      const existing = await prisma.category.findUnique({
        where: { slug: category.slug },
      });

      if (existing) {
        // Update existing category
        await prisma.category.update({
          where: { slug: category.slug },
          data: {
            name: category.name,
            description: category.description,
            isActive: category.isActive,
          },
        });
        updated++;
        console.log(`✅ Updated: ${category.name}`);
      } else {
        // Create new category
        await prisma.category.create({
          data: category,
        });
        created++;
        console.log(`✨ Created: ${category.name}`);
      }
    } catch (error) {
      console.error(`❌ Error with ${category.name}:`, error);
      skipped++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`   ✨ Created: ${created}`);
  console.log(`   ✅ Updated: ${updated}`);
  console.log(`   ❌ Skipped: ${skipped}`);
  console.log(`   📦 Total: ${categories.length}`);

  // Update existing products to new category structure (optional)
  console.log("\n🔄 Updating existing products...");

  // Map old categories to new ones
  const categoryMappings = [
    { old: "men", new: "men-tshirts" },
    { old: "women", new: "women-tshirts" },
    { old: "kids", new: "kids-tshirts" },
    { old: "home-furniture", new: "home-chairs" },
    { old: "office-furniture", new: "office-chairs" },
  ];

  for (const mapping of categoryMappings) {
    const count = await prisma.product.updateMany({
      where: { category: mapping.old },
      data: { category: mapping.new },
    });

    if (count.count > 0) {
      console.log(
        `   📦 Migrated ${count.count} products from "${mapping.old}" to "${mapping.new}"`,
      );
    }
  }

  console.log("\n✅ Category update complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// To run this script:
// 1. Save this file as scripts/update-categories.ts
// 2. Run: npx ts-node scripts/update-categories.ts
// OR
// 3. Add to package.json scripts: "update-categories": "ts-node scripts/update-categories.ts"
// 4. Run: npm run update-categories
