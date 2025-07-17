import { useTranslations } from "@/src/contexts/TranslationsContext"
import { laila } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

const RecommendedCard = ({data, category}:any) => {
  const { translations } = useTranslations()
  const locale = useLocale();

  return (
    <div className="recommended-card lg:flex gap-x-6 items-start">
      <div className="image lg:flex-[0_0_45%] rounded-lg overflow-hidden mb-4 lg:mb-0">
        <Image className="lg:min-h-[246px] object-cover" src={data?.thumbnail_image} alt="" width={440} height={246} />
      </div>
      <div className="content">
        <div className={`${laila.className } tag mb-2 font-semibold text-sm inline-block bg-color-secondary p-2 rounded-lg text-primary`}>
          { category }
        </div>
        <h3 className={`title font-bold text-xxl mb-2 leading-9 ${laila.className}`}>{data?.title}</h3>
        { data.description && <div className="description leading-6 mb-6">
          { data?.description }
        </div>}
        <div className="inline-flex gap-x-4 mt-2 items-center">
          <Link data-analytics={translations?.[locale]?.read_more} className="py-2 px-6 bg-primary inline-block hover:bg-red text-white rounded-lg" href={data?.link}> { translations?.[locale]?.read_more } </Link>{" "}
          <Link data-analytics={translations?.[locale]?.explore_link} href={data?.explore_link} className="py-2 px-8 inline-block bg-white text-primary hover:text-red hover:border-red border-primary border rounded-lg"> {translations?.[locale]?.explore || "Explore"} </Link>{" "}
        </div>
      </div>
    </div>
  )
}

export default RecommendedCard
