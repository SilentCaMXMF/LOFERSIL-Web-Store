import { Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();

    // Call internal API
    const apiUrl = new URL(req.url).origin + '/api/auth/register';
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      return new Response(await response.text(), { status: response.status });
    }

    const result = await response.json();
    return new Response(result.message, { status: 200 });
  },
};

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form method='post'>
        <label>
          Email:
          <input type='email' name='email' required />
        </label>
        <label>
          Password:
          <input type='password' name='password' required />
        </label>
        <label>
          Confirm Password:
          <input type='password' name='confirmPassword' required />
        </label>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}
