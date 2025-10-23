import { assertEquals } from '$std/testing/asserts.ts';
import { render } from 'preact';
import DarkModeToggle, { isDarkMode } from './DarkModeToggle.tsx';

// Mock localStorage and matchMedia for testing
const mockLocalStorage = {
  getItem: (_key: string) => null,
  setItem: (_key: string, _value: string) => {},
  removeItem: (_key: string) => {},
  clear: () => {},
  key: (_index: number) => null,
  length: 0,
};
const mockMatchMedia = (_query: string) => ({
  matches: false,
  media: _query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true,
});

globalThis.localStorage = mockLocalStorage;
globalThis.matchMedia = mockMatchMedia;

// Set up a mock document
globalThis.document = {
  documentElement: {
    classList: {
      add: () => {},
      remove: () => {},
    },
  },
  createElement: (tag: string) => {
    const element = {
      tagName: tag.toUpperCase(),
      classList: {
        add: () => {},
        remove: () => {},
      },
      setAttribute: () => {},
      getAttribute: () => null,
      querySelector: () => null,
      click: () => {},
      parentNode: null,
    };
    return element as unknown as Element;
  },
  body: {
    appendChild: () => {},
  },
} as unknown as Document;

Deno.test('DarkModeToggle renders in light mode', () => {
  isDarkMode.value = false;
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(<DarkModeToggle />, container);
  const button = container.querySelector('button');
  assertEquals(button?.tagName, 'BUTTON');
  assertEquals(button?.getAttribute('aria-label'), 'Switch to dark mode');
  document.body.removeChild(container);
});

Deno.test('DarkModeToggle toggles to dark mode', () => {
  isDarkMode.value = false;
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(<DarkModeToggle />, container);
  const button = container.querySelector('button');
  if (button) {
    button.click();
    assertEquals(isDarkMode.value, true);
    assertEquals(button.getAttribute('aria-label'), 'Switch to light mode');
  }
  document.body.removeChild(container);
});

Deno.test('DarkModeToggle handles undefined document gracefully', () => {
  // Simulate SSR where document is undefined
  const originalDocument = globalThis.document;
  isDarkMode.value = false;
  const container = document.createElement('div');
  globalThis.document = undefined as unknown as Document;
  render(<DarkModeToggle />, container);
  const button = container.querySelector('button');
  assertEquals(button?.tagName, 'BUTTON');
  // Restore
  globalThis.document = originalDocument;
});