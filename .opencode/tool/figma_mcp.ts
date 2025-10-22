/* #!/usr/bin/env -S deno run --allow-env --allow-net

import { load } from "https://deno.land/std@0.216.0/dotenv/mod.ts";
await load({ export: true });

// TypeScript interfaces for Figma API responses
interface FigmaFile {
  key: string;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: Record<string, unknown>; // Simplified; can be expanded
  components: Record<string, FigmaComponent>;
  styles: Record<string, FigmaStyle>;
  schemaVersion: number;
}

interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks?: Record<string, unknown>[];
}

interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  styleType: string;
}

interface FigmaImageResponse {
  images: Record<string, string>;
  err?: string;
}

interface FigmaProject {
  id: string;
  name: string;
  files: FigmaFile[];
}

interface FigmaTeamProjects {
  projects: FigmaProject[];
}

// Custom error classes for better diagnostics
class FigmaApiError extends Error {
  constructor(message: string, public status?: number, public statusText?: string) {
    super(message);
    this.name = 'FigmaApiError';
  }
}

class FigmaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FigmaValidationError';
  }
}

class FigmaNetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FigmaNetworkError';
  }
}

// Typed cache
const cache: Map<string, { data: unknown; timestamp: number }> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const FIGMA_API_KEY = Deno.env.get('FIGMA_API_KEY');
const FIGMA_BASE_URL = 'https://api.figma.com/v1';

async function fetchFigma<T>(endpoint: string): Promise<T> {
  if (!FIGMA_API_KEY) {
    throw new FigmaValidationError('FIGMA_API_KEY not set. Please provide a valid Figma API key.');
  }

  const cacheKey = endpoint;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  const url = `${FIGMA_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_API_KEY,
      },
    });

    if (!response.ok) {
      const bodyText = await response.text().catch(() => '');
      throw new FigmaApiError(
        `Figma API error: ${response.status} ${response.statusText} ${bodyText}`,
        response.status,
        response.statusText,
      );
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    if (error instanceof FigmaApiError || error instanceof FigmaValidationError) {
      throw error;
    }
    throw new FigmaNetworkError(
      `Failed to fetch from Figma: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function getFile(fileKey: string): Promise<FigmaFile> {
  if (!fileKey) {
    throw new FigmaValidationError('fileKey is required for getFile');
  }
  return await fetchFigma<FigmaFile>(`/files/${fileKey}`);
}

export async function getComponents(fileKey: string): Promise<FigmaComponent[]> {
  if (!fileKey) {
    throw new FigmaValidationError('fileKey is required for getComponents');
  }
  const data = await fetchFigma<{ meta: { components: FigmaComponent[] } }>(`/files/${fileKey}/components`);
  if (!data?.meta?.components) {
    throw new FigmaApiError('Unexpected Figma response: components not found');
  }
  return data.meta.components;
}

export async function getStyles(fileKey: string): Promise<FigmaStyle[]> {
  if (!fileKey) {
    throw new FigmaValidationError('fileKey is required for getStyles');
  }
  const data = await fetchFigma<{ meta: { styles: FigmaStyle[] } }>(`/files/${fileKey}/styles`);
  if (!data?.meta?.styles) {
    throw new FigmaApiError('Unexpected Figma response: styles not found');
  }
  return data.meta.styles;
}

export async function exportNode(fileKey: string, nodeId: string, format: string = 'png'): Promise<string> {
  if (!fileKey || !nodeId) {
    throw new FigmaValidationError('fileKey and nodeId are required for exportNode');
  }
  const data = await fetchFigma<FigmaImageResponse>(`/images/${fileKey}?ids=${nodeId}&format=${format}`);
  if (!data?.images || !data.images[nodeId]) {
    throw new FigmaApiError('Image export unavailable for the given node');
  }
  return data.images[nodeId];
}

export async function getTeamProjects(teamId: string): Promise<FigmaTeamProjects> {
  if (!teamId) {
    throw new FigmaValidationError('teamId is required for getTeamProjects');
  }
  return await fetchFigma<FigmaTeamProjects>(`/teams/${teamId}/projects`);
}

export async function getProjectFiles(projectId: string): Promise<{ files: FigmaFile[] }> {
  if (!projectId) {
    throw new FigmaValidationError('projectId is required for getProjectFiles');
  }
  return await fetchFigma<{ files: FigmaFile[] }>(`/projects/${projectId}/files`);
}

// CLI interface for MCP compatibility
if (import.meta.main) {
  const command = Deno.args[0];
  const fileKey = Deno.args[1];

  if (!command) {
    console.error('Usage: deno run figma_mcp.ts <command> [args...]\nCommands: get-file, get-components, get-styles, export, get-team-projects, get-project-files');
    Deno.exit(1);
  }

  try {
    let result;
    switch (command) {
      case 'get-file':
        if (!fileKey) throw new FigmaValidationError('fileKey required for get-file');
        result = await getFile(fileKey);
        break;
      case 'get-components':
        if (!fileKey) throw new FigmaValidationError('fileKey required for get-components');
        result = await getComponents(fileKey);
        break;
      case 'get-styles':
        if (!fileKey) throw new FigmaValidationError('fileKey required for get-styles');
        result = await getStyles(fileKey);
        break;
      case 'export': {
        if (!fileKey) throw new FigmaValidationError('fileKey required for export');
        const nodeId = Deno.args[2] || '0:0'; // Default to root
        const format = Deno.args[3] || 'png'; // Default to png
        result = await exportNode(fileKey, nodeId, format);
        break;
      }
      case 'get-team-projects': {
        const teamId = Deno.args[2];
        if (!teamId) throw new FigmaValidationError('teamId required for get-team-projects');
        result = await getTeamProjects(teamId);
        break;
      }
      case 'get-project-files': {
        const projectId = Deno.args[2];
        if (!projectId) throw new FigmaValidationError('projectId required for get-project-files');
        result = await getProjectFiles(projectId);
        break;
      }
      default:
        throw new FigmaValidationError(`Unknown command: ${command}. Available: get-file, get-components, get-styles, export, get-team-projects, get-project-files`);
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    if (error instanceof FigmaValidationError) {
      console.error(`Validation Error: ${error.message}`);
    } else if (error instanceof FigmaApiError) {
      console.error(`API Error: ${error.message}`);
    } else if (error instanceof FigmaNetworkError) {
      console.error(`Network Error: ${error.message}`);
    } else {
      console.error(`Unexpected Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    Deno.exit(1);
  }
} */
