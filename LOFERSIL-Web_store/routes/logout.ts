import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    // Proxy to backend
    const backendUrl = "http://localhost:8000/auth/logout";
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Cookie": req.headers.get("cookie") || "" },
    });

    const result = await response.json();
    const setCookie = response.headers.get("Set-Cookie");
    return new Response(result.message, {
      status: 200,
      headers: setCookie ? { "Set-Cookie": setCookie } : {},
    });
  },
};
