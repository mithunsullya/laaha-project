"use client"
export const runtime = "edge";

import { locales, rtlLocales } from "@/site.config"
import QuestionDetails from "@/src/components/CommunityPage/QuestionDetails"
import ApprovalForm from "@/src/components/Moderators/ApprovalForm"
import ReportedForm from "@/src/components/Moderators/ReportedForm"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import {
  getIndividualModerateQuestions,
  getModerateQuestions,
  getIndividualModerateReportedQues,
  getModerateRepliesData,
  getIndividualModerateReplies,
  getReportedQuestionsData,
  getReportedRepliesData,
  getIndividualModerateReportedAns,
  getSensitiveWordsData,
} from "@/src/lib/apis"
import { getAccessToken } from "@/src/lib/protectedAuth"
import { absoluteUrl } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { HighlightedText } from "./HighlightedText"
import AccessDenied from "@/src/components/AccessDenied"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useModeratorDashboard } from "@/src/contexts/ModeratorContext"

const UpdatedModeratorDashboard = () => {
  const [middleData, setMiddleData] = useState<any>()
  const [mainData, setMainData] = useState<any>()
  const [openModal, setOpenModal] = useState<any>()
  const locale = useLocale()
  const [avatarUrls, setAvatarUrls] = useState<string[] | null>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mainAvatar, setMainAvatar] = useState<string | null>("")
  const [sensitiveWords, setSensitiveWords] = useState<string[]>([])
  const [isNavigating, setIsNavigating] = useState(false)

  const { userName, userAvatarUrl, isUserLoggedIn, role } = useSignUp()
  const { translations } = useTranslations()

  // Use the context for state management
  const {
    activeSidebarItem,
    activeMiddleIndex,
    pendingNavigation,
    setActiveSidebarItem,
    setActiveMiddleIndex,
    clearPendingNavigation,
  } = useModeratorDashboard()

  const currentUser = {
    userName,
    isUserLoggedIn,
    userAvatarUrl,
  }

  const invertedLocales = Object.fromEntries(Object.entries(locales).map(([key, value]) => [value, key]))

  const getAvatarUrl = (inputString: string) => {
    const regex = /\/sites\/[^\s"]+/
    const url = inputString?.match(regex)

    if (url) {
      return url[0]
    } else {
      return "assets/images/default-avatar.png"
    }
  }

  const getModerateQuestion = async () => {
    const token = await getAccessToken()
    const data = await getModerateQuestions(locale, token)
    setMiddleData(data)
    return data
  }

  const getModerateReplies = async () => {
    const token = await getAccessToken()
    const data = await getModerateRepliesData(locale, token)
    setMiddleData(data)
    return data
  }

  const getAvatarImage = async (uuid: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/jsonapi/taxonomy_term/avtar_image/${uuid}/field_image?fields[file--file]=uri`,
    )
    const data = await response.json()
    return data.data?.attributes?.uri?.url
  }

  const getReportedQuestions = async () => {
    const token = await getAccessToken()
    setIsLoading(true)
    const data = await getReportedQuestionsData(locale, token)

    const avatarItem = await Promise.all(
      data.map(async (item: any) => {
        const avatarImage = await getAvatarImage(item.avatar_of_author)
        return avatarImage
      }),
    )

    setMiddleData(data)
    setAvatarUrls(avatarItem)
    setIsLoading(false)
    return { data, avatarItem }
  }

  const getReportedReplies = async () => {
    const token = await getAccessToken()
    setIsLoading(true)
    const data = await getReportedRepliesData(locale, token)

    const avatarItem = await Promise.all(
      data.map(async (item: any) => {
        const avatarImage = await getAvatarImage(item.avatar_of_author)
        return avatarImage
      }),
    )
    setMiddleData(data)
    setAvatarUrls(avatarItem)
    setIsLoading(false)
    return { data, avatarItem }
  }

  const handleSecondColData = useCallback(
    async (dataType: string) => {
      if (dataType === "moderate-question") {
        return await getModerateQuestion()
      }
      if (dataType === "moderate-replies") {
        return await getModerateReplies()
      }
      if (dataType === "reported-questions") {
        return await getReportedQuestions()
      }
      if (dataType === "reported-replies") {
        return await getReportedReplies()
      }
    },
    [locale],
  )

  const handleSidebarItemClick = (item: string) => {
    setMiddleData([])
    setMainData("")
    setActiveSidebarItem(item)
    setActiveMiddleIndex(null)
  }

  const fetchIndividualQuestion = async (questionID: string | number) => {
    const token = await getAccessToken()

    try {
      const response = await getIndividualModerateQuestions(locale, questionID, token)
      setMainData(response)
    } catch (error: any) {
      console.error("Error fetching question:", error)
    }
  }

  const fetchIndividualReplies = async (replyID: string | number) => {
    const token = await getAccessToken()

    try {
      const response = await getIndividualModerateReplies(locale, replyID, token)
      setMainData(response)
    } catch (error: any) {
      console.error("Error fetching question:", error)
    }
  }

  const fetchIndividualReportedQuestion = async (qID: string | number) => {
    const token = await getAccessToken()

    try {
      const response = await getIndividualModerateReportedQues(locale, qID, token)
      setMainData(response)
    } catch (error: any) {
      console.error("Error fetching question:", error)
    }
  }

  const fetchIndividualReportedAnswer = async (rID: string | number) => {
    const token = await getAccessToken()

    try {
      const response = await getIndividualModerateReportedAns(locale, rID, token)
      setMainData(response)
    } catch (error: any) {
      console.error("Error fetching question:", error)
    }
  }

  const handleMiddleItemClick = (id: string, dataType: string, userAvatar: string | null = "") => {
    setActiveMiddleIndex(id)
    if (dataType === "moderate-question") {
      fetchIndividualQuestion(id)
    }
    if (dataType === "moderate-replies") {
      fetchIndividualReplies(id)
    }
    if (dataType === "reported-questions") {
      fetchIndividualReportedQuestion(id)
      setMainAvatar(userAvatar)
    }
    if (dataType === "reported-replies") {
      fetchIndividualReportedAnswer(id)
      setMainAvatar(userAvatar)
    }
  }

  const getSensitiveWords = async () => {
    const token = await getAccessToken()

    const response = await getSensitiveWordsData(locale, token)
    setSensitiveWords(response.map((item: any) => item.name))
  }

  // Handle navigation from notifications - this is now a controlled async process
  const handleNotificationNavigation = useCallback(
    async (navigation: any) => {
      if (isNavigating) return // Prevent multiple simultaneous navigations

      setIsNavigating(true)
      console.log("Starting navigation to:", navigation)

      try {
        // Step 1: Set the sidebar item
        setActiveSidebarItem(navigation.targetSection)

        // Step 2: Load the data and wait for it to complete
        const result = await handleSecondColData(navigation.targetSection)

        let freshData: any[] = []
        let freshAvatarUrls: string[] = []

        if (navigation.targetSection === "reported-questions" || navigation.targetSection === "reported-replies") {
          freshData = result?.data || []
          freshAvatarUrls = result?.avatarItem || []
        } else {
          freshData = result || []
        }

        // Step 3: Find the target item in the fresh data
        const targetItem = freshData.find((item: any) => {
          const itemId = (item.id || item.cid || item.nid)?.toString()
          return itemId === navigation.entityId
        })

        if (targetItem) {
          console.log("Found target item:", targetItem)
          const avatarIndex = freshData.indexOf(targetItem)
          const itemId = (targetItem.id || targetItem.cid || targetItem.nid)?.toString()

          // Step 4: Set the active middle index
          setActiveMiddleIndex(itemId)

          // Step 5: Fetch the individual item details
          const userAvatar = freshAvatarUrls[avatarIndex] || ""

          if (navigation.targetSection === "moderate-question") {
            await fetchIndividualQuestion(itemId)
          } else if (navigation.targetSection === "moderate-replies") {
            await fetchIndividualReplies(itemId)
          } else if (navigation.targetSection === "reported-questions") {
            await fetchIndividualReportedQuestion(itemId)
            setMainAvatar(userAvatar)
          } else if (navigation.targetSection === "reported-replies") {
            await fetchIndividualReportedAnswer(itemId)
            setMainAvatar(userAvatar)
          }

          console.log("Navigation completed successfully")
        } else {
          console.warn(
            `Item with ID ${navigation.entityId} not found in loaded data. Available items:`,
            freshData.map((item: any) => ({
              id: item.id || item.cid || item.nid,
              title: item.title || item.comment,
            })),
          )
        }
      } catch (error) {
        console.error("Error during navigation:", error)
      } finally {
        // Step 6: Clear the pending navigation and reset navigation state
        clearPendingNavigation()
        setIsNavigating(false)
      }
    },
    [isNavigating, handleSecondColData, clearPendingNavigation],
  )

  // Effect to handle navigation from notifications
  useEffect(() => {
    if (pendingNavigation && !isNavigating) {
      handleNotificationNavigation(pendingNavigation)
    }
  }, [pendingNavigation, isNavigating, handleNotificationNavigation])

  useEffect(() => {
    getSensitiveWords()
  }, [])

  if (!isUserLoggedIn && role !== "moderator") {
    return <AccessDenied />
  }

  return (
    <>
      <div className="moderator-dashboard container">
        {isNavigating && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
            Navigating to notification...
          </div>
        )}
        <div className="flex flex-wrap gap-x-5">
          <div className="left-sidebar mb-4 lg:mb-0 w-full p-4 bg-gray-200 lg:flex-[0_0_15%] lg:max-w-[calc(15%-1rem)]">
            <ul className="list-none ps-0">
              <li
                className={`mb-2 p-2 cursor-pointer rounded ${activeSidebarItem === "dashboard" ? "bg-white" : ""}`}
                onClick={() => handleSidebarItemClick("dashboard")}
              >
                {translations?.[locale]?.moderator_dashboard}
              </li>
              <li
                className={`mb-2 p-2 cursor-pointer rounded ${activeSidebarItem === "moderate-question" ? "bg-white" : ""}`}
                onClick={() => {
                  handleSidebarItemClick("moderate-question")
                  handleSecondColData("moderate-question")
                }}
              >
                {translations?.[locale]?.moderate_questions}
              </li>
              <li
                className={`mb-2 p-2 cursor-pointer rounded ${activeSidebarItem === "moderate-replies" ? "bg-white" : ""}`}
                onClick={() => {
                  handleSidebarItemClick("moderate-replies")
                  handleSecondColData("moderate-replies")
                }}
              >
                {translations?.[locale]?.moderate_replies}
              </li>
              <li
                className={`mb-2 p-2 cursor-pointer rounded ${activeSidebarItem === "reported-questions" ? "bg-white" : ""}`}
                onClick={() => {
                  handleSidebarItemClick("reported-questions")
                  handleSecondColData("reported-questions")
                }}
              >
                {translations?.[locale]?.reported_questions}
              </li>
              <li
                className={`mb-2 p-2 cursor-pointer rounded ${activeSidebarItem === "reported-replies" ? "bg-white" : ""}`}
                onClick={() => {
                  handleSidebarItemClick("reported-replies")
                  handleSecondColData("reported-replies")
                }}
              >
                {translations?.[locale]?.reported_replies}
              </li>
              <li className={`mb-2 p-2 cursor-pointer rounded`} onClick={() => handleSidebarItemClick("logout")}>
                {translations?.[locale]?.logout}
              </li>
            </ul>
          </div>
          {middleData && middleData.length > 0 && (
            <div className="middle max-h-[80vh] overflow-y-auto p-4 mb-4 lg:mb-0 bg-gray-200 flex-[0_0_100%] lg:flex-[0_0_32%] lg:max-w-[calc(32%-1rem)]">
              {middleData.map((item: any, index: number) => (
                <div
                  key={index}
                  onClick={() =>
                    handleMiddleItemClick(item.id || item.cid || item.nid, activeSidebarItem, avatarUrls?.[index] || "")
                  }
                  dir={
                    item?.language
                      ? rtlLocales.includes(item?.language[0]?.value)
                        ? "rtl"
                        : "ltr"
                      : rtlLocales.includes(invertedLocales[item.langcode])
                        ? "rtl"
                        : "ltr"
                  }
                  className={`data-list p-2 cursor-pointer rounded mb-4 ${activeMiddleIndex === (item.cid || item.nid) ? "bg-white" : "bg-gray-500"}`}
                >
                  <div className="flex justify-between">
                    <div className="user-data flex items-center">
                      {activeSidebarItem === "reported-questions" || activeSidebarItem === "reported-replies" ? (
                        !isLoading && avatarUrls && avatarUrls[index] ? (
                          <Image
                            src={absoluteUrl(avatarUrls[index]) || "/placeholder.svg"}
                            className="me-1"
                            width={20}
                            height={20}
                            alt="user-icon"
                          />
                        ) : (
                          <Image
                            src="/assets/images/default-avatar.png"
                            className="me-1"
                            width={20}
                            height={20}
                            alt="default-avatar"
                          />
                        )
                      ) : (
                        <Image
                          src={
                            item?.author_avatar || item.avatar
                              ? absoluteUrl("/" + (item?.author_avatar || item.avatar))
                              : "/assets/images/default-avatar.png"
                          }
                          className="me-1"
                          width={20}
                          height={20}
                          alt="user-icon"
                        />
                      )}
                      <div className="username text-sm"> {item.author || item.username || item.author_name} </div>
                    </div>
                    <div className="date text-sm">{item?.created || item.authored_on}</div>
                  </div>
                  <div className="description mt-2">{item.title || item.comment}</div>
                </div>
              ))}
            </div>
          )}

          {/* -------- Right Sidebar contents ---------- */}
          <div className="right-sidebar max-h-[80vh] lg:max-h-none overflow-y-auto mb-4 lg:mb-0 flex-[0_0_100%] lg:flex-[0_0_53%] lg:max-w-[calc(53%-1rem)]">
            {
              <>
                {mainData && activeSidebarItem == "moderate-question" && (
                  <>
                    <div className="main p-6 rounded-xl border border-gray-400">
                      <div
                        onClick={() => setOpenModal(true)}
                        className="block mb-6 pb-4 hover:underline cursor-pointer border-b border-gray-500"
                      >
                        <HighlightedText text={mainData[0].title} sensitiveWords={sensitiveWords} />
                      </div>
                      <div className="user-info flex items-center gap-x-2">
                        {mainData[0].author_avatar ? (
                          <Image
                            src={absoluteUrl("/" + mainData[0].author_avatar) || "/placeholder.svg"}
                            className="me-1"
                            width={32}
                            height={32}
                            alt="user-icon"
                          />
                        ) : (
                          <Image
                            src="/assets/images/default-avatar.png"
                            className="me-1"
                            width={32}
                            height={32}
                            alt="default-avatar"
                          />
                        )}
                        <div className="info">
                          <div>{mainData[0]?.username}</div>
                          <div>{mainData[0]?.authored_on} </div>
                        </div>
                      </div>
                    </div>
                    <ApprovalForm ID={activeMiddleIndex} dataType={activeSidebarItem} />
                    {openModal && (
                      <QuestionDetails
                        questionID={activeMiddleIndex}
                        currentUser={currentUser}
                        onClose={() => setOpenModal(false)}
                      />
                    )}
                  </>
                )}
                {mainData && activeSidebarItem == "moderate-replies" && (
                  <>
                    <div className="main p-6 rounded-xl border border-gray-400">
                      <div
                        onClick={() => setOpenModal(true)}
                        className="view-post text-blue hover:underline pb-4 mb-4 border-b border-gray-500"
                      >
                        {translations?.[locale]?.view_post_for_this_comment}
                      </div>
                      <div className="user-info flex items-center gap-x-2 mb-3">
                        {mainData[0].author_avatar ? (
                          <Image
                            src={absoluteUrl("/" + mainData[0].author_avatar) || "/placeholder.svg"}
                            className="me-1"
                            width={32}
                            height={32}
                            alt="user-icon"
                          />
                        ) : (
                          <Image
                            src="/assets/images/default-avatar.png"
                            className="me-1"
                            width={32}
                            height={32}
                            alt="default-avatar"
                          />
                        )}
                        <div className="info">
                          <div className="font-semibold">{mainData[0].author_name}</div>
                          <div>{mainData[0].authored_on} </div>
                        </div>
                      </div>
                      <div className="block font-medium text-l">
                        <HighlightedText text={mainData[0].comment} sensitiveWords={sensitiveWords} />
                      </div>
                    </div>
                    <ApprovalForm ID={mainData[0].cid} dataType={activeSidebarItem} />
                    {openModal && (
                      <QuestionDetails
                        questionID={mainData[0].nid}
                        currentUser={currentUser}
                        onClose={() => setOpenModal(false)}
                      />
                    )}
                  </>
                )}

                {mainData && activeSidebarItem == "reported-questions" && (
                  <>
                    <div className="main p-6 rounded-xl border border-gray-500">
                      <div
                        onClick={() => setOpenModal(true)}
                        className="view-post text-blue hover:underline pb-4 mb-4 border-b border-gray-500"
                      >
                        {translations?.[locale]?.view_post_for_this_question}
                      </div>
                      <div className="user-info flex items-center gap-x-2 mb-3">
                        <Image
                          src={absoluteUrl("/" + mainAvatar) || "/placeholder.svg"}
                          width={49}
                          height={49}
                          alt=""
                        />
                        <div className="info">
                          <div className="font-semibold">{mainData[0]?.author}</div>
                          <div>{mainData[0]?.created} </div>
                        </div>
                      </div>
                      <div className="block font-medium text-l">
                        <div className="description"> {mainData[0].title} </div>
                      </div>
                    </div>

                    <div className="font-semibold text-blue text-xl mb-4 mt-8">
                      {translations?.[locale]?.reason_report}
                    </div>

                    {mainData &&
                      mainData.map((item: any, index: number) => (
                        <div key={index} className="report-reason mt-6">
                          {item?.reporter_info?.map((reporter: any, idx: number) => (
                            <div className="reason p-6 rounded-lg border mb-2 border-gray-500" key={idx}>
                              {/* Loop through all reporter_info for each item */}
                              <div className="reason text-l text-color-neutral mb-2 pb-2 border-b border-gray-500">
                                {reporter?.report_reason}
                              </div>

                              {/* User Info Section */}
                              <div className="user-info flex justify-between items-center">
                                <div className="inline-flex items-center gap-x-3">
                                  {reporter.avatar_of_reporter ? (
                                    <Image
                                      src={
                                        absoluteUrl("/" + getAvatarUrl(reporter.avatar_of_reporter)) ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg"
                                      }
                                      className="me-1"
                                      width={32}
                                      height={32}
                                      alt="user-icon"
                                    />
                                  ) : (
                                    <Image
                                      src="/assets/images/default-avatar.png"
                                      className="me-1"
                                      width={32}
                                      height={32}
                                      alt="default-avatar"
                                    />
                                  )}
                                  <span>{reporter.reported_by}</span>
                                </div>
                                <div className="reported-date">{reporter.reported_on}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}

                    <ReportedForm id={activeMiddleIndex} dataType={activeSidebarItem} />
                    {openModal && (
                      <QuestionDetails
                        questionID={mainData[0]?.nid}
                        currentUser={currentUser}
                        onClose={() => setOpenModal(false)}
                      />
                    )}
                  </>
                )}

                {mainData && activeSidebarItem == "reported-replies" && (
                  <>
                    <div className="main p-6 rounded-xl border border-gray-500">
                      <div
                        onClick={() => setOpenModal(true)}
                        className="view-post text-blue hover:underline pb-4 mb-4 border-b border-gray-500"
                      >
                        {translations?.[locale]?.view_post_for_this_comment}
                      </div>
                      <div className="user-info flex items-center gap-x-2 mb-3">
                        <Image
                          src={absoluteUrl("/" + mainAvatar) || "/placeholder.svg"}
                          width={49}
                          height={49}
                          alt=""
                        />
                        <div className="info">
                          <div className="font-semibold">{mainData[0]?.author}</div>
                          <div>{mainData[0]?.created} </div>
                        </div>
                      </div>
                      <div className="block font-medium text-l">
                        <div className="description"> {mainData[0]?.title} </div>
                      </div>
                    </div>
                    <div className="font-semibold text-blue text-xl mb-4 mt-8">
                      {translations?.[locale]?.reason_report}
                    </div>

                    {mainData &&
                      mainData.map((item: any, index: number) => (
                        <div key={index} className="report-reason mt-6">
                          {item?.reporter_info?.map((reporter: any, idx: number) => (
                            <div className="reason p-6 rounded-lg border mb-2 border-gray-500" key={idx}>
                              {/* Loop through all reporter_info for each item */}
                              <div className="reason text-l text-color-neutral mb-2 pb-2 border-b border-gray-500">
                                {reporter?.report_reason}
                              </div>

                              {/* User Info Section */}
                              <div className="user-info flex justify-between items-center">
                                <div className="inline-flex items-center gap-x-3">
                                  {reporter.avatar_of_reporter ? (
                                    <Image
                                      src={
                                        absoluteUrl("/" + getAvatarUrl(reporter.avatar_of_reporter)) ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg"
                                      }
                                      className="me-1"
                                      width={32}
                                      height={32}
                                      alt="user-icon"
                                    />
                                  ) : (
                                    <Image
                                      src="/assets/images/default-avatar.png"
                                      className="me-1"
                                      width={32}
                                      height={32}
                                      alt="default-avatar"
                                    />
                                  )}
                                  <span>{reporter.reported_by}</span>
                                </div>
                                <div className="reported-date">{reporter.reported_on}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    <ReportedForm id={activeMiddleIndex} dataType={activeSidebarItem} />
                    {openModal && (
                      <QuestionDetails
                        questionID={mainData[0]?.nid}
                        currentUser={currentUser}
                        onClose={() => setOpenModal(false)}
                      />
                    )}
                  </>
                )}
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatedModeratorDashboard
