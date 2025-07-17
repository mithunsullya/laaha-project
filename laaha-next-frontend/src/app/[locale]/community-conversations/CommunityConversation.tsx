"use client"

import CommunityPage from "@/src/components/CommunityPage/CommunityPage";
import CommunityBanner from "./CommunityBanner";
import SignUpForm from "./SignUpForm";
import { useValidUser } from "@/src/contexts/ValidCountryUser";
import AccessDenied from "@/src/components/AccessDenied";
import RedirectForumUser from "./RedirectForumUser";
import { useLocale } from "next-intl";
import siteConfig from "@/site.config";

// Server-side rendered page component
const CommunityConversation = () => {
  const { isValidUser, langAccess } = useValidUser();
  const locale = useLocale();
  const defaultLocale = siteConfig.defaultLocale;

  if (isValidUser && locale !== defaultLocale && !langAccess) {
    return <RedirectForumUser />
  }

  return (
    isValidUser ?
    <div className="bg-gray-400">
      <CommunityBanner />
      <CommunityPage />
    </div> : 
    <AccessDenied />
  );
};

export default CommunityConversation;