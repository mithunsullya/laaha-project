"use client"
export const runtime = "edge"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useLocale } from "next-intl"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { fetchIDFromPath, getContentCurationData } from "@/src/lib/apis"

import dynamic from "next/dynamic"
import { useProgressBar } from "@/src/components/Shimmer/NGProgress"
import ContentCurationCard from "@/src/components/Cards/ContentCurationCard"
import Pagination from "@/src/components/Pagination"
import { SimpleCardShimmer } from "@/src/components/Shimmer"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking"
import { useClientContext } from "@/src/lib/queryclient"

const ContentCurationTop = dynamic(() => import("./content-curation-top"), {
  loading: () => null,
  ssr: false,
})

const PAGE_LIMIT = 12;

const ContentCuration = () => {
  const { slug } = useParams()
  const locale = useLocale()
  const { translations } = useTranslations()

  const [allContent, setAllContent] = useState<any[]>([])
  const [selectedTab, setSelectedTab] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState(PAGE_LIMIT);
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string>();
  const [error, setError] = useState<string | null>(null)

  useProgressBar(loading)
  let { userId, isEvaluatedUser } = useSignUp();
  const { ip, alias } = useClientContext();

  const tabs = [
    { name: `${translations?.[locale]?.all}`, module_type: "" },
    { name: `${translations?.[locale]?.module}`, module_type: "scorm" },
    { name: `${translations?.[locale]?.video}`, module_type: "video" },
    { name: `${translations?.[locale]?.podcast}`, module_type: "podcast" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const id = await fetchIDFromPath(slug as string, locale)
        const res = await getContentCurationData(id as string, locale)
        const data = res?.data?.data?.["content-curation-view-block"]?.data || []
        setAllContent(data)
        setId(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (slug && locale) {
      fetchData()
    }
  }, [slug, locale])

  // Step 1: Filter by module type
  const filtered = selectedTab
    ? allContent.filter((item) => item.type === selectedTab)
    : allContent

  // Step 2: Sort by authored_on (timestamp string)
  const sorted = [...filtered].sort((a, b) => {
    return sortOrder === "latest" ? (b.authored_on - a.authored_on) : (a.authored_on - b.authored_on)
  })

  // Step 3: Paginate
  const totalItems = sorted.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginated = sorted.slice(startIndex, startIndex + itemsPerPage)

  const handleTabClick = (module_type: string) => {
    setSelectedTab(module_type)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "latest" | "oldest")
    setCurrentPage(1)
  }

  useUserPageTracking({ userId: userId || '0', nid: "0", locale, pageName: document.title, isEvaluatedUser, ip, alias })

  if(loading) {
    return <div className="my-20"><SimpleCardShimmer /></div>;
  }

  if (error) return <div className="container py-8 text-red-500">{error}</div>

  return (
    <div className="content-curation container mb-8">
      <div className="content-curation-top">
        <ContentCurationTop name={slug as string} resource_count={allContent.length} />
      </div>

      {/* Tabs & Sort */}
      <div className="tabs mb-8 flex flex-wrap justify-between">
        <div className="tab-row flex gap-6 lg:gap-8 mb-4 lg:mb-0 ps-2 lg:ps-0 bg-gray-100 lg:bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.module_type}
              onClick={() => handleTabClick(tab.module_type)}
              className={
                tab.module_type === selectedTab
                  ? "active text-primary border-b py-2"
                  : "hover:text-primary py-2"
              }
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="sort flex items-center gap-4">
          <span>
            {translations?.[locale]?.sory_by || "Sort by"}:
          </span>
          <select
            id="sort"
            className="border px-2 py-1 rounded"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="latest">{translations?.[locale]?.latest || "Latest"}</option>
            <option value="oldest">{translations?.[locale]?.oldest || "Oldest"}</option>
          </select>
        </div>
      </div>

      {/* Content Cards */}
      <div className="content-cards flex flex-wrap gap-8 pb-12">
        {paginated.length > 0 ? (
          paginated.map((item: any, index: number) => {
            const curatedItem = {
              title: item.title,
              url: item.alias,
              type: item.type,
              field_sub_category: item.category_info?.parent_terms,
              field_thumbnail_image: item.field_thumbnail_image?.thumbnail,
            }

            return (
              <ContentCurationCard
                key={index}
                className="lg:max-w-[calc(25%-1.5rem)] md:max-w-[calc(50%-1rem)] flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%]"
                item={curatedItem}
              />
            )
          })
        ) : (
          <div className="w-full text-center text-gray-500">{translations?.[locale]?.no_content_available}</div>
        )}
      </div>

      {/* Pagination */}
      {totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default ContentCuration
