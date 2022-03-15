import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Button, DesktopMenu, DesktopMenuItem, DropdownMenu, DropdownMenuItem, Reveal, TDesktopMenuProps, Typography } from "landmarks-ds"
import { BsArrowLeft } from 'react-icons/bs'
import { IoChevronDown } from 'react-icons/io5'
import { useTranslation } from 'next-i18next'

import { IUIComponent } from 'landmarks-ds/utils/types'
import * as styles from './styles.css'

interface IProps extends IUIComponent {
  project: any
  developer: any
  hue?: 'onLight' | 'onDark'
  sticky?: boolean
}

export function ProjectDesktopMenu({
  hue = 'onLight',
  project,
  developer,
  sticky = false,
  ...rest
}: IProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { t } = useTranslation()

  // hide the confirmation after 4sec
  useEffect(() => {
    if (showConfirmation) {
      const timeout = setTimeout(() => setShowConfirmation(false), 4000)
      return () => clearTimeout(timeout)
    }
  }, [showConfirmation])

  const cta = (
    <>
      <Reveal
        onReveal={() => console.log('calling')}
        before={
          <Button
            hue="primary"
            borderRadius="small"
            component="a"
            size="small"
            paddingX="large"
            href={`tel:${project.phone}`}
          >
            {t('callNow')}
          </Button>
        }
        after={
          <Button
            borderRadius="small"
            component="a"
            size="small"
            paddingX="large"
            href={`tel:${project.phone}`}
          >
            {project.phone}
          </Button>
        }
        paddingRight="medium" />
    </>
  )

  const logo = (
    <Box
      display="flex"
      background="white"
      borderTopLeftRadius="small"
      borderBottomLeftRadius="small"
      className={styles.logoContainer}>
      <Link href="/" passHref>
        <Box
          component="a"
          display="flex"
          padding="medium"
          alignItems="center"
          onClick={(e) => {
            if (!showConfirmation) {
              e.preventDefault()
              setShowConfirmation(true)
            }
          }}
          title={`Back to ${developer.title}`}>
          {showConfirmation ? (
            <Box component={BsArrowLeft} fontSize="3x" marginX="medium" />
          ) : (
            <Image
              src={developer.logoSymbol.image.url}
              width={developer.logoSymbol.image.width / 2}
              height={developer.logoSymbol.image.height / 2} />
          )}
        </Box>
      </Link>
    </Box>
  )
  const extra = (
    <Box
      display="flex"
      alignItems="center"
      background="white_alpha_08"
      borderTopRightRadius="small"
      borderBottomRightRadius="small"
      marginRight="large"
      className={styles.logoContainer}>
      {showConfirmation ? (
        <Link href="/">
          <Box
            component="a"
            display="flex"
            padding="medium"
            flexDirection="column"
            justifyContent="center">
            <Typography variant="small" display="block" style={{ maxWidth: 200 }}>
              {t('confirmNavigation', { pageName: developer.title })}
            </Typography>
          </Box>
        </Link>
      ) : (
        <Link href={`/proiect/${project.slug}`} passHref>
          <Box
            component="a"
            display="flex"
            padding="medium"
            alignItems="center"
            title={`Back to ${project.title}`}>
            <Image
              src={project.logo.image.url}
              width={project.logo.image.width / 2}
              height={project.logo.image.height / 2} />
          </Box>
        </Link>
      )}
    </Box>
  )

  return (
    <DesktopMenu
      hue={hue}
      sticky={sticky}
      logo={logo}
      extra={extra}
      logoPlacement="left"
      menuPlacement="left"
      cta={cta}
      zIndex={3}
      paddingY="large"
      {...rest}>
      <DesktopMenuItem
        variant="split"
        href={`/proiect/${project.slug}/despre-proiect`}
        title={t('aboutProject')}
        marginRight="xxlarge"
      />
      <DesktopMenuItem
        variant="split"
        href={`/proiect/${project.slug}/apartamente-disponibile`}
        title={t('availableUnits')}
        marginRight="xxlarge"
      />
      <DesktopMenuItem
        variant="split"
        href={`/proiect/${project.slug}/contact-locatie`}
        title={t('contactAndLocation')}
        marginRight="xxlarge"
      />
      <DropdownMenu
        content={
          <>
            <DropdownMenuItem textTransform="uppercase" href={`/proiect/${project.slug}/galerie`}>
              {t('gallery')}
            </DropdownMenuItem>
            <DropdownMenuItem textTransform="uppercase" href={`/proiect/${project.slug}/intrebari-frecvente-faq`}>
              {t('faq')}
            </DropdownMenuItem>
          </>
        }>
        <DesktopMenuItem
          variant="split"
          hue={hue}
          title={t('viewMore')}
          suffix={
            <Box component={IoChevronDown} marginTop="large" marginLeft="xsmall" fontSize="2x" />
          }
          marginRight="xxlarge"
        />
      </DropdownMenu>
    </DesktopMenu>
  )
}