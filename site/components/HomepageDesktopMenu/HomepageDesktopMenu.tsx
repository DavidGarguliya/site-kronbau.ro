import * as styles from './styles.css'

import {
  Box,
  DesktopMenu,
  DesktopMenuItem,
} from 'landmarks-ds'

import { IUIComponent } from 'landmarks-ds/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

interface IProps extends IUIComponent {
  developer: {
    title: string
    logo: any
    favicon: any
  }
  hue?: 'onLight' | 'onDark'
  sticky?: boolean
}

export function HomepageDesktopMenu({
  hue = 'onLight',
  developer,
  sticky = true,
  ...rest
}: IProps) {
  const { t } = useTranslation()

  const logo = (
    <Box
      display="flex"
      alignItems="center"
      padding="medium"
      background="white"
      borderTopLeftRadius="small"
      borderBottomLeftRadius="small">
      <Link href="/#" passHref>
        <Box component="a" title={`Back to ${developer.title}`} display="flex">
          <Image
            priority
            alt={developer.title}
            src={developer.logo.image.url}
            width={developer.logo.image.width / 2}
            height={developer.logo.image.height / 2}
          />
        </Box>
      </Link>
    </Box>
  )

  return (
    <Box className={styles.homepageHeader}>
      <DesktopMenu
        hue={hue}
        logo={logo}
        logoPlacement="left"
        menuPlacement="left"
        zIndex={3}
        paddingY="small"
        {...rest}>
        <DesktopMenuItem href="/#projectsSection" title={t('projects')} marginRight="xxlarge" />
        <DesktopMenuItem href="/#aboutSection" title={t('aboutMenu')} marginRight="xxlarge" />
        <DesktopMenuItem href="/#whatWeDoSection" title={t('whatWeDo')} marginRight="xxlarge" />
        <DesktopMenuItem href="/#contactSection" title={t('contact')} marginRight="xxlarge" />
        <DesktopMenuItem href="/#partnersSection" title={t('partners')} marginRight="xxlarge" />
      </DesktopMenu>
    </Box>
  )
}
