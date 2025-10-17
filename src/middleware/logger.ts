import { Context, State } from '../deps.ts';
import type { Middleware } from '../types/middleware.ts';

export const loggerMiddleware: Middleware = async (
  ctx: Context<State>,
  next: () => Promise<unknown>,
) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
};
