"use client"

import { getCountryCode, laila } from "@/src/lib/utils"
import React, { useEffect, useState, useMemo } from "react"
import Continue from "./Continue"
import Completed from "./Completed"
import { getAccessToken } from "@/src/lib/protectedAuth"
import { useLocale } from "next-intl"
import { StarIcon } from "@/src/lib/icons"
import { useTranslations } from "@/src/contexts/TranslationsContext"

// Cache object for API calls
const apiCache = {
  continue: null,
  completed: null,
}

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [continueData, setContinueData] = useState<any[] | null>(null)
  const [completedData, setCompletedData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { translations} = useTranslations()

  const locale = useLocale()
  const countryCode = getCountryCode()

  // Memoize tabs to prevent re-renders when data doesn't change
  const tabs = useMemo(() => [
    {
      id: 0,
      name: translations?.[locale]?.continue || "Continue",
      component: <Continue items={continueData} />,
    },
    {
      id: 1,
      name: translations?.[locale]?.completed || "Completed",
      component: <Completed items={completedData} />,
    },
  ], [continueData, completedData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Check if the data is cached, use it
        if (apiCache.continue && apiCache.completed) {
          setContinueData(apiCache.continue)
          setCompletedData(apiCache.completed)
          setLoading(false)
          return
        }

        if (!locale || !countryCode) {
          setError(true)
          setLoading(false)
          return
        }

        const token = await getAccessToken()

        // Fetch the data for continue and completed
        const [continueRes, completedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/v1/user-progress/continue`, {
            headers: {
              "Content-Type": "application/json",
              locale: locale || "en",
              "Authorization": `Bearer ${token}`,
              "Country-Code": countryCode || "US",
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/v1/user-progress/completed`, {
            headers: {
              "Content-Type": "application/json",
              locale: locale || "en",
              "Authorization": `Bearer ${token}`,
              "Country-Code": countryCode || "US",
            },
          })
        ])

        // Handle non-200 responses
        if (!continueRes.ok || !completedRes.ok) {
          throw new Error("Failed to fetch data from the API")
        }

        const [continueJson, completedJson] = await Promise.all([
          continueRes.json(),
          completedRes.json(),
        ])

        // Check if the response data exists and is valid
        if (!continueJson?.data?.continue || !completedJson?.data?.completed) {
          throw new Error("Invalid data received from the API")
        }

        // Cache the data for future use
        apiCache.continue = continueJson.data.continue
        apiCache.completed = completedJson.data.completed

        setContinueData(apiCache.continue)
        setCompletedData(apiCache.completed)
      } catch (err) {
        console.error("Error fetching progress data:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [locale, countryCode])

  const handleTabChange = (newTab: number) => {
    setActiveTab(newTab)
  }

  if (loading) {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg text-center text-gray-500">
        Loading your progress...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg text-center text-red-500">
        Failed to load your progress. Please try again later.
      </div>
    )
  }

  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h3 className={`text-xl font-bold flex gap-x-2 mb-4 ${laila.className} text-primary`}>
          <StarIcon /> <span> {translations?.[locale]?.my_level_progress } </span>
        </h3>
        <div className="inline-flex items-center mb-4 gap-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 ${activeTab === tab.id
                ? `border-primary border-b text-black font-semibold ${laila.className}`
                : `text-gray-800 ${laila.className}`
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        {tabs[activeTab].component}
      </div>
    </div>
  )
}

export default MyProfile
