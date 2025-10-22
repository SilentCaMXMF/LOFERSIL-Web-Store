/* import { assertEquals, assertThrows } from '$std/testing/asserts.ts';
import {
  getFile,
  getComponents,
  getStyles,
  exportNode,
  getTeamProjects,
  getProjectFiles,
} from './figma_mcp.ts';

// Mock fetch for testing
const originalFetch = globalThis.fetch;
const mockFetch = (url: string, options?: RequestInit) => {
  if (url.includes('files/')) {
    return Promise.resolve(new Response(JSON.stringify({
      key: 'test-key',
      name: 'Test File',
      lastModified: '2023-01-01',
      thumbnailUrl: 'http://example.com/thumb',
      version: '1',
      document: {},
      components: {},
      styles: {},
      schemaVersion: 0,
    }), { status: 200 }));
  }
  if (url.includes('components')) {
    return Promise.resolve(new Response(JSON.stringify({
      meta: { components: [{ key: 'comp1', name: 'Component1', description: 'Test' }] },
    }), { status: 200 }));
  }
  if (url.includes('styles')) {
    return Promise.resolve(new Response(JSON.stringify({
      meta: { styles: [{ key: 'style1', name: 'Style1', description: 'Test', styleType: 'FILL' }] },
    }), { status: 200 }));
  }
  if (url.includes('images')) {
    return Promise.resolve(new Response(JSON.stringify({
      images: { '0:0': 'http://example.com/image.png' },
    }), { status: 200 }));
  }
  if (url.includes('teams/')) {
    return Promise.resolve(new Response(JSON.stringify({
      projects: [{ id: 'proj1', name: 'Project1', files: [] }],
    }), { status: 200 }));
  }
  if (url.includes('projects/')) {
    return Promise.resolve(new Response(JSON.stringify({
      files: [{ key: 'file1', name: 'File1' }],
    }), { status: 200 }));
  }
  return Promise.resolve(new Response('Not Found', { status: 404 }));
};

Deno.test('getFile - success', async () => {
  globalThis.fetch = mockFetch;
  const result = await getFile('test-key');
  assertEquals(result.name, 'Test File');
  globalThis.fetch = originalFetch;
});

Deno.test('getFile - validation error', () => {
  assertThrows(() => {
    getFile('');
  }, Error, 'fileKey is required');
});

Deno.test('getComponents - success', async () => {
  globalThis.fetch = mockFetch;
  const result = await getComponents('test-key');
  assertEquals(result.length, 1);
  assertEquals(result[0].name, 'Component1');
  globalThis.fetch = originalFetch;
});

Deno.test('getComponents - API error', async () => {
  globalThis.fetch = () => Promise.resolve(new Response('Error', { status: 400 }));
  await assertThrows(async () => {
    await getComponents('test-key');
  }, Error, 'Figma API error');
  globalThis.fetch = originalFetch;
});

Deno.test('getStyles - success', async () => {
  globalThis.fetch = mockFetch;
  const result = await getStyles('test-key');
  assertEquals(result.length, 1);
  assertEquals(result[0].name, 'Style1');
  globalThis.fetch = originalFetch;
});

Deno.test('exportNode - success', async () => {
  globalThis.fetch = mockFetch;
  const result = await exportNode('test-key', '0:0');
  assertEquals(result, 'http://example.com/image.png');
  globalThis.fetch = originalFetch;
});

Deno.test('exportNode - validation error', () => {
  assertThrows(() => {
    exportNode('', '0:0');
  }, Error, 'fileKey and nodeId are required');
});

Deno.test('getTeamProjects - success', async () => {
  globalThis.fetch = mockFetch;
  const result = await getTeamProjects('team1');
  assertEquals(result.projects.length, 1);
  globalThis.fetch = originalFetch;
});

Deno.test('getProjectFiles - success', async () => {
  globalThis.fetch = mockFetch;
  const result = await getProjectFiles('proj1');
  assertEquals(result.files.length, 1);
  globalThis.fetch = originalFetch;
}); */