import Image from "next/image";
import {Locale} from "../../../../i18n-config";
import {getDictionary} from "@/get-dictionary";
import JSIcon from "@/app/[lang]/components/js-icon";
import PHPIcon from "@/app/[lang]/components/php-icon";
import DBIcon from "@/app/[lang]/components/db-icon";

type Skill = 'nodejs' | 'react' | 'laravel' | 'db'

type Props = {
  lang: Locale
  skill: Skill;
  className?: string;
}

interface SkillDescription {
  icons: Array<{
    src: string;
    alt: string;
  }>,
  experience: number;
  language?: string;
}

const LANGUAGES: Record<string, any> = {
  js: JSIcon,
  php: PHPIcon,
  db: DBIcon
}

const SKILLS: Record<Skill, SkillDescription> = {
  nodejs: {
    icons: [{
      src: "/images/node-js.svg",
      alt: "Node.js Logo"
    }],
    experience: 2,
    language: "js"
  },
  react: {
    icons: [{
      src: "/images/react.svg",
      alt: "React Logo"
    }],
    experience: 2,
    language: "js"
  },
  laravel: {
    icons: [{
      src: "/images/laravel.svg",
      alt: "Laravel Logo"
    }],
    experience: 2,
    language: "php"
  },
  db: {
    icons: [{
      src: "/images/mysql.svg",
      alt: "MySQL Logo"
    },
      {
      src: "/images/postgresql.svg",
      alt: "PostgreSQL Logo"
    }],
    experience: 2,
    language: undefined
  },
}

export default async function SkillItem({lang, skill, className}: Props) {
  const dictionary = await getDictionary(lang);

  const icons = SKILLS[skill].icons
  const skillItem = SKILLS[skill]
  const LanguageIcon = skillItem.language ? LANGUAGES[skillItem.language] : undefined

  return (
    <div className={`text-center border border-gray-100 rounded-lg px-3 sm:px-5 py-2 sm:py-3 bg-gray-50 relative ${className}`}>
      {skillItem.language && <LanguageIcon className="fill-gray-400 absolute w-6 h-6 right-3 sm:right-5"/>}
      <div className="flex justify-center items-center">
        {icons.map((icon, index) => <Image key={`skill-icon-${skill}-${index}`} src={icon.src} alt={icon.alt} width='0' height="0" className="block mx-1 h-10 w-auto"/>)}
      </div>
      <p className="mt-1 font-bold text-lg">{dictionary['skills'][skill]}</p>
      <div className="text-sm flex border-t mt-2 pt-2">
        <p className="font-bold">{`${dictionary['skills'].experience}:`}</p>
        <p className="ms-1">{`${skillItem.experience} ${dictionary['commons'][skillItem.experience <= 1 ? 'year' : 'years']}`}</p>
      </div>
    </div>
  )
}