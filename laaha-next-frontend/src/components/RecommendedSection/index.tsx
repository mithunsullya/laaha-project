import React, { useEffect, useState } from "react"
import RecommendedCard from "../Cards/RecommendedCard"
import { absoluteUrl, getCountryCode, laila } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import { getAccessToken } from "@/src/lib/protectedAuth"
import Image from "next/image"
import { StarIcon } from "@/src/lib/icons"
import { useTranslations } from "@/src/contexts/TranslationsContext"

const RecommendedSection = () => {
  const [recommendedData, setRecommendedData] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [filteredData, setFilteredData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const countryCode = getCountryCode() || "US"
  const locale = useLocale() || "en"
  const { translations } = useTranslations()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = await getAccessToken()
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/recommended-content`,
          {
            headers: {
              "Content-Type": "application/json",
              "country-code": countryCode,
              locale,
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) throw new Error("Failed to fetch data")

        const json = await response.json()

        // Filter out entries without a valid recommended array
        const validData = json.filter(
          (item: any) =>
            Array.isArray(item?.recommended) && item.recommended.length > 0
        )

        setRecommendedData(validData)

        if (validData.length > 0) {
          setFilteredData(validData[0].recommended[0])
          setSelectedCategory(validData[0].name)
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleClick = (id: number, name: string) => {
    setSelectedCategory(name)
    const selected = recommendedData.find(
      (item) =>
        item.id === id &&
        Array.isArray(item.recommended) &&
        item.recommended.length > 0
    )
    if (selected) {
      setFilteredData(selected.recommended[0])
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  if(recommendedData.length === 0) {
    return <></>
  }

  return (
    <div className="recommended-section p-6 rounded-2xl bg-white mt-8 mb-8 shadow-md">
      <h3
        className={`text-xl font-bold flex gap-x-2 mb-6 ${laila.className} text-primary`}
      >
        <StarIcon /> {translations?.[locale]?.recommended_for_you}{" "}
      </h3>

      <ul className="flex gap-2 overflow-x-auto scrollbar-hide mb-5 px-1 sm:px-0">
        {recommendedData.map((item) => {
          const isActive = item.name === selectedCategory

          return (
            <li
              key={item.id}
              onClick={() => handleClick(item.id, item.name)}
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer whitespace-nowrap
          ${isActive ? "bg-color-secondary border-primary border" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
          transition-colors duration-200 min-w-fit`}
              role="button"
            >
              <Image
                src={absoluteUrl(item.icon_url)}
                width={24}
                height={24}
                alt={item.name}
                className="inline-block"
              />
              <span className="text-sm font-medium">{item.name}</span>
            </li>
          )
        })}
      </ul>

      {filteredData && (
        <RecommendedCard data={filteredData} category={selectedCategory} />
      )}
    </div>
  )
}

export default RecommendedSection
