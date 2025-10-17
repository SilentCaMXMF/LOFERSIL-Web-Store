import { Application, Router, configure, renderFile, oakCors } from "./deps.ts";
import { join } from "https://deno.land/std@0.208.0/path/mod.ts";
import { crypto } from "https://deno.land/std@0.208.0/crypto/mod.ts";
import { sessionMiddleware } from "./middleware/session.ts";
import { errorMiddleware } from "./middleware/error.ts";
import { loggerMiddleware } from "./middleware/logger.ts";
import { config } from "./config.ts";
import type { Context } from "./deps.ts";
import { Middleware } from 'https://deno.land/x/oak@v12.6.1/middleware.ts';
import { hashPassword, verifyPassword } from "./utils/auth.ts";
import { getUserByEmail, createUser } from "./utils/db.ts";
import { SessionManager } from "./utils/session.ts";
import { User } from "./types/user.ts";

export const app = new Application();
const router = new Router();
const sessionManager = new SessionManager();

// Configure Eta
configure({
  views: join(new URL(".", import.meta.url).pathname, "templates"),
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
      root: join(new URL(".", import.meta.url).pathname, "public"),
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

// Auth routes
router.post("/auth/login", async (ctx) => {
  const body = await ctx.request.body({ type: "form" }).value;
  const email = body.get("email");
  const password = body.get("password");

  if (!email || !password) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Email and password required" };
    return;
  }

  const user = await getUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password))) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid credentials" };
    return;
  }

  const sessionId = sessionManager.createSession(user.id);
  ctx.response.body = { message: "Login successful" };
  ctx.response.headers.set("Set-Cookie", `session=${sessionId}; HttpOnly; Path=/; Max-Age=604800`);
});

router.post("/auth/register", async (ctx) => {
  const body = await ctx.request.body({ type: "form" }).value;
  const email = body.get("email");
  const password = body.get("password");
  const confirmPassword = body.get("confirmPassword");

  if (!email || !password || !confirmPassword) {
    ctx.response.status = 400;
    ctx.response.body = { error: "All fields required" };
    return;
  }

  if (password !== confirmPassword) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Passwords do not match" };
    return;
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    ctx.response.status = 400;
    ctx.response.body = { error: "User already exists" };
    return;
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
  ctx.response.status = 201;
  ctx.response.body = { message: "Registration successful" };
});

router.post("/auth/logout", (ctx) => {
  const sessionId = ctx.request.headers.get("cookie")?.split("session=")[1]?.split(";")[0];
  if (sessionId) {
    sessionManager.deleteSession(sessionId);
  }
  ctx.response.body = { message: "Logout successful" };
  ctx.response.headers.set("Set-Cookie", "session=; HttpOnly; Path=/; Max-Age=0");
});

// Apply router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Error middleware should be last
app.use(errorMiddleware as unknown as Middleware);

// Start server
console.log(`🚀 Server running at http://localhost:${config.port}`);
await app.listen({ port: config.port });

