import { assert, assertEquals } from '$std/testing/asserts.ts';
import { hashPassword, validatePassword, verifyPassword } from './auth.ts';

Deno.test('validatePassword returns false for weak passwords', () => {
  assertEquals(validatePassword('weak'), false);
  assertEquals(validatePassword('Weak1!'), false); // Too short
  assertEquals(validatePassword('weakpassword1!'), false); // No uppercase
  assertEquals(validatePassword('WeakPassword!'), false); // No numbers
});

Deno.test('validatePassword returns true for strong passwords', () => {
  assert(validatePassword('StrongPass1!'));
  assert(validatePassword('MySecure123@'));
});

Deno.test('hashPassword and verifyPassword work correctly', async () => {
  const password = 'TestPassword123!';
  const hashed = await hashPassword(password);

  // Hash should be different from original
  assert(hashed !== password);

  // Verification should succeed
  const isValid = await verifyPassword(password, hashed);
  assert(isValid);

  // Wrong password should fail
  const isInvalid = await verifyPassword('WrongPassword', hashed);
  assertEquals(isInvalid, false);
});
