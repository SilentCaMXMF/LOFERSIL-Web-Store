import { Handlers } from "$fresh/server.ts";
import { deleteSession } from "../utils/session.ts";

export const handler: Handlers = {
  async POST(req) {
    const cookies = req.headers.get("cookie") || "";
    const sessionCookie = cookies.split(";").find((c) =>
      c.trim().startsWith("session=")
    );
    if (sessionCookie) {
      const sessionId = sessionCookie.split("=")[1];
      await deleteSession(sessionId);
    }
    return new Response("Logged out", {
      status: 200,
      headers: {
        "Set-Cookie": "session=; HttpOnly; Path=/; Max-Age=0",
      },
    });
  },
};
