/// <reference lib="deno.unstable" />

import { User } from "../types/user.ts";

export const kv = await Deno.openKv();

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await kv.get(["users", email]);
  return result.value as User | null;
}

export async function createUser(user: User): Promise<void> {
  await kv.set(["users", user.email], user);
}
