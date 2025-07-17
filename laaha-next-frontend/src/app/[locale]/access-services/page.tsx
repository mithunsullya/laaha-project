export const runtime = "edge";

import { getLocale } from "next-intl/server";
import AccessServices from "./access-services";

// Define metadata for each locale
const metadata: { [key: string]: { title: string; description: string } } = {
  en: {
    title: "Find Services | Laaha",
    description: "Find assistance for your various problems from nearby service providers in your locality.",
  },
  es: {
    title: "Encontrar Servicios | Laaha",
    description: "Encuentre asistencia para sus diversos problemas de proveedores de servicios cercanos en su localidad.",
  },
  ar: {
    title: "البحث عن خدمات | Laaha",
    description: "ابحث عن المساعدة لمشاكلك المختلفة من مقدمي الخدمات القريبين في منطقتك.",
  },
  my: {
    title: "ဝန်ဆောင်မှုများကိုရှာပါ။",
    description: "သင့်ဒေသရှိ အနီးနားရှိ ဝန်ဆောင်မှုပေးသူများထံမှ သင့်ပြဿနာအမျိုးမျိုးအတွက် အကူအညီရှာပါ။"
  }
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

export default async function FindServicesPage() {
  return (
    <>
      <AccessServices />
    </>
  );
}

