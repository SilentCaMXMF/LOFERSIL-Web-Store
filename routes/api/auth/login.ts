import { Handlers } from '$fresh/server.ts';
import { getUserByEmail } from '../../../utils/db.ts';
import { createSession } from '../../../utils/session.ts';
import { verifyPassword } from '../../../utils/auth.ts';

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const email = form.get('email') as string;
      const password = form.get('password') as string;

      if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const user = await getUserByEmail(email);
      if (!user || !(await verifyPassword(password, user.password))) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const sessionId = await createSession(user.id, user.email, user.role);

      return new Response(JSON.stringify({ message: 'Login successful' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `session=${sessionId}; HttpOnly; Path=/; Max-Age=604800`,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
