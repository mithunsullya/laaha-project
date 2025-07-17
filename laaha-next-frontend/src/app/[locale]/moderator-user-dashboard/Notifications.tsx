"use client"

import { getCountryCode } from "@/src/lib/utils"
import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { getAccessToken } from "@/src/lib/protectedAuth"
import { NotificationIcon } from "@/src/lib/icons"
import { useRouter } from "next/navigation"
import { useModeratorDashboard } from "@/src/contexts/ModeratorContext"
import { useTranslations } from "@/src/contexts/TranslationsContext"

const Notifications = () => {
  const [notifications, setNotifications] = useState<any>([])
  const [open, setOpen] = useState(false)
  const countryCode = getCountryCode()
  const locale = useLocale()
  const { navigateToItem } = useModeratorDashboard()
  const router = useRouter()
  const { translations} = useTranslations();
  const notificationRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleNotificationClick = (notification: any) => {
    // Navigate to moderator dashboard if not already there
    const currentPath = window.location.pathname
    if (!currentPath.includes("/moderator-user-dashboard")) {
      router.push(`/${locale}/moderator-user-dashboard`)
    }

    // Ensure entityId is a string for consistent comparison
    const entityId = notification.entity_id?.toString()

    // Use the context to navigate to the specific item
    navigateToItem(notification.entity_type, entityId, notification.operation_type)

    // Close the notifications dropdown
    setOpen(false)

    // Mark notification as read (you can implement this API call)
    // markNotificationAsRead(notification.id)
  }

  const handleClickOutside = (event:any) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = await getAccessToken()
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/v1/vss-moderator-notification-api`, {
          headers: {
            "country-code": countryCode || "US",
            locale: locale || "en",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setNotifications(data)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      }
    }

    fetchNotifications()

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])


  let notificationCount = Object.values(notifications).length
  return (
    <div className="ms-4 md:ms-6 mt-2 lg:mt-1">
      <button
        onClick={() => handleClick()}
        className={`relative hover:opacity-70 transition-colors duration-200 ${open ? "pointer-events-none" : ""}`}
      >
        <NotificationIcon className="h-7 w-7 text-gray-600" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white bg-red text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
            {notificationCount > 99 ? "99+" : notificationCount}
          </span>
        )}
        <span className="sr-only">
          {notificationCount} notification{notificationCount !== 1 ? "s" : ""}
        </span>
      </button>
      {open && (
        <div className="notifications relative" ref={notificationRef}>
          <div className="absolute -end-2.5 md:end-0 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <div className="flex items-center justify-between p-4 pb-2">
              <h4 className="font-semibold mb-1">{ translations?.[locale]?.notifications }</h4>
            </div>

            <div className="border-t border-gray-200" />

            <div className="h-[400px] overflow-y-auto">
              {Object.values(notifications).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <NotificationIcon />
                  <p className="text-sm text-gray-400">{ translations?.[locale]?.no_notifications}</p>
                </div>
              ) : (
                <div className="space-y-1 p-1">
                  {Object.values(notifications).map((notification: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => handleNotificationClick(notification)}
                      className={`flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-gray-100 cursor-pointer ${
                        notification.status === "unread" ? "bg-blue-50 border-l-4 border-blue-500" : ""
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-m font-medium leading-6 mb-2">{notification.notification}</p>
                            <p className="text-sm text-color-neutral mt-1">{notification.updated}</p>
                            <div className="flex gap-2 mt-1">
                              <span className="text-xs bg-gray-300 px-2 py-1 rounded">
                                {notification.entity_type === "node" ? "Question" : "Reply"}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  notification.operation_type === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : notification.operation_type === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : notification.operation_type === "reported"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {notification.operation_type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
