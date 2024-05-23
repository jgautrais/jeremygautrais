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
    <a href={link} rel="noopener noreferrer" target="_blank" className={`group flex ${className}`}>
      <Icon className="w-6 h-6 fill-black group-hover:fill-sky-500"/>
      <p className="ms-1 group-hover:text-sky-900 group-hover:underline">{text}</p>
    </a>
  )
}