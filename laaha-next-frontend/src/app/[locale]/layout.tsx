import { NextIntlClientProvider, useMessages } from "next-intl"
import Header from "@/src/components/Header"
import "@/src/styles/globals.css"
import Footer from "@/src/components/Footer"
import GlobalSticky from "@/src/components/GlobalSticky"
import { rtlLocales } from "@/site.config"
import { SignupProvider } from "@/src/contexts/SignUpProvider"
import { getEvaluatedUser, getUid, getUserAvatar, getUserName, getUserRole } from "@/src/lib/auth"
import AutoLogout from "@/src/components/AutoLogout"
import { TranslationsProvider } from "@/src/contexts/TranslationsContext"
import MetaTags from "@/src/components/Metatags"
import { ClientProvider } from "@/src/lib/queryclient"
import { ValidCountryUserProvider } from "@/src/contexts/ValidCountryUser"
import GoogleAnalytics from "@/src/components/GoogleAnalytics"
import RegisterSW from "@/src/components/RegisterSW/RegisterSW"
import NavigationProgress from "./[slug]/NavigationProgress"
import ReviewBanner from "@/src/components/ReviewBanner"
import { ModeratorDashboardProvider } from "@/src/contexts/ModeratorContext"
import SignUpForm from "./community-conversations/SignUpForm"
import DeleteCache from "@/src/components/DeleteCache"

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: {
    locale: string
  }
}) => {
  const messages = useMessages()
  const uName = getUserName()
  const avatarUrl = getUserAvatar()
  const uid = getUid()
  const userRole = getUserRole()
  const isEvaluatedUser = getEvaluatedUser()

  return (
    <html lang={locale} dir={rtlLocales.includes(locale) ? "rtl" : "ltr"}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <TranslationsProvider>
          <MetaTags locale={locale} />
        </TranslationsProvider>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}`} crossOrigin="anonymous" />
        <link rel="preconnect" href={`https://fonts.googleapis.com`} crossOrigin="anonymous"/>
        <meta name="robots" content="index, follow" />
        <GoogleAnalytics />
      </head>
      <body suppressHydrationWarning={true}>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <TranslationsProvider>
            <ClientProvider>
              <ValidCountryUserProvider>
                <SignupProvider uName={uName || ""} avatarUrl={avatarUrl || ''} uid={uid || ''} userRole={userRole || ''} isEvaluatedUser={isEvaluatedUser}>
                  <ModeratorDashboardProvider>
                    {/* <RegisterSW /> */}
                    <NavigationProgress />
                    <Header />
                    <main className="min-h-screen">
                      {children}
                      <GlobalSticky />
                    </main>
                    <ReviewBanner />
                    <Footer />
                    <AutoLogout />
                    <SignUpForm />
                  </ModeratorDashboardProvider>
                </SignupProvider>
              </ValidCountryUserProvider>
            </ClientProvider>
          </TranslationsProvider>
        </NextIntlClientProvider>
        {/* <DeleteCache /> */}
      </body>
    </html>
  )
}

export default RootLayout
