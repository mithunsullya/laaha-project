"use client"
import Script from "next/script"

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script id="google-analytics-init">
        {
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)};gtag("js", new Date());
        gtag("set", "developer_id.dMDhkMT", true);
        gtag("config", "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}", {"groups":"default","anonymize_ip":true,"page_placeholder":"PLACEHOLDER_page_path"});`
      }
      </Script>
    </>
  )
}

export default GoogleAnalytics;
