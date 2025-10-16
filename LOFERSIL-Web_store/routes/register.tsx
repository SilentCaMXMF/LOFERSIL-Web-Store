import { Handlers } from "$fresh/server.ts";
import { hashPassword } from "../utils/auth.ts";
import { createUser, getUserByEmail } from "../utils/db.ts";
import { User } from "../types/user.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const confirmPassword = form.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return new Response("Passwords do not match", { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return new Response("User already exists", { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user: User = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      role: "customer",
      createdAt: new Date(),
    };

    await createUser(user);

    return new Response("Registration successful", { status: 200 });
  },
};

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form method="post">
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
