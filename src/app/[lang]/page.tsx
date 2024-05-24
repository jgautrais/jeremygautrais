import Image from "next/image";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "../../../i18n-config";
import PageTemplate from "@/app/[lang]/components/page-template";
import ExternalLink from "@/app/[lang]/components/external-link";
import Subtitle from "@/app/[lang]/components/subtitle";
import Skills from "@/app/[lang]/components/skills";

export default async function Home({
   params: { lang },
  }: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <PageTemplate lang={lang}>
      <div className="flex flex-col text-start">
        <div className="ps-4 md:ps-8">
          <div className="flex items-center mb-3 md:mb-6">
            <Image src="/images/profile.jpg" alt={lang === 'fr' ? 'Photo de profil' : 'Profile picture'} width='200' height="200" className="block border border-gray-100 shadow-lg shadow-gray-400/50 mx-1 h-8 md:h-20 w-8 md:w-20 object-cover rounded-full me-2 md:me-4" quality={100} />
            <h1 className="font-hero text-4xl md:text-7xl font-bold text-start pt-1.5 md:pt-3">Jérémy Gautrais</h1>
          </div>
          <h2 className="text-teal-500 text-xl md:text-4xl text-start">{dictionary['hero'].job}</h2>
          <div className="mt-6 flex">
            <ExternalLink icon="linkedin" text="LinkedIn" link="https://www.linkedin.com/in/jgautrais/" className="me-4" />
            <ExternalLink icon="github" text="Github" link="https://github.com/jgautrais" />
          </div>
        </div>
        <div className="mt-16">
          <p className="max-w-xl ps-4 md:ps-8 text-start text-lg">{dictionary['hero'].description}</p>
        </div>
        <div className="mt-20">
          <Subtitle title={dictionary['skills'].title} />
          <Skills lang={lang} />
        </div>
      </div>
    </PageTemplate>
  );
}
