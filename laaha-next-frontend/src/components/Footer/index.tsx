import Copyright from "./Copyright"
import ExploreMenu from "./ExploreMenu"
import FooterBottom from "./FooterBottom"
import QuickLinks from "./QuickLinks"
import SiteDesc from "./SiteDesc"
import { getFooterMenuData } from "@/src/lib/globalElements"
import Image from "next/image"
import Link from "next/link"
import SocialMediaBlock from "./SocialMediaBlock"
import { getLocale } from "next-intl/server"
import { headers } from "next/headers"


export const Footer = async () => {
  const locale = await getLocale();
  const headersList = headers();
  const countryCode = headersList.get('x-country-code') || 'US';
  

  let response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/jsonapi/block_content/basic/dbcfd0a8-aed6-4faf-a1c4-a2e52e37cbe7?fields[block_content--basic]=body`, {
    headers: {
      "locale": locale || 'en',
      "country-code": countryCode || 'US'
    }
  })

  let siteDescResponse = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/jsonapi/block_content/footer_contact_information/190696af-e4d3-43aa-a303-d207fdcd7f76?fields[block_content--footer_contact_information]=body`, {
    headers: {
      "locale": locale || 'en',
      "country-code": countryCode || 'US'
    }
  })

  let footerMenuData = await getFooterMenuData(locale);
  
  let copyright = await response.json()
  let siteDesc = await siteDescResponse.json();

  return (
    <div className="footer bg-color-secondary py-10 lg:py-16">
      <div className="container">
        <div className="footer-top lg:pb-16 flex flex-wrap items-start lg:border-b lg:border-color-pink-500 mb-10">
          <div className="footer-top-left order-1 mb-8 min-w-[304px] lg:mb-0 flex-[0_0_100%] lg:flex-[0_0_25%]">
            <Link href={`/${locale}`} className="inline-block min-w-[175px] min-h-[124px]">
              <Image
                loading="lazy"
                src={"/assets/images/laaha-logo_footer.webp"}
                width={175}
                height={124}
                alt="Footer Logo"
              />
            </Link>
          </div>
           {footerMenuData && (
            <div className="footer-link order-3 lg:order-2 flex flex-wrap flex-[0_0_100%] lg:flex-[0_0_40%]">
              {/* Show social icons instead of menus */}
              {/* <QuickLinks data={footerMenuData.quickLinks} />
              <ExploreMenu data={footerMenuData.exploreLinks} /> */}

              <SocialMediaBlock data={footerMenuData?.footer?.socialBlock} />
            </div>
          )}

          <div className="flex-[0_0_100%] lg:flex-[0_0_35%] pb-8 mb-8 border-b border-color-pink-500 lg:pb-0 lg:mb-0 lg:border-b-0 order-2 lg:order-3">
            <SiteDesc siteDesc={siteDesc.data} />
          </div>
        </div>
        <div className="footer-bottom block lg:flex justify-between mb-12 lg:mb-0">
          <div className="footer-bottom-menu">
            {footerMenuData && (
              <FooterBottom data={footerMenuData?.footer?.footerBottom} />
            )}
          </div>
          <div className="copyrights">
            <Copyright copyright={copyright.data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
