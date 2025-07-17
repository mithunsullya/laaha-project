import { ContentMadeForYouShimmer } from "@/src/components/Shimmer"
import { absoluteUrl, laila } from "@/src/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import the Card component
const Card = dynamic(() => import("@/src/components/Cards/Card"), {
  loading: () => <div>Loading...</div>, // Optional: You can add a loading spinner or placeholder
})

interface ContentMadeForYouProps {
  contentMadeForYouTitle: string
  contentMadeForYouData: any[]
  loading: boolean
}

export default function ContentMadeForYou({
  contentMadeForYouTitle,
  contentMadeForYouData,
  loading,
}: ContentMadeForYouProps) {

  if (loading) {
    return <ContentMadeForYouShimmer />
  }

  return (
    <div className="container content-made-for-you mb-20">
      <h2 className={`${laila.className} text-2xl font-semibold pb-8`}>
        {contentMadeForYouTitle}
      </h2>
      <div className="flex gap-4 flex-wrap md:flex-nowrap">
        <div className="w-full">
          <Card
            item={{
              name: contentMadeForYouData[0].category,
              node: {
                title: contentMadeForYouData[0].data.title,
                read_time: contentMadeForYouData[0].data.read_time,
                image_uri: contentMadeForYouData[0].data.image_uri,
                type: contentMadeForYouData[0].data.type,
                url: contentMadeForYouData[0].data.url,
              },
            }}
          />
        </div>
        <div className="side-content w-full flex flex-col gap-6">
          <Card
            variant="side"
            item={{
              name: contentMadeForYouData[1].category,
              node: {
                title: contentMadeForYouData[1].data.title,
                read_time: contentMadeForYouData[1].data.read_time,
                image_uri: contentMadeForYouData[1].data.image_uri,
                type: contentMadeForYouData[1].data.type,
                url: contentMadeForYouData[1].data.url,
              },
            }}
          />
          <Card
            variant="side"
            item={{
              name: contentMadeForYouData[2].category,
              node: {
                title: contentMadeForYouData[2].data.title,
                read_time: contentMadeForYouData[2].data.read_time,
                image_uri: contentMadeForYouData[2].data.image_uri,
                type: contentMadeForYouData[2].data.type,
                url: contentMadeForYouData[2].data.url,
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
