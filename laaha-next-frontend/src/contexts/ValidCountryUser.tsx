"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getCountryCode } from "../lib/utils"
import { useLocale } from "next-intl"

// Define the types
type ValidCountryUserProviderProps = {
  children: React.ReactNode
}

type ValidUserContextProps = {
  isValidUser: boolean
  isAuthUser: boolean
  langAccess: boolean
  isLoading: boolean
  error: string | null
}

// Create the context
const ValidUserContext = createContext<ValidUserContextProps | undefined>(
  undefined
)

// Cache key constants
const FORUM_ACCESS_CACHE_KEY = 'forum_access_data'
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Create the provider component
export const ValidCountryUserProvider = ({
  children,
}: ValidCountryUserProviderProps) => {
  const [isValidUser, setValidUser] = useState(false)
  const [isAuthUser, setIsAuthUser] = useState(true)
  const [langAccess, setLangAccess] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const currentCountry = getCountryCode()
  const locale = useLocale()

  // Fetch data from the backend API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check for cached data first
        const cachedData = localStorage.getItem(FORUM_ACCESS_CACHE_KEY)
        const now = new Date().getTime()

        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData)
          
          // Use cached data if it's still valid
          if (now - timestamp < CACHE_EXPIRY_TIME) {
            processData(data)
            setIsLoading(false)
            return
          }
        }

        // Fetch fresh data if no cache or cache expired
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/forum-access`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }

        const data = await response.json()
        
        // Cache the new data
        localStorage.setItem(
          FORUM_ACCESS_CACHE_KEY,
          JSON.stringify({
            data,
            timestamp: now
          })
        )

        processData(data)
      } catch (err) {
        console.warn("Error fetching user data:", err)
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        )
      } finally {
        setIsLoading(false)
      }
    }

    const processData = (data: any) => {
      const accessData = data?.forum_country_access
      const langData = data?.language_forum_access

      let validData = accessData.filter((item: any) => {
        return item.countrycode === currentCountry
      })

      let validLangData = langData.filter((item: any) => {
        return item.langcode === locale
      })

      if (validData?.length > 0 && validData[0].read !== 0) {
    
        setValidUser(true)
      }

      if (validData[0]?.post === 0) {
        setIsAuthUser(false)
      }

      if (validLangData[0]?.allow_forum === 0) {
        setLangAccess(false)
      }
    }

    fetchUserData()
  }, [currentCountry])

  // Provide the context values
  return (
    <ValidUserContext.Provider
      value={{ isValidUser, isAuthUser, langAccess, isLoading, error }}
    >
      {children}
    </ValidUserContext.Provider>
  )
}

// Create a custom hook to consume the context
export const useValidUser = () => {
  const context = useContext(ValidUserContext)
  if (context === undefined) {
    throw new Error(
      "useValidUser must be used within a ValidCountryUserProvider"
    )
  }
  return context
}
