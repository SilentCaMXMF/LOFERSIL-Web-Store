# AGENTS.md

## 🦕 Agent Initialization Prompt

You are a development assistant working exclusively within a **Deno 2.x + Fresh + Preact** codebase.

### Core Rules

- **Runtime:** Use only Deno APIs (`Deno.*`, `$std/`, `$fresh/`, `$preact/`, or relative imports).
- **No Node.js:** Never use Node.js APIs, globals, or npm modules.
- **Dependencies:** Import only from URLs or import maps — never use `npm:` or `package.json`.
- **Code Style:** TypeScript (strict), `.tsx` for Preact JSX, TailwindCSS for styling.
- **Error Handling:** Use `AppError` from `utils/errors.ts` for server-side exceptions.
- **Behavior:** Prefer small, modular components. Follow Fresh conventions (`routes/`, `islands/`,
  `components/`, etc.).
- **Output Policy:** Only suggest commands that work with `deno task ...`. Never recommend
  `npm install`.

---

## ⚙️ Commands

| Task                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| `deno task start`    | Start the development server with file watching.   |
| `deno task dev`      | Run the development server (alternative to start). |
| `deno task build`    | Build the project for production.                  |
| `deno task preview`  | Preview the production build.                      |
| `deno task check`    | Run format, lint, and type checks.                 |
| `deno task cli`      | Access Fresh CLI for manifest generation.          |
| `deno task manifest` | Generate the Fresh manifest.                       |
| `deno task update`   | Update Fresh to the latest version.                |
| `deno task backend`  | Run the backend server independently.              |
| `deno test`          | Run Deno-native tests.                             |
| `deno task cache`    | Reload and cache dependencies.                     |
| `deno task tui`      | Start the OpenCode TUI agent with MCP integration. |

---

## 🧩 Code Style Guidelines

- **Framework:** Deno with Fresh and Preact
- **Imports:** Use `$fresh/`, `$std/`, `$preact/` as defined in `deno.json`.
- **Formatting:** Run `deno fmt` before committing changes.
- **Linting:** Follow Fresh and recommended rules with `deno lint`.
- **Types:** Define interfaces in `types/` (e.g., `Product`, `User`).
- **Naming:** PascalCase for components/functions, camelCase for variables.
- **JSX:** Use Preact JSX syntax with `.tsx` files.
- **CSS:** Use Tailwind CSS utility classes.

---

## 📝 Examples

### Sample Component (Button.tsx)

```tsx
import { h } from 'preact';

interface ButtonProps {
  onClick: () => void;
  children: string;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      class='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
    >
      {children}
    </button>
  );
}
```

### Sample Route (routes/index.tsx)

```tsx
import { Head } from '$fresh/runtime.ts';
import { useState } from 'preact/hooks';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Head>
        <title>Home - LOFERSIL</title>
      </Head>
      <div class='p-4'>
        <h1 class='text-2xl font-bold'>Welcome to LOFERSIL</h1>
        <p>Count: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          class='px-4 py-2 bg-green-500 text-white rounded'
        >
          Increment
        </button>
      </div>
    </>
  );
}
```

---

## 🎨 Integration (MCP Tools)

- The agent connects to **Figma MCP Server** for design asset management.
- MCP config is defined in `.opencode/mcp.config.json`.
- When using MCP features, the agent must not alter project runtime logic.
- The Figma API key must be loaded as `FIGMA_API_KEY` in the environment.

### Example MCP Usage

To fetch design assets from Figma, the agent can use MCP tools to retrieve component specs or export
images. For instance, querying a Figma file for button styles might involve: "Extract the primary
button component from Figma file XYZ and suggest Tailwind classes."

---

## 🧠 Behavior Guidelines

- Always generate Deno-native code (no Node imports).
- Maintain Fresh directory conventions (`routes/`, `islands/`, `components/`).
- Ensure accessibility (semantic HTML, responsive design).
- On errors, log descriptive messages and use structured JSON responses.
- Always pass Deno lint/type checks before suggesting commits.

---

## 🧪 Testing Best Practices

- **Framework:** Use Deno's native testing module (`Deno.test`) for unit and integration tests.
- **Structure:** Place tests in `src/tests/` or alongside components (e.g., `Component.test.tsx`).
- **Coverage:** Focus on routes, islands, and utilities; mock external dependencies like KV stores.
- **Running Tests:** Use `deno test` with appropriate permissions (e.g., `--allow-net` for API
  tests).
- **Assertions:** Leverage `$std/testing/asserts` for checks; avoid third-party libraries unless
  necessary.
- **Example Test:**

  ```tsx
  import { assertEquals } from '$std/testing/asserts.ts';
  import { render } from 'preact';
  import Button from '../components/Button.tsx';

  Deno.test('Button renders correctly', () => {
    const element = render(<Button onClick={() => {}}>Click me</Button>);
    assertEquals(element.textContent, 'Click me');
  });
  ```

---

## 🔄 Version Updates

- **Deno 2.x Features:** Leverage unstable KV for data storage; use `--unstable-kv` flag in tasks.
- **Fresh Updates:** Run `deno task update` to pull latest Fresh patches; check release notes for
  breaking changes.
- **Preact Compatibility:** Ensure signals and hooks align with current versions in `deno.json`.
- **Migration Tips:** If upgrading, test KV migrations and review import map URLs for compatibility.
