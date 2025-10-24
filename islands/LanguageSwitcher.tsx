import { currentLanguage, Language, languages } from '../utils/i18n.ts';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const handleLanguageChange = (lang: Language) => {
    currentLanguage.value = lang;
    // Save to localStorage for persistence
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  return (
    <div class={`flex space-x-1 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang}
          type='button'
          onClick={() => handleLanguageChange(lang)}
          class={`px-2 py-1 rounded text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 ${
            currentLanguage.value === lang
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={`Switch to ${lang === 'en' ? 'English' : 'Português'}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
