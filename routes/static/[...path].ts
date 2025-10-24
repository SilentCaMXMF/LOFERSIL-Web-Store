import { Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  GET: async (req, ctx) => {
    const url = new URL(req.url);
    const path = url.pathname.replace('/static/', '');

    try {
      const response = await fetch(`https://via.placeholder.com/400x300?text=${encodeURIComponent(path)}`);
      if (response.ok) {
        return new Response(response.body, {
          headers: { 'Content-Type': 'image/png' },
        });
      }
    } catch (error) {
      console.error('Static file error:', error);
    }

    return new Response('Not Found', { status: 404 });
  },
};