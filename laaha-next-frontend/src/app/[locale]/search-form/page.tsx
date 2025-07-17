export const runtime = "edge";

import { getLocale } from "next-intl/server";
import SearchForm from "./searchPage";

// Define metadata for each locale
const metadata: { [key: string]: { title: string; description: string } } = {
  en: {
    title: "Search | Laaha",
    description: "Search contents on laaha platforms.",
  },
};

// Generate metadata for the page
export async function generateMetadata() {
  const locale = await getLocale();
  const localeValue = metadata[locale] ? locale : "en";

  if(locale) {
    return {
      title: metadata[localeValue].title, // Dynamic title based on locale
      description: metadata[localeValue].description, // Dynamic description based on locale
      keywords: ["resources", "modules", "podcast", "videos"], // Static keywords
    };
  }
}

export default async function SearchForms() {
  return (
    <>
      <SearchForm />
    </>
  );
}
