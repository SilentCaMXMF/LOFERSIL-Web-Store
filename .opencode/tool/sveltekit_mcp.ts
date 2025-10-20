#!/usr/bin/env -S deno run --allow-env --allow-net

/**
 * Web-based SvelteKit MCP Tool
 * Uses Svelte documentation website directly instead of MCP server
 */

const SVELTE_DOCS_BASE = 'https://svelte.dev/docs';

// Cache for responses to improve performance
const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

async function fetchWithTimeout(url: string, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'SvelteKit-MCP-Tool/1.0'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function getCachedData(key: string, fetcher: () => Promise<any>) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const data = await fetcher();
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    if (cached) {
      return cached.data; // Return stale cache if fresh fetch fails
    }
    throw error;
  }
}

/**
 * Extract main content from Svelte docs page
 */
async function extractDocsContent(path: string): Promise<string> {
  const url = `${SVELTE_DOCS_BASE}${path}`;
  const response = await fetchWithTimeout(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  
  // Extract the main content from the HTML
  const contentMatch = html.match(/<div class="text content"[^>]*>([\s\S]*?)<\/div>/);
  if (contentMatch) {
    // Remove HTML tags and get clean text
    const cleanContent = contentMatch[1]
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return cleanContent;
  }

  throw new Error(`Could not extract content from ${url}`);
}

/**
 * List available documentation sections (mock based on common Svelte docs)
 */
export async function listSections() {
  return await getCachedData('sections', async () => {
    return {
      result: [
        {
          title: "What are runes?",
          path: "/svelte/what-are-runes",
          use_cases: ["Understanding Svelte 5 reactivity", "Learning modern Svelte patterns"]
        },
        {
          title: "$state",
          path: "/svelte/$state", 
          use_cases: ["Component state management", "Reactive variables"]
        },
        {
          title: "$derived",
          path: "/svelte/$derived",
          use_cases: ["Computed values", "Derived state"]
        },
        {
          title: "$effect",
          path: "/svelte/$effect",
          use_cases: ["Side effects", "Lifecycle management"]
        },
        {
          title: "$props",
          path: "/svelte/$props",
          use_cases: ["Component properties", "Props declaration"]
        },
        {
          title: "Basic markup",
          path: "/svelte/basic-markup",
          use_cases: ["HTML templates", "Dynamic content"]
        },
        {
          title: "{#if ...}",
          path: "/svelte/if",
          use_cases: ["Conditional rendering", "Show/hide elements"]
        },
        {
          title: "{#each ...}",
          path: "/svelte/each", 
          use_cases: ["List rendering", "Iteration"]
        },
        {
          title: "Styling",
          path: "/svelte/scoped-styles",
          use_cases: ["CSS in components", "Scoped styles"]
        },
        {
          title: "Events",
          path: "/svelte/dom-events",
          use_cases: ["Event handling", "User interactions"]
        },
        {
          title: "Stores",
          path: "/svelte/stores",
          use_cases: ["Global state", "State management"]
        },
        {
          title: "SvelteKit routing",
          path: "/kit/routing",
          use_cases: ["URL routing", "Page navigation"]
        },
        {
          title: "Loading data",
          path: "/kit/load",
          use_cases: ["Data fetching", "Server-side data"]
        }
      ]
    };
  });
}

/**
 * Get documentation for specific sections
 */
export async function getDocumentation(paths: string[]) {
  const cacheKey = `docs_${paths.join(',')}`;
  return await getCachedData(cacheKey, async () => {
    const docs = [];
    
    for (const path of paths) {
      try {
        const content = await extractDocsContent(path);
        docs.push({
          path,
          content
        });
      } catch (error) {
        docs.push({
          path,
          error: error.message
        });
      }
    }
    
    return {
      result: docs
    };
  });
}

/**
 * Mock Svelte code analyzer (basic checks)
 */
export async function svelteAutofixer(code: string) {
  const issues = [];
  const suggestions = [];
  
  // Basic checks
  if (code.includes('export let') && !code.includes('$props')) {
    suggestions.push("Consider using $props() instead of 'export let' for Svelte 5 compatibility");
  }
  
  if (code.includes('$:') && !code.includes('$derived')) {
    suggestions.push("Consider using $derived() instead of reactive statements for Svelte 5");
  }
  
  if (code.includes('<script>') && !code.includes('lang="ts"')) {
    suggestions.push("Consider adding lang='ts' to enable TypeScript support");
  }
  
  // Check for common issues
  if (!code.includes('<style>') && !code.includes('global')) {
    suggestions.push("Consider adding scoped styles for better component encapsulation");
  }
  
  return {
    result: {
      issues,
      suggestions,
      score: issues.length === 0 ? 100 : Math.max(0, 100 - (issues.length * 10))
    }
  };
}

/**
 * Generate a mock playground link (in real implementation, this would use Svelte's playground API)
 */
export async function playgroundLink(files: Record<string, string>) {
  // Create a simple playground URL with the code
  const mainFile = files['App.svelte'] || files['main.svelte'] || Object.values(files)[0] || '';
  const encoded = btoa(encodeURIComponent(mainFile));
  
  return {
    result: {
      url: `https://svelte.dev/repl/hello-world?code=${encoded}`,
      message: "This is a mock playground link. In a real implementation, this would generate a proper Svelte playground URL."
    }
  };
}

// CLI interface
if (import.meta.main) {
  const command = Deno.args[0];

  try {
    let result;
    switch (command) {
      case 'list-sections':
        result = await listSections();
        break;
      case 'get-documentation':
        const paths = Deno.args.slice(1);
        result = await getDocumentation(paths);
        break;
      case 'svelte-autofixer':
        const code = Deno.args[1];
        if (!code) throw new Error('Code required for svelte-autofixer');
        result = await svelteAutofixer(code);
        break;
      case 'playground-link':
        const filesJson = Deno.args[1];
        if (!filesJson) throw new Error('Files JSON required for playground-link');
        const files = JSON.parse(filesJson);
        result = await playgroundLink(files);
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    Deno.exit(1);
  }
}