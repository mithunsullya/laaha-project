"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import { getBreadcrumbData } from "@/src/lib/apis"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking"
import { useClientContext } from "@/src/lib/queryclient"

const CategoryPage = dynamic(() => import("../CategoryPage"))

const TaxonomyPage = ({ node, loading }: any) => {
  const locale = useLocale()
  const [breadcrumb, setBreadcrumb] = useState<any[]>([])
  const [isFetchingBreadcrumb, setIsFetchingBreadcrumb] = useState(false)
  let {userId, isEvaluatedUser} = useSignUp();
  const { ip, alias } = useClientContext();
  
  useUserPageTracking({ userId: userId || '0', nid: '0', locale, isEvaluatedUser, ip, alias })
  
  useEffect(() => {
    // Set initial breadcrumb from node props if available
    if (node?.field_category_short_name) {
      setBreadcrumb([
        {
          title: node.field_category_short_name,
          icon: node.field_icon?.image_style_uri?.thumbnail,
        },
      ])
    }
  }, [node?.field_category_short_name, node?.field_icon?.image_style_uri?.thumbnail])

  useEffect(() => {
    const fetchBreadcrumbData = async () => {
      if (!node?.entity?.id) return
      
      try {
        setIsFetchingBreadcrumb(true)
        const data = await getBreadcrumbData(node.entity.id, locale)
        
        // Only update if we got valid data
        if (data?.name) {
          setBreadcrumb([
            {
              title: data.name,
              icon: data.icon,
            },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch breadcrumb:", error)
        // Keep existing breadcrumb if fetch fails
      } finally {
        setIsFetchingBreadcrumb(false)
      }
    }

    fetchBreadcrumbData()
  }, [node?.entity?.id, locale])

  if (!node) {
    return <div>No category data available</div>
  }

  return (
    <div className="category-page">
      <CategoryPage tid={node.entity.id} breadcrumb={breadcrumb} />
    </div>
  )
}

export default TaxonomyPage