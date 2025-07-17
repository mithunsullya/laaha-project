import { rtlLocales } from "@/site.config"
import useWindowSize from "@/src/hooks/useWindowSize"
import { NextIcon, PrevIcon } from "@/src/lib/icons"
import { laila } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import Link from "next/link"

function NextArrow(props: {
  className?: string
  style?: React.CSSProperties
  onClick: () => void
}) {
  const { className, style, onClick } = props
  return (
    <button
      className={`${className} p-2 w-11 h-11 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Next slide"
    >
      <NextIcon />
    </button>
  )
}

function PrevArrow(props: {
  className?: string
  style?: React.CSSProperties
  onClick: () => void
}) {
  const { className, style, onClick } = props
  return (
    <button
      className={`${className} p-2 w-11 h-11 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <PrevIcon />
    </button>
  )
}

const BannerSlider = ({ item, index, sliderRef }: any) => {
  const locale = useLocale()
  const windowSize = useWindowSize()

  const next = () => sliderRef.current?.slickNext()
  const previous = () => sliderRef.current?.slickPrev()
  return (
    <div
      key={index}
      className="banner-slide"
      aria-labelledby={`banner-slide-title-${index}`}
      tabIndex={0}
    >
      <div className="pt-8 md:pt-20 pb-10 banner-background">
        <Image
          src={item.bg_image_uri}
          alt={`Banner background for slide ${index + 1}`}
          width={windowSize[0] < 768 ? 375 : 800}
          height={windowSize[1] < 768 ? 800 : 600}
          objectPosition="center center"
          priority={index == 0}
          className="absolute top-0 start-0 z-0 w-full h-full object-cover"
        />

        <div
          className={`container flex flex-col-reverse font-univers md:justify-between flex-wrap ${rtlLocales.includes(locale) ? "md:flex-row-reverse text-right" : "md:flex-row text-left"}`}
        >
          <div className="text-content w-full md:w-1/2 flex flex-col justify-between relative z-10">
            <div>
              <h2
                id={`banner-slide-title-${index}`}
                className={`title font-bold text-3xl md:text-[48px] ${laila.className} leading-tight`}
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <h3
                className={`subtitle font-semibold mb-4 text-xxl md:text-4xl ${laila.className} leading-[48px]`}
              >
                {item.subtitle}
              </h3>
              <p className="text-m md:text-xl leading-6 mt-8 font-univers text-color-neutral">
                {item.description}
              </p>
              {item.cta_uri && (
                <Link
                  href={`/${locale}${item.cta_uri}`}
                  className="cta-button bg-primary hover:bg-red text-white px-[24px] py-[10px] rounded-full text-l mt-8 inline-block"
                  aria-label={`Go to ${item.cta_uri.split("/")[1].replace("-", " ")}`}
                >
                  {item.cta_title}
                </Link>
              )}
            </div>
            <div
              className={`cta flex gap-4 w-full  py-6 ${locale === 'fr' ? '' : 'lg:bottom-8 lg:absolute '} ${rtlLocales.includes(locale) ? "md:flex-row-reverse justify-end md:justify-start" : ""}`}
            >
              <PrevArrow
                className="prev-arrow bg-primary flex justify-center items-center rounded-full"
                onClick={previous}
              />
              <NextArrow
                className="next-arrow bg-primary flex justify-center items-center rounded-full"
                onClick={next}
              />
            </div>
          </div>
          <div className="image-content w-full md:w-[42%] flex justify-end pb-8 relative z-10">
            <Image
              src={item.image_uri}
              width={windowSize[0] < 768 ? 360 : 500}
              height={windowSize[1] < 768 ? 380 : 400}
              placeholder="blur"
              blurDataURL="data:image/png;base64,..."
              alt={`Image for banner slide ${index + 1}`}
              layout="responsive"
              priority={index == 0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerSlider
