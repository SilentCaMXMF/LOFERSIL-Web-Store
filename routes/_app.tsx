import { type PageProps } from '$fresh/server.ts';
import { loadTranslationsSync } from '../utils/i18n.ts';

export default function App({ Component }: PageProps) {
  // Initialize translations on server-side
  loadTranslationsSync('en');
  loadTranslationsSync('pt');

  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>LOFERSIL-Web_store</title>
        <meta
          http-equiv='Content-Security-Policy'
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob: http:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';"
        />
        <link rel='stylesheet' href='/static/css/styles.css' />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
