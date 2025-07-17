"use client"

import { useEffect, useState } from "react"
import Card from "../Cards/Card"
import { useLocale } from "next-intl"
import SimpleCard from "../Cards/SimpleCard"
import {
  getCountryCode,
  getLangCode,
  getLocaleValue,
} from "@/src/lib/utils"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useProgressBar } from "@/src/components/Shimmer/NGProgress"

const RecommendedPosts = ({ nid }: any) => {
  const locale = useLocale()
  const [recommendedData, setRecommendedData] = useState<any[]>([])
  const [subcategoryData, setSubcategoryData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()
  const { translations } = useTranslations()

  // Use NProgress loading bar
  useProgressBar(loading)

  // Function to shuffle and slice array to 3 items
  const shuffleAndSlice = (array: any[]) => {
    if (!array) return []
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }

  const fetchRecommendedData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/related-content-json/${nid}`,
        {
          headers: {
            "country-code": countryCode || "US",
            "lang-code": langCode || "en",
            locale: localeValue || "en",
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) throw new Error("Failed to fetch recommended data")
      const { data } = await response.json()
      setRecommendedData(shuffleAndSlice(Object.values(data.content)))
    } catch (err) {
      setRecommendedData([])
    }
  }

  const fetchSubcategoryData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/related-subcategories/node/${nid}`,
        {
          headers: {
            "country-code": countryCode || "US",
            "lang-code": langCode || "en",
            locale: localeValue || "en",
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) throw new Error("Failed to fetch subcategory data")
      const data = await response.json()
      setSubcategoryData(Object.values(data.content))
    } catch (err) {
      setSubcategoryData([])
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await Promise.all([fetchRecommendedData(), fetchSubcategoryData()])
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [nid, locale])

  // Return null while loading - NProgress will handle the loading indicator
  if (loading) return null

  return (
    <>
      {/* Recommended Posts Section - Only shows 3 shuffled items */}
      {recommendedData.length > 0 && (
        <div className="recommended-posts mb-20">
          <h3 className="font-bold text-xxxl mb-8 text-center">
            {translations?.[locale]?.anya_recommends}
          </h3>
          <div className="recommended-data flex gap-6 flex-wrap">
            {recommendedData.map((item, index) => {
              const transformedItem = {
                node: {
                  title: item.title,
                  read_time: item.read_time,
                  image_uri: item.uri,
                  type: item.type,
                  url: item.link,
                },
              }
              return (
                <Card
                  key={index}
                  item={transformedItem}
                  className="flex-[0_0_100%] max-w-full lg:flex-[0_0_33.33%] lg:max-w-[calc(33.33%-1.5rem)]"
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Related Subcategories Section */}
      {subcategoryData.length > 0 && (
        <div className="related-categories mb-10">
          <h2 className="text-center mb-6">
            {translations?.[locale]?.other_subcategories}
          </h2>
          <div className="simple-card__wrapper flex flex-wrap gap-6 justify-center lg:justify-normal">
            {subcategoryData.map((item, index) => {
              const transformedItem = {
                title: item.subcat_name,
                url: item.url,
                image: item.sub_category_thumbnail,
                alt: item.sub_category_alt || item.subcat_name,
              }
              return (
                <SimpleCard
                  key={index}
                  data={transformedItem}
                  classes="md:flex-[0_0_50%] md:max-w-[calc(50%-1rem)] mb-6 lg:mb-0 lg:flex-[0_0_25%] lg:max-w-[calc(25%-1.5rem)]"
                />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default RecommendedPosts
