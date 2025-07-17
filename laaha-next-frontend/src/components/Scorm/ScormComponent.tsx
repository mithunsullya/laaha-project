"use client"

import dynamic from "next/dynamic"
import { Breadcrumbs } from "../Breadcrumb"
import { useEffect, useLayoutEffect, useState } from "react"
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

const ScormComponent = ({ data, isDetail = true }: any) => {
  const [scormData] = useState(data || null)
  const title = scormData?.title[0]?.value
  const nid = scormData?.nid[0]?.value
  const uid = scormData?.uid[0]?.target_id
  const tags = scormData?.field_tags
  const locale = useLocale()

  let { userName, userId, isEvaluatedUser } = useSignUp()
  const { ip, alias } = useClientContext();

  usePageTimer(userId ? "scorm" : null, userId ? nid : nid)
  useUserPageTracking({ userId: userId || "0", nid: `${nid}`, locale, isEvaluatedUser, ip, alias })

  const getFirstValidSubCategory = (subCategories: any) => {
    return subCategories.find(
      (subCategory: any) =>
        subCategory && subCategory.field_category_short_name?.[0]
    )
  }
  const firstValidSubCategory = getFirstValidSubCategory(
    scormData?.field_sub_category || []
  )
  let subcatTid = firstValidSubCategory?.tid?.[0].value
  let thumbnail_image = scormData?.field_thumbnail_image?.[0]?.url
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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  return (
    <div className="scorm-page lg:min-h-[400px]">
      {isDetail && (
        <>
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

          <PageViewCount nid={nid} uid={uid} />
        </>
      )}
      {/* <h1 className="mt-5 mb-8 max-w-3xl pe-4">{title}</h1> */}
      <iframe
        width="100%"
        height="100%"
        className="mb-8 mt-8 min-h-[40rem] lg:min-h-[51rem]"
        title={title}
        src={
          process.env.NEXT_PUBLIC_DRUPAL_BASE_URL +
          "/" +
          locale +
          "/scorm-player/" +
          nid
        }
      />
      <ArticleFeedback nid={nid} subcatTid={subcatTid} />
      {/* <Tags tags={tags} /> */}
      {/* {
        isDetail && <RecommendedPosts nid={nid} />
      } */}
    </div>
  )
}

export default ScormComponent
