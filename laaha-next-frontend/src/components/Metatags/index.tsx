"use client"

import { getCountryCode, getLangCode } from "@/src/lib/utils"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslations } from "@/src/contexts/TranslationsContext"

const MetaTags = ({ locale }: { locale: string }) => {
  const [metaData, setMetaData] = useState<any>(null)
  const countryCode = getCountryCode()
  const langCode = getLangCode();
  const pathname = usePathname()
  let slug = pathname.split(`/${locale}/`)[1]
  const { translations } = useTranslations()
  let title = translations?.[locale]?.home_metatag || "Home | Laaha"
  let description =
    translations?.[locale]?.home_meta_description ||
    "Find the support you need. Laaha is a safe space for women and girls to discuss health, safety, violence, and relationships."
  let link = "/"

  useEffect(() => {
    const fetchMetadata = async () => {
      const pathInfo = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/router/translate-path?path=/${slug}`)
      const response = await pathInfo.json();
      let type = response?.entity?.type;
      let id = response?.entity?.id;

      if (type) {
        let typeData = (type === "node") ? "node" : "term";
        const metatagData = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/metatags/${typeData}/${id}`, {
          headers: {
            "country-code": countryCode || "US",
            "lang-code": langCode || "en",
            locale: locale || "en",
            "Content-Type": "application/json",
          },
        })
        const data = await metatagData.json()
        setMetaData(data)
      }
    }

    fetchMetadata()
  }, [locale, countryCode, pathname])

  return (
    metaData &&
    <>
      <title>{metaData?.title.charAt(0).toUpperCase() + metaData?.title.slice(1)}</title>
      <meta name="description" content={metaData?.description || description} />
      <meta property="og:title" content={metaData?.title || title} />
      <meta property="og:description" content={metaData?.description || description} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Laaha" />
    </>
  )
}

export default MetaTags
