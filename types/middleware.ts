import { Context, State } from 'https://deno.land/x/oak@v12.6.1/mod.ts';

export type Middleware = (
  context: Context<State>,
  next: () => Promise<unknown>,
) => Promise<unknown>;
