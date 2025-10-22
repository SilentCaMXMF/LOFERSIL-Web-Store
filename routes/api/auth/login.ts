import { Handlers } from '$fresh/server.ts';
import { getUserByEmail } from '../../../utils/db.ts';
import { createSession } from '../../../utils/session.ts';
import { validatePassword, verifyPassword } from '../../../utils/auth.ts';
import { AppError } from '../../../utils/errors.ts';

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const email = form.get('email') as string;
      const password = form.get('password') as string;

      // Enhanced validation
      if (!email || !password) {
        throw new AppError(400, 'Email and password are required');
      }

      if (!email.includes('@') || email.length < 5) {
        throw new AppError(400, 'Invalid email format');
      }

      if (!validatePassword(password)) {
        throw new AppError(400, 'Password does not meet security requirements');
      }

      const user = await getUserByEmail(email);
      if (!user || !(await verifyPassword(password, user.password))) {
        throw new AppError(401, 'Invalid credentials');
      }

      const sessionId = await createSession(user.id, user.email, user.role);

      return new Response(JSON.stringify({ message: 'Login successful' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie':
            `session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: error.statusCode,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      console.error('Login error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
