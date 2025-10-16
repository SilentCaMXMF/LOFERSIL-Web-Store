import { Context } from "../deps.ts"; // remove State import
import type { Middleware } from "../types/middleware.ts";
import type { State } from "../types/state.ts";

export type Middleware = (
  context: Context<State>,
  next: () => Promise<unknown>
) => Promise<unknown>;