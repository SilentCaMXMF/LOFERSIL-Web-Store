#!/usr/bin/env deno run --allow-read --allow-write --allow-net --allow-env

import { resolve } from '$std/path/resolve.ts';
import { buildCSS } from './build-css.ts';

async function watchCSS() {
  const inputPath = resolve('static/css/input.css');
  const configPath = resolve('tailwind.config.ts');
  
  console.log('👀 Watching CSS files for changes...');
  console.log(`📁 Watching: ${inputPath}`);
  console.log(`⚙️  Config: ${configPath}`);
  
  // Initial build
  await buildCSS();
  
  // Watch for changes using Deno.watchFs
  const watcher = Deno.watchFs([inputPath, configPath]);
  
  for await (const event of watcher) {
    if (event.kind === 'modify') {
      console.log(`📝 File changed: ${event.paths[0]}`);
      console.log('🔄 Rebuilding CSS...');
      await buildCSS();
    }
  }
}

if (import.meta.main) {
  watchCSS().catch(console.error);
}