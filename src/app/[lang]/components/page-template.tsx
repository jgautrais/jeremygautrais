import NavBar from "@/app/[lang]/components/nav-bar";
import { ReactNode } from 'react';
import { Locale } from "../../../../i18n-config";

type Props = {
  lang: Locale
  children: ReactNode;
};

function BaseTemplate({ lang, children }: Props) {
  return (
    <>
      <NavBar lang={lang} />
      <main className="flex-1 px-4 md:px-12">
        <div className="text-gray-800 max-w-6xl flex flex-col mx-auto mt-20">{children}</div>
      </main>
      <footer className="w-full px-4 md:px-12">
        <div className="max-w-6xl mx-auto border-t mt-20 pb-20"></div>
      </footer>
    </>
  );
}

export default BaseTemplate;
