import { type PageProps } from '$fresh/server.ts';
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>LOFERSIL-Web_store</title>
        <meta
          http-equiv='Content-Security-Policy'
          content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';"
        />
        <link rel='stylesheet' href='/static/css/styles.css' />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
