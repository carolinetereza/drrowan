import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Lang = 'pt' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('language') as Lang) || 'pt';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('language', l);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: l } }));
  };

  // Sync when LanguageSwitcher dispatches the event
  useEffect(() => {
    const handler = (e: Event) => {
      const lang = (e as CustomEvent).detail?.language as Lang;
      if (lang) setLangState(lang);
    };
    window.addEventListener('languageChange', handler);
    return () => window.removeEventListener('languageChange', handler);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
