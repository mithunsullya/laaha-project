"use client"

export const runtime = "edge"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"
import dynamic from "next/dynamic"

import { getCountryCode, getLangCode, getLocaleValue } from "@/src/lib/utils"
import { HomeDynamic } from "@/src/lib/apis"
import { BannerShimmer } from "@/src/components/Shimmer"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useClientContext } from "@/src/lib/queryclient"

const HomePageBannerSlider = dynamic(
  () => import("@/src/components/Slider/HomepageBannerSlider"),
  {
    loading: () => <BannerShimmer />,
  }
)

// Dynamically import all components
const HomepageLearningPathSlider = dynamic(
  () => import("@/src/components/Slider/HomepageLearningPathSlider")
)
const HowLaahaCanHelpYou = dynamic(
  () => import("./components/how-laaha-can-help-you"),
  {
    loading: () => <HowCanLaahaHelpYouShimmer />,
  }
)
const StoriesOfStrength = dynamic(
  () => import("./components/stories-of-strength"),
  {
    loading: () => <StoriesShimmer />,
  }
)
const ExploreSpecialTopics = dynamic(
  () => import("./components/explore-special-topics")
)
const ContentMadeForYou = dynamic(
  () => import("./components/content-made-for-you"),
  {
    loading: () => <ContentMadeForYouShimmer />,
  }
)
const FindServices = dynamic(() => import("./components/find-services"), {
  loading: () => <FindServicesShimmer />,
})

const HomepageSearch = dynamic(
  () => import("@/src/components/Search/HomepageSearch")
)

const ContentMadeForYouShimmer = dynamic(() =>
  import("@/src/components/Shimmer").then((mod) => mod.ContentMadeForYouShimmer)
)

const FindServicesShimmer = dynamic(() =>
  import("@/src/components/Shimmer").then((mod) => mod.FindServicesShimmer)
)

const HowCanLaahaHelpYouShimmer = dynamic(() =>
  import("@/src/components/Shimmer").then(
    (mod) => mod.HowCanLaahaHelpYouShimmer
  )
)
const StoriesShimmer = dynamic(() =>
  import("@/src/components/Shimmer").then((mod) => mod.StoriesShimmer)
)

interface ContentMadeForYouProps {
  title: string
  data: any[]
}

