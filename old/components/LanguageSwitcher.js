import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Toggle from './Toggle';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = router;
  const [lang, setLang] = useState(locale);

  useEffect(() => {
    if (window.localStorage.locale !== lang) {
      const locale = window.localStorage.locale;
      setLang(locale);
      router.push(`${router.pathname}`, `${router.pathname}`, { locale });
    }
  }, [router, lang]);

  const switchLanguage = (e) => {
    const locale = e.target.value === 'en' ? 'fr' : 'en';
    router.push(`${router.pathname}`, `${router.pathname}`, { locale });
    if (window.localStorage.locale !== locale) {
      window.localStorage.locale = locale;
    }
  };

  return (
    <Toggle
      handleClick={switchLanguage}
      value={locale}
      aria={`Toggle ${locale === 'en' ? 'French' : 'English'} Language`}
    >
      {locale.toUpperCase()}
    </Toggle>
  );
}
