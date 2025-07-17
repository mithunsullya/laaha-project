import NotFound from "@/src/components/NotFound"
import SubCategoryPage from "@/src/components/SubcategoryPage"
import NavigationProgress from "./../NavigationProgress" // Add this import

export const runtime = "edge"

interface PathInfo {
  entity?: {
    id?: string
  }
}

async function fetchNodeData(
  slug: string[],
  subcategory: string,
  locale: string
): Promise<{ pathInfo?: PathInfo; contentType?: string }> {
  try {
    const path = `/${slug}/${subcategory}`
    const apiUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/router/translate-path?path=${path}`
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`)
      return {}
    }

    const data = await response.json()
    const contentType = data?.jsonapi?.resourceName

    if (!contentType) {
      console.error("Content type could not be determined.")
      return {}
    }

    return { pathInfo: data, contentType }
  } catch (error) {
    console.error("Failed to fetch node data:", error)
    return {}
  }
}

export default async function SubcategoryPages({
  params: { locale, slug, subcategory },
}: {
  params: {
    locale: string
    slug: string[]
    subcategory: string
  }
}) {
  try {
    const { pathInfo } = await fetchNodeData(slug, subcategory, locale)
    if (!pathInfo?.entity?.id) {
      return (
        <div className="container">
          <NavigationProgress /> {/* Add progress bar */}
          <NotFound />
        </div>
      )
    }

    return (
      <>
        <NavigationProgress /> {/* Add progress bar */}
        <SubCategoryPage tid={pathInfo.entity.id} />
      </>
    )
  } catch (error) {
    console.error("Error in SubcategoryPages:", error)
    return (
      <div className="container">
        <NavigationProgress /> {/* Add progress bar */}
        <NotFound />
      </div>
    )
  }
}
