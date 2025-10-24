import { Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const name = form.get('name') as string;
      const email = form.get('email') as string;
      const message = form.get('message') as string;

      // Basic validation
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Here you would typically send an email or save to database
      // For now, just log the message
      console.log('Contact form submission:', { name, email, message });

      return new Response(JSON.stringify({ message: 'Message sent successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};