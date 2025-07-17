"use client"

import { useLocale } from "next-intl";
import { Breadcrumbs } from "../Breadcrumb"
import DetailPageParagraph from "../Paragraph/DetailPageParagraph"
import { useSignUp } from "@/src/contexts/SignUpProvider";
import { useUserPageTracking } from "@/src/hooks/useUserPageTracking";
import { useClientContext } from "@/src/lib/queryclient";

const BasicPage = ({ data }: any) => {
  let nid = data?.nid?.[0]?.value;
  let locale = useLocale();
  const { ip, alias } = useClientContext();

  let { userId, isEvaluatedUser } = useSignUp();
  useUserPageTracking({ userId: userId || '0', nid: "0", locale, isEvaluatedUser, ip, alias })
  
  return (
    <div className="video-page">
      <Breadcrumbs items={[{title: data?.title?.[0]?.value}]} />
      <DetailPageParagraph data={data} />
    </div>
  )
}

export default BasicPage
