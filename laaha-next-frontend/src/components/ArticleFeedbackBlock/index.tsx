import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { laila } from "@/src/lib/utils";
import FeedbackForm from "./FeedbackForm";
import { useLocale } from "next-intl";
import { useTranslations } from "@/src/contexts/TranslationsContext";
import { getAccessToken } from "@/src/lib/protectedAuth";
import { useSignUp } from "@/src/contexts/SignUpProvider";

export const ArticleFeedback = ({ subcatTid, nid }: { subcatTid: string; nid: string }) => {
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [isNewFeedback, setIsNewFeedback] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const locale = useLocale();
  const { userId } = useSignUp();
  const { translations } = useTranslations();

  // Read feedback on mount
  useEffect(() => {
    const initFeedback = async () => {
      // 1. Check for existing cookie
      if(!userId) {
        const storedFeedback = Cookies.get(`article_feedback_${nid}`);
        if (storedFeedback) {
          setFeedbackType(storedFeedback);
          setIsNewFeedback(false);
          return;
        }
      }

      // 2. If not found, try fetching for logged-in users
      try {
        const accessToken = await getAccessToken(); // null if not logged in
        if (!accessToken) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/module-survey-helpful/${nid}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            locale
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.was_this_helpful) {
            setFeedbackType(data.was_this_helpful.charAt(0).toUpperCase() + data.was_this_helpful.slice(1).toLowerCase());
            setIsNewFeedback(false);
          }
        }
      } catch (err) {
        console.error("Failed to load user feedback:", err);
      }
    };

    initFeedback();
  }, [subcatTid, nid]);

  const handleFeedback = (type: string) => {
    if (!feedbackType) {
      setFeedbackType(type);
      setShowForm(true);
      setIsNewFeedback(true);
      Cookies.set(`article_feedback_${nid}`, type, { expires: 1 });
    }
  };

  const handleShowForm = () => {
    setShowForm(false);
  };

  return (
    <div className="article-feedback mb-8 border-b pb-8 border-gray">
      <div className="feedback-heading">
        <div className={`${laila.className} font-bold text-primary text-xl mb-2`}>
          {translations?.[locale]?.was_this_helpful}
        </div>
      </div>
      <div className="reactions inline-flex gap-x-2 w-full">
        <div
          onClick={() => handleFeedback("Yes")}
          className={`${
            feedbackType && feedbackType !== "Yes" ? "pointer-events-none opacity-30" : ""
          } thumbsup p-3 cursor-pointer bg-gray-100 hover:scale-110 rounded-full flex items-center justify-center`}
        >
          <Image src={"/assets/images/thumbsup.svg"} alt="Thumbs Up" width={22} height={22} />
        </div>
        <div
          onClick={() => handleFeedback("No")}
          className={`${
            feedbackType && feedbackType !== "No" ? "pointer-events-none opacity-30" : ""
          } thumbsdown p-3 cursor-pointer bg-gray-100 hover:scale-110 rounded-full flex items-center justify-center`}
        >
          <Image src={"/assets/images/thumbsdown.svg"} alt="Thumbs Down" width={22} height={22} />
        </div>
      </div>
      {isNewFeedback && (
        <div className="mt-4 bg-gray-50 rounded-lg text-sm text-gray-700">
          {(feedbackType === "Yes" || feedbackType === "No") && showForm && (
            <FeedbackForm nid={nid} handleShowForm={handleShowForm} feedbackType={feedbackType} subcatTid={subcatTid} />
          )}
        </div>
      )}
    </div>
  );
};
