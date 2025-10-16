/// <reference lib="deno.unstable" />

import { User } from "../types/user.ts";
import { Product } from "../types/product.ts";

export const kv = await Deno.openKv();

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await kv.get(["users", email]);
  return result.value as User | null;
}

export async function createUser(user: User): Promise<void> {
  await kv.set(["users", user.email], user);
}

export async function getProduct(id: string): Promise<Product | null> {
  const result = await kv.get(["products", id]);
  return result.value as Product | null;
}

export async function getAllProducts(): Promise<Product[]> {
  const products: Product[] = [];
  for await (const entry of kv.list({ prefix: ["products"] })) {
    if (entry.key.length === 2 && typeof entry.key[1] === "string") {
      products.push(entry.value as Product);
    }
  }
  return products;
}

export async function createProduct(product: Product): Promise<void> {
  await kv.set(["products", product.id], product);
}

export async function getProductsPaginated(
  page: number,
  limit: number
): Promise<{ products: Product[]; total: number }> {
  const offset = (page - 1) * limit;
  const products: Product[] = [];
  let total = 0;
  
  for await (const entry of kv.list({ prefix: ["products"] })) {
    total++;
    if (total > offset && products.length < limit) {
      products.push(entry.value as Product);
    }
  }
  
  return { products, total };
}