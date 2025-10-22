#!/usr/bin/env deno run --allow-read --allow-write --allow-net --allow-env

import { ensureDir } from '$std/fs/ensure_dir.ts';
import { resolve } from '$std/path/resolve.ts';

export async function buildCSS() {
  const cssDir = resolve('static/css');
  await ensureDir(cssDir);
  
  const inputPath = resolve('static/css/input.css');
  const outputPath = resolve('static/css/styles.css');
  
  try {
    console.log('🎨 Building CSS...');
    
    // For now, copy the input CSS to output
    // In a full implementation, this would process TailwindCSS
    const inputContent = await Deno.readTextFile(inputPath);
    
    // Basic processing: remove comments and minify
    const processedContent = inputContent
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/;\s*}/g, '}') // Remove unnecessary semicolons
      .trim();
    
    await Deno.writeTextFile(outputPath, processedContent);
    console.log('✅ CSS built successfully');
  } catch (error) {
    console.error('❌ CSS build failed:', error);
  }
}

if (import.meta.main) {
  await buildCSS();
}