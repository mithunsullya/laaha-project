"use client"

import { useEffect, useState } from "react"
import Card from "../Cards/Card"
import "./subcategory.scss"
import { useLocale } from "next-intl"
import { Breadcrumbs } from "../Breadcrumb"
import {
  absoluteUrl,
  getCountryCode,
  getLangCode,
  getLocaleValue,
} from "@/src/lib/utils"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { SubcategoryShimmer } from "../Shimmer"
import { getBreadcrumbData } from "@/src/lib/apis"
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useClientContext } from "@/src/lib/queryclient"

const SubCategoryPage = ({
  tid,
}: {
  tid: string
}) => {
  const locale = useLocale()
  const [subcatData, setSubcatData] = useState<any>(null)
  const [subcatBanner, setSubcatBanner] = useState<any>(null)
  const [breadcrumb, setBreadcrumb] = useState<any>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()
  const { translations } = useTranslations()
  let { userId, isEvaluatedUser } = useSignUp();
  const { ip, alias } = useClientContext();
  
  useUserPageTracking({ userId: userId || '0', nid: "0", locale, isEvaluatedUser, ip, alias })
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Create both requests in parallel
        const [subCatResponse, bannerResponse, breadcumResponse] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/sub_category_all_results/${tid}`,
            {
              headers: {
                "country-code": countryCode || "US",
                "lang-code": langCode || "en",
                locale: localeValue || "en",
                "Content-Type": "application/json",
              },
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/subcategory-hero-banner/term/${tid}`,
            {
              method: "GET",
              headers: {
                "country-code": countryCode || "US",
                "lang-code": langCode || "en",
                locale: localeValue || "en",
                "Content-Type": "application/json",
              },
              cache: "no-store",
              next: { revalidate: 0 },
            }
          ),
          getBreadcrumbData(tid, locale),
        ])

        // Process responses in parallel
        const [subCatData, bannerData, breadcrumbData] = await Promise.all([
          subCatResponse.json(),
          bannerResponse.json(),
          breadcumResponse,
        ])
        if(breadcrumbData.name) {
          setBreadcrumb(
            [
              {
                title: breadcrumbData.parent.name,
                url: breadcrumbData.parent.url,
                icon: breadcrumbData.parent.icon,
              },
              {
                title: breadcrumbData.name,
                icon: breadcrumbData.icon,
              },
            ]
          )
        }
        setSubcatData(subCatData.data)
        setSubcatBanner(bannerData.content)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tid, locale, countryCode, langCode, localeValue])

  // Loading state handling
  if (loading) {
    return <SubcategoryShimmer />
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error loading subcategory data: {error}</p>
      </div>
    )
  }

  const result_count = subcatData?.pager?.total_items

  const subcategory_top = {
    node: {
      title: subcatBanner?.title,
      video_time: subcatBanner?.video_time || "",
      read_time: subcatBanner?.read_time || "",
      image_uri: subcatBanner?.thumbnail,
      type: subcatBanner?.type,
      url: `/${locale}/` + subcatBanner?.url,
      show_link: true,
    },
  }
  return (
    <div className="subcategory-page">
      <Breadcrumbs items={breadcrumb} />
      {subcatBanner?.title && (
        <div className="subcategory-top py-32">
          <div className="container">
            <Card item={subcategory_top} variant="side" />
          </div>
        </div>
      )}

      <div className="all-results mb-10">
        {result_count ? (
          <div className="container">
            <div className="result-count my-14 pb-3 border-b border-b-primary inline-block uppercase">
              {translations?.[locale]?.all_results} ({result_count})
            </div>
          </div>
        ): (<div className="container">
              <div className="result-count mt-10 inline-block">
                {translations?.[locale]?.no_resource_found}
              </div>
            </div>
          )}

        <div className="stories container">
          {subcatData?.items?.map((item: any, index: number) => {
            const transformedItem = {
              node: {
                title: item.title,
                read_time: item.read_time,
                video_time: item.video_time,
                image_uri: item.thumbnail_image,
                type: item.type,
                url: item.url,
              },
            }
            return <Card item={transformedItem} key={index} />
          })}
        </div>
      </div>
    </div>
  )
}

export default SubCategoryPage
