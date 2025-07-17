import type React from "react"
import { absoluteUrl, laila } from "@/src/lib/utils"
import Image from "next/image";

function generateLightToDarkGradient(color: string): string {
  let rgb: { r: number; g: number; b: number } | null = null

  // Handle rgb format: "rgb(255, 0, 0)" or "255, 0, 0"
  const rgbMatch = color.match(/rgb$$(\d+),\s*(\d+),\s*(\d+)$$/) || color.match(/(\d+),\s*(\d+),\s*(\d+)/)
  if (rgbMatch) {
    rgb = {
      r: Number.parseInt(rgbMatch[1]),
      g: Number.parseInt(rgbMatch[2]),
      b: Number.parseInt(rgbMatch[3]),
    }
  }

  if (!rgb) {
    // Fallback to gray if color parsing fails
    return "linear-gradient(to right, #d1d5db, #6b7280, #374151)"
  }

  const { r, g, b } = rgb

  // Generate light variant (increase brightness)
  const lightR = Math.min(255, r + Math.floor((255 - r) * 0.6))
  const lightG = Math.min(255, g + Math.floor((255 - g) * 0.6))
  const lightB = Math.min(255, b + Math.floor((255 - b) * 0.6))

  // Keep original as medium
  const mediumR = r
  const mediumG = g
  const mediumB = b

  // Generate dark variant (decrease brightness)
  const darkR = Math.max(0, Math.floor(r * 0.6))
  const darkG = Math.max(0, Math.floor(g * 0.6))
  const darkB = Math.max(0, Math.floor(b * 0.6))

  const lightColor = `rgb(${lightR}, ${lightG}, ${lightB})`
  const mediumColor = `rgb(${mediumR}, ${mediumG}, ${mediumB})`
  const darkColor = `rgb(${darkR}, ${darkG}, ${darkB})`

  return `linear-gradient(to right, ${lightColor}, ${mediumColor}, ${darkColor})`
}

type ProgressBarProps = {
  completedCount: number | 0
  totalCount: number | 0
  progressIcon?: React.ReactNode | string
  progressTitle?: string
  bgcolor: string // RGB color from backend
}

const ProgressBar = ({ completedCount = 0, totalCount = 0, progressIcon, progressTitle, bgcolor="rgb(247, 38, 93)" }: ProgressBarProps) => {
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const gradientStyle = generateLightToDarkGradient(bgcolor)

  return (
    <div className="progress lg:inline-flex items-center gap-x-4 w-full">
      <div className="progress-info flex-[0_0_25%] inline-flex items-center gap-x-3">
        <div className="p-1 bg-white rounded-full flex-[0_0_48px]">
          <div className="p-1 bg-color-secondary rounded-full -z-1">
        <Image width={32} height={32} className="rounded-full" alt="Icon" src={absoluteUrl(`${progressIcon}`)} />
        </div>
        </div>
        <div className={`progress-title mb-4 lg:mb-0 font-bold ${laila.className}`}>{progressTitle || ""}</div>
      </div>
      <div className="flex-[0_0_65%] flex items-center gap-x-4">
        <div className="progress-bar flex-[0_0_97%] lg:flex-[0_0_auto] w-full rounded-lg bg-gray-200 overflow-hidden">
          <div
            className="progress-bar-fill py-2 rounded-lg transition-all duration-300 ease-out"
            style={{
              width: `${progressPercentage}%`,
              background: gradientStyle,
            }}
          />
        </div>
        <div className="resource-count text-primary text-sm font-semibold flex-[0_0_auto]">
          <span>
            {completedCount} / {totalCount}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
