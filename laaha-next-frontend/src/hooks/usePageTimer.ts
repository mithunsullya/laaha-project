import { useEffect, useRef } from "react";
import { useSignUp } from "../contexts/SignUpProvider";
import { useLocale } from "next-intl";
import { getCountryCode } from "../lib/utils";
import { useClientContext } from "../lib/queryclient";

export function usePageTimer(resourceType: 'scorm' | 'podcast' | 'video' | null, resourceId: string) {
  const startTimeRef = useRef<number>(Date.now());
  const { userId } = useSignUp();
  const locale = useLocale();
  const countryCode = getCountryCode();
  let { ip } = useClientContext();

  // Format date as dd/mm/yyyy and time as HH:MM (24hr)
  const getFormattedDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`,
    };
  };

  const sendTimeSpent = (durationMs: number) => {
    const timeSpentSeconds = Math.floor(durationMs / 1000);
    if (timeSpentSeconds > 0) {
      const { date, time } = getFormattedDateTime();

      fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/v1/analytics-collection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          locale: locale || "en",
          "country-code": countryCode || "US",
        },
        body: JSON.stringify({
          node_id: resourceId,
          time_spent: timeSpentSeconds,
          user_id: userId || 0,
          ip: ip || 'N/A',
          date,       // dd/mm/yyyy
          time,       // HH:MM 24hr format
        }),
        keepalive: true,
      }).catch((err) => {
        console.warn("Time tracking failed", err);
      });
    }
  };

  useEffect(() => {
    const handleUnload = () => {
      const duration = Date.now() - startTimeRef.current;
      sendTimeSpent(duration);
    };

    // Tab close, reload, etc.
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
}
