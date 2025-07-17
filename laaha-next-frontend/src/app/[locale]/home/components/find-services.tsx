import { useLocale } from "next-intl"
import { laila } from "@/src/lib/utils"
import { FindServicesShimmer } from "@/src/components/Shimmer"

type findServicesProps = [{
  description: string
  cta: {
    link:string,
    link_text: string
  }
}]

export default function FindServices({
  findServicesData,
  loading
}: {
  findServicesData: findServicesProps
  loading: boolean
}) {
  const locale = useLocale()

  if(loading) {
    return <FindServicesShimmer />
  }

  return (
    <div className="find-services-wrapper bg-primary text-white py-6 font-univers">
      <div className="container">
        <div className="find-services__content flex justify-between items-center flex-wrap md:flex-nowrap">
          <div className="content__wrapper">
            <div className="description text-l">
              {findServicesData?.[0]?.description || 'If you or someone needs help, click here to find nearby services and learn how to connect with them.'}
            </div>
          </div>
          <a
            href={`/${locale}${findServicesData?.[0]?.cta?.link}`}
            className={`cta bg-color-tertiary text-default-black ${laila.className} text-l font-semibold py-4 px-6 rounded-md mt-4 md:mt-0 text-nowrap hover:underline`}
          >
            {findServicesData?.[0]?.cta?.link_text || 'Find Services'}
          </a>
        </div>
      </div>
    </div>
  )
}
