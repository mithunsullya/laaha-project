import React, { useEffect } from "react"
import SlidePanelItems from "../SlidePanels/SlidePanelItems"
import { useLocale } from "next-intl"
import { getCountryCode } from "@/src/lib/utils"
import { getAccessToken } from "@/src/lib/protectedAuth"
interface CuratedNode {
  title: string
  url: string
}

interface CuratedItem {
  heading: string
  totalCount: number
  completedCount: number
  progressTitle: string
  progressIcon?: React.ReactNode | string
  bgcolor: string
  nodes: CuratedNode[]
}

const Continue = ({items}: any) => {
  const curatedItems: CuratedItem[] = items.map((item:any) => {
    const nodesArray = Object.values(item.nodes || {})
    return {
      heading: "Continue: ",
      totalCount: item?.total_nodes,
      completedCount: item?.completed_nodes,
      progressTitle: item?.category_name,
      // bgcolor: item?.category_color,
      progressIcon: item?.category_icon,
      nodes: nodesArray.map((node: any) => ({
        title: node.node_title,
        url: node.node_url,
        type: node.node_bundle
      })),
    }
  })

  return <SlidePanelItems items={curatedItems} />
}

export default Continue
