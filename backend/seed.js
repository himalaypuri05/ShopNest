require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./model/Product");

const products = [
  {
    name: "Everyday Backpack",
    description: "A lightweight backpack with a padded laptop sleeve and water-resistant finish.",
    price: 49.99,
    category: "Accessories",
    stock: 35,
    imageUrl: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    rating: 4.5,
    numReviews: 18,
  },
  {
    name: "Classic White Sneakers",
    description: "Comfortable low-top sneakers for everyday wear.",
    price: 64.99,
    category: "Footwear",
    stock: 24,
    imageUrl: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
    rating: 4.2,
    numReviews: 12,
  },
  {
    name: "Wireless Headphones",
    description: "Over-ear wireless headphones with cushioned ear cups and clear sound.",
    price: 89.99,
    category: "Electronics",
    stock: 16,
    imageUrl: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"],
    rating: 4.7,
    numReviews: 31,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Reusable insulated bottle designed to keep drinks cold or hot for hours.",
    price: 24.99,
    category: "Home & Living",
    stock: 42,
    imageUrl: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8"],
    rating: 4.4,
    numReviews: 9,
  },
  {
    name: "Minimalist Wristwatch",
    description: "A simple everyday watch with a clean dial and adjustable strap.",
    price: 74.99,
    category: "Accessories",
    stock: 11,
    imageUrl: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
    rating: 4.6,
    numReviews: 22,
  },
  {
    name: "Cotton Crew T-Shirt",
    description: "A soft cotton crew-neck tee with a comfortable everyday fit.",
    price: 19.99,
    category: "Clothing",
    stock: 50,
    imageUrl: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    rating: 4.1,
    numReviews: 14,
  },
];

async function seedDatabase() {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is missing. Add it to backend/.env before seeding.");
  }

  await mongoose.connect(process.env.MONGO_URL);

  const operations = products.map((product) => ({
    updateOne: {
      filter: { name: product.name },
      update: { $set: product },
      upsert: true,
    },
  }));

  const result = await Product.bulkWrite(operations);
  console.log(
    `Seed complete: ${result.upsertedCount} products added, ${result.modifiedCount} existing products updated.`
  );
}

seedDatabase()
  .catch((error) => {
    console.error("Database seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });