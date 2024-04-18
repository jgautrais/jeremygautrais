import { ReactNode } from 'react';
import NavBar from "@/app/[lang]/components/nav-bar";
import {Locale} from "../../../../i18n-config";

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
    </>
  );
}

export default BaseTemplate;
