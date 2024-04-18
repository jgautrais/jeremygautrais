"use client";

import {useState, useEffect} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "../../../../i18n-config";

type Props = {
  lang: Locale;
}

const LANGUAGE_SELECTOR_ID = 'language-selector';

type LocaleDescription = {
  flag: string,
  name: string
}

interface locales {
  fr: LocaleDescription,
  en: LocaleDescription
}
const locales: locales = {
  fr: {
    flag: '🇫🇷',
    name: 'Français'
  },
  en: {
    flag: '🇬🇧',
    name: 'English'
  }
}

export default function LocaleSwitcher({lang}: Props) {
  const pathName = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest('button');
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpen(false);
    }
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="group px-3 pt-1.5 pb-1 text-gray-600 border bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center justify-center"
        onClick={toggleDropdown}
        id={LANGUAGE_SELECTOR_ID}
      >
        {locales[lang].flag} <svg className="w-2.5 h-2.5 ml-2 pb-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path className="text-gray-400 group-hover:text-gray-600" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
      </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {i18n.locales.map((locale) => {
              return (
                <li key={locale}>
                  <Link href={redirectedPathName(locale)}
                     className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 justify-center border-b"
                     onClick={() => redirectedPathName(locale)}>
                    <span className="pt-0.5 me-2">{locales[locale].flag}</span>
                    <span>{locales[locale].name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  )
}