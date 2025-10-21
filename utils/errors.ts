// Add to utils/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public override message: string,
  ) {
    super(message);
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return new Response(error.message, { status: error.statusCode });
  }
  console.error(error);
  return new Response('Internal Server Error', { status: 500 });
}