export default function Home() {
  const locale = useLocale()
  const [contenForYou, setContenForYou] = useState<ContentMadeForYouProps>({
    title: "",
    data: [],
  })
  const [homepageBannerData, setHomepageBannerData] = useState<any>([])
  const [findServicesData, setFindservicesData] = useState<any>([])
  const [learningData, setLearningData] = useState<any>([])
  const [learningTitle, setLearningTitle] = useState<any>([])
  const [howLahaCanHelpDataStructured, setHowLahaCanHelpDataStructured] =
    useState<any>([])
  const [exploreSpecialDataStructured, setExploreSpecialDataStructured] =
    useState<any>([])
  const [storiesOfStrengthDataStructured, setStoriesOfStrengthDataStructured] =
    useState<any>([])

  // Separate loading states for each component
  const [isBannerLoading, setIsBannerLoading] = useState<boolean>(true)
  const [isFindServicesLoading, setIsFindServicesLoading] =
    useState<boolean>(true)
  const [isContentMadeForYouLoading, setIsContentMadeForYouLoading] =
    useState<boolean>(true)
  const [isExploreSpecialLoading, setIsExploreSpecialLoading] =
    useState<boolean>(true)
  const [isHowLaahaCanHelpLoading, setIsHowLaahaCanHelpLoading] =
    useState<boolean>(true)
  const [isStoriesOfStrengthLoading, setIsStoriesOfStrengthLoading] =
    useState<boolean>(true)

  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()
  let { translations } = useTranslations();
  const { ip, alias } = useClientContext();
  
  // Generate a unique cache key based on locale, country code, and data type
  const generateCacheKey = (key: string) => {
    return `homepage-${locale}-${countryCode}-${key}`
  }

  // Cache helper functions
  const getFromCache = (key: string) => {
    const cachedData = localStorage.getItem(key)
    if (!cachedData) return null
    
    try {
      const { data, timestamp } = JSON.parse(cachedData)
      // Cache is valid for 5 minutes (300,000 milliseconds)
      if (Date.now() - timestamp < 300000) {
        return data
      }
      return null
    } catch (e) {
      return null
    }
  }

  const saveToCache = (key: string, data: any) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    )
  }

  const clearLocaleCaches = () => {
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(`homepage-${locale}`)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }

  const handleContentMadeForYou = async () => {
    const contentCacheKey = generateCacheKey("content-made-for-you")
    const learningCacheKey = generateCacheKey("learning-path-data")

    // Check cache first
    const cachedContent = getFromCache(contentCacheKey)
    const cachedLearning = getFromCache(learningCacheKey)

    if (cachedContent && cachedLearning) {
      setContenForYou(cachedContent)
      setLearningData(cachedLearning.data)
      setLearningTitle(cachedLearning.title)
      setIsContentMadeForYouLoading(false)
      return
    }

    setIsContentMadeForYouLoading(true)
    try {
      const jsonRes = await HomeDynamic(locale)

      // Process content made for you data
      const contentMadeForYouTitle = jsonRes?.data["resource-block"]["block_title"]
      const categoryWiseData = jsonRes?.data["resource-block"]["category"]
      const contentMadeForYouData = []

      // Process learning path data
      const learningPathData = jsonRes?.data["categories-block"]["category"]
      const learningPathTitle = jsonRes?.data["categories-block"]["block_title"]

      // Structure the "Content Made For You" data
      for (let [k, v] of Object.entries(categoryWiseData) as [
        string,
        { name: string; nodes: any },
      ][]) {
        const vals = Object.values(v.nodes)
        const structuredContent = {
          category: v.name,
          data: vals[(Math.random() * vals.length) | 0],
        }
        contentMadeForYouData.push(structuredContent)
      }

      // Prepare data objects
      const contentData = {
        title: contentMadeForYouTitle,
        data: contentMadeForYouData,
      }

      const learningData = {
        data: learningPathData,
        title: learningPathTitle,
      }

      // Update state
      setContenForYou(contentData)
      setLearningData(learningPathData)
      setLearningTitle(learningPathTitle)

      // Save to cache
      saveToCache(contentCacheKey, contentData)
      saveToCache(learningCacheKey, learningData)
    } catch (error) {
      console.error("Error fetching content data:", error)
    } finally {
      setIsContentMadeForYouLoading(false)
    }
  }

  const handleFetchData = async () => {
    const cacheKey = generateCacheKey("static-data")
    const cachedData = getFromCache(cacheKey)

    if (cachedData) {
      setExploreSpecialDataStructured(cachedData.exploreSpecialDataStructured)
      setHomepageBannerData(cachedData.homepageBannerData)
      setHowLahaCanHelpDataStructured(cachedData.howLahaCanHelpDataStructured)
      setStoriesOfStrengthDataStructured(cachedData.storiesOfStrengthDataStructured)
      setFindservicesData(cachedData.findServicesData)
      
      setIsBannerLoading(false)
      setIsExploreSpecialLoading(false)
      setIsFindServicesLoading(false)
      setIsHowLaahaCanHelpLoading(false)
      setIsStoriesOfStrengthLoading(false)
      return
    }

    // Set all loading states to true
    setIsBannerLoading(true)
    setIsExploreSpecialLoading(true)
    setIsFindServicesLoading(true)
    setIsHowLaahaCanHelpLoading(true)
    setIsStoriesOfStrengthLoading(true)

    try {
      const nodeData = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/home_static`,
        {
          headers: {
            "country-code": countryCode || "US",
            "lang-code": langCode || "en",
            locale: localeValue || "en",
            "Content-Type": "application/json",
          },
        }
      )
      const jsonNodeData = await nodeData.json()

      const data = {
        exploreSpecialDataStructured: curateExploreSpecialData(jsonNodeData),
        findServicesData: jsonNodeData.need_help_data,
        homepageBannerData: curateHomepageBanner(jsonNodeData),
        howLahaCanHelpDataStructured: curateHowLahaCanHelpYou(jsonNodeData),
        storiesOfStrengthDataStructured: curateStoriesOfStrengthData(jsonNodeData),
      }

      // Update state
      setFindservicesData(data.findServicesData)
      setHowLahaCanHelpDataStructured(data.howLahaCanHelpDataStructured)
      setStoriesOfStrengthDataStructured(data.storiesOfStrengthDataStructured)
      setExploreSpecialDataStructured(data.exploreSpecialDataStructured)
      setHomepageBannerData(data.homepageBannerData)

      // Save to cache
      saveToCache(cacheKey, data)
    } catch (error) {
      console.error("Error fetching static data:", error)
    } finally {
      setIsBannerLoading(false)
      setIsExploreSpecialLoading(false)
      setIsFindServicesLoading(false)
      setIsHowLaahaCanHelpLoading(false)
      setIsStoriesOfStrengthLoading(false)
    }
  }

  // Structure the homepage banner data
  const curateHomepageBanner = (nodeData: any) => {
    let fieldBannerData = nodeData.banner_field_data

    let tempBannerData = []
    for (let data of fieldBannerData) {
      tempBannerData.push({
        title: data.title,
        description: data.description,
        image_uri: data.banner_image,
        bg_image_uri: data.banner_background_image,
        cta_uri: data?.cta?.link ?? "",
        cta_title: data?.cta?.link_text ?? "",
      })
    }
    return tempBannerData
  }

  // Structure "How Laaha Can Help You" data
  const curateHowLahaCanHelpYou = (layoutNodes: any) => {
    let howLahaCanHelpData =
      (layoutNodes as any)?.how_laaha_can_help_you?.[0]?.field_cards ?? []
    let tempHowLahaCanHelpDataStructured = []
    for (let data of howLahaCanHelpData) {
      tempHowLahaCanHelpDataStructured.push({
        title: data?.card_label,
        description: data?.card_description,
        image_url: data?.card_icon,
      })
    }
    return tempHowLahaCanHelpDataStructured
  }

  // Structure "Explore Special Topics" data
  const curateExploreSpecialData = (nodeData: any) => {
    let exploreSpecialData = (nodeData as any)?.special_topics_data ?? []
    let tempExploreSpecialDataStructured = []
    for (let data of exploreSpecialData) {
      tempExploreSpecialDataStructured.push({
        title: data?.title,
        description: data?.description,
        image_uri: data?.background_image,
        url: data?.cta?.link,
        text: data?.cta?.link_text,
      })
    }
    return tempExploreSpecialDataStructured
  }

  // Structure "Stories of Strength" data
  const curateStoriesOfStrengthData = (layoutNodes: any) => {
    let storiesOfStrengthData = (layoutNodes as any)?.stories_block?.[0] ?? []
    let storiesTitleDesc = {
      title: layoutNodes?.stories_block?.[0]?.title,
      description: layoutNodes?.stories_block?.[0]?.description,
    }
    let tempStoriesOfStrengthDataStructured = []
    for (let data of storiesOfStrengthData.stories ?? []) {
      tempStoriesOfStrengthDataStructured.push({
        description: String(data.stories_description),
        by: String(data.stories_label),
        icon: String(data?.stories_icon),
      })
    }

    return {
      ...storiesTitleDesc,
      tempStoriesOfStrengthDataStructured,
    }
  }

  useEffect(() => {
    clearLocaleCaches()
  
    const loadAllData = async () => {
      await Promise.all([handleContentMadeForYou(), handleFetchData()])
    }
  
    loadAllData()
  }, [locale])

  let { userId, isEvaluatedUser } = useSignUp();
  useUserPageTracking({ userId: userId || '0', nid: '0', locale, pageName: translations?.[locale]?.home, isEvaluatedUser, ip, alias })

  return (
    <>
      {homepageBannerData && (
        <HomePageBannerSlider
          loading={isBannerLoading}
          homepageBannerData={homepageBannerData}
        />
      )}
      {findServicesData && (
        <FindServices
          loading={isFindServicesLoading}
          findServicesData={findServicesData}
        />
      )}

      <HomepageSearch />
      {contenForYou.data.length > 0 && (
        <ContentMadeForYou
          contentMadeForYouTitle={contenForYou.title}
          contentMadeForYouData={contenForYou.data}
          loading={isContentMadeForYouLoading}
        />
      )}
      {
        <HomepageLearningPathSlider
          data={learningData}
          title={learningTitle}
          loading={isContentMadeForYouLoading}
        />
      }
      {exploreSpecialDataStructured && (
        <ExploreSpecialTopics
          loading={isExploreSpecialLoading}
          exploreSpecialDataStructured={exploreSpecialDataStructured}
        />
      )}
      {howLahaCanHelpDataStructured && (
        <HowLaahaCanHelpYou
          howLahaCanHelpDataStructured={howLahaCanHelpDataStructured}
          loading={isHowLaahaCanHelpLoading}
        />
      )}
      {storiesOfStrengthDataStructured.tempStoriesOfStrengthDataStructured && (
        <StoriesOfStrength
          title={storiesOfStrengthDataStructured.title}
          desc={storiesOfStrengthDataStructured.description}
          stories={
            storiesOfStrengthDataStructured.tempStoriesOfStrengthDataStructured
          }
          loading={isStoriesOfStrengthLoading}
        />
      )}
    </>
  )
}
