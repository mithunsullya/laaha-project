"use client"

import { useState } from "react"
import Link from "next/link"

interface FooterMenuItem {
  type: string
  id: string
  title: string
  url: string
  expanded: boolean
  parent: string
  relationships: {
    field_icon: {
      data: null | {
        // Add proper type if field_icon.data can have values
      }
    }
  }
}

interface FooterBottomProps {
  data: FooterMenuItem[]
}

const FooterBottom = ({ data }: FooterBottomProps) => {
  const [footerBottom, setFooterBottom] = useState<FooterMenuItem[]>(data)

  return (
    <div className="footer-bottom-menu mb-4 lg:mb-0">
      <ul className="list-none flex flex-wrap items-center ps-0">
        {footerBottom &&
          footerBottom.length > 0 &&
          footerBottom.map((item) => (
            
            <li className="me-5 lg:me-10" key={item?.id}>
              <Link
                className="text-primary lg:text-default-black"
                href={item?.url}
              >
                {item?.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default FooterBottom
