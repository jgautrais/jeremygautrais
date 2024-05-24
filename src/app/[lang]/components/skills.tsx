import Image from "next/image";
import {Locale} from "../../../../i18n-config";
import {getDictionary} from "@/get-dictionary";
import JSIcon from "@/app/[lang]/components/js-icon";
import PHPIcon from "@/app/[lang]/components/php-icon";
import DBIcon from "@/app/[lang]/components/db-icon";

type Skill = 'nodejs' | 'react' | 'laravel' | 'db' | 'devops'

type Props = {
  lang: Locale
  skill: Skill;
  className?: string;
}

interface Lib {
  lib: string,
  href: string
}

interface SkillDescription {
  icons: Array<{
    src: string;
    alt: string;
  }>,
  experience: number;
  ecosystem: Array<Lib>;
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
    ecosystem: [
      {
        lib: 'Express.js',
        href: 'https://expressjs.com/'
      },
      {
        lib: 'Sequelize',
        href: 'https://sequelize.org/'
      }
    ],
    language: "js"
  },
  react: {
    icons: [{
      src: "/images/react.svg",
      alt: "React Logo"
    }],
    experience: 2,
    ecosystem: [
      {
        lib: 'TanStack Query',
        href: 'https://tanstack.com/query/latest'
      },
      {
        lib: 'Material UI',
        href: 'https://mui.com/material-ui/'
      },
      {
        lib: 'Plotly',
        href: 'https://plotly.com/graphing-libraries/'
      }
    ],
    language: "js"
  },
  laravel: {
    icons: [{
      src: "/images/laravel.svg",
      alt: "Laravel Logo"
    }],
    experience: 2,
    ecosystem: [
      {
        lib: 'Laravel Nova',
        href: 'https://nova.laravel.com/'
      }
    ],
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
    ecosystem: [
      {
        lib: 'MySQL',
        href: 'https://www.mysql.com/'
      },
      {
        lib: 'PostgreSQL',
        href: 'https://www.postgresql.org/'
      }
    ],
    language: undefined
  },
  devops: {
    icons: [{
      src: "/images/docker.svg",
      alt: "Docker Logo"
    },
      {
        src: "/images/gitlab.svg",
        alt: "Gitlab Logo"
      }],
    experience: 2,
    ecosystem: [
      {
        lib: 'Docker',
        href: 'https://www.docker.com/'
      },
      {
        lib: 'Gitlab CI/CD',
        href: 'https://about.gitlab.com/'
      }
    ],
    language: undefined
  },
}

const SkillItem = async ({lang, skill, className}: Props) => {
  const dictionary = await getDictionary(lang);

  const icons = SKILLS[skill].icons
  const skillItem = SKILLS[skill]
  const LanguageIcon = skillItem.language ? LANGUAGES[skillItem.language] : undefined

  return (
    <div
      className={`text-center border border-gray-100 rounded-lg px-3 sm:px-5 py-2 sm:py-3 bg-gray-50 relative shadow-lg shadow-gray-300/50 hover:shadow-md transition-all ease-in-out ${className}`}>
      {skillItem.language && <LanguageIcon className="fill-gray-400 absolute w-6 h-6 right-3 sm:right-5"/>}
      <div className="flex justify-center items-center">
        {icons.map((icon, index) => <Image key={`skill-icon-${skill}-${index}`} src={icon.src} alt={icon.alt} width='0'
                                           height="0" className="block mx-1 h-10 w-auto"/>)}
      </div>
      <p className="mt-1 font-bold text-lg">{dictionary['skills'][skill]}</p>
      <div className="text-start text-sm flex border-t mt-2 pt-2">
        <p className="font-bold">{`${dictionary['skills'].experience}:`}</p>
        <p
          className="ms-1">{`${skillItem.experience} ${dictionary['commons'][skillItem.experience <= 1 ? 'year' : 'years']}`}</p>
      </div>
      <div className="text-start text-xs flex flex-wrap mt-1 pt-2">
        {skillItem.ecosystem.map((item, index) => (
          <a
            key={`lib-${skill}-${index}`}
            href={item.href}
            rel='noopener noreferrer'
            target='_blank'
            className='block me-2 mb-1 py-0.5 px-2 rounded-full bg-gray-200 border border-transparent hover:bg-gray-300 hover:border hover:border-gray-400 transition-all ease-in-out'
          >
            {item.lib}
          </a>
        ))}
      </div>
    </div>
  )
}

type SkillsProps = Pick<Props, "lang">

export default function Skills({lang}: SkillsProps) {
  const skills = Object.keys(SKILLS) as Array<Skill>
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
      {skills.map((skill, index) => <SkillItem key={`skill-${index}`} skill={skill} lang={lang}/>)}
    </div>
  )
}