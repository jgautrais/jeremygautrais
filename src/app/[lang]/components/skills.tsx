import Image from "next/image";
import {Locale} from "../../../../i18n-config";
import {getDictionary} from "@/get-dictionary";
import JSIcon from "@/app/[lang]/components/js-icon";
import PHPIcon from "@/app/[lang]/components/php-icon";
import DBIcon from "@/app/[lang]/components/db-icon";

const LANGUAGE = ['js', 'ts', 'php'] as const
const BACK_FRAMEWORKS = ['nodejs', 'laravel', 'symfony'] as const
const FRONT_FRAMEWORKS = ['react', 'vue'] as const
const OTHERS = ['db', 'devops', 'aws'] as const

type Language = typeof LANGUAGE[number]
type BackFramework = typeof BACK_FRAMEWORKS[number]
type FrontFramework = typeof FRONT_FRAMEWORKS[number]
type Framework = BackFramework | FrontFramework
type Other = typeof OTHERS[number]
type Skill = Framework | Other

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
  experience?: number;
  ecosystem: Array<Lib>;
  language?: 'js' | 'php';
}

type LanguageDescription =  Pick<SkillDescription, "icons">

const LANGUAGES_ICONS: Record<string, any> = {
  js: JSIcon,
  php: PHPIcon,
  db: DBIcon
}

const LANGUAGES: Record<Language, LanguageDescription> = {
  php: {
    icons: [{
      src: "/images/php.svg",
      alt: "PHP Logo"
    }],
  },
  js: {
    icons: [{
      src: "/images/js.svg",
      alt: "JavaScript Logo"
    }],
  },
  ts: {
    icons: [{
      src: "/images/ts.svg",
      alt: "TypeScript Logo"
    }],
  },
}

