import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { hashPassword, verifyPassword } from '../utils/auth.ts';

Deno.test('password hashing', async () => {
  const password = 'TestPassword123!';
  const hash = await hashPassword(password);
  const isValid = await verifyPassword(password, hash);
  assertEquals(isValid, true);
});
