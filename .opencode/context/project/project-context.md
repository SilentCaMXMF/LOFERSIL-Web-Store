# OpenCode Agent System Project Context

## Technology Stack

**Primary Language:** TypeScript
**Runtime:** Deno
**Package Manager:** None (Deno handles dependencies via import maps)
**Build Tools:** Deno's built-in TypeScript support and `deno task` scripts
**Testing:** Deno's native testing module (`Deno.test`)
**Linting:** Deno's built-in linter (`deno lint`)

## Project Structure

```
.opencode/
├── agent/           # AI agents for specific tasks
│   ├── subagents/   # Specialized subagents
│   └── *.md         # Primary agents
├── command/         # Slash commands
├── context/         # Knowledge base for agents
└── plugin/          # Extensions and integrations

tasks/               # Task management files
```
Note: Aligns with Fresh conventions (e.g., `routes/`, `islands/`, `components/` from AGENTS.md).

## Core Patterns

### Agent Structure Pattern
```markdown
---
description: "What this agent does"
mode: primary|subagent
tools: [read, edit, bash, etc.] (Deno-compatible, e.g., `deno task check`)
permissions: [security restrictions, e.g., --allow-net]
---

# Agent Name

[Direct instructions for behavior]

**EXECUTE** this [process type] for every [task type]:

**1. [ACTION]** the [subject]:
- [Specific instruction 1]
- [Specific instruction 2]

**RULES:**
- **ALWAYS** [critical requirement]
- **NEVER** [forbidden action]
```

### Command Structure Pattern
```markdown
---
name: command-name
agent: target-agent
---

You are [doing specific task].

**Request:** $ARGUMENTS

**Context Loaded:**
@.opencode/context/core/essential-patterns.md
@[additional context files]

Execute [task] now.
```

### Context Loading Rules
- Commands load context immediately using @ references
- Agents can look up additional context deterministically
- Maximum 4 context files per command (250-450 lines total)
- Keep context files focused (50-150 lines each)
- Use Deno-compatible tools for context management

## Security Guidelines

- Agents have restricted permissions by default (e.g., Deno's --allow flags)
- Sensitive operations require explicit approval
- No direct file system modifications without validation
- Build commands limited to safe operations (e.g., `deno task` scripts)

## Development Workflow

1. **Planning:** Create detailed task plans for complex work
2. **Implementation:** Execute one step at a time with validation
3. **Review:** Code review and security checks
4. **Testing:** Automated testing and build validation
5. **Documentation:** Update docs and context files

## Quality Gates

- Deno lint and type checks pass (`deno task check`)
- Code review completed
- Build process succeeds (`deno task build`)
- Tests pass (`deno test`)
- Documentation updated