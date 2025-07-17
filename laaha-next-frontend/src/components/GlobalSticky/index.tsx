"use client"

import { SignUpContext, useSignUp } from "@/src/contexts/SignUpProvider"
import { Services } from "@/src/lib/icons"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useContext, useEffect } from "react"
import UserGuidelineModal from "../CommunityPage/UserGuidelineModal"
import { usePathname } from "next/navigation"
import { deleteSessionDetails, logout } from "@/src/app/[locale]/community-conversations/action"
import { rtlLocales } from "@/site.config"
import { useLocale } from "next-intl"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useValidUser } from "@/src/contexts/ValidCountryUser"
import { getAccessToken } from "@/src/lib/protectedAuth"

const handleExitClick = (locale: string, userId: string | null) => {
    let logoutWindow = async () => {
      let accessToken = await getAccessToken();
      await logout(locale, accessToken || '', userId || '')
      await deleteSessionDetails()
    }
  
    logoutWindow();
    window.location.replace('https://www.google.com');
}

// Sticky buttons appearing in the left of the page.
const GlobalSticky = () => {
  const signupContext = useContext(SignUpContext)
  const [userCanLogin, setUserCanLogin] = useState<boolean>(false)
  const [showGuideLine, setShowGuideline] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>()
  const locale = useLocale()
  const pathname = usePathname()
  const { translations } = useTranslations()
  const { userId } = useSignUp();
  // const { isAuthUser } = useValidUser()  // Can be used to disable login in forum for user who donot have access.
 
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = async () => {
    signupContext?.setIsUserLoggedIn(false)
    signupContext?.setUserAvatar(null)
    signupContext?.setUserName(null)
    signupContext?.setUid(null)
    signupContext?.setRole(null)

    let accessToken = await getAccessToken();
    await logout(locale, accessToken || '', userId || '')
    // Clear client-side state first

    // Force a hard refresh to ensure all state is cleared
    window.location.href = `/${locale}`
  }

  useEffect(() => {
    // if (pathname.includes("user-login")) {
      if (signupContext?.isUserLoggedIn) {
        // user is already logged in
        setUserCanLogin(false)
      } else {
        setUserCanLogin(true)
      }
    // } else {
      // when user is not on login page
      // setUserCanLogin(true)
    // }

    if (
      pathname.includes("community-conversations") ||
      pathname.includes("moderator-user-dashboard")
    ) {
      setShowGuideline(true)
    } else {
      setShowGuideline(false)
    }
  }, [pathname, signupContext])

  return (
    <>
      <div
        className={`${signupContext?.showSignUpModal ? "hidden" : "flex"} ${
          rtlLocales.includes(locale) ? "lg:left-10" : "lg:right-10"
        } global_sticky items-center lg:block gap-3 fixed lg:top-1/2 lg:-translate-y-1/2 bottom-0 lg:bottom-auto w-full lg:w-auto bg-color-tertiary px-3 py-6 lg:max-w-20 rounded-t-lg rounded-tr-lg lg:rounded-lg z-20`}
        role="complementary" // Indicating this is a supplementary part of the page
        aria-labelledby="global-sticky-title"
      >
        <h2 id="global-sticky-title" className="sr-only">
          {translations?.[locale]?.global_sticky_title || "Global sticky menu"}
        </h2>

        {/* {userCanLogin && (
          // Add some condition like this for handling the disabling of Login for forum users.
        //    <div
        //    className={`${isAuthUser ? "" : "pointer-events-none opacity-50"} user-login lg:mb-4 flex flex-col items-center flex-auto`}
        //  >
          <div
            className={`user-login lg:mb-4 flex flex-col items-center flex-auto`}
          >
            <Link
              href="#"
              className="flex flex-col items-center"
              onClick={() => signupContext?.setShowSignUpModal(true)}
              aria-label="Login"
            >
              <div
                className={`user-icon bg-primary w-6  h-6 lg:w-12 pointer-events-none lg:h-12 flex items-center justify-center rounded-full`}
                role="button"
              >
                <Image
                  src={"/assets/images/user.png"}
                  width={24}
                  height={24}
                  alt={translations?.[locale]?.login || "User icon"}
                />
              </div>
              <span className="pt-1 text-sm text-center block font-univers">
                {translations?.[locale]?.login}
              </span>
            </Link>
          </div>
        )}

        {signupContext?.isUserLoggedIn && (
          <Link
            href={"#"}
            id="logout-link"
            className="lg:mb-4 text-sm block lg:w-full text-center flex-auto"
            onClick={handleLogout}
            aria-label={translations?.[locale]?.logout || "Logout"}
          >
            {translations?.[locale]?.logout}
          </Link>
        )} */}

        {showGuideLine && (
          <div
            className="lg:mb-4 flex-auto cursor-pointer hover:opacity-80 text-sm text-center flex flex-wrap justify-center"
            onClick={() => openModal()}
            role="button"
            aria-label={
              translations?.[locale]?.user_guideline || "User guideline"
            }
          >
            <Image
              width={24}
              height={24}
              className="h-6"
              loading="lazy"
              src="/assets/images/guide.png"
              alt={translations?.[locale]?.user_guideline || "User guide"}
            />
            <span className="block w-full">
              {translations?.[locale]?.user_guideline}
            </span>
          </div>
        )}

        <div className="gethelp lg:mb-4 flex-1 hover:opacity-80">
          <Link
            href={`/${locale}/access-services`}
            className="text-sm block text-center break-words"
            aria-label={
              translations?.[locale]?.find_services || "Find services"
            }
          >
            <div className="w-6 h-6 mx-auto">
              <Services />
            </div>
            <span>
              {translations?.[locale]?.find_services || "Find Services"}
            </span>
          </Link>
        </div>

        <div className="exit flex-auto hover:opacity-80">
          <div
            className="exit-website-btn text-sm block text-center cursor-pointer"
            onClick={() => handleExitClick(locale, userId)}
            role="button"
            aria-label={translations?.[locale]?.exit || "Exit website"}
          >
            <Image
              width={24}
              height={24}
              loading="lazy"
              className="m-auto"
              src="/assets/images/exit-icon.png"
              alt={""}
            />
            <span>{translations?.[locale]?.exit || "Exit"}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <UserGuidelineModal isModalOpen={isModalOpen} closeModal={closeModal} />
      )}
    </>
  )
}

export default GlobalSticky
