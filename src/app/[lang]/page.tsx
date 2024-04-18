import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../../i18n-config";
import PageTemplate from "@/app/[lang]/components/page-template";

export default async function Home({
   params: { lang },
  }: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <PageTemplate lang={lang}>
      <h1 className="font-hero text-teal-500 text-4xl md:text-6xl font-bold text-start mb-4 md:mb-6">Jérémy Gautrais</h1>
      <h2 className="text-xl md:text-3xl text-start">Développeur web Fullstack</h2>
    </PageTemplate>
  );
}
