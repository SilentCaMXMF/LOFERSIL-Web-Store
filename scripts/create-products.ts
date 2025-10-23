import { createProduct } from "../utils/db.ts";
import { Product } from "../types/product.ts";

const products: Product[] = [
  {
    id: "1",
    name: "Office Chair",
    description:
      "Comfortable ergonomic office chair with adjustable height and lumbar support.",
    price: 199.99,
    image: "https://via.placeholder.com/300x200?text=Chair",
    inventory: 50,
  },
  {
    id: "2",
    name: "Notebook",
    description:
      "High-quality lined notebook, 200 pages, perfect for notes and sketches.",
    price: 9.99,
    image: "https://via.placeholder.com/300x200?text=Notebook",
    inventory: 200,
  },
  {
    id: "3",
    name: "Printer Paper",
    description: "20 lb white printer paper, 500 sheets per ream.",
    price: 7.99,
    image: "https://via.placeholder.com/300x200?text=Paper",
    inventory: 100,
  },
  {
    id: "4",
    name: "Desk Lamp",
    description:
      "LED desk lamp with adjustable brightness and USB charging port.",
    price: 49.99,
    image: "https://via.placeholder.com/300x200?text=Lamp",
    inventory: 30,
  },
  {
    id: "5",
    name: "Stapler",
    description:
      "Heavy-duty stapler with 20-sheet capacity and refill staples.",
    price: 14.99,
    image: "https://via.placeholder.com/300x200?text=Stapler",
    inventory: 75,
  },
];

for (const product of products) {
  await createProduct(product);
  console.log(`Created product: ${product.name}`);
}

console.log("All products created.");
