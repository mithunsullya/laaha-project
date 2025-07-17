import {
  deleteSessionDetails,
  logout,
} from "@/src/app/[locale]/community-conversations/action"
import { getUserInfo } from "@/src/lib/apis"
import { DefaultProfileIcon } from "@/src/lib/icons"
import { absoluteUrl, laila } from "@/src/lib/utils"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import EditProfileModal from "./EditProfileModal"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "next-intl"
import UserGuidelineModal from "../CommunityPage/UserGuidelineModal"
import { getAccessToken } from "@/src/lib/protectedAuth"

// Define types for the expected user data and current user
interface UserData {
  avatar_url?: string
  username: string
  edit_url?: string
  note?: string
}

interface UserInfoProps {
  currentUser: {
    userName: string | null
    userAvatarUrl: string | null
    userId: string | null
  } | null
}

const UserInfo: React.FC<UserInfoProps> = ({ currentUser }) => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [editActive, setEditActive] = useState<boolean>(false)
  const { userId } = useSignUp()
  const { translations } = useTranslations()
  const signupContext = useSignUp()
  const locale = useLocale()

  // Fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await getUserInfo(userId, locale)
      setUserData(response.data)
    } catch (error) {
      console.warn("Error fetching user data:", error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleEditClick = () => {
    setEditActive(true)
  }

  const handleLogoutClick = async () => {
    let now = new Date();
    try {
      // Clear client-side state first
      signupContext?.setIsUserLoggedIn(false)
      signupContext?.setUserAvatar(null)
      signupContext?.setUserName(null)
      signupContext?.setUid(null)
      signupContext?.setRole(null)

      // Perform logout API call.
      let accessToken = await getAccessToken();
      await logout(locale, accessToken || '', signupContext?.userId || '', now)

      // Clear any persisted state
      if (typeof window !== "undefined") {
        localStorage.removeItem("authState")
        sessionStorage.removeItem("authState")
      }

      // Force full page reload to clear any cached data
      window.location.href = `/${locale}/community-conversations`

      // Alternative using Next.js router (if you prefer no full reload)
      // router.push(`/${locale}/community-conversations`);
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <>
      {currentUser && (
        <>
          <div className="user-info p-4 bg-color-secondary rounded-md mb-8 text-center inline-flex lg:block w-full items-center justify-start">
            {currentUser.userAvatarUrl ? (
              <Image
                loading="lazy"
                width={80}
                height={80}
                src={absoluteUrl("/" + currentUser.userAvatarUrl)}
                className="user-image lg:max-w-20 lg:mx-auto rounded-full flex-[0_0_80px] object-cover"
                alt={currentUser.userName || "User"}
              />
            ) : (
              <div className="user-image lg:max-w-20 lg:mx-auto rounded-full flex-[0_0_80px]">
                <DefaultProfileIcon width="80" height="80" />
              </div>
            )}
            <div className="user-basic-info mt-2 ms-4 lg:ms-0 text-left lg:text-center">
              <div
                className={`username font-semibold text-red-wine text-xl lg:text-base ${laila.className}`}
              >
                {translations?.[locale]?.hello} <span className="text-primary">{currentUser.userName}</span>
              </div>
              <div className="desc text-color-neutral my-2 lg:text-m">
                { "Your are learning new things about women every day, Keep it up." }
              </div>
              <div className="inline-flex items-center mt-4 gap-x-4 text-center">
                <div className="edit-profile" onClick={handleEditClick}>
                  <span className="p-2 rounded-2xl min-w-24 text-m bg-primary text-white block cursor-pointer">
                    <span className="inline-block mt-0.5">
                      {translations?.[locale]?.edit_profile}
                    </span>
                  </span>
                </div>
                <div className="user-logout inline-block text-center">
                  <span
                    className="p-2 rounded-2xl min-w-24 text-m bg-default-black text-white block cursor-pointer"
                    onClick={handleLogoutClick}
                  >
                    <span className="mt-0.5 inline-block">{translations?.[locale]?.logout}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {editActive && <EditProfileModal modalActive={setEditActive} />}
        </>
      )}
    </>
  )
}

export default UserInfo
