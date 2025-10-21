import { Handlers } from '$fresh/server.ts';
import { deleteSession } from '../../../utils/session.ts';

export const handler: Handlers = {
  async POST(req) {
    try {
      const cookies = req.headers.get('cookie') || '';
      const sessionCookie = cookies.split(';').find((c) => c.trim().startsWith('session='));
      if (sessionCookie) {
        const sessionId = sessionCookie.split('=')[1];
        await deleteSession(sessionId);
      }

      return new Response(JSON.stringify({ message: 'Logout successful' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'session=; HttpOnly; Path=/; Max-Age=0',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
