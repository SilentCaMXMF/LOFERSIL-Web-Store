import { Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();

    // Call internal API
    const apiUrl = new URL(req.url).origin + '/api/auth/login';
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      return new Response(await response.text(), { status: response.status });
    }

    const result = await response.json();
    const setCookie = response.headers.get('Set-Cookie');
    return new Response(result.message, {
      status: 200,
      headers: setCookie ? { 'Set-Cookie': setCookie } : {},
    });
  },
};

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
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
          <input type='checkbox' name='remember' /> Remember Me
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
