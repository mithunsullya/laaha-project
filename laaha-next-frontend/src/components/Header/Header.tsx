"use client"

import { useContext, useState } from "react"
import Container from "../Container"
import LanguageSwitcher from "../LanguageSwitcher"
import ExitButton from "./ExitButton"
import Logo from "./Logo"
import Link from "next/link"
import ConfigPopup from "./ConfigPopup"
import {
  CloseIcon,
  DefaultProfileIcon,
  Hamburger,
  SearchIcon,
} from "@/src/lib/icons"
import { Menu } from "../Menu"
import { SignUpContext, useSignUp } from "@/src/contexts/SignUpProvider"
import Image from "next/image"
import { absoluteUrl, laila } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import Notifications from "@/src/app/[locale]/moderator-user-dashboard/Notifications"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { getAccessToken } from "@/src/lib/protectedAuth"
import { logout } from "@/src/app/[locale]/community-conversations/action"

const Headers = ({ menu }: any) => {
  const [activeMenu, setActiveMenu] = useState(false)
  const [closeButton, setShowClosebutton] = useState(false)
  const { userAvatarUrl, userName, isUserLoggedIn } = useSignUp()
  const locale = useLocale()
  const { userId, role } = useSignUp()
  const { translations } = useTranslations()
  const signupContext = useContext(SignUpContext) // Accessing sign-up context

  // Handle the hamburger menu.
  const handleHamburger = () => {
    setActiveMenu(!activeMenu)
    setShowClosebutton(!closeButton)
  }

  const handleLogout = async () => {
    let now = new Date();
    signupContext?.setIsUserLoggedIn(false)
    signupContext?.setUserAvatar(null)
    signupContext?.setUserName(null)
    signupContext?.setUid(null)
    signupContext?.setRole(null)

    let accessToken = await getAccessToken()
    await logout(locale, accessToken || "", userId || "", now)
    // Clear client-side state first

    // Force a hard refresh to ensure all state is cleared
    window.location.href = `/${locale}`
  }

  return (
    <header className="header">
      <div className="header-container-top bg-shadow-gray border-b border-shadow-dark-gray">
        <Container className="container flex justify-between items-center gap-2 header-top">
          <ExitButton />
          <LanguageSwitcher />
        </Container>
      </div>
      <Container className="header-container container flex justify-between items-center">
        <div className="site-info flex items-center">
          <button
            aria-label="Toggle menu"
            className="hamburger lg:hidden p-2"
            onClick={handleHamburger}
            aria-expanded={activeMenu}
          >
            <Hamburger />
          </button>
          <Logo />
        </div>
        <div className="menu-items flex">
          <div
            className={
              activeMenu
                ? "menu-active [&_nav]:block [&_nav]:w-[70%] [&_nav]:fixed [&_nav]:top-9 [&_nav]:p-4 [&_nav]:start-0 [&_nav]:transform [&_nav]:transition-transform [&_nav]:duration-300 [&_nav]:ease-in-out [&_nav]:bg-white [&_nav]:shadow-lg [&_nav]:z-50"
                : ""
            }
          >
            <Menu handleHamburger={handleHamburger} menuData={menu} />
            {closeButton && (
              <button
                className="close-hamburger fixed start-4 top-11 z-50 bg-white"
                onClick={handleHamburger}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            )}
          </div>
          <div className="global-items flex items-center">
            <Link
              className="me-4 md:me-6 cursor-pointer"
              href={`/${locale}/search-form`}
              aria-label="Search"
            >
              <SearchIcon />
            </Link>
            <ConfigPopup />
            {isUserLoggedIn && role === "moderator" && <Notifications />}
            {isUserLoggedIn ? (
              <div className="relative group">
                {/* Profile Icon */}
                {userAvatarUrl ? (
                  <Image
                    loading="lazy"
                    className="rounded-full ms-4 md:ms-6 object-contain hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                    src={absoluteUrl("/" + userAvatarUrl) || "/placeholder.svg"}
                    width={32}
                    height={32}
                    alt={userName || "User profile image"}
                  />
                ) : (
                  <div className="ms-4 md:ms-6 hover:ring-2 hover:ring-blue-500 rounded-full transition-all duration-200">
                    <DefaultProfileIcon />
                  </div>
                )}

                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href={`/${locale}/${role === "moderator" ? "moderator-user-dashboard" : role === "forum_user" ? "user-dashboard" : "user-dashboard"}`}
                      className="flex items-center px-4 py-2 text-sm text-default-black hover:text-red transition-colors duration-150"
                      aria-label="Go to my account"
                    >
                      <svg
                        className="w-4 h-4 mr-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {translations?.[locale]?.myAccount || "My Account"}
                    </Link>

                    <hr className="border-gray-200" />

                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-default-black hover:text-red transition-colors duration-150"
                      aria-label="Logout"
                      onClick={handleLogout}
                    >
                      <svg
                        className="w-4 h-4 mr-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      {translations?.[locale]?.logout || "Logout"}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="#"
                className={`ms-4 md:ms-6 text-primary font-semibold text-m underline ${laila.className}`}
                onClick={() => signupContext?.setShowSignUpModal(true)}
                aria-label="Login"
              >
                {translations?.[locale]?.login}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Headers
