"use client"

import { RightArrow, CloseIcon, LeftArrow, ThumbsDown } from "@/src/lib/icons"
import { getCountryCode, laila } from "@/src/lib/utils"
import { useState, useEffect, useRef } from "react"
import { useLocale } from "next-intl"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { getAccessToken } from "@/src/lib/protectedAuth"

const STORAGE_KEY = "feedback_form_responses"

export default function FeedbackForm({ nid, handleShowForm, feedbackType, subcatTid }: any) {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isFormActive, setIsFormActive] = useState(false)
  const locale = useLocale()
  const { translations } = useTranslations()
  const countryCode = getCountryCode()
  const [feedbackItems, setFeedbackItems] = useState<any[]>([])
  const {userName, userId} = useSignUp();
  // Use refs to track current state in cleanup functions
  const responsesRef = useRef(responses)
  const hasSubmittedRef = useRef(hasSubmitted)
  const isFormActiveRef = useRef(isFormActive)

  // Update refs when state changes
  useEffect(() => {
    responsesRef.current = responses
  }, [responses])

  useEffect(() => {
    hasSubmittedRef.current = hasSubmitted
  }, [hasSubmitted])

  useEffect(() => {
    isFormActiveRef.current = isFormActive
  }, [isFormActive])

  // Initialize feedback items and set up page exit listeners
  useEffect(() => {
    const fetchFeedbackFormData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/survey-questions/laaha_survey_builder_module`,
          {
            headers: {
              locale: locale || "en",
              "Country-Code": countryCode || "US",
              "Content-Type": "application/json",
            },
          },
        )
        if (!response.ok) throw new Error("Failed to fetch feedback form data")
        const result = await response.json()
        setFeedbackItems(result.slice(1) || [])
      } catch (error) {
        console.error("Error fetching feedback form data:", error)
      }
    }

    // Load saved responses from localStorage
    const saved = localStorage.getItem(`${STORAGE_KEY}_${subcatTid}`)
    if (saved) {
      setResponses(JSON.parse(saved))
    }

    fetchFeedbackFormData()

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormActiveRef.current && Object.keys(responsesRef.current).length > 0 && !hasSubmittedRef.current) {
        // Only submit via beacon if user was actively filling the form
        sendResponsesViaBeacon()

        e.preventDefault()
        e.returnValue = "You have unsaved feedback. Are you sure you want to leave?"
        return e.returnValue
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      // Only submit on unmount if form was active
      if (isFormActiveRef.current && Object.keys(responsesRef.current).length > 0 && !hasSubmittedRef.current) {
        sendResponsesViaBeacon()
      }
    }
  }, [subcatTid, locale, countryCode]) // Removed responses, hasSubmitted, isFormActive from dependencies

  // Save responses to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      localStorage.setItem(`${STORAGE_KEY}_${subcatTid}`, JSON.stringify(responses))
    }
  }, [responses, subcatTid])

  // Update sendResponsesViaBeacon to use refs
  const sendResponsesViaBeacon = async () => {
    // Submit if form was active OR if user at least clicked like/unlike
    if (hasSubmittedRef.current || (!isFormActiveRef.current && !feedbackType)) return;
  
    const feedbackSubmit = {
      webform_id: "laaha_survey_builder_module",
      subcategory: subcatTid,
      country: countryCode,
      was_this_helpful: feedbackType,
      ...responsesRef.current,
      username: userName || "",
      user_id: userId || "",
      node_id: nid,
    };
  
    try {
      const blob = new Blob([JSON.stringify(feedbackSubmit)], {
        type: "application/json",
      });
      let beaconSent = false;

      if(!userId) {
        beaconSent = navigator.sendBeacon(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/webform_rest/submit`,
          blob
        );
      }

      if (!beaconSent) {
        const accessToken = await getAccessToken();
  
        const headers = {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        };
  
        fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/webform_rest/submit`, {
          method: "POST",
          body: JSON.stringify(feedbackSubmit),
          headers,
          keepalive: true,
        }).catch(() => {
          localStorage.setItem(`${STORAGE_KEY}_${subcatTid}_pending`, JSON.stringify(feedbackSubmit));
        });
      } else {
        localStorage.removeItem(`${STORAGE_KEY}_${subcatTid}`);
      }
    } catch (error) {
      console.error("Error sending beacon:", error);
    }
  };
  

  // Check for pending submissions on mount
  useEffect(() => {
    const checkPendingSubmissions = async () => {
      const pending = localStorage.getItem(`${STORAGE_KEY}_${subcatTid}_pending`)
      if (pending) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/webform_rest/submit`, {
            method: "POST",
            body: pending,
            headers: {
              "Content-Type": "application/json",
            },
          })
          localStorage.removeItem(`${STORAGE_KEY}_${subcatTid}_pending`)
        } catch (error) {
          console.error("Error submitting pending feedback:", error)
        }
      }
    }

    checkPendingSubmissions()
  }, [subcatTid, locale])

  // Send responses to backend
  const sendResponsesToBackend = async (responsesToSubmit = responses) => {
    let accessToken = await getAccessToken();
    if (isSubmitting || hasSubmitted) return;
  
    const feedbackSubmit = {
      webform_id: "laaha_survey_builder_module",
      subcategory: subcatTid,
      country: countryCode,
      was_this_helpful: feedbackType,
      ...responsesToSubmit,
      username: userName || "",
      user_id: userId || "",
      node_id: nid
    };
  
    setIsSubmitting(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/webform_rest/submit`, {
        method: "POST",
        headers,
        body: JSON.stringify(feedbackSubmit),
      });
  
      if (response.ok) {
        localStorage.removeItem(`${STORAGE_KEY}_${subcatTid}`);
        setHasSubmitted(true);
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleResponse = (value: any) => {
    setIsFormActive(true)
    const currentQuestion = feedbackItems[currentStep]
    const updatedResponses = {
      ...responses,
      [currentQuestion.question_code]: value,
    }

    setResponses(updatedResponses)

    // Check if this is the last question
    const isLastQuestion = currentStep === feedbackItems.length - 1

    if (!isLastQuestion) {
      // Move to next question if not last
      setCurrentStep(currentStep + 1)
    } else {
      // Only submit when answering the actual last question
      setIsCompleted(true)
      setIsFormActive(false)
      // Pass updatedResponses directly to avoid stale state
      sendResponsesToBackend(updatedResponses)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleNext = () => {
    if (currentStep < feedbackItems.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleClose = () => {
    // // Submit feedback if user has interacted with the form (even just like/unlike)
    if (!hasSubmitted && (isFormActive || feedbackType) && Object.keys(responses).length > 0) {
      const feedbackToSubmit = Object.keys(responses).length > 0 ? responses : {}
      sendResponsesToBackend(feedbackToSubmit)
    }

    setIsFormActive(false)
    handleShowForm()
  }

  const renderFeedbackInput = () => {
    if (!feedbackItems.length) return null
    const item = feedbackItems[currentStep]

    switch (item.type) {
      case "yesno":
        return (
          <div className="flex justify-center gap-4 mb-8">
            <button
              className={`w-24 border rounded py-2 inline-flex items-center gap-x-1 justify-center ${
                responses[item.question_code] === "No"
                  ? "bg-primary text-white"
                  : "border-primary text-primary hover:bg-color-secondary"
              }`}
              onClick={() => handleResponse("No")}
            >
              <ThumbsDown stroke={`${responses[item.question_code] === "No" ? "#fff" : "#F7265D"}`} />
              <span className="text-base">No</span>
            </button>
            <button
              className={`w-24 rounded-lg py-2 inline-flex items-center gap-x-1 justify-center ${
                responses[item.question_code] === "Yes" ? "bg-red text-white" : "bg-primary hover:bg-red text-white"
              }`}
              onClick={() => handleResponse("Yes")}
            >
              <div className="inline-flex -rotate-180">
                <ThumbsDown stroke={`#fff`} />
              </div>
              <span className="text-base mt-1">Yes</span>
            </button>
          </div>
        )

      case "star":
        return (
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onMouseEnter={() => setHoverRating(rating)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleResponse(rating.toString())}
                className="text-2xl"
                aria-label={`Rate ${rating} stars`}
                style={{
                  color:
                    hoverRating >= rating || responses[item.question_code] === rating.toString() ? "gold" : "lightgray",
                  cursor: "pointer",
                }}
              >
                ★
              </button>
            ))}
          </div>
        )

      case "emoji":
        return (
          <div className="flex justify-center gap-6 mb-8 text-default-black flex-wrap">
           {[
            { emoji: "😣", label: "Very Dissatisfied", value: "1" },
            { emoji: "😔", label: "Dissatisfied", value: "2" },
            { emoji: "😊", label: "Neutral", value: "3" },
            { emoji: "😃", label: "Satisfied", value: "4" },
            { emoji: "🤩", label: "Very Satisfied", value: "5" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleResponse(option.value)}
                className={`flex flex-col items-center gap-2 p-3 rounded hover:bg-gray-100 ${
                  responses[item.question_code] === option.value ? "bg-gray-200" : ""
                }`}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  if (isCompleted) {
    return (
      <div className="lg:max-w-1/2 bg-white border rounded shadow">
        <div className="relative p-6">
          <button onClick={handleClose} className="absolute top-3 end-3">
            <CloseIcon />
          </button>
          <div className="text-center py-8 text-default-black">
            <h2 className={`text-xl text-red-wine max-w-80 mx-auto font-semibold mb-8 ${laila.className}`}>
              🎉 {translations?.[locale]?.thankyou_feedback}
            </h2>
            <button onClick={handleClose} className="bg-primary hover:bg-red text-base text-white px-4 py-2 rounded">
              {translations?.[locale]?.close}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!feedbackItems.length) return null

  return (
    <div className="lg:max-w-1/2 bg-white border border-primary rounded-xl shadow">
      <div className="relative p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center w-full">
            <h2 className={`${laila.className} text-center mb-2 w-full text-xxl font-bold text-primary`}>
              {translations?.[locale]?.feedback_survey}
            </h2>
          </div>
          <button onClick={handleClose} className="absolute top-3 end-3">
            <CloseIcon />
          </button>
        </div>

        <div className="py-4">
          <h3 className={`${laila.className} text-red-wine text-xl font-semibold text-center mb-6`}>
            {feedbackItems[currentStep].question}
          </h3>

          {renderFeedbackInput()}

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`p-2 ${currentStep === 0 ? "opacity-50" : ""}`}
            >
              <LeftArrow />
            </button>

            <div className="flex gap-1 text-color-neutral p-2 font-semibold text-base">
              <span className={`${laila.className}`}>
                <span className="text-primary">{currentStep + 1}</span> / {feedbackItems.length}
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === feedbackItems.length - 1}
              className={`p-2 ${currentStep === feedbackItems.length - 1 ? "opacity-50" : ""}`}
            >
              <RightArrow fill="#f7265d" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
