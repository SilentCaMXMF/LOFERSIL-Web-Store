# LOFERSIL-Web-Store

A full-stack web application for an office supply store, featuring a landing page and online shopping functionality.

## Architecture

- **Frontend**: Built with [Fresh](https://fresh.deno.com/), a modern web framework for Deno, providing server-side rendering and islands for interactivity.
- **Backend**: Powered by [Oak](https://oakserver.github.io/oak/), a middleware framework for Deno, handling API routes, authentication, and data persistence.
- **Database**: Uses Deno's built-in Key-Value store (Deno KV) for user and product data.
- **Runtime**: Entirely Deno-based for consistency and ease of deployment.

## Features

- User authentication (login, register, logout)
- Product catalog
- Session management
- Responsive UI components

## Setup Instructions

### Prerequisites

- [Deno](https://deno.com/) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd LOFERSIL-Web-Store
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   PORT=8000
   ENVIRONMENT=development
   COOKIE_SECRET=your-secret-key
   ```

3. Start the backend server:
   ```bash
   deno task start
   ```
   This runs the Oak server on `http://localhost:8000`.

4. In a new terminal, start the frontend development server:
   ```bash
   cd LOFERSIL-Web_store
   deno task dev
   ```
   This runs the Fresh app on `http://localhost:8000` (or configured port).

### Development

- Backend tasks (from root):
  - `deno task dev`: Run backend in watch mode.
  - `deno task test`: Run tests.
  - `deno task check`: Type check the code.

- Frontend tasks (from `LOFERSIL-Web_store/`):
  - `deno task dev`: Run frontend in watch mode.
  - `deno task build`: Build for production.

### Project Structure

```
LOFERSIL-Web-Store/
├── src/                          # Backend (Oak)
│   ├── middleware/               # Custom middleware (CORS, logging, etc.)
│   ├── routes/                   # API routes (now integrated)
│   ├── utils/                    # Utilities (auth, db, session)
│   ├── types/                    # TypeScript type definitions
│   └── main.ts                   # Application entry point
├── LOFERSIL-Web_store/           # Frontend (Fresh)
│   ├── components/               # Reusable UI components
│   ├── islands/                  # Interactive components
│   ├── routes/                   # Pages and API routes
│   ├── utils/                    # Frontend utilities
│   └── main.ts                   # Fresh entry point
└── README.md                     # This file
```

## API Endpoints

- `GET /health` - Health check
- `GET /` - Home page
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run tests and checks.
5. Submit a pull request.

## License

[Add your license here]
