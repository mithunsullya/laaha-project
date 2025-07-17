import { laila } from "@/src/lib/utils"
import {
  EmailIcon,
  FacebookIcon,
  LocationIcon,
  PhoneIcon,
  TimeIcon,
  TwitterIcon,
} from "@/src/lib/icons"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import { useLocale } from "use-intl"
import Link from "next/link"

interface AccessServicesCardProps {
  className: string
  phoneNumber: string
  email: string
  title: string
  timings: string
  location: string
  tag: string
  need: string
  facebookUrl: string | null
  twitterUrl: string | null
}

// Function to handle copy action
const handleCopyClick = (value: string) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      setTimeout(() => console.log("Text copied"), 2000) // Log message after copying
    })
    .catch((error) => {
      console.error(`Failed to copy text: `, error) // Log error if copy fails
    })
}

export default function AccessServicesCard({
  className,
  phoneNumber,
  email,
  title,
  timings,
  location,
  tag,
  need,
  facebookUrl,
  twitterUrl,
}: AccessServicesCardProps) {
  const { translations } = useTranslations()
  const locale = useLocale()

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-[#f8f9f9] py-3 px-[14px] rounded-lg flex gap-2 flex-col mb-5">
        <div className="text-xl font-bold">{title}</div>
        <div className="flex items-center gap-2">
          <span className="min-w-5">
            <LocationIcon />
          </span>
          <span className="text-m pt-1">{location}</span>
        </div>

        {/* Phone number section with copy functionality */}
        {phoneNumber && (
          <div
            className="flex items-center gap-2"
            onClick={() => handleCopyClick(phoneNumber)}
          >
            <span className="min-w-5">
              <PhoneIcon />
            </span>
            <span className="text-m pt-1">
              {" "}
              {translations?.[locale]?.telephone} {phoneNumber}
            </span>
            <button className="text-m pt-1 text-[#4856df] underline">
              {translations?.[locale]?.copy_phone}
            </button>
          </div>
        )}

        {/* Email section with copy functionality */}
        {email && (
          <div
            className="flex items-center gap-2"
            onClick={() => handleCopyClick(email)}
          >
            <span className="min-w-5">
              <EmailIcon />
            </span>
            <span className="text-m pt-1">
              {translations?.[locale]?.email} {email}
            </span>
            <button className="text-m pt-1 text-[#4856df] underline">
              {translations?.[locale]?.copy_email}
            </button>
          </div>
        )}

        {timings && (
          <div className="flex items-center gap-2">
            <span className="min-w-5">
              <TimeIcon />
            </span>
            <span className="text-m pt-1">{timings}</span>
          </div>
        )}
      </div>

      {/* Services offered section */}
      <div className="space-y-4">
        <div className="">
          <h3 className="text-m text-muted-foreground">
            {translations?.[locale]?.services_offered}
          </h3>
          <p
            className={`text-m p-2 rounded-md font-medium ${laila.className} text-[#f7265d] bg-[#fff5f8] inline-block`}
          >
            {tag}
          </p>
        </div>
        {
          need && (
            <div className="">
              <h3 className="text-m text-muted-foreground">
                {translations?.[locale]?.i_need_to || 'I need to'}
              </h3>
              <p
                className={`text-m p-2 rounded-md font-medium ${laila.className} text-[#f7265d] bg-[#fff5f8] inline-block`}
              >
                {need}
              </p>
            </div>
          )
        }
      </div>
      {(facebookUrl && facebookUrl.trim().startsWith('https://') || twitterUrl && twitterUrl.trim().startsWith('https://')) && (
        <div className="social-media-blocks mt-4">
          <ul className="ps-0 list-none inline-flex flex-wrap gap-4">
            { facebookUrl?.startsWith('https://') &&
              <li>
                <Link href={facebookUrl} target="_blank" data-analytics={"Facebook from service page"}>
                  <FacebookIcon />
                </Link>
              </li>
            }
            { twitterUrl?.startsWith('https://') &&
              <li>
                <Link href={twitterUrl} target="_blank" data-analytics={"Twitter from service page"}>
                  <TwitterIcon />
                </Link>
              </li>
            }
          </ul>
        </div>
      )}

      {/* Phone call link */}
      <div className="mt-5">
        <a
          href={`tel:${phoneNumber}`}
          className="w-full border border-[#e9ebed] flex justify-center py-[10px] px-[14px] rounded-sm gap-2 text-[#87929d]"
        >
          <PhoneIcon />
          <span>{translations?.[locale]?.phone}</span>
        </a>
      </div>
    </div>
  )
}
