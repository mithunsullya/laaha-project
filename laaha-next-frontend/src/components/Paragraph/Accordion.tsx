"use client"

import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "next-intl"
import { useState, useEffect } from "react"

interface AccordionProps {
  field_question: {
    value: string
  }[]
  field_answer: {
    value: string
  }[]
}

const Accordion: React.FC<AccordionProps> = ({
  field_question,
  field_answer,
}) => {
  const maxWordCount = 60
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [hasMounted, setHasMounted] = useState(false)
  const locale = useLocale()
  const { translations } = useTranslations()

  // Safely handle potentially undefined values
  const title = field_question?.[0]?.value || ""
  const description = field_answer?.[0]?.value || ""

  // Split description into words safely
  const descriptionWords = description ? description.split(" ") : []
  const isLongDescription = descriptionWords.length > maxWordCount

  const truncatedDescription = isLongDescription
    ? descriptionWords.slice(0, maxWordCount).join(" ") + "..."
    : description

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <div className="accordion bg-white shadow-lg rounded-2xl overflow-hidden p-4 mb-6">
      <div className="accordion-header p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="accordion-body p-4">
        <p className="">
          {isLongDescription && !isExpanded ? (
            <span dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </p>
        {isLongDescription && (
          <div className="text-center">
            <button
              onClick={toggleDescription}
              className="mt-6 btn-secondary text-white px-4 py-2 rounded-lg"
            >
              {isExpanded
                ? translations?.[locale]?.read_less || "Read Less"
                : translations?.[locale]?.read_more || "Read More"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Accordion