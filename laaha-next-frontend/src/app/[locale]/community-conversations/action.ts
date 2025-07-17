"use server"

import { createSession, deleteSession } from "@/src/lib/session"
import { redirect } from "next/navigation"
import { getAccessToken, validateUser } from "./api"
import { clientId, clientSecret } from "@/src/lib/drupal"
import { cookies } from "next/headers"
import { postUserPayloads } from "@/src/lib/apis"

// Define type for user sign-in credentials.
export type SignInCreds = {
  username: string
  password: string
}

// Function to log in a user
export async function login(userDetails: SignInCreds, locale: string, now?: Date) {
  const { username, password } = userDetails

  // Validate the user credentials with the backend
  let res = await validateUser({ username, password }, locale)

  // Handle invalid user response
  if (res.error) {
    return { error: res.error, data: null }
  }

  // Set the country code in cookies
  cookies().set("COUNTRY_CODE", res.default_country_code, {
    path: "/",
    httpOnly: false,
  })

  // If user is valid, get an access token from the backend
  let data = await getAccessToken(
    { username, password },
    locale,
    clientId,
    clientSecret
  )

  // Handle error in token fetching
  if (!data?.access_token || !data?.refresh_token) {
    return { error: "Failed to fetch access token", data: null }
  }

  // Extract user details from the response
  let avatarUrl = res.avatar.url
  let uid = res.uid
  let accessToken = data.access_token
  let refreshToken = data.refresh_token
  let userRole = res.role["1"]
  let isEvaluator = res.is_evaluated_user == "1" ? true : false

  // Create a session for the user with the fetched data
  await createSession(
    username,
    avatarUrl,
    res.uid,
    accessToken,
    refreshToken,
    userRole,
    isEvaluator
  )

  // Prepare analytics payload
  if (isEvaluator) {
    postUserPayloads({
      linkText: "Login",
      accessToken,
      userId: uid,
      locale,
      now
    })
  }

  // Return the successful login data
  return {
    error: null,
    data: {
      username,
      avatarUrl,
      uid,
      accessToken,
      refreshToken,
      userRole,
      isEvaluator,
    },
  }
}

// Function to log out the user
export async function logout(locale: string, accessToken:string | '', uid:string, now?:Date) {
  await deleteSession()
  // Set headers to prevent caching
  const headers = new Headers({
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  })

    postUserPayloads({
      linkText: "Logout",
      userId: uid,
      accessToken,
      locale,
      now
    })
  return new Response(null, { status: 200, headers })
}

// Function to delete the session details (used for session cleanup)
export async function deleteSessionDetails() {
  await deleteSession()
}
