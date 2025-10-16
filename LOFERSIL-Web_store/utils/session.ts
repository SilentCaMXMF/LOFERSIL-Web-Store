import { kv } from "./db.ts";

export interface Session {
  userId: string;
  email: string;
  role: string;
  createdAt: Date;
}

export async function createSession(
  userId: string,
  email: string,
  role: string,
): Promise<string> {
  const sessionId = crypto.randomUUID();
  const session: Session = {
    userId,
    email,
    role,
    createdAt: new Date(),
  };
  await kv.set(["sessions", sessionId], session, {
    expireIn: 60 * 60 * 24 * 7 * 1000,
  }); // 7 days
  return sessionId;
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const result = await kv.get(["sessions", sessionId]);
  return result.value as Session | null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await kv.delete(["sessions", sessionId]);
}
