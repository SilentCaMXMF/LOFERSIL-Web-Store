import { Application, Router } from "./deps.ts";
import { sessionMiddleware } from "./middleware/session.ts";
import { errorMiddleware } from "./middleware/error.ts";
import { loggerMiddleware } from "./middleware/logger.ts";
import { config } from "./config.ts";

const app = new Application();
const router = new Router();

// Logger middleware
app.use(loggerMiddleware);

// Session middleware
app.use(sessionMiddleware);

// Routes
router.get("/health", (ctx) => {
  ctx.response.body = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: config.environment
  };
});

// Apply router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Error middleware should be last
app.use(errorMiddleware);

// Start server
console.log(`🚀 Server running at http://localhost:${config.port}`);
await app.listen({ port: config.port });
