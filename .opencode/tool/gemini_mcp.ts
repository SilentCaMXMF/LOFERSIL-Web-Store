/* #!/usr/bin/env -S deno run --allow-env --allow-net

import { load } from "https://deno.land/std@0.216.0/dotenv/mod.ts";
await load({ export: true });

// Gemini MCP Tool for generating design assets and content
// Uses Google Gemini API for text-based design suggestions and image descriptions

interface GeminiRequest {
  prompt: string;
  maxTokens?: number;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

// Custom error classes
class GeminiApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GeminiApiError';
  }
}

class GeminiValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiValidationError';
  }
}

class GeminiNetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiNetworkError';
  }
}

// Cache for API responses
const cache: Map<string, { data: string; timestamp: number }> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1';

async function generateContent(request: GeminiRequest): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new GeminiValidationError('GEMINI_API_KEY not set');
  }

  const cacheKey = JSON.stringify(request);
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const url = `${GEMINI_BASE_URL}/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const body = JSON.stringify({
    contents: [{
      parts: [{ text: request.prompt }]
    }],
    generationConfig: {
      maxOutputTokens: request.maxTokens || 1000,
    },
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (!response.ok) {
      throw new GeminiApiError(`API error: ${response.status} ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    const text = data.candidates[0]?.content.parts[0]?.text || '';

    cache.set(cacheKey, { data: text, timestamp: Date.now() });
    return text;
  } catch (error) {
    if (error instanceof GeminiApiError) throw error;
    const message = error instanceof Error ? error.message : String(error);
    throw new GeminiNetworkError(`Network error: ${message}`);
  }
}

// Example function for generating icon descriptions
export async function generateIconDescription(prompt: string): Promise<string> {
  const fullPrompt = `Generate a detailed description for an icon based on: ${prompt}. Include colors, style, and usage.`;
  return await generateContent({ prompt: fullPrompt, maxTokens: 200 });
}

// Example function for design suggestions
export async function suggestDesign(prompt: string): Promise<string> {
  const fullPrompt = `Suggest modern design improvements for: ${prompt}. Focus on Tailwind CSS classes and accessibility.`;
  return await generateContent({ prompt: fullPrompt, maxTokens: 500 });
}

// CLI interface for MCP compatibility
if (import.meta.main) {
  const command = Deno.args[0];
  const prompt = Deno.args[1];

  if (!command) {
    console.error('Usage: deno run gemini_mcp.ts <command> [prompt]\nCommands: generate-icon-description, suggest-design');
    Deno.exit(1);
  }

  try {
    let result;
    switch (command) {
      case 'generate-icon-description':
        if (!prompt) throw new GeminiValidationError('prompt required for generate-icon-description');
        result = await generateIconDescription(prompt);
        break;
      case 'suggest-design':
        if (!prompt) throw new GeminiValidationError('prompt required for suggest-design');
        result = await suggestDesign(prompt);
        break;
      default:
        throw new GeminiValidationError(`Unknown command: ${command}. Available: generate-icon-description, suggest-design`);
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    if (error instanceof GeminiValidationError) {
      console.error(`Validation Error: ${error.message}`);
    } else if (error instanceof GeminiApiError) {
      console.error(`API Error: ${error.message}`);
    } else if (error instanceof GeminiNetworkError) {
      console.error(`Network Error: ${error.message}`);
    } else {
      console.error(`Unexpected Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    Deno.exit(1);
  }
} */