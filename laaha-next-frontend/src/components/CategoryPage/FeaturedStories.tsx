"use client"

import React, { useEffect, useState } from "react"
import Card from "../Cards/Card"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { getCountryCode, getLangCode, getLocaleValue } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import { CategoryPageShimmer } from "../Shimmer"
import Image from "next/image"

interface FeaturedStoriesProps {
  tid: number // Include tid to pass taxonomy ID
}

const FeaturedStories = ({ tid }: FeaturedStoriesProps) => {
  const { translations } = useTranslations()
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const locale = useLocale()

  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()

  useEffect(() => {
    const fetchFeaturedStories = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/featured-stories/${tid}`,
          {
            headers: {
              "country-code": countryCode || "US",
              "lang-code": langCode || "en",
              locale: localeValue || "en",
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch featured stories.")
        }

        const data = await response.json()
        
        // Convert object to array of stories
        const storiesArray = Object.values(data)
        
        // Shuffle and select 6 random stories
        const shuffled = [...storiesArray].sort(() => 0.5 - Math.random())
        const selectedStories = shuffled.slice(0, 6)
        
        setStories(selectedStories)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedStories()
  }, [locale, tid, countryCode, langCode, localeValue])

  if (loading) {
    return <CategoryPageShimmer />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!stories || stories.length === 0) {
    return null
  }

  return (
    <div className="featured-stories mb-10">
      <h2 className="text-center pt-20 pb-10 inline-flex gap-x-2 items-start justify-center w-full">
        <span>
          <Image 
            src="/assets/images/featured-head-icon.png" 
            alt="Featured Stories" 
            width={32} 
            height={32} 
            className="mx-auto" 
          />
        </span>
        <span>{translations?.[locale]?.featured_stories || "Featured Stories"}</span>
      </h2>
      <div className="stories container flex flex-wrap">
        {stories.map((item, index) => {
          const transformedItem = {
            node: {
              title: item.title,
              read_time: item.read_time,
              video_time: item.video_time,
              image_uri: item.thumbnail,
              image_alt: item.thumbnail_alt,
              type: item.type,
              url: item.url,
            },
          }
          return <Card key={index} item={transformedItem} />
        })}
      </div>
    </div>
  )
}

export default FeaturedStories
