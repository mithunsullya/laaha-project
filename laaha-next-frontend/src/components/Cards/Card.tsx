import { FC } from "react"
import Link from "next/link"
import { laila } from "@/src/lib/utils"
import Image from "next/image"
import "./../../styles/icons.scss"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "use-intl"

type Props = {
  className?: string
  variant?: "main" | "side"
  item: {
    name?: string
    node: {
      title: string
      read_time: number
      image_uri: string
      type: string
      url: string
      video_time?: number
      show_link?: boolean
    }
  }
}

const Card: FC<Props> = ({ className, item, variant = "main" }) => {
  const { translations } = useTranslations()
  const locale = useLocale()

  return (
    <div className={`item w-full ${laila.className} ${className}`}>
      {/* Link to the article or content */}
      <Link
        href={`${item.node.url}`}
        className={`${variant == "main" ? "" : "flex"}`}
        data-analytics={item.name}
      >
        <div
          className={`image_wrapper relative ${variant === "main" ? "" : "max-w-[calc(47%-0.5rem)] flex-[0_0_47%] me-4 min-h-32"} `}
        >
          {/* Icon representing content type */}
          <span className={`icon-${item.node.type}`}></span>
          {/* Image of the article/content */}
          <Image
            width={560}
            height={315}
            loading="lazy"
            src={item.node.image_uri}
            alt={item.name ?? "image"}
            className={`card-img w-full ${variant === "main" ? "mb-6" : "min-h-28 object-cover"}`}
          />
        </div>
        <div className="content w-full">
          {/* Category name (optional) */}
          {item.name && (
            <div className="item-category text-primary mb-4 rounded-[0.2rem] bg-light-pink px-3 py-2 inline-block">
              {item.name}
            </div>
          )}
          {/* Title of the content */}
          <div className="item-title font-semibold text-l md:text-l mb-2 hover:text-primary">
            {item.node.title}
          </div>
          {/* Read time of the content */}
          { item.node?.video_time ? (
            <div className="item-duration font-opensans text-sm text-light-gray">
              {item.node.video_time + `${translations?.[locale]?.mins}`}
            </div>
            ) : item.node?.read_time && 
            <div className="item-duration font-opensans text-sm text-light-gray">
              {item.node.read_time + `${translations?.[locale]?.mins}`}
            </div>
          }
          {/* Show 'Read more' link if specified */}
          {item.node.show_link && (
            <Link href={item.node.url} data-analytics={"Read More"} className="btn-primary inline-block">
              {translations?.[locale]?.read_more}
            </Link>
          )}
        </div>
      </Link>
    </div>
  )
}

export default Card
