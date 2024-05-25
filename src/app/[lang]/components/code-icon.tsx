type Props = {
  className?: string;
}

export default function CodeIcon({className}: Props) {

  return (
    <svg
      className={className ?? 'h-6 w-6 text-zinc-600'}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <polyline points="7 8 3 12 7 16"/>
      <polyline points="17 8 21 12 17 16"/>
      <line x1="14" y1="4" x2="10" y2="20"/>
    </svg>
  )
}