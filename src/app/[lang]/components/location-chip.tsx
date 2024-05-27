import LocationIcon from "@/app/[lang]/components/location-icon";

type Props = {
  location: string;
  className?: string;
}

export default function LinkedinIcon({location, className}: Props) {

  return (
    <div className={`inline-flex items-center ${className}`}>
      <LocationIcon className="w-4 h-4 fill-black"/>
      <p className="ps-1 md:ps-1.5 pt-1 font-semibold md:text-base">{location}</p>
    </div>
  )
}