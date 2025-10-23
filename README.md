# Fresh project

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## Recent Updates

### std/dotenv Version Upgrade
- **Date**: October 2025
- **Change**: Migrated from `deno.land/std@0.216.0` to `jsr:@std/dotenv@0.225.5`
- **Reason**: Deno Standard Library moved to JSR for better package management; resolved ENOENT errors
- **Impact**: Enhanced environment variable loading in figma_mcp.ts tool
- **Verification**: All CLI commands tested and working correctly
- **Files Modified**:
  - `deno.json`: Maintained import map for other std modules
  - `.opencode/tool/figma_mcp.ts`: Updated to use JSR import for dotenv
  - `dev.ts`: Updated to use JSR import for dotenv
- **Testing**: Full deno check and lint passed, CLI commands verified
- **Status**: ✅ Issue resolved - OpenCode now runs smoothly
