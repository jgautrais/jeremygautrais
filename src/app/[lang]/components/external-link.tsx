import LinkedinIcon from "@/app/[lang]/components/linkedin-icon";
import GithubIcon from "@/app/[lang]/components/github-icon";

type Props = {
  icon: string;
  text: string;
  link: string;
  className?: string;
}

const ICONS: Record<string, any> = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
}

export default function ExternalLink({icon, text, link, className}: Props) {

  const Icon = ICONS[icon]

  return (
    <a href={link} rel="noopener noreferrer" target="_blank" className={`group flex items-center bg-zinc-700 shadow-zinc-700/50 py-1.5 md:py-2 px-4 md:px-5 rounded-full hover:bg-teal-500 shadow-lg hover:shadow-md hover:shadow-teal-500/50 transition-all ease-in-out ${className}`}>
      <Icon className="w-4 md:w-6 h-4 md:h-6 fill-white group-hover:fill-teal-50 transition-all ease-in-out"/>
      <p className="ms-1 text-sm md:text-base text-white group-hover:text-teal-50 transition-all ease-in-out">{text}</p>
    </a>
  )
}