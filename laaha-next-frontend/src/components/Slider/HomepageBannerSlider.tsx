"use client"

import React, { useRef, useState } from "react"
import "slick-carousel/slick/slick.css"
import { useLocale } from "next-intl"
import { rtlLocales } from "@/site.config"
import Head from "next/head"
import Slider from "react-slick"
import { BannerShimmer } from "../Shimmer"
import './Homepagebanner.scss'
import dynamic from "next/dynamic"

// Dynamically import CarouselCard
const BannerSlider = dynamic(() => import('./BannerSlider'), {
  loading: () => <BannerShimmer />,
})

interface BannerProps {
  title: string
  subtitle: string
  description: string
  image_uri: string
  bg_image_uri: string
  cta_uri: string
  cta_title: string
}

const HomePageBannerSlider = ({
  loading,
  homepageBannerData,
}: {
  loading: boolean
  homepageBannerData: BannerProps[]
}) => {
  const sliderRef = useRef<Slider>(null)
  const [bannerData] = useState(homepageBannerData)
  const locale = useLocale()

  const settings = {
    rtl: rtlLocales.includes(locale),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <div></div>,
    prevArrow: <div></div>,
    accessibility: true,
  }

  if (loading) {
    return <BannerShimmer />
  }

  return (
    <>
      <Head>
        {/* Preload critical images */}
        {homepageBannerData.map((item, index) => (
          <React.Fragment key={index}>
            <link
              rel="preload"
              href={item.bg_image_uri}
              as="image"
              key={`bg-image-${index}`}
            />
            <link
              rel="preload"
              href={item.image_uri}
              as="image"
              key={`main-image-${index}`}
            />
          </React.Fragment>
        ))}
      </Head>

      <div className="banner-slider relative" role="region" aria-label="Banner Slider">
        <Slider ref={sliderRef} {...settings}>
          {homepageBannerData.map((item, index) => (
            <BannerSlider key={index} index={index} item={item} sliderRef={sliderRef} /> 
          ))}
        </Slider>
      </div>
    </>
  )
}

export default HomePageBannerSlider
