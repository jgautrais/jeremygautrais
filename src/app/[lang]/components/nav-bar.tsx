import LocaleSwitcher from "@/app/[lang]/components/locale-switcher";
import Link from "next/link";
import type { Locale } from "../../../../i18n-config";

type Props = {
  lang: Locale;
}

function NavBar({ lang }: Props) {
  return (
    <header className="sticky top-0 z-50 mx-auto w-full px-4 md:px-12 bg-white">
      <div className="max-w-6xl flex mx-auto justify-between items-center py-4">
        <Link href={`/${lang}`} className="font-hero block rounded-lg border-2 border-sky-600 hover:border-sky-500 text-sky-900 hover:text-sky-600 font-bold w-14 h-14 pt-2 ps-1 text-4xl shadow-sky-400/50 shadow-sm hover:shadow-none transition-all ease-in-out">J</Link>
        <div className="flex end">
          <LocaleSwitcher lang={lang} />
        </div>
      </div>
    </header>
  );
}

export default NavBar;