"use client"

import MenuItem from "./MenuItem"
import { MenuShimmer } from "../Shimmer"

export const Menu = ({ handleHamburger, menuData }: any) => {

  if (!menuData) {
    return <MenuShimmer />
  }

  return (
    <nav className="hidden lg:block pt-10 lg:pt-0 ps-6 overflow-y-auto md:overflow-y-visible max-h-[calc(100vh-5rem)] md:max-h-none">
      <MenuItem menuItems={menuData} handleHamburger={handleHamburger} />
    </nav>
  )
}
