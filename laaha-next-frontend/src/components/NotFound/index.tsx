"use client"

import { Breadcrumbs } from "../Breadcrumb"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "next-intl"

const NotFound = () => {
  const { translations } = useTranslations()
  const locale = useLocale()

  return (
    <div className="container">
      <Breadcrumbs items={[{ title: "Page not found" }]} />
      <div className="mb-20">{translations?.[locale]?.not_found_desc}</div>
    </div>
  )
}

export default NotFound
