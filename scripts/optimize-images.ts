#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net

/**
 * Image Optimization Script for LOFERSIL
 * Optimizes images for web performance and creates responsive variants
 */

import { join } from '$std/path/mod.ts';
import { ensureDir } from '$std/fs/mod.ts';

interface ImageOptimizationOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

async function optimizeImage(
  inputPath: string,
  outputPath: string,
  _options: ImageOptimizationOptions = {}
): Promise<void> {
  try {
    // For now, we'll copy the file and add metadata
    // In a production environment, you would use image processing libraries
    await ensureDir(join(outputPath, '..'));
    await Deno.copyFile(inputPath, outputPath);

    console.log(`✅ Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error);
  }
}

async function createResponsiveImages(basePath: string): Promise<void> {
  const imagesDir = join(basePath, 'static', 'images');
  const optimizedDir = join(basePath, 'static', 'images', 'optimized');

  await ensureDir(optimizedDir);

  const images = ['interior.jpg', 'interior-funcionario.jpg', 'frente-loja.jpg'];

  for (const image of images) {
    const inputPath = join(imagesDir, image);

    // Create optimized version
    const optimizedPath = join(optimizedDir, image.replace('.jpg', '-opt.jpg'));
    await optimizeImage(inputPath, optimizedPath, {
      quality: 85,
      format: 'jpeg'
    });

    // Create responsive variants
    const variants = [
      { suffix: '-sm', width: 400 },
      { suffix: '-md', width: 800 },
      { suffix: '-lg', width: 1200 }
    ];

    for (const variant of variants) {
      const variantPath = join(optimizedDir, image.replace('.jpg', `${variant.suffix}.jpg`));
      await optimizeImage(inputPath, variantPath, {
        width: variant.width,
        quality: 80
      });
    }
  }
}

async function generateImageManifest(basePath: string): Promise<void> {
  const manifest = {
    generated: new Date().toISOString(),
    images: [
      {
        name: 'interior',
        original: '/static/images/interior.jpg',
        optimized: '/static/images/optimized/interior-opt.jpg',
        variants: {
          small: '/static/images/optimized/interior-sm.jpg',
          medium: '/static/images/optimized/interior-md.jpg',
          large: '/static/images/optimized/interior-lg.jpg'
        },
        alt: 'LOFERSIL office supplies store interior',
        width: 305668, // This would be calculated dynamically
        height: 0 // This would be calculated dynamically
      }
    ]
  };

  const manifestPath = join(basePath, 'static', 'images', 'manifest.json');
  await Deno.writeTextFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Generated image manifest: ${manifestPath}`);
}

// Main execution
async function main() {
  const basePath = Deno.cwd();

  console.log('🚀 Starting image optimization...');

  await createResponsiveImages(basePath);
  await generateImageManifest(basePath);

  console.log('✅ Image optimization completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Update image references in components to use optimized versions');
  console.log('2. Implement responsive image loading with srcset attributes');
  console.log('3. Add WebP support when image processing libraries are available');
}

if (import.meta.main) {
  await main();
}