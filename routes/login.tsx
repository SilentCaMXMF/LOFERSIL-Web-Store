import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    // Proxy to backend
    const backendUrl = "http://localhost:8000/auth/login";
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email, password }),
    });

    if (!response.ok) {
      return new Response(await response.text(), { status: response.status });
    }

    const result = await response.json();
    const setCookie = response.headers.get("Set-Cookie");
    return new Response(result.message, {
      status: 200,
      headers: setCookie ? { "Set-Cookie": setCookie } : {},
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
