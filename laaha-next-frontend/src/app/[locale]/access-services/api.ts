import { getCountryCode, getLangCode, getLocaleValue } from "@/src/lib/utils"

// Fetch facets for filtering services based on country, state, city, and locale
export const getFacets = async (
  country = "",
  state = "",
  city = "",
  locale: string
) => {
  // Build the base URL for the facets API
  let facetsUrl =
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL +
    `/${locale}/api/v1/find_services_facets`

  // Retrieve the country, language, and locale values from utility functions
  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()

  // Add filters to the URL if specific values are provided
  if (country !== "") {
    facetsUrl += "?filter[field_country]=" + country
  }
  if (state !== "" && country !== "") {
    facetsUrl += "&filter[field_state]=" + state
  }
  if (city !== "" && country !== "" && state !== "") {
    facetsUrl += "&filter[field_city]=" + city
  }

  // Make the request to fetch facets data
  let response = await fetch(facetsUrl, {
    headers: {
      "country-code": countryCode || "US",
      "lang-code": langCode || "en",
      locale: localeValue || "en",
      "Content-Type": "application/json",
    },
  })
  let data = await response.json()
  return data
}

// Fetch country name data from the API
export const getCountryNameData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/en/api/v1/country"}`
  )
  const data = await response.json()
  return data
}

export const getServices = async (
  country = "",
  state = "",
  city = "",
  titles: string[] | '' = [],
  needs: string[] = [],
  pageLimit = 10,
  pageOffset = 0,
  locale: string
) => {
  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()

  // Build the base URL for fetching services
  let url =
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL +
    `/${encodeURIComponent(locale)}/jsonapi/index/find_services?filter[langcode]=${encodeURIComponent(locale)}`

  // Add filters to the URL with proper encoding
  if (country !== "") {
    url += "&filter[field_country]=" + encodeURIComponent(country)
  }
  if (state !== "" && country !== "") {
    url += "&filter[field_state]=" + encodeURIComponent(state)
  }
  if (city !== "" && country !== "") {
    url += "&filter[field_city]=" + encodeURIComponent(city)
  }

  if (titles.length > 0) {
    // Loop through titles if there are multiple
    url += "&filter[title][condition][path]=title&filter[title][condition][operator]=IN"
    for (let i = 0; i < titles.length; i++) {
      url += "&filter[title][condition][value][]=" + encodeURIComponent(titles[i])
    }
  }

  if (needs.length > 0) {

    url += "&filter[field_i_need_to][condition][path]=field_i_need_to&filter[field_i_need_to][condition][operator]=IN"
    for (let i = 0; i < needs.length; i++) {
      url += "&filter[field_i_need_to][condition][value][]=" + encodeURIComponent(needs[i])
    }
  }

  // Add pagination parameters to the URL
  url += "&page[limit]=" + pageLimit + "&page[offset]=" + pageOffset

  // Make the request to fetch services data
  let response = await fetch(url, {
    headers: {
      "country-code": countryCode || "US",
      "lang-code": langCode || "en",
      locale: localeValue || "en",
      "Content-Type": "application/json",
    },
  })
  let data = await response.json()
  return data
}

// Fetch configuration message data for services based on the locale
export const getConfigMessageData = async (locale: string) => {
  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()

  // Request to fetch configuration message for services
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/find-services-config`,
    {
      headers: {
        "country-code": countryCode || "US",
        "lang-code": langCode || "en",
        locale: localeValue || "en",
        "Content-Type": "application/json",
      },
    }
  )
  const data = await response.json()
  return data
}

export const getMarketingData = async (locale: string) => {
  const countryCode = getCountryCode()
  const langCode = getLangCode()
  const localeValue = getLocaleValue()

  // Request to fetch configuration message for services
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/find-services-card-api`,
    {
      headers: {
        "country-code": countryCode || "US",
        "lang-code": langCode || "en",
        locale: localeValue || "en",
        "Content-Type": "application/json",
      },
    }
  )
  const data = await response.json()
  return data
}
