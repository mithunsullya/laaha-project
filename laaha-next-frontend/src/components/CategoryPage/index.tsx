"use client"

import React, { useState, useEffect } from "react"
import SimpleCard from "../Cards/SimpleCard"
import {
  getCountryCode,
  getLangCode,
  getLocaleValue,
} from "@/src/lib/utils"
import Image from "next/image"
import "./taxonomy.scss"
import { useLocale } from "next-intl"
import { getCategoriesData } from "@/src/lib/apis"
import { Breadcrumbs } from "../Breadcrumb"
import { CategoryPageShimmer } from "../Shimmer"
import dynamic from "next/dynamic"
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useClientContext } from "@/src/lib/queryclient"

const FeaturedStories = dynamic(() => import("./FeaturedStories"), {
  loading: () => <CategoryPageShimmer />, // Replace with a proper shimmer if you have one
})

const CategoryPage = ({
  tid,
  breadcrumb,
}: {
  tid: number
  breadcrumb: any
}) => {
  const locale = useLocale()
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()

  let { userId, isEvaluatedUser } = useSignUp();
  const { ip, alias } = useClientContext();

  // useUserPageTracking({ userId: userId || '0', nid: "0", locale, isEvaluatedUser, ip, alias })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [catData] = await Promise.allSettled([
          getCategoriesData(locale, tid),
        ])

        if (catData.status === "fulfilled") {
          setData(catData.value)
        }
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [locale, tid, countryCode, langCode, localeValue])

  if (loading) {
    return (
      <CategoryPageShimmer />
    )
  }

  return (
    <div className="category-page">
      <Breadcrumbs items={breadcrumb} />

      {data && (
        <>
          <div
            className="category-top pb-10"
            style={{ backgroundColor: "#" + data?.category?.cat_color }}
          >
            <div className="cat-header container flex justify-center items-center py-10">
              <Image
                alt={data?.category?.cat_alt}
                loading="lazy"
                src={ data?.category?.cat_icon}
                width={48}
                height={48}
                style={{ objectFit: "contain" }}
              />
              <h1>{data?.category?.cat_name}</h1>
            </div>

            <div className="simple-card__wrapper container flex justify-center lg:justify-normal flex-wrap gap-6">
              {Object.values(data.content).map((item: any, index: any) => {
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
        </>
      )}

      <FeaturedStories tid={tid} />
    </div>
  )
}

export default CategoryPage
