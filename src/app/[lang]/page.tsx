import { getDictionary } from "@/get-dictionary";
import { Locale } from "../../../i18n-config";
import PageTemplate from "@/app/[lang]/components/page-template";
import ExternalLink from "@/app/[lang]/components/external-link";
import Subtitle from "@/app/[lang]/components/subtitle";
import SkillItem from "@/app/[lang]/components/skill-item";
import skills from "../../../old/components/Skills";

const SKILLS = ['laravel', 'nodejs', 'react', 'db']

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
          <h1 className="font-hero text-4xl md:text-7xl font-bold text-start mb-3 md:mb-6">Jérémy Gautrais</h1>
          <h2 className="text-sky-500 text-xl md:text-4xl text-start">{dictionary['hero'].job}</h2>
          <div className="mt-6 flex">
            <ExternalLink icon="linkedin" text="LinkedIn" link="https://www.linkedin.com/in/jgautrais/" className="me-3" />
            <ExternalLink icon="github" text="Github" link="https://github.com/jgautrais" />
          </div>
        </div>
        <div className="mt-12">
          <p className="max-w-xl ps-4 md:ps-8 text-start text-lg">{dictionary['hero'].description}</p>
        </div>
        <div className="mt-20">
          <Subtitle title={dictionary['skills'].title} />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {SKILLS.map((skill, index) => <SkillItem key={`skill-${index}`} skill={skill} lang={lang} />)}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
