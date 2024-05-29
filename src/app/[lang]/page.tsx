import Image from "next/image";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "../../../i18n-config";
import PageTemplate from "@/app/[lang]/components/page-template";
import ExternalLink from "@/app/[lang]/components/external-link";
import Subtitle from "@/app/[lang]/components/subtitle";
import Skills from "@/app/[lang]/components/skills";
import CodeIcon from "@/app/[lang]/components/code-icon";
import Projects from "@/app/[lang]/components/projects";

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
            <Image src="/images/profile.jpg" alt={lang === 'fr' ? 'Photo de profil' : 'Profile picture'} width='200'
                   height="200"
                   className="block border border-gray-100 shadow-lg shadow-gray-400/50 mx-1 h-8 md:h-20 w-8 md:w-20 object-cover rounded-full me-2 md:me-4"
                   quality={100}/>
            <h1 className="font-hero text-4xl md:text-7xl font-bold text-start pt-1.5 md:pt-3">Jérémy Gautrais</h1>
          </div>
          <h2 className="text-teal-500 text-xl md:text-4xl text-start">{dictionary['hero'].job}</h2>
          <div className="mt-8 md:mt-10 flex">
            <ExternalLink icon="linkedin" text="LinkedIn" link="https://www.linkedin.com/in/jgautrais/"
                          className="me-4"/>
            <ExternalLink icon="github" text="Github" link="https://github.com/jgautrais"/>
          </div>
          <a
            href={`cv/CV_Jeremy_Gautrais${lang.toUpperCase()}.pdf`}
            target='_blank'
            rel='noreferrer'
            className="inline-block self-start text-sm md:text-base mt-4 md:mt-5 text-white hover:text-teal-50 bg-zinc-700 shadow-zinc-700/50 py-1.5 md:py-2 px-4 md:px-5 rounded-full hover:bg-teal-500 shadow-lg hover:shadow-md hover:shadow-teal-500/50 transition-all ease-in-out"
          >
            {dictionary['hero'].resumeDownload}
          </a>
        </div>
        <div className="mt-16">
          <p className="max-w-xl ps-4 md:ps-8 text-start text-md sm:text-lg">{dictionary['hero'].description}</p>
        </div>
        <div className="mt-24">
          <Subtitle title={dictionary['skills'].title}/>
          <Skills lang={lang}/>
        </div>
        <div className="mt-28">
          <Subtitle title={dictionary['projects'].title}/>
          <Projects lang={lang} />
        </div>
      </div>
    </PageTemplate>
);
}
