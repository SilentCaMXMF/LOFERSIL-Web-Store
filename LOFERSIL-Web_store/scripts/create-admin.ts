import { hashPassword } from "../utils/auth.ts";
import { createUser } from "../utils/db.ts";
import { User } from "../types/user.ts";

const admin: User = {
  id: crypto.randomUUID(),
  email: "admin@example.com",
  password: await hashPassword("admin123"),
  role: "admin",
  createdAt: new Date(),
};

await createUser(admin);
console.log("Admin account created: admin@example.com / admin123");
