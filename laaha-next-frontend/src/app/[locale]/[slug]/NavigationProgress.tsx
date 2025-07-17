// components/NavigationProgress.tsx
"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import '@/src/components/Shimmer/nprogress.scss'

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.3
    })

    const handleStart = () => NProgress.start()
    const handleStop = () => NProgress.done()

    // Improved click handler using event delegation
    const handleDocumentClick = (event: MouseEvent) => {
      // Find the closest anchor tag from the click target
      const anchor = (event.target as Element).closest('a')
      
      if (!anchor) return
      
      // Skip if anchor opens in new tab or has download attribute
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return
      
      // Only handle internal links
      const href = anchor.getAttribute('href')
      if (href && (href.startsWith('/') || href.startsWith(window.location.origin))) {
        handleStart()
        
        // Add a fallback in case navigation doesn't complete
        const timeout = setTimeout(() => {
          handleStop()
        }, 5000) // 5 second timeout
        
        // Clean up when page hides (navigation occurs)
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'hidden') {
            handleStop()
            clearTimeout(timeout)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
          }
        }
        
        document.addEventListener('visibilitychange', handleVisibilityChange)
      }
    }

    // Add single event listener to document
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
      handleStop()
    }
  }, [pathname, searchParams])

  return null
}
