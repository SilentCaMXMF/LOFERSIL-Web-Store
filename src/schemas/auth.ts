import { z } from "zod";
import * as bcrypt from "bcrypt";
import type { Context } from "koa";

export const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
});

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  middleware() {
    return async (ctx: Context, next: () => Promise<unknown>) => {
      const ip = ctx.request.ip;
      const now = Date.now();
      const timestamps = this.requests.get(ip) || [];
      
      const recentRequests = timestamps.filter(time => now - time < this.windowMs);
      if (recentRequests.length >= this.maxRequests) {
        ctx.response.status = 429;
        ctx.response.body = { error: "Too many requests" };
        return;
      }

      recentRequests.push(now);
      this.requests.set(ip, recentRequests);
      await next();
    };
  }
}