"use client"

import { useState, useEffect, useRef } from "react"
import Logo from "../Header/Logo"
import StarRating from "./StarRating"
import { CloseIcon } from "@/src/lib/icons"
import { useLocale } from "next-intl"
import { getCountryCode, laila } from "@/src/lib/utils"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { getAccessToken } from "@/src/lib/protectedAuth"

export default function RatingsPopup({ isOpen, setIsOpen }: any) {
  const [mainRating, setMainRating] = useState<any>({})
  const [secondaryRatings, setSecondaryRatings] = useState<any>({})
  const [questions, setQuestions] = useState<any>(null)
  const [canRate, setCanRate] = useState(true) // Determines if user can rate again
  const [message, setMessage] = useState("")
  const locale = useLocale()
  const { translations } = useTranslations()
  const countryCode = getCountryCode()
  const popupRef = useRef<any>(null)
  let { userName, userId } = useSignUp()

  // Check if user has already given a rating within the last 24 hours
  useEffect(() => {
    const lastRatingTime = localStorage.getItem("lastRatingTime")
    if (lastRatingTime) {
      const timeElapsed = Date.now() - parseInt(lastRatingTime)
      const hoursElapsed = timeElapsed / (1000 * 60 * 60) // Convert milliseconds to hours

      if (hoursElapsed < 24) {
        setCanRate(false)
        setMessage(`${translations?.[locale]?.submitted_message}`)
      }
    }
    let fetchFeedbackFormData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/survey-questions/laaha_survey_form_overall`,
          {
            headers: {
              locale: locale || "en",
              "Country-Code": countryCode || "US",
              "Content-Type": "application/json",
            },
          }
        )
        if (!response.ok) throw new Error("Failed to fetch feedback form data")
        const result = await response.json()

        let formattedResult = {
          mainQuestion: {
            question: result[0].question,
            id: result[0].question_code,
          },
          secondaryQuestions: result.slice(1).map((q: any) => ({
            id: q.question_code,
            question: q.question,
          })),
        }
        setQuestions(formattedResult)
      } catch (error) {
        console.error("Error fetching feedback form data:", error)
      }
    }
    fetchFeedbackFormData()
  }, [isOpen])

  // Close the popup if the user clicks outside the popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleSubmit()
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  const handleMainRatingChange = (key: string, rating: number) => {
    setMainRating({ [key]: rating })
  }

  const handleSecondaryRating = (key: string, rating: number) => {
    setSecondaryRatings((prev: any) => ({
      ...prev,
      [key]: rating,
    }))
  }

  const handleSubmit = async () => {
    let accessToken = await getAccessToken()

    // Save ratings locally
    localStorage.setItem("mainRating", JSON.stringify(mainRating))
    localStorage.setItem("secondaryRatings", JSON.stringify(secondaryRatings))
    localStorage.setItem("lastRatingTime", Date.now().toString())

    const payload = {
      webform_id: "laaha_survey_form_overall",
      ...mainRating,
      ...secondaryRatings,
      country: countryCode,
      username: userName || "",
      user_id: userId || "",
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        locale: locale || "en",
        "Country-Code": countryCode || "US",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
          cache: "no-store",
          next: { revalidate: 0 },
        }
      )

      if (!response.ok) throw new Error("Failed to submit survey")

      setMessage(translations?.[locale]?.thankyou_message)
      setMainRating({})
      setSecondaryRatings({})
    } catch (error) {
      console.error("Survey submission error:", error)
      setMessage("Submission failed. Please try again later.")
    }
  }

  if (!questions) return null

  return (
    <div className="flex items-center justify-center bg-gray-100">
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 top-0 lg:inset-0 lg:shadow-3xl bg-[rgba(83,79,79,0.3)] z-50 flex justify-center items-center">
          <div
            ref={popupRef}
            className="max-w-md absolute w-full bottom-0 lg:bottom-auto lg:relative mx-auto p-0 bg-white border-0 rounded-tl-2xl rounded-tr-2xl lg:shadow-2xl lg:rounded-2xl"
          >
            <div
              className={` p-6 min-h-[80vh] max-h-[80vh] overflow-y-auto lg:min-w-[440px]`}
            >
              {/* Close button */}
              <button
                className="absolute bg-white end-4 top-4"
                onClick={async () => {
                  const hasAnyRating =
                    Object.keys(mainRating).length > 0 ||
                    Object.keys(secondaryRatings).length > 0
                  setIsOpen(false)

                  if (hasAnyRating && canRate) {
                    await handleSubmit()
                  }
                }}
              >
                <CloseIcon />
              </button>
              <h3 className="text-primary font-bold text-xl lg:hidden">
                {" "}
                {translations?.[locale]?.help_improve}{" "}
              </h3>
              {/* Logo */}
              <div
                className={`${!message ? "" : "bg-color-secondary"} border mb-8 mt-8 border-gray-500 rounded-2xl`}
              >
                <div className="text-center mb-6">
                  <div className="text-2xl py-2 border-gray-500 rounded-2xl bg-white border-b font-bold text-primary flex items-center justify-center">
                    <Logo svgClassName={"min-w-28 lg:min-w-28"} />
                  </div>
                </div>

                {/* Main Question */}
                {!message ? (
                  <div className="mb-3 px-4">
                    <h3
                      className={`text-center text-default-black font-bold mb-4 leading-relaxed ${laila.className}`}
                    >
                      {questions.mainQuestion.question}
                    </h3>
                    <div className="flex justify-center">
                      <StarRating
                        rating={mainRating[questions.mainQuestion.id] || 0}
                        onRatingChange={(rating) =>
                          handleMainRatingChange(
                            questions.mainQuestion.id,
                            rating
                          )
                        }
                        size="md"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`font-bold text-center max-w-60 mx-auto mb-6 text-primary px-4 py-4 ${laila.className}`}
                  >
                    {" "}
                    {message}
                  </div>
                )}
              </div>

              {/* Secondary Questions */}
              {!message && (
                <>
                  <div
                    className={`space-y-4 mb-6 ${!mainRating[questions.mainQuestion.id] ? "opacity-30 pointer-events-none" : "opacity-100"}`}
                  >
                    {questions.secondaryQuestions.map((q: any) => (
                      <div
                        key={q.id}
                        className="flex items-center justify-between pb-2"
                      >
                        <span
                          className={`text-m font-semibold text-default-black pe-4 ${laila.className}`}
                        >
                          {q.question}
                        </span>
                        <StarRating
                          rating={secondaryRatings[q.id] || 0}
                          onRatingChange={(rating) =>
                            handleSecondaryRating(q.id, rating)
                          }
                          size="sm"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    {canRate && (
                      <button
                        disabled={!mainRating[questions.mainQuestion.id] ? true : false}
                        onClick={handleSubmit}
                        className={`${!mainRating[questions.mainQuestion.id] ? 'opacity-50': 'opacity-100'} bg-primary hover:bg-red text-sm font-bold text-white px-8 py-2 rounded-full border border-primary`}
                      >
                        {translations?.[locale]?.submit}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
