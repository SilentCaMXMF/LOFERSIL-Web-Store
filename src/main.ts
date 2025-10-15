import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
const router = new Router();

router
  .get("/", (ctx: Context) => {
    ctx.response.body = "Welcome to LOFERSIL Office Supply Shop!";
  })
  .get("/shop", (ctx: Context) => {
    ctx.response.body = "🛒 Online Shop coming soon!";
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("🚀 Server running on http://localhost:8000");
await app.listen({ port: 8000 });
