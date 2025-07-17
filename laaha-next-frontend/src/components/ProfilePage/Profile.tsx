"use client"

import { useState, ChangeEvent, useMemo } from "react"
import useWindowSize from "@/src/lib/useWindowSize"
import UserInfo from "./UserInfo"
import { laila } from "@/src/lib/utils"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "use-intl"
import AccessDenied from "../AccessDenied"
import ForumProfile from "./ForumProfile"
import MyProfile from "./MyProfile"
import TrendingSection from "../Trending"
import RecommendedSection from "../RecommendedSection"
import './Profilepage.scss';
import { StarIcon } from "@/src/lib/icons"
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking"
import { useClientContext } from "@/src/lib/queryclient"
import { useValidUser } from "@/src/contexts/ValidCountryUser"
export interface QuestionParams {
  review: boolean
  published: boolean
  unpublished: boolean
  archived: boolean
  draft: boolean
  selectedTab: "questions" | "comments"
  pageNumber: number
  pageLimit: number
}

const Profile: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<number>(0)
  const [isActive, setActive] = useState<boolean>(false)
  const { userName, isUserLoggedIn, userAvatarUrl, userId, role, isEvaluatedUser } = useSignUp()
  const [questionData, setQuestionData] = useState<any[]>([])
  const [commentData, setCommentData] = useState<any[]>([])
  const [questionParams, setQuestionParams] = useState<QuestionParams>({
    review: false,
    published: false,
    unpublished: false,
    archived: false,
    draft: false,
    selectedTab: "questions",
    pageNumber: 1,
    pageLimit: 10,
  })
  const { width } = useWindowSize()
  const { translations } = useTranslations()
  const locale = useLocale()
  const { ip, alias } = useClientContext();
  const { isValidUser } = useValidUser();

  useUserPageTracking({ userId: userId || '0', nid: '0', locale, pageName: translations?.[locale]?.user_profile, isEvaluatedUser, ip, alias })

  if (!isUserLoggedIn && role !== "forum_user") {
    return <AccessDenied />
  }

  const handleClick = (index: any) => {
    setActiveMainTab(index)
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setQuestionData([])
    setCommentData([])
    setQuestionParams((prevParams) => ({
      ...prevParams,
      [name]: checked,
      pageNumber: 1,
    }))
  }

  // Memoize tabs array to avoid re-creating the tab components every render
  const tabs = [
      {
        id: 0,
        name: `${translations?.[locale]?.my_progress}`,
        component: <MyProfile />
      },
      {
        id: 1,
        name: `${translations?.[locale]?.my_forum}`,
        component: (
          <ForumProfile
            handleCheckboxChange={handleCheckboxChange}
            questionParams={questionParams}
            setQuestionParams={setQuestionParams}
            isActive={isActive}
            setActive={setActive}
            questionData={questionData}
            setQuestionData={setQuestionData}
            commentData={commentData}
            setCommentData={setCommentData}
          />
        ),
      },
    ]

  // Memoize the active component to avoid re-rendering when tabs switch
  const ActiveComponent = tabs[activeMainTab]?.component || null

  return (
    <div className="user-profile flex gap-x-8 py-6 flex-wrap lg:flex-nowrap">
      <div className="sidebar lg:flex-[0_0_24%]">
        <UserInfo currentUser={{ userName, userAvatarUrl, userId }} />
        {activeMainTab === 1 && (
          <>
            {width > 992 && (
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
                  className={
                    isActive ? "filter-checkbox active" : "filter-checkbox"
                  }
                >
                  <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="absolute end-0 top-1/2 -translate-y-1/2"
                      name="review"
                      checked={questionParams.review}
                      onChange={handleCheckboxChange}
                    />
                    {translations?.[locale]?.in_review}
                  </label>
                  <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="absolute end-0 top-1/2 -translate-y-1/2"
                      name="published"
                      checked={questionParams.published}
                      onChange={handleCheckboxChange}
                    />
                    {translations?.[locale]?.published}
                  </label>
                  <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="absolute end-0 top-1/2 -translate-y-1/2"
                      name="unpublished"
                      checked={questionParams.unpublished}
                      onChange={handleCheckboxChange}
                    />
                    {translations?.[locale]?.unpublished}
                  </label>
                  <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="absolute end-0 top-1/2 -translate-y-1/2"
                      name="archived"
                      checked={questionParams.archived}
                      onChange={handleCheckboxChange}
                    />
                    {translations?.[locale]?.rejected}
                  </label>
                  <label className="block py-2 text-color-neutral text-m cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="absolute end-0 top-1/2 -translate-y-1/2"
                      name="draft"
                      checked={questionParams.draft}
                      onChange={handleCheckboxChange}
                    />
                    {translations?.[locale]?.drafts}
                  </label>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="main-content lg:flex-[0_0_73%] lg:max-w-[73%] w-full">
        <div className="tabs inline-flex gap-8 overflow-x-auto w-full mb-8 shadow-[0px_1px_0_0_rgba(0,0,0,.1)]">
          { isValidUser ? (tabs.map((tab, index) => (
            <div
              className={`tab cursor-pointer leading-8 ${tab.id === activeMainTab ? "text-primary border-b-2 border-primary" : ""}`}
              onClick={() => handleClick(index)}
              key={tab.id}
            >
              {tab.name}
            </div>
          ))) : (
            <div
              className={`tab cursor-pointer leading-8 ${tabs[0].id === activeMainTab ? "text-primary border-b-2 border-primary" : ""}`}
              onClick={() => handleClick(0)}
              key={tabs[0].id}
            >
              {tabs[0].name}
            </div>
          )}
        </div>
        {ActiveComponent}
        <TrendingSection />
      {/* <div className="recommended-section p-6 rounded-2xl bg-white mt-8 mb-8 shadow-md">
          <h3 className={`text-xl font-bold flex gap-x-2 mb-6 ${laila.className} text-primary`}>
          <StarIcon /> { translations?.[locale]?.recommended_for_you } </h3> */}

        <RecommendedSection />
      {/* </div> */}
      </div>
    </div>
  )
}

export default Profile
