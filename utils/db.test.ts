import { assert, assertEquals } from '$std/testing/asserts.ts';
import { createProduct, createUser, getAllProducts, getProduct, getUserByEmail } from './db.ts';
import { User } from '../types/user.ts';
import { Product } from '../types/product.ts';

// Mock data for testing
const testUser: User = {
  id: 'test-user-1',
  email: 'test@example.com',
  password: 'hashedpassword',
  role: 'customer',
  createdAt: new Date(),
};

const testProduct: Product = {
  id: 'test-product-1',
  name: 'Test Product',
  description: 'A test product for testing',
  price: 10.99,
  image: 'test.jpg',
  inventory: 100,
};

Deno.test('getUserByEmail returns null for non-existent user', async () => {
  const user = await getUserByEmail('nonexistent@example.com');
  assertEquals(user, null);
});

Deno.test('createUser and getUserByEmail work correctly', async () => {
  // Create a user
  await createUser(testUser);

  // Retrieve the user
  const retrievedUser = await getUserByEmail(testUser.email);
  assert(retrievedUser !== null);
  assertEquals(retrievedUser?.email, testUser.email);
  assertEquals(retrievedUser?.role, testUser.role);
});

Deno.test('getProduct returns null for non-existent product', async () => {
  const product = await getProduct('nonexistent-product');
  assertEquals(product, null);
});

Deno.test('createProduct and getProduct work correctly', async () => {
  // Create a product
  await createProduct(testProduct);

  // Retrieve the product
  const retrievedProduct = await getProduct(testProduct.id);
  assert(retrievedProduct !== null);
  assertEquals(retrievedProduct?.id, testProduct.id);
  assertEquals(retrievedProduct?.name, testProduct.name);
});

Deno.test('getAllProducts returns array including created products', async () => {
  const products = await getAllProducts();
  assertEquals(Array.isArray(products), true);

  // Check if our test product is in the list
  const foundProduct = products.find((p) => p.id === testProduct.id);
  assert(foundProduct !== undefined);
});
