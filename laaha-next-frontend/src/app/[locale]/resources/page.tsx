export const runtime = "edge";

import ResourcePage from "./resources";
import { getLocale } from "next-intl/server";

// Define metadata for each locale
const metadata: { [key: string]: { title: string; description: string } } = {
  en: {
    title: "Resources | Laaha",
    description: "Resources related to modules, podcast, video.",
  },
  es: {
    title: "Resources | Laaha",
    description: "Recursos relacionados con módulos, podcasts, videos.",
  },
  ar: {
    title: "الموارد | Laaha",
    description: "موارد متعلقة بالوحدات، البودكاست، الفيديو.",
  },
};

// Generate metadata for the page
export async function generateMetadata() {
  const locale = await getLocale();
  // Fallback to English if the locale is not supported
  const localeValue = metadata[locale] ? locale : "en";

  if(locale) {
    return {
      title: metadata[localeValue].title, // Dynamic title based on locale
      description: metadata[localeValue].description, // Dynamic description based on locale
      keywords: ["resources", "modules", "podcast", "videos"], // Static keywords
    };
  }
}

// Server-side rendered page component
const Resources = () => {
  return (
    <>    
    <ResourcePage />
    </>
  );
};

export default Resources;
