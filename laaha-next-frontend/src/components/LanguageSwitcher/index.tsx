import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/navigation"
import { useEffect, useState } from "react"
import { drupal } from "@/src/lib/drupal"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import Select from "react-select"
import { getCountryCode } from "@/src/lib/utils"

const CACHE_KEY_PREFIX = "lang-data-"

const LanguageSwitcher = () => {
  const [lang, setLanguage] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const locale = useLocale()
  const router = useRouter()
  const pathName = usePathname()
  const [isPageValid, setIsPageValid] = useState<boolean>(false)
  const { translations } = useTranslations()
  const countryCode = getCountryCode();

  // Fetch the language data and validate page for supported languages
  useEffect(() => {
    const langData = async () => {
      setLoading(true)

      const cacheKey = `${CACHE_KEY_PREFIX}${locale}${pathName}`
      const cachedData = localStorage.getItem(cacheKey)

      if (cachedData) {
        const parsedData = JSON.parse(cachedData)
        setLanguage(parsedData)
        setIsPageValid(true)
        setLoading(false)
        return
      }

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/router/translate-path?path=/${pathName}`;
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
          },
        });
        let path = await response.json()
        const id = path?.entity?.id

        if (!id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/vss-lang-api?url=${pathName}`
          )
          const data = await response.json()
          if (data) {
            setLanguage(data)
            setIsPageValid(true)
            localStorage.setItem(cacheKey, JSON.stringify(data))
          }
        }

        if (path && id) {
          setIsPageValid(true)
          const entityType =
            path?.entity.type === "taxonomy_term" ? "taxonomy/term" : "node"

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/vss-lang-api?url=/${entityType}/${id}`
          )
          const data = await response.json()
          setLanguage(data)
          localStorage.setItem(cacheKey, JSON.stringify(data))
        }
      } catch (error) {
        console.error("Error fetching language data:", error)
      } finally {
        setLoading(false)
      }
    }

    langData()
  }, [pathName, locale])

  const handleChange = (selectedOption: any) => {
    if (selectedOption && lang?.alias) {
      const alias = lang.alias[selectedOption.value]
      if (alias) {
        const newPath = alias.replace(`/${selectedOption.value}/`, "/")
        router.push(newPath, { locale: selectedOption.value })
      }
    }
  }

  const exemptedCountries = lang?.exempted_countries || {};

  // Get locales either from exemptedCountries (if countryCode exists there) or from lang.locales
  const localesSource = (countryCode && exemptedCountries[countryCode]) 
    ? exemptedCountries[countryCode] 
    : lang?.locales;
  
  const options = isPageValid && localesSource
    ? Object.entries(localesSource).map(([value, label]: any) => ({
        value,
        label,
        isDisabled: !lang.alias?.[value] // Disable option if alias doesn't exist for this language
      }))
    : [];
  
  const currentOption = options.find(option => option.value === locale);

  return (
    <div className="min-w-52 w-auto">
      {loading ? (
        <Select
          value={{ value: "loading", label: translations?.[locale]?.loading || "Loading..." }}
          options={[]}
          isDisabled
        />
      ) : (
        <Select
          value={currentOption}
          onChange={handleChange}
          options={options}
          aria-label={translations?.[locale]?.choose_language || "Select a language"}
          placeholder={translations?.[locale]?.choose_language || "Choose Language"}
          styles={{
            control: (base) => ({
              ...base,
              cursor: "pointer",
              borderRadius: 0,
              overflow: "visible",
            }),
            singleValue: (base) => ({
              ...base,
              whiteSpace: "normal",
              overflow: "visible",
              textOverflow: "clip",
              maxWidth: "100%",
            }),
            menu: (base) => ({
              ...base,
              marginTop: 0,
              borderRadius: 0,
              borderColor: "#363e44",
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: "200px",
              overflowY: "auto",
              borderRadius: 0,
              padding: 0,
            }),
            option: (base, { isDisabled, isFocused }) => ({
              ...base,
              backgroundColor:  isFocused 
                ? "#e6f7ff" 
                : "white",
              color: isDisabled ? "#999" : isFocused ? "black" : "#333",
              cursor: isDisabled ? "not-allowed" : "pointer",
              borderRadius: 0,
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: "#363e44",
            }),
          }}
          components={{
            IndicatorSeparator: () => null
          }}
          menuPlacement="auto"
          menuPosition="fixed"
        />
      )}
    </div>
  )
}

export default LanguageSwitcher