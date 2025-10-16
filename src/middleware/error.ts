import { Context, State } from "../deps.ts";
import type { Middleware } from "../types/middleware.ts";

export class AppError extends Error {
  override name = "AppError";
  constructor(
    public statusCode: number,
    override message: string
  ) {
    super(message);
  }
}

export const errorMiddleware: Middleware = async (
  ctx: Context<State>,
  next: () => Promise<unknown>
) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof AppError) {
      ctx.response.status = error.statusCode;
      ctx.response.body = { error: error.message };
    } else {
      console.error(error);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal Server Error" };
    }
  }
};