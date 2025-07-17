import React from "react"
import ProgressBar from "../ProgressBar/ProgressBar"
import { DownArrow, Module, Podcast, Video } from "@/src/lib/icons"
import Link from "next/link"
import { laila } from "@/src/lib/utils"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "use-intl"

export interface SlidePanelProps {  
  item: {
    heading: string
    totalCount: number
    completedCount: number
    progressTitle?: string
    progressIcon?: React.ReactNode | string
    bgcolor: string
    nodes: Array<{
      title?: string
      url?: string
    }>
  }
  index: number
  activeItem: number | null
  setActiveItem: (index: number) => void
}

const SlidePanel = ({
  item,
  index,
  activeItem,
  setActiveItem,
}: SlidePanelProps) => {
  const {translations } = useTranslations();
  const locale = useLocale()

  const handleClick = (index: number) => {
    setActiveItem(index)
  }
  return (
    <div className="mb-4">
      <div className={`border rounded-xl  ${item?.nodes.length > 0 && activeItem === index ? "bg-[#FFF5F9] border-[#FFF5F9] " : "bg-white  border-neutral-200"}`}>
        <div
          onClick={() => handleClick(index)}
          className={`p-4 rounded-md  inline-flex gap-x-4 w-full items-start lg:items-center justify-between ${item?.nodes.length > 0 ? 'cursor-pointer' : 'pointer-events-none'}`}
        >
          <ProgressBar progressTitle={item.progressTitle} progressIcon={item?.progressIcon} totalCount={item.totalCount} completedCount={item.completedCount} bgcolor={item.bgcolor} />
          <span className={`transition-transform duration-300 ${item?.nodes.length > 0 && activeItem === index ? "rotate-180" : ""}`}>
            <DownArrow />
          </span>
        </div>
        {activeItem === index && item?.nodes.length > 0 &&  (
          <div className="mb-4 px-4 pb-4">
            <div className={`text-primary mb-4 text-m font-bold ${laila.className}`}>
              {item.heading}
            </div>
            <ul className="flex flex-col ps-0">
              {item?.nodes?.map((node: any, index) => {
                return (
                  <li key={index} className={`${laila.className} mb-3 text-default-black p-2 rounded-lg bg-color-secondary inline-flex justify-between items-center gap-x-2`}>
                    <div className="flex items-center gap-x-2">
                    <span className="icon w-4 h-4">
                      {/* Display different icons based on item type */}
                      {node.type.trim().toLowerCase() === "scorm" ? (
                        <Module width={16} height={16} />
                      ) : node.type.trim().toLowerCase() === "video" ? (
                        <Video width={16} height={16}  />
                      ) : (
                        <Podcast width={16} height={16}  />
                      )}
                    </span>
                    <span className={`text-base`}>
                      {node?.title || "No title available"}
                    </span>
                    </div>
                    <Link
                      href={`${node?.url}`}
                      className=" text-primary hover:text-red transition-colors"
                    >
                      { translations?.[locale]?.visit || "Visit" }
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default SlidePanel
