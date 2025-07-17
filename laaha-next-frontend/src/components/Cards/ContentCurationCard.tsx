import { laila } from "@/src/lib/utils"
import { Module, Podcast, Video } from "@/src/lib/icons"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"

// Define props for the GridCard component
type GridProps = {
  className?: string
  item: {
    title: string
    url: string
    type: string
    field_sub_category: string
    field_thumbnail_image: string
  }
}

const ContentCurationCard = ({ className, item }: GridProps) => {
  const { translations } = useTranslations() // Get translations
  const locale = useLocale() // Get the current locale
  const [categoryList, setCategoryList] = useState<string[]>([])

  const curateCategory = () => {
    if (item.field_sub_category) {
      setCategoryList(item.field_sub_category.split(", "))
    }
  }

  useEffect(() => {
    curateCategory()
  }, [item.field_sub_category])

  return (
    <div className={`bg-gray-100 grid-card ${className}`}>
      <div className="relative">
        {/* Card type icon and label */}
        <div className="absolute top-4 left-4 bg-default-black bg-opacity-60 py-1 px-2 rounded-full flex items-center shadow">
          <span className="icon w-3 h-3">
            {/* Display different icons based on item type */}
            {item.type.trim().toLowerCase() === "scorm" ? (
              <Module />
            ) : item.type.trim().toLowerCase() === "video" ? (
              <Video />
            ) : (
              <Podcast />
            )}
          </span>
          <span className="ms-1 text-white text-sm">
            {/* Display label based on item type */}
            {item.type.toLowerCase() === "scorm"
              ? `${translations?.[locale]?.module || 'module'}`
              : item.type.toLowerCase() === "video"
                ? `${translations?.[locale]?.video || 'video'}`
                : `${translations?.[locale]?.podcast || 'podcast'}`}
          </span>
        </div>

        {/* Thumbnail image */}
        {item.field_thumbnail_image.length > 0 && (
          <Image
            src={item.field_thumbnail_image}
            alt={""}
            width={280}
            height={140}
            className="w-full rounded-t-lg"
          />
        )}
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Title with link */}
        <div
          className={`text-lg text-gray-950 mb-3 font-semibold transition-colors duration-200 hover:text-primary ${laila.className}`}
        >
          <Link href={item.url} data-analytics={item.title}>
            <span>{item.title}</span>
          </Link>
        </div>

        {/* Display sub-categories as tags */}
        <div className="inline-flex flex-wrap gap-2">
          {categoryList.map((item, index) => (
            <span
              key={index}
              className={`bg-color-secondary text-sm text-primary px-2 py-1 rounded-md ${laila.className}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContentCurationCard
