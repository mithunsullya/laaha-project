import MarketingCard from "@/src/components/Cards/MarketingCard"
import { absoluteUrl, laila } from "@/src/lib/utils"
import { useEffect, useState } from "react"
import { getMarketingData } from "./api"

interface MarketingItem {
  logo: string
  name: string
  description: string
  link: string
  tags: string
}

interface ServiceNotFoundProps {
  translations: any,
  locale: string
}

const ServiceNotFound = ({ translations, locale }: ServiceNotFoundProps) => {
  const [marketingItems, setMarketingItems] = useState<MarketingItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMarketingData = async () => {
      setLoading(true)
      try {
        const response = await getMarketingData(locale)
        setMarketingItems(response)
      } catch (error) {
        console.error("Error fetching marketing data:", error)
        setMarketingItems([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchMarketingData()
  }, [locale]) // Added locale as dependency

  return (
    <div className="flex flex-col items-center justify-center lg:px-10">
      <h2 className={`${laila.className} font-semibold leading-10 text-center`}>
        {translations?.[locale]?.service_not_found_heading}
      </h2>
      <p className="text-xl text-center text-[#68737d] mb-8">
        {translations?.[locale]?.service_not_found}
      </p>
      
      {!loading ? (
        <div className="marketing-cards flex flex-wrap gap-x-8">
          {marketingItems.map((item, index) => {
            const cardData = {
              logo_url: absoluteUrl(item.logo),
              title: item.name,
              description: item.description,
              cta: {
                url: item.link,
                text: "",
                target: "_blank",
              },
              tag: item.tags,
            }
            return <MarketingCard key={index} items={cardData} />
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      
      <a
        href={`/${locale}/home`}
        className="py-[14px] px-5 bg-primary text-white rounded-md text-l mt-8 inline-block leading-[18px]"
      >
        {translations?.[locale]?.redirect_homepage}
      </a>
    </div>
  )
}

export default ServiceNotFound
