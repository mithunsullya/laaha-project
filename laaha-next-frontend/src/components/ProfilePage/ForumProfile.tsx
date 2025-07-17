import { useTranslations } from "@/src/contexts/TranslationsContext"
import useWindowSize from "@/src/lib/useWindowSize"
import { useLocale } from "next-intl"
import React, { ChangeEvent, useEffect, useState } from "react"
import { ListingShimmer } from "../Shimmer"
import UserQuestionList from "./UserQuestionList"
import UserCommentList from "./UserCommentList"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { getUserComments, getUserQuestions } from "@/src/lib/apis"
import { getAccessToken } from "@/src/lib/protectedAuth"
import { laila } from "@/src/lib/utils"
import { QuestionParams } from "./Profile"

interface ForumProfileProps {
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  questionParams: QuestionParams
  setQuestionParams: React.Dispatch<React.SetStateAction<QuestionParams>>
  isActive: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  questionData: any[] // Ideally, you would define a more specific type here
  setQuestionData: React.Dispatch<React.SetStateAction<any[]>>
  commentData: any[] // Same for comment data
  setCommentData: React.Dispatch<React.SetStateAction<any[]>>
}

const ForumProfile: React.FC<ForumProfileProps> = ({
  handleCheckboxChange,
  questionParams,
  setQuestionParams,
  isActive,
  setActive,
  questionData,
  setQuestionData,
  commentData,
  setCommentData,
}) => {
  const [activeTab, setActiveTab] = useState<"questions" | "comments">(
    "questions"
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { translations } = useTranslations()
  const { userName, isUserLoggedIn, userAvatarUrl, userId, role } = useSignUp()

  const locale = useLocale()
  const { width } = useWindowSize()

  const fetchResources = async (questionParams: QuestionParams) => {
    let accessToken = await getAccessToken()

    setLoading(true)
    try {
      const { pageNumber, pageLimit } = questionParams
      const status = Object.entries(questionParams)
        .filter(([key, value]) => value === true)
        .map(([key]) => key)
        .join(",")

      if (activeTab === "questions") {
        const response = await getUserQuestions(
          status,
          pageNumber,
          pageLimit,
          accessToken || "",
          locale
        )
        const newData = response.data
        setQuestionData((prevData) => {
          const existingData = prevData || []
          return [...existingData, ...(newData.questions || [])]
        })
        setHasMore(newData && newData.questions?.length === pageLimit)
      }

      if (activeTab === "comments") {
        const response = await getUserComments(
          status,
          pageNumber,
          pageLimit,
          accessToken || "",
          locale
        )
        const newData = response.data
        setCommentData((prevData) => {
          const existingData = prevData || []
          return [...existingData, ...(newData.comments || [])]
        })
        setHasMore(newData && newData.comments?.length === pageLimit)
      }
    } catch (error) {
      console.error("Error fetching resources:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources(questionParams)
  }, [questionParams])

  useEffect(() => {
    const hashValue = window.location.hash
    if (hashValue) {
      const tabValue = hashValue ? hashValue.substring(1) : "questions"
      setQuestionParams((prevQuestionList: any) => ({
        ...prevQuestionList,
        selectedTab: tabValue as "questions" | "comments",
      }))
      setActiveTab(tabValue as "questions" | "comments")
    }
  }, [])

  const handleTabMenu = (menuID: "questions" | "comments") => {
    setQuestionData([])
    setCommentData([])
    setQuestionParams((prevQuestionList) => ({
      ...prevQuestionList,
      pageNumber: 1,
      selectedTab: menuID,
    }))
    setActiveTab(menuID)
  }

  const loadMore = () => {
    if (loading) return
    setQuestionParams((prevParams) => ({
      ...prevParams,
      pageNumber: prevParams.pageNumber + 1,
    }))
  }
  return (
    <div className="main-content lg:flex-1 w-full">
      <div className="tabs inline-flex gap-8 overflow-x-auto w-full mb-8 shadow-[0px_1px_0_0_rgba(0,0,0,.1)]">
        <a
          href="#"
          className={`tab leading-8 cursor-pointer ${activeTab === "questions" ? "active text-primary border-b-2 border-primary" : ""}`}
          onClick={() => handleTabMenu("questions")}
        >
          {translations?.[locale]?.questions}
        </a>
        <a
          href="#comments"
          className={`tab leading-8 cursor-pointer ${activeTab === "comments" ? "active text-primary border-b-2 border-primary" : ""}`}
          onClick={() => handleTabMenu("comments")}
        >
          {translations?.[locale]?.comments}
        </a>
      </div>
      {width < 992 && (
        <div className="question-filters py-2 px-4 border border-gray-300 rounded-md mb-8">
          <div
            className={`heading border-b border-gray-300 pb-2 font-semibold ${laila.className}`}
            onClick={() => setActive(!isActive)}
          >
            {translations?.[locale]?.filters}
            <span
              className={isActive ? "arrow-down active" : "arrow-down"}
            ></span>
          </div>
          <div
            className={isActive ? "filter-checkbox active" : "filter-checkbox"}
          >
            <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
              <input
                type="checkbox"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                name="review"
                checked={questionParams.review}
                onChange={handleCheckboxChange}
              />
              {translations?.[locale]?.in_review}
            </label>
            <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
              <input
                type="checkbox"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                name="published"
                checked={questionParams.published}
                onChange={handleCheckboxChange}
              />
              {translations?.[locale]?.published}
            </label>
            <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
              <input
                type="checkbox"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                name="unpublished"
                checked={questionParams.unpublished}
                onChange={handleCheckboxChange}
              />
              {translations?.[locale]?.unpublished}
            </label>
            <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
              <input
                type="checkbox"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                name="archived"
                checked={questionParams.archived}
                onChange={handleCheckboxChange}
              />
              {translations?.[locale]?.rejected}
            </label>
            <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
              <input
                type="checkbox"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                name="draft"
                checked={questionParams.draft}
                onChange={handleCheckboxChange}
              />
              {translations?.[locale]?.drafts}
            </label>
          </div>
        </div>
      )}
      {loading ? (
        <ListingShimmer />
      ) : questionParams.selectedTab === "questions" ? (
        questionData && (
          <UserQuestionList
            questionList={questionData}
            currentUser={{ userName, userAvatarUrl }}
          />
        )
      ) : (
        commentData && (
          <UserCommentList
            commentList={commentData}
            currentUser={{ userName, userAvatarUrl }}
          />
        )
      )}
      {hasMore && !loading && (
        <button
          className="view-all-conversations mb-8 bg-primary p-4 rounded-xl hover:bg-red w-full text-center text-white"
          onClick={loadMore}
        >
          {translations?.[locale]?.view_all_conversations}
        </button>
      )}
    </div>
  )
}

export default ForumProfile
