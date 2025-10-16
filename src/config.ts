import { loadEnv } from "./deps.ts";

await loadEnv({ export: true });

export const config = {
  port: parseInt(Deno.env.get("PORT") || "8000"),
  environment: Deno.env.get("ENVIRONMENT") || "development",
  cookieSecret: Deno.env.get("COOKIE_SECRET") || "your-secret-key",
};