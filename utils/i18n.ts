import { signal } from '@preact/signals';

// Supported languages
export const languages = ['en', 'pt'] as const;
export type Language = typeof languages[number];

// Default language
export const defaultLanguage: Language = 'en';

// Current language signal
export const currentLanguage = signal<Language>(defaultLanguage);

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {},
  pt: {},
};

// Load translations from JSON files
export async function loadTranslations(lang: Language) {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (response.ok) {
      translations[lang] = await response.json();
    } else {
      console.error(`Failed to load translations for ${lang}`);
    }
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
  }
}

// Translation function
export function t(key: string): string {
  const lang = currentLanguage.value;
  return translations[lang]?.[key] || key;
}

// Initialize translations
export async function initI18n() {
  for (const lang of languages) {
    await loadTranslations(lang);
  }
}

// Load translations synchronously from JSON (for server-side rendering)
export async function loadTranslationsSync(lang: Language) {
  try {
    const response = await fetch(new URL(`../locales/${lang}.json`, import.meta.url));
    if (response.ok) {
      translations[lang] = await response.json();
    } else {
      console.error(`Failed to load translations for ${lang}`);
    }
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
  }
}
