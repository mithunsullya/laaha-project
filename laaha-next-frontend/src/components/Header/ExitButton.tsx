import { deleteSessionDetails, logout } from "@/src/app/[locale]/community-conversations/action"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { getAccessToken } from "@/src/lib/protectedAuth"
import { useLocale } from "next-intl"

const handleExit = (locale:string, userId: string | null) => {
  let logoutWindow = async () => {
    let accessToken = await getAccessToken();
    await logout(locale, accessToken || '', userId || '');
    await deleteSessionDetails()
  }

  logoutWindow();
  window.location.replace('https://www.google.com');
}

const ExitButton = () => {
  const { translations } = useTranslations()
  const locale = useLocale()
  const { userId } = useSignUp();

  return (
    <button
      className="py-3 px-5 text-white font-bold btn-secondary rounded inline-flex items-center"
      onClick={() => handleExit(locale, userId)}
      type="button"
      aria-label={
        translations?.[locale]?.exit_webiste || "Exit and go to Google"
      }
    >
      <div className="me-3 -mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="7 7 10 10" fill="#ffffff">
          <path d="M16 8L8 16M8.00001 8L16 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>
      <span>{translations?.[locale]?.exit_webiste || "EXIT WEBSITE"}</span>
    </button>
  )
}

export default ExitButton
