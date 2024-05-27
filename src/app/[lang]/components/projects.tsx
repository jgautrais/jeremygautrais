import {getDictionary} from "@/get-dictionary";
import {Locale} from "../../../../i18n-config";
import Image from "next/image";
import CodeIcon from "@/app/[lang]/components/code-icon";
import ProjectIcon from "@/app/[lang]/components/project-icon";

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
         className="block relative group/image overflow-hidden">
        <Image src={projectItem.image} alt="Les Mots" width='600'
               height="600"
               className="block w-full max-h-60 object-cover object-top opacity-70 group-hover/div:opacity-100 group-hover/div:scale-110 duration-500 transition-all ease-in-out"/>
      </a>
      <div className="pt-3 pb-4 md:pb-5 px-3 sm:px-5 border-t">
        <a href={projectItem.preview ?? undefined} rel="noopener noreferrer" target="_blank">
          <h3
            className="font-hero text-xl md:text-2xl font-bold text-teal-900">{projectItem.name}</h3>
        </a>
        <p className="mt-2 text-xs md:text-sm">{dictionary['projects'][project]}</p>
        <div className="flex justify-between items-center mt-5">
          {projectItem.preview && (
            <a
              href={projectItem.preview}
              rel="noopener noreferrer"
              target="_blank"
              className="flex w-min me-auto items-center bg-teal-50 py-0.5 px-2 border border-teal-200 text-teal-900 rounded-full group-hover/div:bg-teal-900 group-hover/div:border-teal-800 group-hover/div:text-white transition-all ease-in-out"
            >
              <ProjectIcon className="w-4 h-4 group-hover/div:text-white"/>
              <p className="ms-1 text-xs">{dictionary['projects'].browseProject}</p>
            </a>
          )}

          <a
            href={projectItem.code}
            rel="noopener noreferrer"
            target="_blank"
            className="flex w-min ms-auto items-center bg-gray-100 py-0.5 px-2 border rounded-full hover:bg-gray-200 hover:border-gray-300"
          >
            <CodeIcon className="w-4 h-4 group/div-hover:text-white"/>
            <p className="ms-1 text-xs">{dictionary['projects'].browseCode}</p>
          </a>
        </div>
      </div>
    </div>
  )
}

type ProjectsProps = {
  lang: Locale
}

export default async function Projects({lang}: ProjectsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 lg:gap-12 my-4">
      {PROJECT.map((project, index) => <ProjectCard key={`project-${index}`} lang={lang} project={project}/>)}
    </div>
  )
}