# AGENTS.md

## Commands
- Build: `deno task build`
- Lint: `deno task check` (includes fmt check, lint, type check)
- Test: No tests configured; use `deno test` for single tests if added
- Start dev: `deno task start`
- Preview: `deno task preview`

## Code Style Guidelines
- Framework: Deno with Fresh and Preact
- Imports: Use $fresh/, $std/, preact paths as in deno.json
- Formatting: Run `deno fmt` before commits
- Linting: Follow fresh and recommended rules; run `deno lint`
- Types: TypeScript; define interfaces in types/ dir (e.g., Product, User)
- Naming: PascalCase for components/functions, camelCase for variables
- JSX: Use Preact JSX syntax with .tsx files
- Error Handling: Use AppError class from utils/errors.ts for custom errors
- CSS: Tailwind CSS classes for styling
- No Cursor or Copilot rules present