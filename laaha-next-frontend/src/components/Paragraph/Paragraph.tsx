import { useMemo, useState, useEffect } from "react"
import Layout from "./Layout"
import "./paragraph.scss"
import { BasicPageShimmer, GeneralLoader } from "../Shimmer"
import Text from "./Text"
import ImageComponent from "./Image"
import Accordion from "./Accordion"
import ExternalVideo from "./ExternalVideo"
import Video from "./Video"
import Audio from "./Audio"
import TextWithVideo from "./TextWithVideo"

// Define a simple loader component (e.g., skeleton loader)
const Loader = () => {
  return <GeneralLoader />
}

const Paragraph = ({ data }: { data: any }) => {
  const layoutData = data.layout_structure
  const content = data.field_content

  // State for loading
  const [isLoading, setIsLoading] = useState(true)

  const paragraphTypes: { [key: string]: React.ElementType } = {
    "paragraph--wysiwyg_editor": Text,
    "paragraph--image": ImageComponent,
    "paragraph--faq": Accordion,
    "paragraph--external_videos": ExternalVideo,
    "paragraph--video": Video,
    "paragraph--podcast_audio": Audio,
    "paragraph--text_and_video": TextWithVideo,
  }

  // Dynamically render content types
  const renderLayout = useMemo(() => {
    if (!Array.isArray(layoutData)) {
      console.error("Expected 'layout_structure' to be an array.")
      return null
    }

    return layoutData.map((layout: any, index) => {
      const LayoutComponent = Layout
      if (
        layout.type !== "layout" ||
        Object.keys(layout.regions).length === 0
      ) {
        return null
      }

      return (
        <LayoutComponent key={index} layout_id={layout.layout_id}>
          {Object.keys(layout.regions).map((regionKey, index) => {
            const region = layout.regions[regionKey]
            return (
              region.length > 0 && (
                <div key={index} className={`region-${regionKey} w-full`}>
                  {region.map((component: any) => {
                    const matchedContent = content.find(
                      (item: any) => item.id === component.uuid
                    )
                    const Component = paragraphTypes[matchedContent?.type]

                    // Dynamically handling component type
                    if (!Component) {
                      console.warn(`Unknown component type: ${component.type}`)
                      return (
                        <div key={component.uuid}>
                          Unknown component type: {component.type}
                        </div>
                      )
                    }

                    if (matchedContent) {
                      return (
                        <Component key={component.uuid} {...matchedContent} />
                      )
                    }

                    return null
                  })}
                </div>
              )
            )
          })}
        </LayoutComponent>
      )
    })
  }, [layoutData, content])

  // Handle loading state with a timeout
  useEffect(() => {
    const loadingDelay = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Adjust the delay as necessary

    return () => {
      clearTimeout(loadingDelay) // Cleanup the timeout when the component is unmounted
    }
  }, [])

  // // If data is still being loaded, show the loader
  // if (isLoading) {
  //   return <Loader />
  // }

  // Once content is loaded, render the layout
  return <>{renderLayout}</>
}

export default Paragraph
