import {getDictionary} from "@/get-dictionary";
import {Locale} from "../../../../i18n-config";
import Image from "next/image";
import CodeIcon from "@/app/[lang]/components/code-icon";

const PROJECT = ['lesmots', 'aest', 'toutcourt'] as const

type Project = typeof PROJECT[number]

interface ProjectDescription {
  name: string
  image: string
  preview?: string
  code: string
}

const PROJECTS: Record<Project, ProjectDescription> = {
  lesmots: {
    name: 'Les Mots',
    image: '/images/project_lesmots.png',
    preview: 'https://lesmots.jeremygautrais.fr/',
    code: 'https://github.com/jgautrais/lesmots'
  },
  aest: {
    name: 'Aest',
    image: '/images/project_aest.png',
    preview: 'https://aest.jeremygautrais.fr/',
    code: 'https://github.com/jgautrais/aest'
  },
  toutcourt: {
    name: 'Tout court',
    image: '/images/project_toutcourt.png',
    preview: undefined,
    code: 'https://github.com/jgautrais/toutcourt'
  }
}

type ProjectCardProps = {
  lang: Locale,
  project: Project,
}

const ProjectCard = async ({ lang, project}: ProjectCardProps) => {
  const dictionary = await getDictionary(lang);
  const projectItem = PROJECTS[project]

  return (
    <div
      className="group/div border border-gray-100 rounded-lg relative shadow-lg shadow-gray-300/50 hover:shadow-sm transition-all ease-in-out">
      <a href={projectItem.preview ?? undefined} rel="noopener noreferrer" target={projectItem.preview ? '_blank' : ''}
         className="relative group/image">
        <Image src={projectItem.image} alt="Les Mots" width='600'
               height="600"
               className="block w-full max-h-60 object-cover object-top border-b opacity-70 group-hover/div:opacity-100 transition-all ease-in-out"/>
        {projectItem.preview && <p
          className="absolute bottom-0 right-0 w-full text-end pe-4 pb-4 pt-32 opacity-0 group-hover/image:opacity-100 bg-gradient-to-t from-gray-200 to-transparent transition-all ease-in-out uppercase text-gray-600 hover:text-teal-500 font-semibold duration-500">Voir
          le projet</p>}
      </a>
      <div className="pt-3 pb-4 md:pb-5 px-3 sm:px-5">
        <a href={projectItem.preview ?? undefined} rel="noopener noreferrer" target="_blank">
          <h3
            className="font-hero text-xl md:text-2xl font-bold text-teal-900">{projectItem.name}</h3>
        </a>
        <p className="mt-2 text-xs md:text-sm">{dictionary['projects'][project]}</p>
        <a href={projectItem.code} rel="noopener noreferrer" target="_blank"
           className="mt-3 flex w-min ms-auto items-center bg-gray-100 py-0.5 px-2 border rounded-full hover:bg-gray-200 hover:border-gray-300">
          <CodeIcon className="w-4 h-4"/>
          <p className="ms-1 text-xs">{dictionary['projects'].browseCode}</p>
        </a>
      </div>
    </div>
  )
}

type ProjectsProps = {
  lang: Locale
}

export default async function Projects({lang}: ProjectsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
      {PROJECT.map((project, index) => <ProjectCard key={`project-${index}`} lang={lang} project={project} />)}
    </div>
  )
}