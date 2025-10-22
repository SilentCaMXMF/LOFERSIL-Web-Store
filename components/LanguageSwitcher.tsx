import { currentLanguage, languages, Language } from '../utils/i18n.ts';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const handleLanguageChange = (lang: Language) => {
    currentLanguage.value = lang;
    // Optionally save to localStorage
    localStorage.setItem('language', lang);
  };

  return (
    <div class={`flex space-x-2 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => handleLanguageChange(lang)}
          class={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            currentLanguage.value === lang
              ? 'bg-yellow-400 text-black'
              : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
          }`}
          aria-label={`Switch to ${lang === 'en' ? 'English' : 'Português'}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}