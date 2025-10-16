import { Handlers } from "$fresh/server.ts";
import { verifyPassword } from "../utils/auth.ts";
import { getUserByEmail } from "../utils/db.ts";
import { createSession } from "../utils/session.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const user = await getUserByEmail(email);
    if (!user) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const sessionId = await createSession(user.id, user.email, user.role);
    const remember = form.get("remember") === "on";
    const maxAge = remember ? 2592000 : 604800; // 30 days or 7 days
    return new Response("Login successful", {
      status: 200,
      headers: {
        "Set-Cookie":
          `session=${sessionId}; HttpOnly; Path=/; Max-Age=${maxAge}`,
      },
    });
  },
};

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
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
          <input type="checkbox" name="remember" /> Remember Me
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
