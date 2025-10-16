import { Application, Router, configure, renderFile, oakCors } from "./deps.ts";
import { join } from "https://deno.land/std@0.208.0/path/mod.ts";
import { sessionMiddleware } from "./middleware/session.ts";
import { errorMiddleware } from "./middleware/error.ts";
import { loggerMiddleware } from "./middleware/logger.ts";
import { config } from "./config.ts";
import type { Context } from "./deps.ts";
import { Middleware } from 'https://deno.land/x/oak@v12.6.1/middleware.ts';

export const app = new Application();
const router = new Router();

// Configure Eta
configure({
  views: join(Deno.cwd(), "templates"),
  cache: true,
  useWith: true
});

// Logger middleware
app.use(loggerMiddleware as unknown as Middleware);

// Session middleware
app.use(sessionMiddleware as unknown as Middleware);

// CORS middleware
app.use(oakCors());

// Add static file middleware
app.use(async (ctx: Context, next) => {
  try {
    await ctx.send({
      root: join(Deno.cwd(), "static"),
      index: "index.html",
    });
  } catch (error) {
    if (error instanceof Error && error.name !== 'NotFound') {
      console.error('Static file error:', error);
    }
    await next();
  }
});

// Routes
router.get("/health", (ctx) => {
  ctx.response.body = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: config.environment
  };
});

router.get("/", async (ctx) => {
  ctx.response.body = await renderFile("index", {
    title: "Office Supply Shop",
    isLoggedIn: false
  });
});

// Apply router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Error middleware should be last
app.use(errorMiddleware as unknown as Middleware);

// Start server
console.log(`🚀 Server running at http://localhost:${config.port}`);
await app.listen({ port: config.port });

