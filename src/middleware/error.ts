import { Context, Status } from "../deps.ts";

export const errorMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  try {
    await next();
  } catch (err: unknown) {
    console.error(err);
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : JSON.stringify(err) ?? "Internal Server Error";

    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      status: "error",
      message: message || "Internal Server Error"
    };
  }
};