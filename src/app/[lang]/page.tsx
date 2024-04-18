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
      <div className="flex">
        <div className="bg-teal-400 w-1.5 md:w-2 me-4 md:mx-8 rounded">
        </div>
        <div>
          <h1 className="font-hero text-4xl md:text-7xl font-bold text-start mb-3 md:mb-6">Jérémy
            Gautrais</h1>
          <h2 className="text-teal-600 text-xl md:text-4xl text-start">{dictionary['hero'].job}</h2>
        </div>
      </div>
    </PageTemplate>
  );
}
