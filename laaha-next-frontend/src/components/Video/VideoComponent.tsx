"use client"

import dynamic from "next/dynamic"
import { Breadcrumbs } from "../Breadcrumb"
import DetailPageParagraph from "../Paragraph/DetailPageParagraph"
import { useLayoutEffect, useState } from "react"
import { ListingShimmer3col } from "../Shimmer"
import { useLocale } from "next-intl"
import { ArticleFeedback } from "../ArticleFeedbackBlock"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { usePageTimer } from "@/src/hooks/usePageTimer"
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking"
import { useClientContext } from "@/src/lib/queryclient"

// Dynamically import components with loading placeholders
const PageViewCount = dynamic(() => import("../PageViewCount"), {
  ssr: false,
})

const Tags = dynamic(() => import("../Tags"), {
  loading: () => <p>Loading Tags...</p>,
  ssr: false,
})

const RecommendedPosts = dynamic(() => import("../RecommendedPost"), {
  loading: () => <ListingShimmer3col />,
  ssr: false,
})

const VideoComponent = ({ data, isDetail = true }: any) => {
  const [videoData] = useState<any>(data || null)

  const video_data = {
    layout_structure: videoData?.layout_structure,
    field_content: videoData?.field_content,
  }
  const title = videoData?.title?.[0]?.value
  const nid = videoData?.nid?.[0]?.value
  const uid = videoData?.uid?.[0]?.target_id
  const tags = videoData?.field_tags
  const locale = useLocale()
  let { userName, userId, isEvaluatedUser } = useSignUp()
  const { ip, alias } = useClientContext();

  usePageTimer(userId ? "video" : null, userId ? nid: nid)
  useUserPageTracking({ userId: userId || '0', nid: nid, locale, isEvaluatedUser, ip, alias })

  const getFirstValidSubCategory = (subCategories: any) => {
    return subCategories.find(
      (subCategory: any) =>
        subCategory && subCategory.field_category_short_name?.[0]
    )
  }
  const firstValidSubCategory = getFirstValidSubCategory(
    videoData?.field_sub_category || []
  )
  let subcatTid = firstValidSubCategory?.tid?.[0].value
  let thumbnail_image = videoData?.field_thumbnail_image?.[0]?.url
  let subCategory = firstValidSubCategory?.field_category_short_name?.[0].value
  let subCatUrl = firstValidSubCategory?.path?.[0]?.alias
  let subCatThumbanail =
    firstValidSubCategory?.field_sub_category_thumbnail?.[0]?.url
  let category =
    firstValidSubCategory?.parent?.["0"]?.field_category_short_name?.[0].value
  let categoryUrl = firstValidSubCategory?.parent?.["0"]?.path?.[0]?.alias
  let categoryThumbnail =
    firstValidSubCategory?.parent?.["0"]?.field_image?.[0]?.url
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])
  return (
    <div className="scorm-page">
      {isDetail && (
        <Breadcrumbs
          items={[
            {
              title: category,
              url: `/${locale}${categoryUrl}`,
              icon: categoryThumbnail,
            },
            {
              title: subCategory,
              url: `/${locale}${subCatUrl}`,
              icon: subCatThumbanail,
            },
            { title: title, url: "#", icon: thumbnail_image },
          ]}
        />
      )}
      {/* {isDetail && nid && uid && <PageViewCount nid={nid} uid={uid} />} */}
      <h1 className="mt-5 mb-8 max-w-3xl pe-4">{title}</h1>
      <DetailPageParagraph data={video_data} />
      {isDetail && (
        <>
          <ArticleFeedback nid={nid} subcatTid={subcatTid} />
          {/* {tags && <Tags tags={tags} />} */}
          {/* {nid && <RecommendedPosts nid={nid} />} */}
        </>
      )}
    </div>
  )
}

export default VideoComponent
