import { Context } from "../deps.ts";

export const sessionMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  const sessionId = await ctx.cookies.get("sessionId");
  if (sessionId) {
    // Add session handling logic here
    ctx.state.session = { id: sessionId };
  }
  await next();
};