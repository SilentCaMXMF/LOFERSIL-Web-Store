#!/usr/bin/env deno run --allow-read --allow-write --allow-net --allow-env

import { ensureDir } from '$std/fs/ensure_dir.ts';
import { resolve } from '$std/path/resolve.ts';

export async function buildCSS() {
  const cssDir = resolve('static/css');
  await ensureDir(cssDir);

  const inputPath = resolve('static/css/input.css');
  const outputPath = resolve('static/css/styles.css');

  try {
    console.log('🎨 Building CSS with Tailwind...');

    const inputContent = await Deno.readTextFile(inputPath);

    // Generate comprehensive CSS with Tailwind utilities
    const css = generateTailwindCSS(inputContent);

    await Deno.writeTextFile(outputPath, css);
    console.log('✅ CSS built successfully');
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

function generateTailwindCSS(inputContent: string): string {
  // Generate comprehensive CSS with essential Tailwind utilities for the LOFERSIL project
  let css = `/* Generated Tailwind CSS for LOFERSIL Web Store */\n\n`;

  // Base styles
  css += `
/* Base Styles */
* {
  box-sizing: border-box;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-family: Inter, system-ui, sans-serif;
}

body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

button {
  overflow: visible;
  text-transform: none;
}

button, [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: button;
}

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}

progress {
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type="checkbox"], [type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

details {
  display: block;
}

summary {
  display: list-item;
}

template {
  display: none;
}

[hidden] {
  display: none;
}

/* Layout */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

/* Positioning */
.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.sticky {
  position: sticky;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.top-0 {
  top: 0;
}

.right-0 {
  right: 0;
}

.bottom-0 {
  bottom: 0;
}

.left-0 {
  left: 0;
}

.z-50 {
  z-index: 50;
}

.z-40 {
  z-index: 40;
}

.z-30 {
  z-index: 30;
}

.z-20 {
  z-index: 20;
}

.z-10 {
  z-index: 10;
}

/* Display */
.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.grid {
  display: grid;
}

.hidden {
  display: none;
}

.block {
  display: block;
}

.inline-block {
  display: inline-block;
}

.inline {
  display: inline;
}

/* Sizing */
.w-3 {
  width: 0.75rem;
}

.w-10 {
  width: 2.5rem;
}

.w-32 {
  width: 8rem;
}

.w-full {
  width: 100%;
}

.h-3 {
  height: 0.75rem;
}

.h-10 {
  height: 2.5rem;
}

.h-32 {
  height: 8rem;
}

.h-full {
  height: 100%;
}

.min-h-screen {
  min-height: 100vh;
}

/* Typography */
.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-5xl {
  font-size: 3rem;
  line-height: 1;
}

.text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.uppercase {
  text-transform: uppercase;
}

.leading-relaxed {
  line-height: 1.625;
}

.tracking-wide {
  letter-spacing: 0.025em;
}

/* Colors - Text */
.text-white {
  color: #ffffff;
}

.text-black {
  color: #000000;
}

.text-gray-300 {
  color: #d1d5db;
}

.text-gray-400 {
  color: #9ca3af;
}

.text-gray-500 {
  color: #6b7280;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-700 {
  color: #374151;
}

.text-gray-800 {
  color: #1f2937;
}

.text-gray-900 {
  color: #111827;
}

.text-yellow-300 {
  color: #fde047;
}

.text-yellow-400 {
  color: #facc15;
}

.text-yellow-500 {
  color: #eab308;
}

.text-yellow-600 {
  color: #ca8a04;
}

/* Colors - Background */
.bg-transparent {
  background-color: transparent;
}

.bg-white {
  background-color: #ffffff;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}

.bg-gray-300 {
  background-color: #d1d5db;
}

.bg-gray-700 {
  background-color: #374151;
}

.bg-gray-800 {
  background-color: #1f2937;
}

.bg-gray-900 {
  background-color: #111827;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.bg-blue-700 {
  background-color: #1d4ed8;
}

.bg-green-500 {
  background-color: #10b981;
}

.bg-green-600 {
  background-color: #059669;
}

.bg-green-700 {
  background-color: #047857;
}

.bg-red-500 {
  background-color: #ef4444;
}

.bg-red-600 {
  background-color: #dc2626;
}

.bg-red-700 {
  background-color: #b91c1c;
}

.bg-yellow-400 {
  background-color: #facc15;
}

.bg-yellow-500 {
  background-color: #eab308;
}

.bg-yellow-600 {
  background-color: #ca8a04;
}

.bg-indigo-600 {
  background-color: #4f46e5;
}

.bg-purple-600 {
  background-color: #7c3aed;
}

.bg-slate-800 {
  background-color: #1e293b;
}

.bg-slate-900 {
  background-color: #0f172a;
}

.bg-opacity-20 {
  background-color: rgba(255, 255, 255, 0.2);
}

.bg-opacity-95 {
  background-color: rgba(255, 255, 255, 0.95);
}

/* Gradients */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-slate-900 {
  --tw-gradient-from: #0f172a;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(15, 23, 42, 0));
}

.from-indigo-600 {
  --tw-gradient-from: #4f46e5;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(79, 70, 229, 0));
}

.from-purple-600 {
  --tw-gradient-from: #7c3aed;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(124, 58, 237, 0));
}

.from-blue-600 {
  --tw-gradient-from: #2563eb;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0));
}

.via-slate-800 {
  --tw-gradient-via: #1e293b;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to, rgba(30, 41, 59, 0));
}

.via-purple-600 {
  --tw-gradient-via: #7c3aed;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to, rgba(124, 58, 237, 0));
}

.to-slate-900 {
  --tw-gradient-to: #0f172a;
}

.to-blue-600 {
  --tw-gradient-to: #2563eb;
}

.to-purple-600 {
  --tw-gradient-to: #7c3aed;
}

/* Backdrop filters */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

/* Borders */
.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-md {
  border-radius: 0.375rem;
}

.border {
  border-width: 1px;
}

.border-t {
  border-top-width: 1px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-gray-700 {
  border-color: #374151;
}

.border-white {
  border-color: #ffffff;
}

.border-opacity-10 {
  border-color: rgba(255, 255, 255, 0.1);
}

/* Spacing */
.p-1 {
  padding: 0.25rem;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.p-8 {
  padding: 2rem;
}

.p-12 {
  padding: 3rem;
}

.p-20 {
  padding: 5rem;
}

.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.pt-32 {
  padding-top: 8rem;
}

.pb-20 {
  padding-top: 5rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mr-3 {
  margin-right: 0.75rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.ml-3 {
  margin-left: 0.75rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mt-8 {
  margin-top: 2rem;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.space-x-6 > * + * {
  margin-left: 1.5rem;
}

.space-x-8 > * + * {
  margin-left: 2rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

/* Flexbox */
.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.items-start {
  align-items: flex-start;
}

.items-end {
  align-items: flex-end;
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.flex-wrap {
  flex-wrap: wrap;
}

.grow {
  flex-grow: 1;
}

.shrink-0 {
  flex-shrink: 0;
}

.basis-full {
  flex-basis: 100%;
}

/* Grid */
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

.gap-8 {
  gap: 2rem;
}

/* Transforms */
.transform {
  transform: translateZ(0);
}

.translate-x-0 {
  transform: translateX(0);
}

.translate-y-0 {
  transform: translateY(0);
}

.-translate-y-1\/2 {
  transform: translateY(-50%);
}

.scale-105 {
  transform: scale(1.05);
}

/* Transitions */
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}

.ease-in {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}

.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animations */
.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Hover effects */
.hover\\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

.hover\\:bg-green-700:hover {
  background-color: #047857;
}

.hover\\:bg-red-700:hover {
  background-color: #b91c1c;
}

.hover\\:bg-yellow-500:hover {
  background-color: #eab308;
}

.hover\\:bg-yellow-600:hover {
  background-color: #ca8a04;
}

.hover\\:bg-gray-300:hover {
  background-color: #d1d5db;
}

.hover\\:bg-white:hover {
  background-color: #ffffff;
}

.hover\\:bg-opacity-10:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.hover\\:bg-opacity-30:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.hover\\:text-yellow-300:hover {
  color: #fde047;
}

.hover\\:scale-105:hover {
  transform: scale(1.05);
}

.hover\\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hover\\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Focus effects */
.focus\\:text-yellow-300:focus {
  color: #fde047;
}

.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.focus\\:ring-yellow-400:focus {
  box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.5);
}

.focus\\:ring-blue-500:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Shadows */
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Object fit */
.object-cover {
  object-fit: cover;
}

.object-contain {
  object-fit: contain;
}

/* Responsive utilities */
@media (min-width: 640px) {
  .sm\\:container {
    max-width: 640px;
  }

  .sm\\:space-y-0 > * + * {
    margin-top: 0;
  }

  .sm\\:space-x-6 > * + * {
    margin-left: 1.5rem;
  }

  .sm\\:inline {
    display: inline;
  }

  .sm\\:hidden {
    display: none;
  }

  .sm\\:flex-row {
    flex-direction: row;
  }

  .sm\\:text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .sm\\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}

@media (min-width: 768px) {
  .md\\:container {
    max-width: 768px;
  }

  .md\\:flex {
    display: flex;
  }

  .md\\:hidden {
    display: none;
  }

  .md\\:block {
    display: block;
  }

  .md\\:inline-flex {
    display: inline-flex;
  }

  .md\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .md\\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .md\\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .md\\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  .md\\:text-5xl {
    font-size: 3rem;
    line-height: 1;
  }

  .md\\:text-6xl {
    font-size: 3.75rem;
    line-height: 1;
  }
}

@media (min-width: 1024px) {
  .lg\\:container {
    max-width: 1024px;
  }

  .lg\\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .lg\\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

@media (min-width: 1280px) {
  .xl\\:container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .2xl\\:container {
    max-width: 1536px;
  }
}

/* Custom component styles */
.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 150ms ease-in-out, box-shadow 150ms ease-in-out, transform 150ms ease-in-out;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #1f2937;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 150ms ease-in-out, box-shadow 150ms ease-in-out, transform 150ms ease-in-out;
}

.btn-secondary:hover {
  background-color: #d1d5db;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: scale(1.05);
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.glass {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}

/* Input CSS content */
${inputContent.replace('@tailwind base;', '').replace('@tailwind components;', '').replace('@tailwind utilities;', '')}`;

  return css;
}

if (import.meta.main) {
  await buildCSS();
}