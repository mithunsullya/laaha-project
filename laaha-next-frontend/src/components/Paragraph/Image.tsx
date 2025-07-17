"use client"

import { absoluteUrl } from "@/src/lib/utils"
import Image from "next/image"

const ImageComponent = (data: any) => {

  // Safely access nested properties with optional chaining
  const url = data?.field_single_image?.field_media_image?.uri?.url
  const podcast_image_url =  data?.field_single_image?.[0]?.thumbnail?.[0]?.url;

  // Provide a default alt text if the name is not available
  const altValue =
    data?.field_single_image?.[0]?.name ||
    data?.field_single_image?.[0]?.thumbnail?.name ||
    "Default Alt Text"

  // Determine the image source
  const imageSrc = podcast_image_url ? podcast_image_url : absoluteUrl(url || "")

  return (
    <Image
      className="my-4"
      src={imageSrc}
      loading="eager"
      alt={altValue}
      width={500}
      height={300}
    />
  )
}

export default ImageComponent
