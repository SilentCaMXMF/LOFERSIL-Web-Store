# !/usr/bin/env -S deno run --allow-env --allow-net

/**

* Figma API Tool for OpenCode
* Direct integration with Figma REST API for design asset access
 */

const FIGMA_API_KEY = Deno.env.get('FIGMA_API_KEY');
const FIGMA_BASE_URL = '<https://api.figma.com/v1>';

// Cache for API responses to improve performance
const cache = new Map();
const CACHE_TTL = 5 *60* 1000; // 5 minutes

/**

* Fetch data from Figma API with caching and enhanced error handling
* @param endpoint API endpoint (e.g., 'files/KEY')
* @returns JSON response or error message
 */
async function fetchFigma(endpoint: string) {
  if (!FIGMA_API_KEY) {
    throw new Error('FIGMA_API_KEY not set. Please provide a valid Figma API key.');
  }

  const cacheKey = endpoint;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const url = `${FIGMA_BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch from Figma: ${error.message}`);
  }
}

/**

* Get file metadata
* @param fileKey Figma file key
 */
export async function getFile(fileKey: string) {
  return await fetchFigma(`files/${fileKey}`);
}

/**

* Get components from a file
* @param fileKey Figma file key
 */
export async function getComponents(fileKey: string) {
  const data = await fetchFigma(`files/${fileKey}/components`);
  return data.meta.components;
}

/**

* Get styles from a file
* @param fileKey Figma file key
 */
export async function getStyles(fileKey: string) {
  const data = await fetchFigma(`files/${fileKey}/styles`);
  return data.meta.styles;
}

/**

* Export a node as image (returns image URL)
* @param fileKey Figma file key
* @param nodeId Node ID to export
* @param format Export format (e.g., 'png', 'svg')
 */
export async function exportNode(fileKey: string, nodeId: string, format: string = 'png') {
  const data = await fetchFigma(`images/${fileKey}?ids=${nodeId}&format=${format}`);
  return data.images[nodeId];
}

/**

* List projects in a team
* @param teamId Figma team ID
 */
export async function getTeamProjects(teamId: string) {
  return await fetchFigma(`teams/${teamId}/projects`);
}

/**

* List files in a project
* @param projectId Figma project ID
 */
export async function getProjectFiles(projectId: string) {
  return await fetchFigma(`projects/${projectId}/files`);
}

// CLI interface for MCP compatibility
if (import.meta.main) {
  const command = Deno.args[0];
  const fileKey = Deno.args[1];

  try {
    let result;
    switch (command) {
      case 'get-file':
        result = await getFile(fileKey);
        break;
      case 'get-components':
        result = await getComponents(fileKey);
        break;
      case 'get-styles':
        result = await getStyles(fileKey);
        break;
      case 'export':
        const nodeId = Deno.args[2] || '0:0'; // Default to root
        result = await exportNode(fileKey, nodeId);
        break;
      case 'get-team-projects':
        const teamId = Deno.args[2];
        if (!teamId) throw new Error('teamId required for get-team-projects');
        result = await getTeamProjects(teamId);
        break;
      case 'get-project-files':
        const projectId = Deno.args[2];
        if (!projectId) throw new Error('projectId required for get-project-files');
        result = await getProjectFiles(projectId);
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error.message);
    Deno.exit(1);
  }
}
