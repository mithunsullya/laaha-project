"use client";
export const runtime = "edge";


import { SignUpContext } from "@/src/contexts/SignUpProvider";
import { useTranslations } from "@/src/contexts/TranslationsContext";
import { laila } from "@/src/lib/utils";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useContext } from "react";
import { logout } from "../community-conversations/action";
import { getAccessToken } from "@/src/lib/protectedAuth";


const LoginPage = () => {
  const signupContext = useContext(SignUpContext);
  const { translations } = useTranslations();
  const locale = useLocale();

   const handleLogout = async () => {
      // Clear client-side state first
      signupContext?.setIsUserLoggedIn(false)
      signupContext?.setUserAvatar(null)
      signupContext?.setUserName(null)
      signupContext?.setUid(null)
      signupContext?.setRole(null)

        // Perform logout API call
      let accessToken = await getAccessToken();
      await logout(locale, accessToken || '', signupContext?.userId || '')
  
      // Force a hard refresh to ensure all state is cleared
      window.location.href = `/${locale}`
    }

  return (
    <div className="min-h-[500px] flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
        <h2
          className={`text-2xl font-semibold mb-4 text-primary ${laila.className}`}
        >
          Welcome to laaha Login Page 👋
        </h2>
        <p className="text-default-black mb-2">
          Please use the{" "}
          <span className="font-medium text-blue-600">Login</span> button
          located in the global sticky bar.
        </p>
        <span className="text-color-neutral text-sm">or</span>
        <div className="mt-4 flex justify-center">
          <Link
            href="#"
            onClick={() => signupContext?.setShowSignUpModal(true)}
            aria-label="Login"
            data-analytics={"Login"}
          >
            <div
              className="user-iconflex items-center justify-center cursor-pointer"
              role="button"
            >
                {
              !signupContext?.isUserLoggedIn && (

              <span className="text-sm bg-primary rounded-full py-2 px-4 font-semibold text-white font-univers text-center block">
                {translations?.[locale]?.login ?? "Login"}
              </span>
              )}
              {signupContext?.isUserLoggedIn && (
                <button
                    className="text-sm font-semibold bg-white border-primary border rounded-full py-2 px-4  text-primary font-univers text-center block"
                    onClick={handleLogout}
                    aria-label={translations?.[locale]?.logout || "Logout"}
                >
                    {translations?.[locale]?.logout}
                </button>
            )}
              
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
