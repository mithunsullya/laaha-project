"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface ModeratorDashboardContextType {
  activeSidebarItem: string
  activeMiddleIndex: string | null
  pendingNavigation: { entityId: string; targetSection: string } | null
  setActiveSidebarItem: (item: string) => void
  setActiveMiddleIndex: (index: string | null) => void
  setPendingNavigation: (navigation: { entityId: string; targetSection: string } | null) => void
  navigateToItem: (entityType: string, entityId: string, operationType: string) => void
  clearPendingNavigation: () => void
}

const ModeratorDashboardContext = createContext<ModeratorDashboardContextType | undefined>(undefined)

export const useModeratorDashboard = () => {
  const context = useContext(ModeratorDashboardContext)
  if (!context) {
    throw new Error("useModeratorDashboard must be used within a ModeratorDashboardProvider")
  }
  return context
}

interface ModeratorDashboardProviderProps {
  children: ReactNode
}

export const ModeratorDashboardProvider: React.FC<ModeratorDashboardProviderProps> = ({ children }) => {
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>("")
  const [activeMiddleIndex, setActiveMiddleIndex] = useState<string | null>(null)
  const [pendingNavigation, setPendingNavigation] = useState<{ entityId: string; targetSection: string } | null>(null)

  const navigateToItem = (entityType: string, entityId: string, operationType: string) => {
    // Determine which sidebar section to navigate to based on entity type and operation
    let targetSection = ""

    if (entityType === "node" && operationType === "created") {
      targetSection = "moderate-question"
    } else if (entityType === "comment" && operationType === "created") {
      targetSection = "moderate-replies"
    } else if (entityType === "node" && operationType === "reported") {
      targetSection = "reported-questions"
    } else if (entityType === "comment" && operationType === "reported") {
      targetSection = "reported-replies"
    } else if (
      entityType === "node" &&
      (operationType === "approved" ||
        operationType === "rejected" ||
        operationType === "unpublished" ||
        operationType === "ignored")
    ) {
      // For completed actions on questions, could go to reported-questions or moderate-question
      // Check if it was originally reported or just needs moderation
      targetSection = "reported-questions" // Default to reported for completed actions
    } else if (
      entityType === "comment" &&
      (operationType === "approved" ||
        operationType === "rejected" ||
        operationType === "unpublished" ||
        operationType === "ignored")
    ) {
      targetSection = "reported-replies"
    }

    if (targetSection) {
      // Set pending navigation instead of immediately setting the middle index
      setPendingNavigation({ entityId, targetSection })
      setActiveSidebarItem(targetSection)
      // Clear the current middle index
      setActiveMiddleIndex(null)
    }
  }

  const clearPendingNavigation = () => {
    setPendingNavigation(null)
  }

  const value = {
    activeSidebarItem,
    activeMiddleIndex,
    pendingNavigation,
    setActiveSidebarItem,
    setActiveMiddleIndex,
    setPendingNavigation,
    navigateToItem,
    clearPendingNavigation,
  }

  return <ModeratorDashboardContext.Provider value={value}>{children}</ModeratorDashboardContext.Provider>
}
