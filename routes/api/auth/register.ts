import { Handlers } from '$fresh/server.ts';
import { createUser, getUserByEmail } from '../../../utils/db.ts';
import { hashPassword } from '../../../utils/auth.ts';
import { User } from '../../../types/user.ts';

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const email = form.get('email') as string;
      const password = form.get('password') as string;
      const confirmPassword = form.get('confirmPassword') as string;

      if (!email || !password || !confirmPassword) {
        return new Response(JSON.stringify({ error: 'All fields required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (password !== confirmPassword) {
        return new Response(JSON.stringify({ error: 'Passwords do not match' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return new Response(JSON.stringify({ error: 'User already exists' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const hashedPassword = await hashPassword(password);
      const user: User = {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
        role: 'customer',
        createdAt: new Date(),
      };

      await createUser(user);
      return new Response(JSON.stringify({ message: 'Registration successful' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Registration error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
