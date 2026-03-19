import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  onLanguageChange?: (lang: 'pt' | 'en') => void;
}

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<'pt' | 'en'>('pt');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLang = localStorage.getItem('language') as 'pt' | 'en' | null;
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: 'pt' | 'en') => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  };

  const flags = {
    pt: (
      <svg className="w-5 h-5 rounded-sm" viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" fill="#009C3B" />
        <path d="M12 2L22 8L12 14L2 8L12 2Z" fill="#FFDF00" />
        <circle cx="12" cy="8" r="4" fill="#002776" />
      </svg>
    ),
    en: (
      <svg className="w-5 h-5 rounded-sm" viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0L24 16M24 0L0 16" stroke="white" strokeWidth="3" />
        <path d="M12 0V16M0 8H24" stroke="white" strokeWidth="5" />
        <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3" />
        <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.5" />
      </svg>
    ),
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-luxury-charcoal/20 hover:border-luxury-gold/50 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-luxury-gold" />
        {flags[currentLang]}
        <span className="font-sans text-xs font-medium text-luxury-charcoal uppercase">
          {currentLang === 'pt' ? 'PT' : 'EN'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-luxury-warm/50 shadow-lg rounded-lg overflow-hidden z-50">
          <button
            onClick={() => handleLanguageChange('pt')}
            className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-luxury-warm/20 transition-colors ${
              currentLang === 'pt' ? 'bg-luxury-warm/30' : ''
            }`}
          >
            {flags.pt}
            <span className="font-sans text-sm text-luxury-charcoal">Português</span>
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-luxury-warm/20 transition-colors ${
              currentLang === 'en' ? 'bg-luxury-warm/30' : ''
            }`}
          >
            {flags.en}
            <span className="font-sans text-sm text-luxury-charcoal">English</span>
          </button>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
