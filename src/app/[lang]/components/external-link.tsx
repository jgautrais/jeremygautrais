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
    <a href={link} rel="noopener noreferrer" target="_blank" className={`group flex bg-zinc-700 shadow-zinc-700/50 py-1.5 px-4 rounded-full hover:bg-teal-500 shadow-lg hover:shadow-md hover:shadow-teal-500/50 transition-all ease-in-out ${className}`}>
      <Icon className="w-6 h-6 fill-white group-hover:fill-teal-50 transition-all ease-in-out"/>
      <p className="ms-1 text-white group-hover:text-teal-50 transition-all ease-in-out">{text}</p>
    </a>
  )
}