"use client"

import { laila } from "@/src/lib/utils"
import { useState } from "react"
import RatingsPopup from "./RatingsPopup"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "next-intl"

const ReviewBanner = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { translations } = useTranslations()
  const locale = useLocale()

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <>
      <div className="review-banner">
        <div className="py-10 lg:px-28 bg-primary">
          <div className="container flex flex-wrap justify-between items-center">
            <div className="flex flex-col">
              <div
                className={`${laila.className} text-xxl lg:text-2xl leading-8 mb-4 font-semibold text-light-pink-100`}
              >
                {translations?.[locale]?.we_hear_you}{" "}
                <span className="text-white">
                  {translations?.[locale]?.you}{" "}
                </span>
              </div>
              <div className="text-white text-base mb-4">
                {translations?.[locale]?.platform_useful}
              </div>
            </div>
            <div className="button">
              <button
                onClick={() => handleClick()}
                className="p-4 bg-white border-primary hover:text-primary hover:underline"
              >
                {" "}
                {translations?.[locale]?.quick_survey}{" "}
              </button>
            </div>
          </div>
        </div>
        {isOpen && <RatingsPopup isOpen={isOpen} setIsOpen={setIsOpen} />}
      </div>
    </>
  )
}

export default ReviewBanner
