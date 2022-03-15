import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { Box, ToggleMobileMenu, Button, Typography, LanguageSwitcher } from 'landmarks-ds'
import { BsArrowLeft, BsBuilding } from 'react-icons/bs'
import { IoMdPin } from 'react-icons/io'
import { MdEventAvailable } from 'react-icons/md'

import * as styles from './styles.css'
import { IUIComponent } from 'landmarks-ds/utils/types'
import { useTranslation } from 'next-i18next'
import { ProjectsCarousel } from '@components/ProjectsCarousel'

interface IProps extends IUIComponent {
  project: any
  projects: any
  developer: any
}

export function ProjectMobileMenu({ developer, project, projects }: IProps) {
  const { t } = useTranslation()
  const [showProjects, setShowProjects] = useState(false)

  return (
    <ToggleMobileMenu
      phone={project.phone}
      classes={{
        menu: styles.menu,
        mainButton: styles.mainButton,
        mainButtonActive: styles.mainButtonActive,
        otherButtons: styles.otherButtons,
        content: styles.content
      }}>
      {({ toggleMenu }) =>
        !!showProjects ? (
          <Box paddingTop="xlarge" key="showProjectsContent">
            <Button
              variant="text"
              size="small"
              hue="onDark"
              marginLeft="xlarge"
              onClick={() => setShowProjects(false)}
              prefix={<Box component={BsArrowLeft} fontSize="2x" marginRight="small" />}>
              {t('back')}
            </Button>
            <ProjectsCarousel projects={projects} />
          </Box>
        ) : (
          <Box padding="xlarge" key="menuContent">
            <Button
              variant="text"
              size="small"
              hue="onDark"
              href="/"
              marginBottom="large"
              onClick={toggleMenu}
              prefix={<Box component={BsArrowLeft} fontSize="2x" marginRight="small" />}>
              {t('backTo', { pageName: developer.title })}
            </Button>
            <Box className={styles.twoUp}>
              <Link href={`/proiect/${project.slug}`} passHref>
                <Box borderRadius="small" background="white" padding="large" onClick={toggleMenu}>
                  <AspectRatio.Root ratio={1}>
                    <Image src={project.logo.image.url} layout="fill" objectFit="contain" />
                  </AspectRatio.Root>
                </Box>
              </Link>
              <MenuItem
                href={`/proiect/${project.slug}/despre-proiect`}
                title={t('aboutProject')}
                icon={BsBuilding}
                onClick={toggleMenu}
              />
              <MenuItem
                href={`/proiect/${project.slug}/apartamente-disponibile`}
                icon={MdEventAvailable}
                title={t('availableUnits')}
                onClick={toggleMenu}
              />
              <MenuItem
                href={`/proiect/${project.slug}/contact-locatie`}
                icon={IoMdPin}
                title={t('contactAndLocation')}
                onClick={toggleMenu}
              />
              <MenuItem title={t('otherProjects')} onClick={() => setShowProjects(true)} />
            </Box>
            <LanguageSwitcher
              variant="sidebyside"
              padding="large"
              hue="onDark"
              toggleMenu={toggleMenu}
            />
          </Box>
        )
      }
    </ToggleMobileMenu>
  )
}

interface IMenuItemProps extends IUIComponent {
  title: string
  icon?: any
  href?: string
  [key: string]: any
}

function MenuItem({ href, title, icon, ...rest }: IMenuItemProps) {
  const content = (
    <Box
      borderRadius="small"
      background="white_alpha_02"
      padding="large"
      {...rest}>
      <AspectRatio.Root ratio={1} className={styles.alignBottom}>
        {icon && (
          <Box component={icon} fontSize="3x" color="optional_1" />
        )}
        <Typography variant="strong" color="optional_1">{title}</Typography>
      </AspectRatio.Root>
    </Box>
  )
  return href
    ? (
      <Link href={href} passHref>
        {content}
      </Link>
    )
    : content
}