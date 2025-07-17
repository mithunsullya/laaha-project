"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { useLocale } from "next-intl"

type TranslationContextProps = {
  children: ReactNode
}
interface Translations {
  [key: string]: any
}

interface TranslationsContextType {
  translations: Translations | null
  textLoading: boolean
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(
  undefined
)

export const useTranslations = () => {
  const context = useContext(TranslationsContext)

  if (!context) {
    throw new Error(
      "useTranslations must be used within a TranslationsProvider"
    )
  }

  return context
}
// Used for translating the content on site based on the different languages.
export const TranslationsProvider = ({ children }: TranslationContextProps) => {
  const [translations, setTranslations] = useState<Translations | null>(null)
  const [textLoading, setLoading] = useState(true)
  const locale = useLocale()

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/translations`
        )
        const data = await res.json()
        setTranslations(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching translations:", error)
      }
    }

    fetchTranslations()
  }, [])

  return (
    <TranslationsContext.Provider value={{ translations, textLoading }}>
      {children}
    </TranslationsContext.Provider>
  )
}
