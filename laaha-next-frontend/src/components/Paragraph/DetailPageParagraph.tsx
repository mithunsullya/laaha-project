import Text from "./Text"
import Layout from "./Layout"
import ImageComponent from "./Image"
import Accordion from "./Accordion"
import Video from "./Video"
import ExternalVideo from "./ExternalVideo"
import Audio from "./Audio"
import "./paragraph.scss"
import { useMemo } from "react"
import TextWithVideo from "./TextWithVideo"

const DetailPageParagraph = ({ data, nid }: { data: any; nid?: string }) => {
  const layoutData = data.layout_structure
  const content = data.field_content

  const paragraphTypes: { [key: string]: React.ElementType } = {
    "paragraph--wysiwyg_editor": Text,
    wysiwyg_editor: Text,
    "paragraph--image": ImageComponent,
    image: ImageComponent,
    "paragraph--faq": Accordion,
    "faq": Accordion,
    external_videos: ExternalVideo,
    "paragraph--video": Video,
    "paragraph--podcast_audio": Audio,
    podcast_audio: Audio,
    "paragraph--text_and_video": TextWithVideo,
  }

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
        if (layout.type === "component") {
          const Component = paragraphTypes[layout.paragraph_type]
          let id = layout.id
          const matchedContent = content.find(
            (item: any) => item.id[0].value == id
          )
          return <Component key={id} {...matchedContent} nid={nid} />
        }
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
                      (item: any) => item.uuid[0].value === component.uuid
                    )

                    const Component =
                      paragraphTypes[matchedContent?.type[0].target_id]
                    if (!Component) {
                      return (
                        <div key={component.uuid}>
                          Unknown component type: {component.paragraph_type}
                        </div>
                      )
                    }

                    if (
                      matchedContent &&
                      matchedContent?.type[0].target_id == "external_videos"
                    ) {
                      let data = {
                        field_external_video:
                          matchedContent.field_external_video[0].value,
                      }
                      return <Component key={component.uuid} {...data} />
                    }

                    if (matchedContent) {
                      return (
                        <Component
                          key={component.uuid}
                          {...matchedContent}
                          nid={nid}
                        />
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

  // Once content is loaded, render the layout
  return <>{renderLayout}</>
}

export default DetailPageParagraph
