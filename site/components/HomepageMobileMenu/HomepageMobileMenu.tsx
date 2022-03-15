import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import * as styles from './styles.css'

import { Box, LanguageSwitcher, ToggleMobileMenu, Typography } from 'landmarks-ds'
import { IoMdInformationCircle, IoMdPin } from 'react-icons/io'

import { BsBuilding } from 'react-icons/bs'
import { FaHandsHelping } from 'react-icons/fa'
import { IUIComponent } from 'landmarks-ds/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import { RiCompasses2Line } from 'react-icons/ri'
import { useTranslation } from 'next-i18next'

interface IProps extends IUIComponent {
  developer: any
}

export function HomepageMobileMenu({ developer }: IProps) {
  const { t } = useTranslation()

  return (
    <ToggleMobileMenu
      phone={developer.phone}
      classes={{
        menu: styles.menu,
        mainButton: styles.mainButton,
        mainButtonActive: styles.mainButtonActive,
        otherButtons: styles.otherButtons,
        content: styles.content
      }}>
      {({ toggleMenu }) => (
        <Box padding="xlarge">
          <Box className={styles.twoUp}>
            <Link href="/#" passHref>
              <Box borderRadius="small" background="white" padding="large" onClick={toggleMenu}>
                <AspectRatio.Root ratio={1}>
                  <Image
                    alt={developer.title}
                    src={developer.logo.image.url}
                    layout="fill"
                    objectFit="contain"
                  />
                </AspectRatio.Root>
              </Box>
            </Link>
            <MenuItem
              href="/#projectsSection"
              icon={BsBuilding}
              title={t('projects')}
              toggleMenu={toggleMenu}
            />
            <MenuItem
              href="/#aboutSection"
              icon={IoMdInformationCircle}
              title={t('aboutMenu')}
              toggleMenu={toggleMenu}
            />
            <MenuItem
              href="/#whatWeDoSection"
              icon={RiCompasses2Line}
              title={t('whatWeDo')}
              toggleMenu={toggleMenu}
            />
            <MenuItem
              href="/#partnersSection"
              icon={FaHandsHelping}
              title={t('partners')}
              toggleMenu={toggleMenu}
            />
            <MenuItem
              href="/#contactSection"
              icon={IoMdPin}
              title={t('contact')}
              toggleMenu={toggleMenu}
            />
          </Box>
          <LanguageSwitcher variant="sidebyside" padding="large" hue="onDark" toggleMenu={toggleMenu} />
        </Box>
      )}
    </ToggleMobileMenu>
  )
}

interface IMenuItemProps extends IUIComponent {
  href: string
  title: string
  icon?: any
  toggleMenu: any
}

function MenuItem({ href, title, icon, toggleMenu, ...rest }: IMenuItemProps) {
  return (
    <Link href={href} passHref>
      <Box
        borderRadius="small"
        background="white_alpha_02"
        padding="large"
        onClick={toggleMenu}
        {...rest}>
        <AspectRatio.Root ratio={1} className={styles.alignBottom}>
          {icon && <Box component={icon} fontSize="3x" color="optional_1" />}
          <Typography variant="strong" color="optional_1">
            {title}
          </Typography>
        </AspectRatio.Root>
      </Box>
    </Link>
  )
}
