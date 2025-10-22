import { assert, assertEquals } from '$std/testing/asserts.ts';
import { createSession, deleteSession, getSession } from './session.ts';

Deno.test('createSession and getSession work correctly', async () => {
  const sessionId = await createSession('user-123', 'test@example.com', 'customer');
  assert(sessionId.length > 0);

  const session = await getSession(sessionId);
  assert(session !== null);
  assertEquals(session?.userId, 'user-123');
  assertEquals(session?.email, 'test@example.com');
  assertEquals(session?.role, 'customer');
});

Deno.test('getSession returns null for non-existent session', async () => {
  const session = await getSession('invalid-session-id');
  assertEquals(session, null);
});

Deno.test('deleteSession removes session', async () => {
  const sessionId = await createSession('user-456', 'test2@example.com', 'admin');
  await deleteSession(sessionId);

  const session = await getSession(sessionId);
  assertEquals(session, null);
});
