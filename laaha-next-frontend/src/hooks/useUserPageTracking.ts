import { useEffect, useRef } from "react"
import { getAccessToken } from "../lib/protectedAuth"
import { useClientContext } from "../lib/queryclient"
import { useSignUp } from "../contexts/SignUpProvider"

interface UseUserPageTrackingParams {
  userId: string
  nid: string
  locale: string
  pageName?: string
  isEvaluatedUser: boolean
  ip: string | null
  alias: string | null
  linkText?: string
}

export const useUserPageTracking = ({
  userId,
  nid,
  locale,
  pageName,
  isEvaluatedUser,
  ip,
  alias,
  linkText
}: UseUserPageTrackingParams) => {
  const startTimeRef = useRef<Date | null>(null)
  const lastClickedLinkRef = useRef<{ text: string; url: string } | null>(null)
  const accessTokenRef = useRef<string | null>(null)
  let ipData = useClientContext();

  // Load access token once on mount
  useEffect(() => {
    getAccessToken().then((token) => {
      accessTokenRef.current = token
    })
  }, [])

  useEffect(() => {
    if (!isEvaluatedUser) return; // ✅ Exit early if user is not evaluated
  
    startTimeRef.current = new Date()
  
    const handleElementClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const linkElement = target.closest("a[href]") as HTMLAnchorElement | null
  
      if (linkElement) {
        lastClickedLinkRef.current = {
          text: linkElement.innerText.split("\n")[0].trim(),
          url: linkElement.href,
        }
      }
    }
  
    const handleUnload = () => {
      if (!startTimeRef.current) return
  
      const endTime = new Date()
      const durationMs = endTime.getTime() - startTimeRef.current.getTime()
  
      if (durationMs < 500) return
  
      const totalSeconds = Math.floor(durationMs / 1000);
  
      const now = new Date()
      const token = accessTokenRef.current
  
      if (!token) return
  
      const payload = {
        node_id: nid || "0",
        user_id: userId || "0",
        time_spent: totalSeconds,
        alias: alias,
        // ip: ip || ipData?.ip || "N/A",
        locale: locale,
        date: now.toLocaleDateString("en-GB"),
        time: now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        title: pageName || document.title,
        link_text: lastClickedLinkRef.current?.text || linkText || "N/A",
        link_url: lastClickedLinkRef.current?.url || "N/A",
      }

      const url = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/evaluated-analytics-collection`

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        keepalive: true,
      })
      .then(response => response.json())
      .then(data => console.log("Analytics sent successfully:", data))
      .catch(error => console.error("Failed to send analytics:", error));
    }
  
    document.addEventListener("click", handleElementClick)
    window.addEventListener("beforeunload", handleUnload)
  
    return () => {
      handleUnload()
      document.removeEventListener("click", handleElementClick)
      window.removeEventListener("beforeunload", handleUnload)
    }
  }, [userId, nid, locale, pageName, isEvaluatedUser]) // <-- include isEvaluatedUser in deps
  
}
