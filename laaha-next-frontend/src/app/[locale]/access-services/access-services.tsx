"use client"

export const runtime = "edge"

import { useEffect, useRef, useState, useCallback } from "react"
import { useLocale } from "next-intl"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ArrowRight, DownArrow } from "@/src/lib/icons"
import { getCountryCode, laila } from "@/src/lib/utils"
import AccessServicesCard from "@/src/components/Cards/AccessServicesCard"
import useWindowSize from "@/src/lib/useWindowSize"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import ServiceNotFound from "./service-not-found"
import { getCountryNameData, getServices } from "./api"
import { fetchFindserviceData } from "@/src/lib/apis"
import { useSignUp } from "@/src/contexts/SignUpProvider"
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking"
import { useClientContext } from "@/src/lib/queryclient"

interface CardData {
  title: string
  location: string
  phoneNumber: string
  timings: {
    value: string
  }
  facebookUrl: string
  twitterUrl: string
  email: string
  tag: string
  needs: string
}

export const AccessServices = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const countrycode = getCountryCode();
  const [cardData, setCardData] = useState<CardData[]>([])
  const [findServiceData, setFindServiceData] = useState<any>(null)
  const locale = useLocale()
  const PAGE_LIMIT = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { ip, alias } = useClientContext();

  const [countries, setCountries] = useState<Record<string, string>>({})
  const [states, setStates] = useState<Record<string, any>>({})
  const [cities, setCities] = useState<Record<string, any>>({})
  const [titles, setTitles] = useState<Record<string, any>>({})
  const [needs, setNeeds] = useState<Record<string, any>>({})
  const { translations } = useTranslations()

  let { userId, isEvaluatedUser } = useSignUp();
  useUserPageTracking({ userId: userId || '0', nid: '0', locale, pageName: translations?.[locale]?.find_services, isEvaluatedUser, ip, alias })

  // Initialize state from URL params
  const initialPage = parseInt(searchParams.get("page") || "") || 1
  const [selectedCountry, setSelectedCountry] = useState(
    searchParams.get("country") || ""
  )
  const [selectedCountryName, setSelectedCountryName] = useState("")
  const [selectedState, setSelectedState] = useState(
    searchParams.get("state") || ""
  )
  const [selectedTitle, setSelectedTitle] = useState<string[]>(
    searchParams.get("titles")?.split("+") || []
  )
  const [selectedNeed, setSelectedNeed] = useState<string[]>(
    searchParams.get("needs")?.split("+") || []
  )
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") || ""
  )
  const [initialized, setInitialized] = useState(false)

  const servicesAccordionButtonRef = useRef<HTMLButtonElement>(null)
  const servicesAccordionRef = useRef<HTMLDivElement>(null)
  const needsAccordionButtonRef = useRef<HTMLButtonElement>(null)
  const needsAccordionRef = useRef<HTMLDivElement>(null)

  const [configMessage, setConfigMessage] = useState<any | null>(null)

  // Update URL when filters change
  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    
    if (selectedCountry) params.set("country", selectedCountry)
    if (selectedState) params.set("state", selectedState)
    if (selectedCity) params.set("city", selectedCity)
    if (selectedTitle.length > 0) params.set("titles", selectedTitle.join("+"))
    if (selectedNeed.length > 0) params.set("needs", selectedNeed.join("+"))
    if (currentPage > 1) params.set("page", currentPage.toString())

    const newUrl = `${pathname}?${params.toString()}`
    if (window.location.search !== params.toString()) {
      router.push(newUrl, { scroll: false })
    }
  }, [
    selectedCountry, 
    selectedState, 
    selectedCity, 
    selectedTitle, 
    selectedNeed, 
    currentPage, 
    pathname
  ])

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    const newName = e.target.selectedOptions[0]?.getAttribute('data-name') || ""

    setSelectedCountry(newValue)
    setSelectedCountryName(newName)
    setSelectedState('')
    setSelectedCity('')
    setSelectedTitle([])
    setSelectedNeed([])
    setCurrentPage(1)

    if (!newValue) {
      setStates({})
      setCities({})
      setTitles({})
      setNeeds({})
      return
    }

    const countryData = findServiceData?.country_data?.[newName] || {}
    setStates(countryData.states || {})
    setCities(countryData.cities || {})
    setTitles(countryData.titles || {})
    setNeeds(countryData.i_need_to || {})
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    setSelectedState(newValue)
    setSelectedCity('')
    setSelectedTitle([])
    setSelectedNeed([])
    setCurrentPage(1)

    if (!newValue || !selectedCountryName) {
      setCities({})
      setTitles({})
      return
    }
    
    const stateData = findServiceData?.country_data?.[selectedCountryName]?.states?.[newValue] || {}
    setCities(stateData?.cities)
    setTitles(stateData?.titles || {})
    setNeeds(stateData?.i_need_to || {})
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    setSelectedCity(newValue)
    setSelectedTitle([])
    setSelectedNeed([])
    setCurrentPage(1)

    if (!newValue) {
      setTitles({})
      return
    }

    const cityData = findServiceData?.country_data?.[selectedCountryName]?.states?.[selectedState]?.cities?.[newValue] || {}
    setTitles(cityData.titles || {})
    setNeeds(cityData.i_need_to || {})
  }

  const toggleServicesAccordion = () => {
    servicesAccordionRef.current?.classList.toggle("hidden")
    servicesAccordionButtonRef.current?.classList.toggle("rotate-180")
  }

  const toggleNeedsAccordion = () => {
    needsAccordionRef.current?.classList.toggle("hidden")
    needsAccordionButtonRef.current?.classList.toggle("rotate-180")
  }

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setCurrentPage(1)
    
    setSelectedTitle(prevTitle => {
      return e.target.checked 
        ? [...prevTitle, newValue] 
        : prevTitle.filter(item => item !== newValue)
    })
  }

  const handleNeedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setCurrentPage(1)
    
    setSelectedNeed(prevNeed => {
      return e.target.checked 
        ? [...prevNeed, newValue] 
        : prevNeed.filter(item => item !== newValue)
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const handleCountryDetection = async () => {
      // Skip if we already have a country selected or initialized
      if (selectedCountry || initialized) return
  
      const countries = await getCountryNameData()
      const userCountryCode = getCountryCode()
  
      if (userCountryCode && countries.length > 0) {
        const matchedCountry = countries.find(
          (country:any) => country.countrycode === userCountryCode
        )
  
        if (matchedCountry) {
          // Redirect with the country tid as parameter
          router.push(`${pathname}?country=${matchedCountry.tid}`)
        }
      }
    }
  
    handleCountryDetection()
  }, [selectedCountry, initialized, pathname])
  
  // Modify your country initialization logic:
  useEffect(() => {
    const fetchFindservicesData = async () => {
        const data = await fetchFindserviceData(locale);
        setFindServiceData(data)
        setCountries(data.country_list)
        
        // Initialize from URL params
        const countryId = searchParams.get("country")
        if (countryId) {
          const countryName = Object.entries(data.country_list)
            .find(([id]) => id === countryId)?.[1] as string
          
          if (countryName) {
            setSelectedCountryName(countryName)
            setSelectedCountry(countryId)
            const countryData = data.country_data?.[countryName] || {}
            setStates(countryData.states || {})
            setCities(countryData.cities || {})
            setTitles(countryData.titles || {})
            setNeeds(countryData.i_need_to || {})

            const state = searchParams.get("state")
            if (state) {
              setSelectedState(state)
              setCities(countryData.states?.[state].cities || {})
              setTitles(countryData.states?.[state].titles || {})
              setNeeds(countryData.states?.[state].i_need_to || {})
              
              const city = searchParams.get("city")
              if (city) {
                setSelectedCity(city)
                setTitles(countryData.states?.[state]?.cities?.[city]?.titles || {})
                setNeeds(countryData.states?.[state]?.cities?.[city]?.i_need_to || {})
              }
            }
          }
        }
        setCurrentPage(initialPage)
        setInitialized(true)
    }
  
    fetchFindservicesData()
  }, [searchParams, initialPage])

  useEffect(() => {
    if (initialized) {
      updateURL()
    }
  }, [selectedCountry, selectedState, selectedCity, selectedTitle, selectedNeed, currentPage, initialized, updateURL])

  useEffect(() => {
    const getCardData = async () => {
      try {
        let offset = (currentPage - 1) * PAGE_LIMIT

        const servicesData = await getServices(
          selectedCountry,
          selectedState,
          selectedCity,
          selectedTitle,
          selectedNeed,
          PAGE_LIMIT,
          offset,
          locale
        )

        const tempCardData = servicesData.data.map((service: any) => ({
          title: service.attributes.field_service_provider_name,
          phoneNumber: service.attributes.field_telephone_number,
          email: service.attributes.field_email_id,
          timings: service.attributes.field_description,
          facebookUrl: service.attributes.field_facebook,
          twitterUrl: service.attributes.field_twitter,
          location: `${service.attributes.field_city}, ${service.attributes.field_state}`,
          tag: service.attributes.title,
          needs: service.attributes.field_i_need_to
        }))

        setCardData(tempCardData)
        setTotalPages(Math.ceil(servicesData.meta.count / PAGE_LIMIT))
      } catch (error) {
        console.error("Error loading services:", error)
        setCardData([])
      }
    }

    if (selectedCountry) {
      getCardData()
    } else {
      setCardData([])
    }
  }, [selectedCountry, selectedState, selectedCity, selectedTitle, selectedNeed, currentPage, initialized, locale])

  return (
    <div>
      <div className="flex flex-col pb-16">
        <div className="access-services-wrapper pt-24 bg-color-secondary text-white font-univers">
          <div className="container pb-4">
            <div className="breadcrumb flex items-center gap-3 pb-2 text-red-wine">
              <a href="/">{translations?.[locale]?.home || "Home"}</a>
              <svg
                className="w-3 h-3 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
              </svg>
              <span className="text-red-wine text-m pt-1">
                {translations?.[locale]?.find_services || "Find Services"}
              </span>
            </div>
            <h1
              className={`text-[#333] text-4xl font-semibold ${laila.className}`}
            >
              {translations?.[locale]?.find_services || "Find Services"}
            </h1>
            <h4 className={`text-color-neutral text-base font-normal`}>
              {translations?.[locale]?.services_description ||
                "Find assistance for your various problems from nearby service providers in your locality."}
            </h4>
          </div>
        </div>
        <div className="search-wrapper bg-color-secondary lg:bg-transparent pb-8 lg:pb-0">
          <div className="container flex flex-wrap lg:flex-nowrap gap-6">
            <div className="w-full lg:w-1/3 flex flex-wrap flex-col">
              <label htmlFor="country" className="text-[#333] text-base">
                {translations?.[locale]?.country || "Country"}
              </label>
              <select
                name="country"
                id="country"
                className="py-[0.875rem] w-full lg:w-auto px-4 rounded-full appearance-none"
                onChange={handleCountryChange}
                value={selectedCountry}
              >
                <option value="">
                  {translations?.[locale]?.select_country}
                </option>
                {countries &&
                  Object.entries(countries).map(([id, name]: [string, string]) => (
                    <option key={id} value={id} data-name={name}>
                      {name}
                    </option>
                  ))}
              </select>
            </div>
            {Object.keys(states).length > 0 && (
              <div className="w-full lg:w-1/3 flex flex-col">
                <label htmlFor="state" className="text-[#333] text-base">
                  {translations?.[locale]?.state}
                </label>
                <select
                  name="state"
                  id="state"
                  className="py-[0.875rem] w-full lg:w-auto px-4 rounded-full appearance-none"
                  value={selectedState }
                  onChange={handleStateChange}
                >
                  {selectedState ? (<option value="">
                    </option>
                  ) : (
                    <option value="">
                      {translations?.[locale]?.select_state}
                    </option>
                  )}

                  {Object.keys(states).map((state, index) => (
                    state && <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {Object.keys(cities).length > 0 && (
              <div className="w-full lg:w-1/3 flex flex-col">
                <label htmlFor="city" className="text-[#333] text-base">
                  {translations?.[locale]?.city}
                </label>
                <select
                  name="city"
                  id="city"
                  className="py-[0.875rem] w-full lg:w-auto px-4 rounded-full appearance-none"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  {selectedCity ? (
                    <option value="">
                      {translations?.[locale]?.select_city}
                    </option>
                  ) : (
                    <option value="">
                      {translations?.[locale]?.select_city}
                    </option>
                  )}
                  {Object.entries(cities).map(([city, value], index) => (
                    city && <option key={index} value={city}>
                      {city} ({value.count})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        {configMessage && (
          <div className="config-message mt-0 lg:-mt-[1.8rem] mb-0 px-6 lg:px-16 pt-6 lg:pt-12 pb-6 bg-orange text-l">
            <div className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="36"
                viewBox="0 0 37 36"
                fill="none"
              >
                <path
                  d="M18.5 12V18M18.5 24H18.515M33.5 18C33.5 26.2843 26.7843 33 18.5 33C10.2157 33 3.5 26.2843 3.5 18C3.5 9.71573 10.2157 3 18.5 3C26.7843 3 33.5 9.71573 33.5 18Z"
                  stroke="#68737D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                className="ms-4"
                dangerouslySetInnerHTML={{ __html: configMessage?.value }}
              ></span>
            </div>
          </div>
        )}
      </div>
      <div className="container services-offered lg:flex pb-24 gap-8">
        {cardData.length > 0 && (
          <>
            <aside className="w-full lg:w-3/12 mb-8 lg:mb-0">
              {/* Needs to filter. */}
              {Object.values(needs).length > 0 && (
                <>
                  <div
                    onClick={toggleNeedsAccordion}
                    className="accordion-header cursor-pointer bg-primary text-white px-4 py-[12px] text-l rounded-t-md flex justify-between items-center"
                  >
                    <span className="text-base">
                      {translations?.[locale]?.i_need_to || "I Need To"}
                    </span>
                    <button
                      className="rotate-180"
                      ref={needsAccordionButtonRef}
                    >
                      <DownArrow fill="white" width={16} height={16} />
                    </button>
                  </div>
                  <div
                    ref={needsAccordionRef}
                    className="accordion-body bg-[#feebf1] mb-8"
                  >
                    {Object.values(needs).map((item, index) => (
                      <div
                        className="py-2 px-4 flex justify-between gap-2"
                        key={index}
                      >
                        <label
                          htmlFor={item}
                          className="text-color-neutral text-base"
                        >
                          {item}
                        </label>
                        <input
                          id={item}
                          checked={selectedNeed.includes(item)}
                          type="checkbox"
                          value={item}
                          onChange={handleNeedsChange}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Services Offered Accordion */}
              <div
                onClick={toggleServicesAccordion}
                className={`${Object.values(titles).length > 0 ? "cursor-pointer" : "pointer-events-none opacity-50"} accordion-header bg-primary text-white px-4 py-[12px] text-l rounded-t-md flex justify-between items-center ${needs.length > 0 ? "mt-4" : ""}`}
              >
                <span className="text-base">
                  {translations?.[locale]?.services_offered}
                </span>
                <button className="rotate-180" ref={servicesAccordionButtonRef}>
                  <DownArrow fill="white" width={16} height={16} />
                </button>
              </div>
              <div
                ref={servicesAccordionRef}
                className="accordion-body bg-[#feebf1]"
              >
                {Object.values(titles).map((item:any, index) => (
                  <div
                    className="py-2 px-4 flex justify-between gap-2"
                    key={index}
                  >
                    <label
                      htmlFor={item}
                      className="text-color-neutral text-base"
                    >
                      {item}
                    </label>
                    <input
                      id={item}
                      type="checkbox"
                      checked={selectedTitle.includes(item)}
                      value={item}
                      onChange={handleServiceChange}
                    />
                  </div>
                ))}
              </div>
            </aside>
          </>
        )}

        <div
          className={`w-full lg:w-9/12 ${cardData.length !== 0 ? "" : "mx-auto"}`}
        >
          {cardData.length === 0 ? (
            <ServiceNotFound translations={translations} locale={locale} />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cardData.map((item, index) => {
                  return (
                    <AccessServicesCard
                      key={index}
                      className={
                        "border p-6 rounded-xl border-[#c2c8cc] hover:border-[#f7265d]"
                      }
                      phoneNumber={item.phoneNumber}
                      timings={item?.timings?.value}
                      email={item.email}
                      facebookUrl={item.facebookUrl}
                      twitterUrl={item?.twitterUrl}
                      title={item.title}
                      tag={item.tag}
                      need={item.needs}
                      location={item.location}
                    />
                  )
                })}
              </div>
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccessServices


function CustomPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}) {
  let showStartEllipsis = false
  let showEndEllipsis = false
  const { width } = useWindowSize()
  const { translations, textLoading } = useTranslations()
  const locale = useLocale()

  // If there's only one page, don't render the pagination
  if (totalPages < 2) {
    return null
  }

  let totalPagesArr = Array.from(Array(totalPages).keys())

  // Handle pagination behavior for large screen sizes (greater than 992px)
  if (totalPages > 9 && width > 992) {
    if (currentPage <= 5) {
      // If current page is among the first 5, show the first 9 pages with an ellipsis at the end
      totalPagesArr = totalPagesArr.slice(0, 9)
      showEndEllipsis = true
    } else if (currentPage + 4 >= totalPages) {
      // If current page is among the last pages, show the last 9 pages with an ellipsis at the start
      totalPagesArr = totalPagesArr.slice(-9)
      showStartEllipsis = true
    } else {
      // Otherwise, show the current page in the middle with ellipses on both sides
      const start = currentPage - 5
      const end = currentPage + 4
      totalPagesArr = totalPagesArr.slice(start, end)
      showStartEllipsis = true
      showEndEllipsis = true
    }
  } else {
    // Handle pagination behavior for smaller screen sizes (less than or equal to 992px)
    if (totalPages > 3) {
      if (currentPage <= 2) {
        // If current page is among the first 2, show the first 3 pages with an ellipsis at the end
        totalPagesArr = totalPagesArr.slice(0, 3)
        showEndEllipsis = true
      } else if (currentPage + 2 >= totalPages) {
        // If current page is among the last pages, show the last 3 pages with an ellipsis at the start
        totalPagesArr = totalPagesArr.slice(-3)
        showStartEllipsis = true
      } else {
        // Otherwise, show the current page in the middle with ellipses on both sides
        const start = currentPage - 2
        const end = currentPage + 2
        totalPagesArr = totalPagesArr.slice(start, end)
        showStartEllipsis = true
        showEndEllipsis = true
      }
    }
  }

  return (
    <div className="flex justify-between items-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)} // Decrease page number when clicked
        className={`${currentPage === 1 ? " cursor-not-allowed pointer-events-none border border-color-neutral text-color-neutral" : "text-primary border border-primary"} flex rounded-md text-m p-[13px] leading-[18px] gap-1 items-center`}
      >
        <span className="rotate-180">
          <ArrowRight width={18} height={18} />
        </span>
        <span className="pt-1">
          {width > 992 ? translations?.[locale]?.previous : ""}
        </span>
      </button>

      {/* Pagination Numbers */}
      <div className="flex overflow-x-auto justify-center w-full md:w-1/2">
        {showStartEllipsis && (
          <div className="border py-[6px] px-[12px] border-[#ddd] text-[#337ab7] rounded-l-md hover:bg-gray-200">
            ... {/* Show ellipsis at the start */}
          </div>
        )}
        {totalPagesArr.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)} // Set the page number when clicked
            className={`${currentPage === page + 1 ? "bg-[#feebf1] text-primary " : ""} w-10 h-10 hover:bg-gray-200 rounded-full`}
          >
            {page + 1}
          </button>
        ))}
        {showEndEllipsis && (
          <div className="border py-[6px] px-[12px] border-[#ddd] text-[#337ab7] rounded-r-md hover:bg-gray-200">
            ... {/* Show ellipsis at the end */}
          </div>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)} // Increase page number when clicked
        className={`${currentPage === totalPages ? " cursor-not-allowed border pointer-events-none border-[#5a6872] text-[#5a6872]" : "text-[#f7265d] border cursor-pointer border-[#f7265d]"} flex rounded-md text-m p-[13px] items-center leading-[18px] gap-1`}
      >
        <span className="pt-1">
          {width > 992 ? translations?.[locale]?.next : ""}
        </span>
        {currentPage < totalPages && <ArrowRight width={18} height={18} />}
      </button>
    </div>
  )
}