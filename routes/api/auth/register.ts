import { Handlers } from '$fresh/server.ts';
import { createUser, getUserByEmail } from '../../../utils/db.ts';
import { hashPassword, validatePassword } from '../../../utils/auth.ts';
import { User } from '../../../types/user.ts';
import { AppError } from '../../../utils/errors.ts';

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const email = form.get('email') as string;
      const password = form.get('password') as string;
      const confirmPassword = form.get('confirmPassword') as string;

      // Enhanced validation
      if (!email || !password || !confirmPassword) {
        throw new AppError(400, 'All fields are required');
      }

      if (!email.includes('@') || email.length < 5) {
        throw new AppError(400, 'Invalid email format');
      }

      if (!validatePassword(password)) {
        throw new AppError(400, 'Password does not meet security requirements');
      }

      if (password !== confirmPassword) {
        throw new AppError(400, 'Passwords do not match');
      }

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new AppError(409, 'User already exists');
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
      if (error instanceof AppError) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: error.statusCode,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      console.error('Registration error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
