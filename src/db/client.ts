export const kv = await Deno.openKv();

export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export async function createUser(user: User): Promise<void> {
  await kv.set(["users", user.id], user);
}

export async function getUserById(id: string): Promise<User | null> {
  const result = await kv.get(["users", id]);
  return result.value as User | null;
}