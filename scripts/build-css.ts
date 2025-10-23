#!/usr/bin/env deno run --allow-read --allow-write --allow-net --allow-env --allow-run

import { ensureDir } from '$std/fs/ensure_dir.ts';
import { resolve } from '$std/path/resolve.ts';

export async function buildCSS() {
  const cssDir = resolve('static/css');
  await ensureDir(cssDir);

  const inputPath = resolve('static/css/input.css');
  const outputPath = resolve('static/css/styles.css');

  try {
    console.log('🎨 Building CSS with Tailwind...');

    // Use Tailwind CLI via npm in Deno
    const command = new Deno.Command('deno', {
      args: ['run', '--allow-read', '--allow-write', '--allow-net', '--allow-env', '--allow-run', '--allow-sys', 'npm:tailwindcss', '-i', inputPath, '-o', outputPath, '--config', 'tailwind.config.ts'],
      cwd: Deno.cwd(),
    });

    const process = command.spawn();
    const { code } = await process.output();

    if (code === 0) {
      console.log('✅ CSS built successfully with Tailwind CLI');
    } else {
      throw new Error('Tailwind CLI failed');
    }
  } catch (error) {
    console.error('❌ CSS build failed:', error);
    // Fallback: copy input CSS directly
    try {
      await Deno.copyFile(inputPath, outputPath);
      console.log('✅ CSS copied as fallback');
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError);
    }
  }
}

if (import.meta.main) {
  await buildCSS();
}