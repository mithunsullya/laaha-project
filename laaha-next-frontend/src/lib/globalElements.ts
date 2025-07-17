import { getCountryCode } from "./utils"

const fetchMenuItems = async (menuName: string, locale: string) => {
  let country_code = getCountryCode();
  try {
    const menuItems = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/jsonapi/menu_items/${menuName}?include=field_icon&jsonapi_include=1&fields%5Bmenu_link_content--menu_link_content%5D=title,url,parent,expanded,field_icon&fields%5Bfile--file%5D=uri,filename
`, {
      headers: {
        locale: locale || 'en',
        "country-code": country_code || 'US'
      }
    })
    let response = await menuItems.json();
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu items: ${error}`)
    return []
  }
}
export const getHeaderMenu = async (locale: string) => {
  const mainMenu = await fetchMenuItems("header-menu", locale)
  return {
    menus: {
      main: mainMenu,
    },
  }
}

{/*  Include these if Quick Links is needed */}

// export const getFooterMenuData = async (locale: string) => {
//   const [quickLinks, exploreLinks, footerBottom] = await Promise.allSettled([
//     fetchMenuItems("quick-links", locale),
//     fetchMenuItems("explore-menu", locale),
//     fetchMenuItems("footer-last-menu", locale),
//   ])

//   // Return the footer data with checks for fulfilled promises
//   return {
//     footer: {
//       quickLinks: quickLinks.status === "fulfilled" ? quickLinks.value : null,
//       exploreLinks:
//         exploreLinks.status === "fulfilled" ? exploreLinks.value : null,
//       footerBottom:
//         footerBottom.status === "fulfilled" ? footerBottom.value : null,
//     },
//   }
// }

export const getFooterMenuData = async (locale: string) => {
    const [footerBottom, socialBlock] = await Promise.allSettled([
      fetchMenuItems("footer-last-menu", locale),
      fetchMenuItems("footer", locale),
    ])
    // Return the footer data with checks for fulfilled promises
    return {
      footer: {
        footerBottom:
          footerBottom.status === "fulfilled" ? footerBottom.value : null,
        socialBlock:
          socialBlock.status === "fulfilled" ? socialBlock.value : null,
      },
    }
  }
