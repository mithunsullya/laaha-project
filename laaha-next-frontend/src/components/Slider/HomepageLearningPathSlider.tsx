"use client"

import React, { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "./learning-path.scss"
import { laila } from "@/src/lib/utils"
import { NextIcon, PrevIcon } from "@/src/lib/icons"
import { useLocale } from "next-intl"
import { rtlLocales } from "@/site.config"
import useWindowSize from "@/src/lib/useWindowSize"
import { LearningPathShimer } from "../Shimmer"
import dynamic from "next/dynamic"

// Dynamically import CarouselCard
const CarouselCard = dynamic(
  () => import("@/src/components/Cards/CarouselCard"),
  {
    loading: () => <div>Loading...</div>, // Optional: Display a loading state while the component is loading
  }
)

function NextArrow(props: {
  className?: string
  style?: React.CSSProperties
  onClick: () => void
}) {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className}  p-2 w-11 h-11 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    >
      <NextIcon />
    </div>
  )
}

function PrevArrow(props: {
  className?: string
  style?: React.CSSProperties
  onClick: () => void
}) {
  const { className, style, onClick } = props
  return (
    <div
      className={`${className}  p-2 w-11 h-11 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    >
      <PrevIcon />
    </div>
  )
}

interface LearningPathProps {
  name: string
  description: string
  image_uri: string
  topics: number
  resource: string | number
  cta: {
    url: string
  }
}

const HomepageLearningPathSlider = ({
  data,
  title,
  loading,
}: {
  data: any
  title: string
  loading: boolean
}) => {
  let locale = useLocale()
  const sliderRef = useRef<Slider>(null)
  let [rtlLang] = useState(rtlLocales.includes(locale as string))
  const next = () => {
    sliderRef.current?.slickNext()
  }
  const previous = () => {
    sliderRef.current?.slickPrev()
  }
  const { width } = useWindowSize()

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3.5, // Shows 3 full slides and half of another
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <div></div>,
    prevArrow: <div></div>,
    rtl: rtlLocales.includes(locale) ? true : false,
    centerMode: false, // Centers the current slide
    centerPadding: "200px", // Adjust this value based on how much of the right half you want to show
    focusOnSelect: true, // Focuses on a slide when clicked
  }

  if (loading) {
    return <LearningPathShimer />
  }

  return (
    <div className="slider-container relative mb-20">
      <div
        className={`${laila.className} text-xxxl container font-semibold mb-8 flex`}
      >
        <h1 className={"w-full md:w-1/2 text-2xl"}>{title}</h1>
        <div
          className={`w-1/2 gap-3 hidden md:flex ${rtlLang ? "flex-row justify-end" : "flex-row justify-end"}`}
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

      {loading ? (
        <LearningPathShimer />
      ) : (
        <>
          {width > 767 ? (
            <div className="learning-path-slider hidden md:block" dir={rtlLang ? "rtl" : "ltr"}>
              <Slider ref={sliderRef} {...settings}>
                {data?.map((item: any, index: number) => {
                  return (
                    <CarouselCard
                      key={index}
                      className={`mr-6 rounded-xl`}
                      item={{
                        name: item.name,
                        description: item.description,
                        topics: item.topics,
                        resource: item.resource,
                        cta: {
                          url: item.cta.url,
                        },
                        image_uri: item.image_uri,
                      }}
                    />
                  )
                })}
              </Slider>
            </div>
          ) : (
            <div className="learning-path-mobile container">
              {data?.map((item: any, index: number) => {
                return (
                  <CarouselCard
                    key={index}
                    className={`mb-6 rounded-xl block`}
                    item={{
                      name: item.name,
                      description: item.description,
                      topics: item.topics,
                      resource: item.resource,
                      cta: {
                        url: item.cta.url,
                      },
                      image_uri: item.image_uri,
                    }}
                  />
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default HomepageLearningPathSlider
