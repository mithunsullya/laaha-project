"use client"

import { fetchContentVariationData } from "@/src/lib/apis"
import { ArrowRight, CloseIcon, StarIcon } from "@/src/lib/icons"
import { getAccessToken } from "@/src/lib/protectedAuth"
import { getCountryCode, laila } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import ScormComponent from "../Scorm/ScormComponent"
import PodcastComponent from "../Podcast/PodcastComponent"
import VideoComponent from "../Video/VideoComponent"
import { useTranslations } from "@/src/contexts/TranslationsContext"
// import { TrendingUp, X, ArrowRight } from "lucide-react"

interface TrendingItem {
  id: number
  nid: number
  title: string
  thumbnail_image: string
  field_sub_category_parents: string[]
  url: string
  type: string
}

interface DetailData {
  id: number
  title: string
  content: string
  author: string
  readTime: string
  publishedDate: string
  tags: string[]
}

export default function TrendingSection() {
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([])
  const [selectedItem, setSelectedItem] = useState<TrendingItem | null>(null)
  const [showViewAll, setShowViewAll] = useState(false)
  const [detailData, setDetailData] = useState<DetailData | null>(null)
  const [loading, setLoading] = useState(false)
  let locale = useLocale()
  let countryCode = getCountryCode()
  const { translations } = useTranslations()

  // Simulate API call for detail data
  const fetchDetailData = async (url: string) => {
    const segments = url.split("/") // ["", "en", "male-body"]
    const newPath = segments.slice(2).join("/")
    setLoading(true)
    // Simulate API delay
    let response = await fetchContentVariationData(newPath, locale)
    setLoading(false)
    return response
  }

  useEffect(() => {
    let getTrendingItems = async () => {
      let token = await getAccessToken()
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/trending-content`,
        {
          headers: {
            "Content-Type": "application/json",
            "country-code": countryCode || "US",
            locale: locale || "en",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      let data = await response.json()
      setTrendingItems(data?.trending_content)
    }

    getTrendingItems()
  }, [])

  const handleItemClick = async (item: TrendingItem) => {
    setSelectedItem(item)
    const data = await fetchDetailData(item.url)
    setDetailData(data)
  }

  const handleViewAllItemClick = async (item: TrendingItem) => {
    setShowViewAll(false)
    setSelectedItem(item)
    const data = await fetchDetailData(item.url)
    setDetailData(data)
  }

  const closeDetailModal = () => {
    setSelectedItem(null)
    setDetailData(null)
  }

  const closeViewAllModal = () => {
    setShowViewAll(false)
  }

  if (!trendingItems.length) {
    return <></>
  }

  return (
    <div className="recommended-section p-6 rounded-2xl bg-white mt-8 shadow-md">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2
              className={`text-xl font-bold flex gap-x-2 mb-2 ${laila.className} text-primary`}
            >
              <StarIcon />{" "}
              <span>{translations?.[locale]?.trending || "Trending"}</span>
            </h2>
          </div>
          <button
            onClick={() => setShowViewAll(true)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {translations?.[locale]?.view_all || "View All"}
            <ArrowRight width={16} height={16} />
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4 w-max">
            {trendingItems.length > 0 &&
              trendingItems.slice(0, 5).map((item) => (
                <div
                  key={item.nid}
                  onClick={() => handleItemClick(item)}
                  className="w-[180px] rounded-lg overflow-hidden transition-all cursor-pointer transform hover:scale-105"
                >
                  <div className="h-full relative">
                    <div
                      className="absolute inset-0 !bg-center bg-no-repeat"
                      style={{ background: `url(${item.thumbnail_image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    </div>
                    <div className="relative h-full flex flex-col justify-end p-4">
                      <div className="flex justify-start">
                        <div className="bg-transparent backdrop-blur-sm rounded-full p-1"></div>
                      </div>
                      <div>
                        <h3
                          className={`text-white pt-8 font-bold mb-4 text-m ${laila.className}`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div className="tags flex flex-wrap gap-2">
                        {item.field_sub_category_parents.map(
                          (item: any, index) => (
                            <span
                              key={index}
                              className={`${laila.className} bg-color-secondary  font-bold p-1.5 text-primary text-[0.5rem] rounded-md`}
                            >
                              {item}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 user-modal bg-black bg-opacity-50 flex items-center justify-center z-50 lg:p-4">
            <div className="p-6 relative max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between">
                {/* <h2 className="text-xl font-semibold mb-0"> {selectedItem.title} </h2> */}
                <button
                  onClick={closeDetailModal}
                  className="hover:bg-gray-100 z-10 absolute -top-2 right-[22px] transform translate-x-4 translate-y-4 bg-white rounded-full"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="overflow-y-auto rounded-lg bg-white max-h-[calc(90vh-80px)]">
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                  </div>
                ) : detailData ? (
                  <>
                    <div className="px-4 lg:px-6">
                      {selectedItem.type === "scorm" && (
                        <ScormComponent data={detailData} isDetail={false} />
                      )}
                      {selectedItem.type === "podcast" && (
                        <PodcastComponent data={detailData} isDetail={false} />
                      )}
                      {selectedItem.type === "video" && (
                        <VideoComponent data={detailData} isDetail={false} />
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* View All Modal */}
        {showViewAll && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-4">
                <h2 className={` ${laila.className} text-xl flex gap-x-2 text-primary mb-0 font-semibold`}>
                  <StarIcon />{" "}

                  <span>{translations?.[locale]?.trending_articles ||
                    "All Trending Articles"}</span>
                </h2>
                <button
                  onClick={closeViewAllModal}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleViewAllItemClick(item)}
                      className="h-[160px] rounded-lg overflow-hidden shadow-lg transition-all cursor-pointer transform hover:scale-105"
                    >
                      <div className="h-full relative">
                        <div
                          className="absolute inset-0"
                          style={{ background: `url(${item.thumbnail_image})` }}
                        >
                          <div className="absolute inset-0 bg-black/20" />
                        </div>
                        <div className="relative h-full flex flex-col justify-end p-4">
                          <div className="flex justify-start">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                              {/* <TrendingUp className="w-4 h-4 text-white" /> */}
                            </div>
                          </div>
                          <div>
                            <h3
                              className={`text-white font-bold mb-4 text-m ${laila.className}`}
                            >
                              {item.title}
                            </h3>
                            <div className="tags flex flex-wrap gap-2">
                              {item.field_sub_category_parents.map(
                                (item: any, index) => (
                                  <span
                                    key={index}
                                    className={`${laila.className} bg-color-secondary p-1.5 font-bold text-primary text-[0.5rem] rounded-md`}
                                  >
                                    {item}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
