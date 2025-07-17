import { getHeaderMenu } from '@/src/lib/globalElements'
import { getLocale } from 'next-intl/server'
import React from 'react'
import Headers from './Header';

const Header = async () => {
  let locale =  await getLocale();

  const mainMenu = await getHeaderMenu(locale)
  const { main } = mainMenu.menus

  return (
    <Headers menu={main} />
  )
}

export default Header
