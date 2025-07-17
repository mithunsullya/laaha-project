import { useTranslations } from "@/src/contexts/TranslationsContext"
import { ExternalLink } from "@/src/lib/icons"
import { laila } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"

interface Props {
  className?: string
  items: {
    logo_url: string
    title: string
    description: string
    cta: {
      url: string
      text?: string
      target?: string
    }
    tag: string
  }
}

const MarketingCard = ({ className, items }: Props) => {
  const { translations } = useTranslations()
  const locale = useLocale()

  return (
    <div className={`marketing-card mb-6 md:mb-0 md:flex-[0_0_50%] md:max-w-[calc(50%-1rem)] ${className}`}>
      <div className="border flex flex-col justify-between border-solid border-gray-500 bg-white h-full rounded-[1.25rem] p-5">
        <div className="top-content">
          {items?.logo_url && (
            <div className="logo mb-5">
              <Image
                src={items?.logo_url}
                loading="lazy"
                width={152}
                height={57}
                alt="Brands"
                className="max-w-40 object-contain"
              />
            </div>
          )}
          <div className={`title mb-2 ${laila.className} text-xl font-semibold`}>
            {items?.title}
          </div>
          <div
            className="description mb-2 text-color-neutral"
            dangerouslySetInnerHTML={{ __html: items?.description }}
          ></div>
          <div className="tag mb-5 bg-color-secondary p-1 rounded-sm inline-block text-sm">
            {items?.tag}
          </div>
        </div>
        <div className="cta-button" role="button">
          <a
            href={items?.cta.url}
            target={items?.cta?.target || "_blank"}
            className="text-white inline-flex items-center justify-center w-full text-center text-m gap-x-1 bg-primary py-2.5 px-4 rounded-[4px] hover:bg-red transition-all delay-75"
          >
            {translations?.[locale]?.visit_website_text || "Visit the website"}
            <ExternalLink />
          </a>
        </div>
      </div>
    </div>
  )
}

export default MarketingCard
