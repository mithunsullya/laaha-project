"use client"
export const runtime = 'edge'

import React, { useEffect, useState } from "react"
import NotFound from "@/src/components/NotFound"
import { fetchContentVariationData } from "@/src/lib/apis"
import ScormComponent from "@/src/components/Scorm/ScormComponent"
import VideoComponent from "@/src/components/Video/VideoComponent"
import PodcastComponent from "@/src/components/Podcast/PodcastComponent"
import BasicPage from "@/src/components/BasicPage/BasicPage"
import TaxonomyPage from "@/src/components/TaxonomyPage"
import NavigationProgress from "./NavigationProgress"
import AccessDenied from "@/src/components/AccessDenied"
import { getCountryCode } from "@/src/lib/utils"

const contentTypeMapping: Record<string, React.ComponentType<any>> = {
  "node--scorm": ScormComponent,
  "node--video": VideoComponent,
  "node--podcast": PodcastComponent,
  "node--page": BasicPage,
}

type NodePageParams = {
  locale: string
  slug: string[]
}

type NodePageProps = {
  params: NodePageParams
}

export default function NodePage({ params: { locale, slug } }: NodePageProps) {
  const [node, setNode] = useState<any>(null)
  const [contentType, setContentType] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNodeData = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/router/translate-path?path=/${slug}`
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
          },
        })

        const contentTypeHeader = response.headers.get("content-type")
        if (!contentTypeHeader?.includes("application/json")) {
          const errorText = await response.text()
          throw new Error(`Non-JSON response: ${errorText.slice(0, 100)}`)
        }

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || `API request failed: ${response.status}`)
        }

        const data = await response.json()
        const contentTypeFromData = data?.jsonapi?.resourceName

        if (!contentTypeFromData) {
          throw new Error("Unknown content type")
        }

        if (
          contentTypeFromData === "node--podcast" ||
          contentTypeFromData === "node--video" ||
          contentTypeFromData === "node--scorm" ||
          contentTypeFromData === "node--page"
        ) {
          const variationData = await fetchContentVariationData(`/${slug}`, locale);
          setNode(variationData)
          setContentType(contentTypeFromData)
        } else if (contentTypeFromData === "taxonomy_term--categories") {
          setNode(data)
          setContentType(contentTypeFromData)
        } else {
          throw new Error(`Unsupported content type: ${contentTypeFromData}`)
        }
      } catch (err: any) {
        console.error("Failed to load node:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNodeData()
  }, [slug, locale])

  if (loading) return <></>
  if (error) return <NotFound />

  if (node?.error) {
    return <AccessDenied />
  }

  if (contentType === "taxonomy_term--categories") {
    return (
      <>
        <NavigationProgress />
        <TaxonomyPage node={node} />
      </>
    )
  }

  const ContentComponent =
    contentTypeMapping[contentType || "node--page"] || BasicPage

  if (
    contentType === "node--video" ||
    contentType === "node--scorm" ||
    contentType === "node--page" ||
    contentType === "node--podcast"
  ) {
    return (
      <>
        <NavigationProgress />
        <div className="container">
          {node ? <ContentComponent slug={slug} data={node} /> : <NotFound />}
        </div>
      </>
    )
  }

  return <NotFound />
}
