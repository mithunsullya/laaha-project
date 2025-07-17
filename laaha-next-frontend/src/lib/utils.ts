import { Laila } from "next/font/google"
import Cookies from "js-cookie"

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export const laila = Laila({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
})

export const getCountryCode = (): string | null => {
  return Cookies.get("COUNTRY_CODE") || null
}

export const getLangCode = (): string | null => {
  return Cookies.get("BROWSER_LANG_CODE") || null
}

export const getLocaleValue = (): string | null => {
  return Cookies.get("NEXT_LOCALE") || null
}

export function highlightAndCountSensitiveWords(
  text: string,
  sensitiveWords: string[]
): { highlightedText: string; wordCounts: Record<string, number> } {
  // Initialize wordCounts with proper typing
  const wordCounts: Record<string, number> = {};

  // Handle cases where text is undefined or null
  if (typeof text !== 'string') {
    return { highlightedText: '', wordCounts };
  }

  // Return early if no sensitive words to check
  if (!sensitiveWords || sensitiveWords.length === 0) {
    return { highlightedText: text, wordCounts };
  }

  try {
    // Escape special regex characters in sensitive words
    const escapedWords = sensitiveWords.map(word => 
      word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    );
    
    const regex = new RegExp(`\\b(${escapedWords.join("|")})\\b`, "gi");

    const highlightedText = text.replace(regex, (match) => {
      const word = match.toLowerCase();
      wordCounts[word] = (wordCounts[word] || 0) + 1;
      return `<span style="background-color: yellow; color: red; padding:4px">${match}</span>`;
    });

    return { highlightedText, wordCounts };
  } catch (error) {
    // Handle potential regex errors (like if sensitiveWords creates an invalid pattern)
    console.error('Error in highlightAndCountSensitiveWords:', error);
    return { highlightedText: text, wordCounts };
  }
}
