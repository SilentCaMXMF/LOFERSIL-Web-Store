import { Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  async POST(req) {
    // Call internal API
    const apiUrl = new URL(req.url).origin + '/api/auth/logout';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Cookie': req.headers.get('cookie') || '' },
    });

    const result = await response.json();
    const setCookie = response.headers.get('Set-Cookie');
    return new Response(result.message, {
      status: 200,
      headers: setCookie ? { 'Set-Cookie': setCookie } : {},
    });
  },
};
