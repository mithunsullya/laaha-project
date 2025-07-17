import Image from "next/image"
import Link from "next/link"

type Props = {
  data: {
    url: string
    image: string
    alt: string
    title: string
  }
  classes?: string
}

const SimpleCard = ({ data, classes }: Props) => {
  return (
    // Link wrapping the card item for navigation
    <Link
      href={data.url}
      data-analytics={data.title}
      className={`card-item flex justify-center ${classes}`}
    >
      <div className="cursor-pointer flex flex-wrap justify-center transition-transform transform hover:scale-105">
        
        {/* Render image if available */}
        {data.image && (
          <div className="w-full min-h-48 flex-[0_0_100%] max-w-48 overflow-hidden">
            <Image
              width={192}
              height={192}
              src={data.image}
              loading="lazy"
              alt={data.alt || data.title} // Default alt is title if not provided
              className="rounded-full"
            />
          </div>
        )}

        {/* Title of the card */}
        <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center w-full">
          {data.title}
        </h3>
      </div>
    </Link>
  )
}

export default SimpleCard
