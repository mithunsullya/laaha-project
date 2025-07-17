"use client"

import { useTranslations } from "@/src/contexts/TranslationsContext"
import {
  absoluteUrl,
  getCountryCode,
  getLangCode,
  getLocaleValue,
} from "@/src/lib/utils"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"

const Audio = (data: any) => {
  const [transcriptText, setTranscriptText] = useState([])
  const [showTranscript, setShowTranscript] = useState(false)
  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const { translations} = useTranslations();
  const locale = useLocale()
  const audioUrl = data?.field_audio?.[0]?.url || data?.field_audio?.uri?.url

  useEffect(() => {
    const getTranscriptText = async function (node_id: string) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/transcript/${node_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "country-code": countryCode || "US",
            "lang-code": langCode || "en",
            locale: locale || "en",
          },
        }
      )
      const text = await response.json()
      setTranscriptText(text)
    }
    if (data?.field_vtt_file?.[0]?.url) {
      getTranscriptText(data?.nid)
    }
  }, [])

  return (
    <>
      <audio className="mb-8 w-full" controls>
        <source
          src={audioUrl}
          type={data?.field_audio?.[0]?.filemime || "audio/mp3"}
        />
      </audio>
      {transcriptText.length > 0 && (
        <>
          <button
            className="show-transcript btn-primary mb-2 flex justify-self-end"
            onClick={() => setShowTranscript(!showTranscript)}
          >
            {showTranscript ? `${ translations?.[locale]?.hide }` : `${ translations?.[locale]?.show }`} { translations?.[locale]?.transcript }
          </button>
          {showTranscript && (
            <div className="transcripts border w-full max-h-40 bg-color-secondary overflow-y-auto border-primary rounded-2xl p-3">
              {transcriptText?.map((item: any, index) => (
                <div className="flex pb-4" key={index}>
                  <span className="time mr-6"> {item?.time}</span>
                  <span className="text"> {item?.text}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Audio
