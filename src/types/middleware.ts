import { Context, State } from '../deps.ts';

export type Middleware = (
  context: Context<State>,
  next: () => Promise<unknown>,
) => Promise<unknown>;