const SKILLS: Record<Skill, SkillDescription> = {
  nodejs: {
    icons: [{
      src: "/images/node-js.svg",
      alt: "Node.js Logo"
    }],
    experience: 3,
    ecosystem: [
      {
        lib: 'Express',
        href: 'https://expressjs.com/'
      },
      {
        lib: 'Zod',
        href: 'https://zod.dev/'
      },
      {
        lib: 'Sequelize',
        href: 'https://sequelize.org/'
      },
      {
        lib: 'Strapi',
        href: 'https://strapi.io/'
      }
    ],
    language: "js"
  },
  react: {
    icons: [{
      src: "/images/react.svg",
      alt: "React Logo"
    }],
    experience: 3,
    ecosystem: [
      {
        lib: 'Next.js',
        href: 'https://nextjs.org/'
      },
      {
        lib: 'Plotly',
        href: 'https://plotly.com/graphing-libraries/'
      },
      {
        lib: 'Tailwind CSS',
        href: 'https://tailwindcss.com/'
      },
      {
        lib: 'Material UI',
        href: 'https://mui.com/material-ui/'
      },
      {
        lib: 'TanStack Query',
        href: 'https://tanstack.com/query/latest'
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
  },
  symfony: {
    icons: [{
      src: "/images/symfony.svg",
      alt: "Docker Logo"
    }],
    experience: 1,
    ecosystem: [
      {
        lib: 'API Platform',
        href: 'https://api-platform.com/'
      },
      {
        lib: 'Twig',
        href: 'https://twig.symfony.com/'
      }
    ],
    language: 'php'
  },
  vue: {
    icons: [{
      src: "/images/vue.svg",
      alt: "Docker Logo"
    }],
    experience: 2,
    ecosystem: [
      {
        lib: 'Nuxt',
        href: 'https://nuxt.com/'
      },
    ],
    language: 'js'
  },
  aws: {
    icons: [{
      src: "/images/aws.svg",
      alt: "AWS Logo"
    }],
    ecosystem: [
      {
        lib: 'Lambda',
        href: 'https://aws.amazon.com/lambda/'
      },
      {
        lib: 'DynamoDB',
        href: 'https://aws.amazon.com/dynamodb/'
      },
      {
        lib: 'S3',
        href: 'https://aws.amazon.com/s3/'
      },
      {
        lib: 'CloudWatch',
        href: 'https://aws.amazon.com/cloudwatch/'
      }
    ],
  },
}

const SkillItem = async ({lang, skill, className}: Props) => {
  const dictionary = await getDictionary(lang);

  const icons = SKILLS[skill].icons
  const skillItem = SKILLS[skill]
  const LanguageIcon = skillItem.language ? LANGUAGES_ICONS[skillItem.language] : undefined

  return (
    <div
      className={`group text-center border border-gray-100 rounded-lg bg-white relative shadow-lg shadow-gray-300/50 hover:shadow-md transition-all ease-in-out ${className} overflow-hidden`}>
      {skillItem.language && <LanguageIcon className="fill-gray-300 absolute w-6 h-6 right-3 top-3 sm:right-4"/>}
      <div className="pt-3 bg-gray-50 px-3 sm:px-5 py-1 flex justify-center items-center">
        {icons.map((icon, index) => <Image key={`skill-icon-${skill}-${index}`} src={icon.src} alt={icon.alt} width='0'
                                           height="0" className="block mx-1 h-10 w-auto contrast-75 group-hover:contrast-100 transition-all ease-in-out"/>)}
      </div>
      <p className={`px-3 bg-gray-50 sm:px-5 pt-1 text-xl ${skillItem.experience ? 'font-black' : 'font-bold'}`}>{dictionary['skills'][skill]}</p>
      <div className={`bg-gray-50 px-3 sm:px-5 flex items-baseline justify-center pt-1 pb-3 border-b`}>
        {skillItem.experience && (
          <>
            <p className="text-xs text-gray-600">{`${dictionary['skills'].experience}:`}</p>
            <p className="text-sm font-bold ms-1">{`${skillItem.experience} ${dictionary['commons'][skillItem.experience <= 1 ? 'year' : 'years']}`}</p>
          </>
        )}
      </div>
      <div className={`px-3 sm:px-5 pt-4 pb-3 text-start text-xs flex flex-wrap bg-white`} >
        {skillItem.ecosystem.map((item, index) => (
          <a
            key={`lib-${skill}-${index}`}
            href={item.href}
            rel='noopener noreferrer'
            target='_blank'
            className='block me-2 mb-1.5 py-0.5 px-2 text-gray-500 rounded-full border bg-gray-50 border-gray-100 hover:border hover:border-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all ease-in-out'
          >
            {item.lib}
          </a>
        ))}
      </div>
    </div>
  )
}

type LanguageItemProps = {
  lang: Locale
  language: Language;
  className?: string;
}

const LanguageItem = async ({lang, language, className}: LanguageItemProps) => {
  const dictionary = await getDictionary(lang);

  const icons = LANGUAGES[language].icons

  return (
    <div
      className={`bg-white text-center border border-gray-100 rounded-lg relative shadow-lg shadow-gray-300/50 hover:shadow-md transition-all ease-in-out ${className}`}>
      <div className="px-3 mt-2 sm:mt-3 sm:px-5 py-1 sm:py-2 flex justify-center items-center">
        {icons.map((icon, index) => <Image key={`language-icon-${language}-${index}`} src={icon.src} alt={icon.alt} width='0'
                                           height="0" className="block h-10 w-auto" />)}
      </div>
      <p className="pb-2 sm:pb-3 pt-1 text-xl">{dictionary['skills'][language]}</p>
    </div>
  )
}

type SkillSectionTitleProps = {
  title: string;
  className?: string;
}

const SkillSectionTitle = ({title, className}: SkillSectionTitleProps) => {

  return (
    <div className="flex items-baseline mt-4">
      <p className="font-hero text-2xl md=text-3xl ps-2 me-1 text-teal-500">_</p>
      <h2 className={`font-hero font-light text-2xl md=text-3xl uppercase ${className}`}>{title}</h2>
    </div>
  )
}

type SkillsProps = Pick<Props, "lang">

export default async function Skills({lang}: SkillsProps) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <SkillSectionTitle title={dictionary['skills'].languages}/>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-12">
        {LANGUAGE.map((language, index) => <LanguageItem key={`language-${index}`} language={language} lang={lang}/>)}
      </div>
      <SkillSectionTitle title="Frameworks"/>
      <h4 className="font-light text-lg ms-7 mt-3 mb-2 text-zinc-500 leading-3 inline-flex">Back</h4>
      <div className="mt-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-2">
        {BACK_FRAMEWORKS.map((framework, index) => <SkillItem key={`framework-${index}`} skill={framework}
                                                              lang={lang}/>)}
      </div>
      <h4 className="font-light text-lg ms-7 mt-3 mb-2 text-zinc-500 leading-3 inline-flex">Front</h4>
      <div className="mt-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-12">
        {FRONT_FRAMEWORKS.map((framework, index) => <SkillItem key={`framework-${index}`} skill={framework}
                                                               lang={lang}/>)}
      </div>
      <SkillSectionTitle title={dictionary['skills'].others}/>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {OTHERS.map((other, index) => <SkillItem key={`other-${index}`} skill={other} lang={lang}/>)}
      </div>
    </div>
  )
}