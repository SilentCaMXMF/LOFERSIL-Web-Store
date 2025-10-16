import { assertEquals } from "https://deno.land/std@0.208.0/testing/asserts.ts";

Deno.test("health check returns healthy status", async () => {
  const response = await fetch("http://localhost:8000/health");
  const data = await response.json();
  assertEquals(data.status, "healthy");
});