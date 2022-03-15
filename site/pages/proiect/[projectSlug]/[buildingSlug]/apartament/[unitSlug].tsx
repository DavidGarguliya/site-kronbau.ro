import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import * as styleUtils from '@styles/utils.css'
import * as styles from '@styles/pages/apartmentDetails.css'

import {
  Box,
  Button,
  CUSTOM_EVENTS,
  Col,
  Container,
  Grid,
  ImageWithSpinner,
  Page,
  Reveal,
  Section,
  Spinner,
  SplitText,
  Sunshine,
  Typography,
  addLocaleToPaths,
  fetchUnits,
  getDefaultLocale,
  getTotalSize,
  isAvailable,
  logEvent,
  useWindowSize
} from 'landmarks-ds'
import { EPricePolicy, ISize } from 'landmarks-ds/utils/types'
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { MdEmail, MdPhone, MdSimCardDownload } from 'react-icons/md'
import React, { useCallback } from 'react'

import Image from 'next/image'
import { ProjectDesktopMenu } from '@components/ProjectDesktopMenu'
import { ProjectMobileMenu } from '@components/ProjectMobileMenu'
import { SubmitLeadForm } from '@components/SubmitLeadForm'
import { UnitPreview } from '@components/UnitPreview'
import cn from 'classnames'
import { query } from '.keystone/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Carousel } from '@components/Carousel'
import { GlobalFooter } from '@components/GlobalFooter'

export default function BuildingPage({
  unit,
  similarUnits,
  projects,
  allUnitFromFloor,
  developer
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { query } = useRouter()
  const { projectSlug } = query
  const { t } = useTranslation()
  const [windowWidth] = useWindowSize(true, false)
  const isMobile = windowWidth < 991

  const roomSizes: ISize[] = unit.model.roomSizes || []
  const terraceSizes: ISize[] = unit.model.terraceSizes || []
  const totalInterior = getTotalSize(roomSizes)
  const totalExterior = getTotalSize(terraceSizes)
  const getRoomsText = useCallback(
    (rooms: number) => (rooms === 1 ? t('oneRoom') : t('multipleRooms', { count: rooms })),
    []
  )
  const roomsText = getRoomsText(unit.model.rooms)
  const hasGallery = unit.model.image.length > 1

  return (
    <Page
      title={`${unit.title} - ${unit.project.title}`}
      description={unit.project.description.ro}
      background="white"
      favicon={unit.project.favicon.image.url}>
      <Container>
        <ProjectDesktopMenu
          project={unit.project}
          developer={developer}
          hue="onLight"
          className={styles.desktopMenu}
        />
      </Container>

      <Section
        variant="slideUp"
        backgroundImageUrl="/images/faded-background.jpg"
        className={styles.hero}>
        <Container gutter={false} paddingX={{ laptop: 'large' }}>
          <Grid>
            <Col tablet="12" laptop="8" position="relative">
              <Box className={styles.attachedCol}>
                <AspectRatio.Root ratio={1} className={styles.stretch}>
                  <SplitText
                    fontSizeLarge="6x"
                    fontSizeSmall="2x"
                    className={styles.apartmentNumber}>
                    {`Ap. ${unit.title}`}
                  </SplitText>
                </AspectRatio.Root>
                <Box display={{ mobile: 'none', laptop: 'block' }}>
                  <Typography
                    variant="h4"
                    background="neutral_3"
                    padding="medium"
                    textAlign="center">
                    {roomsText}
                  </Typography>
                  <Typography
                    variant="h4"
                    background="neutral_2"
                    padding="medium"
                    textAlign="center">
                    {`${totalInterior} ${t('mp')}`}
                  </Typography>
                  {unit.model.fisaTehnica && (
                    <Button
                      download
                      variant="text"
                      size="small"
                      flexDirection="column"
                      paddingY="large"
                      href={unit.model.fisaTehnica.file.url}
                      target="_blank"
                      prefix={
                        <Box
                          component={MdSimCardDownload}
                          fontSize="4x"
                          color="secondary"
                          marginBottom="small"
                        />
                      }
                      className={styles.downloadButton}
                      title={t('downloadPDF')}>
                      {t('downloadPDF')}
                    </Button>
                  )}
                </Box>
              </Box>
              <Box className={styles.imageCol}>
                {unit.model.image && !hasGallery && (
                  <Sunshine orientation={unit.building.unitOrientation}>
                    <ImageWithSpinner
                      src={unit.model.image[0].image.url}
                      alt={`Apartament cu ${roomsText} ${unit.project.city}`}
                      width={unit.model.image[0].image.width}
                      height={unit.model.image[0].image.height}>
                      <Spinner background="secondary" />
                    </ImageWithSpinner>
                  </Sunshine>
                )}
              </Box>
            </Col>
            <Box className={styles.extrasMobile}>
              <Box
                background="neutral_3"
                fontSize="3x"
                textAlign="center"
                padding="medium"
                style={{ minWidth: '140px' }}>
                {roomsText}
              </Box>
              <Box
                background="neutral_2"
                fontSize="3x"
                textAlign="center"
                padding="medium"
                style={{ minWidth: '140px' }}>
                <SplitText
                  display="flex"
                  fontSizeSmall="3x"
                  fontSizeLarge="1x"
                  justifyContent="center">
                  {`${totalInterior} ${t('mp')}`}
                </SplitText>
              </Box>
              {unit.model.fisaTehnica && (
                <Button
                  download
                  variant="text"
                  size="small"
                  href={unit.model.fisaTehnica.file.url}
                  paddingX="large"
                  paddingTop="large"
                  prefix={
                    <Box
                      component={MdSimCardDownload}
                      fontSize="4x"
                      color="secondary"
                      marginBottom="small"
                    />
                  }
                  className={styles.downloadButton}
                  title={t('downloadPDF')}>
                  {t('downloadPDF')}
                </Button>
              )}
            </Box>
            <Col tablet="12" laptop="4" display="flex">
              <Box className={styles.listCol}>
                <Box component="ul" paddingLeft="none">
                  {roomSizes.map((size) => (
                    <Box component="li" key={size.label} className={styles.listItem}>
                      <span>{t(size.label.trim())}</span>
                      <Typography variant="small" padding="xsmall" color="neutral_6">
                        {`${size.size} ${t('mp')}`}
                      </Typography>
                    </Box>
                  ))}
                  {terraceSizes.map((size) => (
                    <Box component="li" key={size.label} className={styles.listItem}>
                      <span>{t(size.label.trim())}</span>
                      <Box padding="xsmall" color="neutral_6">
                        {`${size.size} ${t('mp')}`}
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Grid paddingY="medium" paddingX="xsmall">
                  <Col key="interior" mobile="6">
                    <Box component="span" textTransform="capitalize">
                      {t('usableArea')}:
                    </Box>
                    <Typography variant="h4">
                      {totalInterior} <small>{t('mp')}</small>
                    </Typography>
                  </Col>
                  <Col key="exterior" mobile="6">
                    <Box component="span" textTransform="capitalize">
                      {t('room')}:
                    </Box>
                    <Typography variant="h4">{unit.model.rooms}</Typography>
                  </Col>
                </Grid>
                <Box paddingY="large">{renderPrice()}</Box>
                <Button
                  hue="secondary"
                  borderRadius="small"
                  paddingX="large"
                  href="#contactSection">
                  {t('contactUs')}
                </Button>
              </Box>
            </Col>
          </Grid>
        </Container>
      </Section>

      {unit.project.moodGallery.length && (
        <Section variant="slideUp">
          {/* These images should be loaded from the DB somewhere */}
          <Box className={styles.moodBar}>
            {unit.project.moodGallery.map(({ image }: any, index: number) => {
              const moodBarHeight = 260
              const isFirst = index === 0
              const proportionalWidth = (image.width * moodBarHeight) / image.height
              const color = Math.round(Math.random()) ? 'primary_2' : 'optional_3'
              return (
                <>
                  <Box
                    className={cn(styles.decoration, styleUtils.hideUntil({ laptop: !isFirst }))}
                    background={color}>
                    <Image
                      alt=""
                      src={image.url}
                      width={proportionalWidth}
                      height={moodBarHeight}
                    />
                  </Box>
                </>
              )
            })}
            {/* <Box className={styles.decoration} background="optional_1" style={{ width: 100 }} />
            <Box className={styles.decoration} background="optional_2" style={{ width: 30 }} />
            <Image src="/images/bb3.jpg" width="300" height="300" />
            <Box className={styles.decoration} background="optional_3" style={{ width: 70 }} />
            <Image src="/images/BALCONY_02_logo.jpg" width="400" height="300" />
            <Box className={styles.decoration} background="optional_3" style={{ width: 120 }} /> */}
          </Box>
        </Section>
      )}

      {isAvailable(unit.disponibilitate) && (
        <Section variant="slideUp" id="contactSection">
          <Container>
            <Typography
              variant="h2"
              marginBottom="xlarge"
              paddingBottom="large"
              className={styleUtils.activeIndicatorPartialUnderlineRecipe({
                active: true,
                size: 'medium'
              })}>
              {t('contactUs')}
            </Typography>
            <Grid gutter="large">
              <Col tablet="12" laptop="4">
                <Section variant="slideUp">
                  <SubmitLeadForm
                    withLeadField
                    projectTitle={unit.project.title}
                    buildingSlug={unit.building.slug}
                    unitSlug={unit.slug}
                  />
                </Section>
              </Col>
              <Col tablet="12" laptop="8" display={{ mobile: 'none', laptop: 'block' }}>
                <Box background="neutral_3" style={{ height: 500 }} position="relative">
                  <ImageWithSpinner
                    src="/map-noua2.png"
                    layout="fill"
                    objectFit="cover"
                    sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
                    <Spinner background="secondary" />
                  </ImageWithSpinner>
                </Box>
                <Box display="flex" style={{ gap: 60 }} padding="large">
                  <Box>
                    <Typography variant="h4" marginBottom="small">
                      {unit.project.title}
                    </Typography>
                    <Box
                      component="a"
                      href={unit.project.googleMapLink}
                      target="_blank"
                      color="link">
                      {unit.project.address}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h4" marginBottom="small">
                      {t('contactUs')}
                    </Typography>
                    <Box>
                      <Reveal
                        onReveal={() => logEvent(CUSTOM_EVENTS.SHOW_PHONE)}
                        before={
                          <Button variant="text" size="small" href={`tel:${unit.project.phone}`}>
                            {<Box component={MdPhone} fontSize="2x" marginRight="xsmall" />}
                            {t('call')}
                          </Button>
                        }
                        after={
                          <Button variant="text" size="small" href={`tel:${unit.project.phone}`}>
                            {<Box component={MdPhone} fontSize="2x" marginRight="xsmall" />}
                            {unit.project.phone}
                          </Button>
                        }
                        paddingRight="medium"
                      />
                      <Reveal
                        onReveal={() => logEvent(CUSTOM_EVENTS.SHOW_PHONE)}
                        before={
                          <Button variant="text" size="small" href={`mailto:${unit.project.email}`}>
                            {<Box component={MdEmail} fontSize="2x" marginRight="xsmall" />}
                            {t('sendEmail')}
                          </Button>
                        }
                        after={
                          <Button variant="text" size="small" href={`mailto:${unit.project.email}`}>
                            {<Box component={MdEmail} fontSize="2x" marginRight="xsmall" />}
                            {unit.project.email}
                          </Button>
                        }
                        paddingRight="medium"
                      />
                    </Box>
                  </Box>
                </Box>
              </Col>
            </Grid>
          </Container>
        </Section>
      )}

      <Section variant="slideUp" padding="large" marginTop="xxlarge" paddingBottom="large">
        <Container gutter={false}>
          <Typography
            variant="h2"
            marginBottom="xlarge"
            paddingBottom="large"
            className={styleUtils.activeIndicatorPartialUnderlineRecipe({
              active: true,
              size: 'medium'
            })}>
            {t('similarApartments')}
          </Typography>
          {isMobile ? (
            <Carousel>
              {similarUnits.map((unit: any) => (
                <UnitPreview
                  key={unit.id}
                  unit={unit}
                  orientation={unit.building.unitOrientation}
                  detail1={getRoomsText(unit.model.rooms)}
                  detail2={`${totalInterior} ${t('mp')}`}
                />
              ))}
            </Carousel>
          ) : (
            <Grid gutter="large">
              {similarUnits.map((unit: any) => (
                <Col key={unit.title} laptop="4" position="relative">
                  <UnitPreview
                    unit={unit}
                    orientation={60}
                    detail1={getRoomsText(unit.model.rooms)}
                    detail2={`${totalInterior} ${t('mp')}`}
                  />
                </Col>
              ))}
            </Grid>
          )}
        </Container>
      </Section>

      <Section variant="slideUp" padding="large" paddingBottom="xxxlarge">
        <Container gutter={false}>
          <Typography
            variant="h3"
            marginBottom="xlarge"
            paddingBottom="large"
            className={styleUtils.activeIndicatorPartialUnderlineRecipe({
              active: true,
              size: 'medium'
            })}>
            {t('wantMore')}
          </Typography>
          <Grid>
            <Col laptop="4">
              <Button
                href={`/proiect/${unit.project.slug}/despre-proiect`}
                variant="contained"
                hue="secondary"
                borderRadius="small"
                paddingX="large">
                {t('aboutProject')}
              </Button>
              <Button
                href={`/proiect/${unit.project.slug}/contact-locatie`}
                variant="text"
                paddingX="xlarge">
                {t('contactUs')}
              </Button>
            </Col>
          </Grid>
        </Container>
      </Section>

      <GlobalFooter developer={developer} />

      <ProjectMobileMenu project={unit.project} projects={projects} developer={developer} />
    </Page>
  )

  function renderPrice() {
    if (isAvailable(unit.disponibilitate) && unit.project.pricePolicy !== EPricePolicy.hide) {
      return (
        <>
          <Typography variant="h3" color="neutral_5">
            {t(`${unit.project.pricePolicy}Price`, { count: unit.pret })}
          </Typography>
          <Typography variant="small" color="neutral_3">* {t(projects.vatIncluded ? 'vatIncluded' : 'vatNotIncluded')}</Typography>
        </>
      )
    }
    return (
      <Typography
        variant="h3"
        marginY="large"
        paddingY="large"
        color="white"
        background="disabled"
        textAlign="center">
        {t(unit.disponibilitate)}
      </Typography>
    )
  }
}

export async function getStaticPaths({
  locales = []
}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const units = await query.Unit.findMany({
    query: `
      slug
      building {
        slug
        project {
          slug
        }
      }
    `
  })

  const paths = units.map((unit: any) => ({
    params: {
      projectSlug: unit.building.project.slug,
      buildingSlug: unit.building.slug,
      unitSlug: unit.slug
    }
  }))

  return {
    paths: addLocaleToPaths(locales, paths),
    fallback: false
  }
}

export async function getStaticProps({
  params = {},
  locale,
  defaultLocale
}: GetStaticPropsContext) {
  const UNIT_QUERY = `
      id
      slug
      title
      project {
        slug
        title
        address
        phone
        email
        city
        pricePolicy
      }
      floor {
        id
        title
        slug
      }
      building {
        slug
        title
        unitOrientation
      }
      model {
        id
        rooms
        roomSizes
        terraceSizes
        image {
          image {
            url
            width
            height
          }
        }
      }
    `

  const unitsFromSheet = await fetchUnits(params.projectSlug as string)
  // unit slug is not unique (only combination of building slug + unit slug is unique)
  const [unit] = await query.Unit.findMany({
    where: {
      slug: { equals: params.unitSlug as string },
      building: {
        slug: { equals: params.buildingSlug as string }
      }
    },
    query: `
      id
      slug
      title
      project {
        title
        slug
        googleMapLink
        description
        city
        phone
        email
        pricePolicy
        slug
        address
        svgViewbox
        favicon {
          image {
            url
          }
        }
        logo {
          title
          image {
            url
            width
            height
          }
        }
        moodGallery {
          image {
            url
            width
            height
          }
        }
        tagLine
      }
      floor {
        id
        title
        slug
      }
      building {
        slug
        title
        unitOrientation
      }
      model {
        id
        rooms
        roomSizes
        terraceSizes
        fisaTehnica {
          file {
            url
          }
        }
        image {
          image {
            url
            width
            height
          }
        }
      }
    `
  })
  const similarUnits = await query.Unit.findMany({
    where: {
      model: {
        rooms: { equals: unit.model.rooms },
        id: { not: { equals: unit.model.id } }
      }
    },
    take: 3,
    query: UNIT_QUERY
  })
  const allUnitFromFloor = await query.Unit.findMany({
    where: {
      floor: { id: { equals: unit.floor.id } }
    },
    query: `
      id
      title
      slug
      model {
        rooms
      }
    `
  })
  const [developer] = await query.Developer.findMany({
    query: `
      title
      address
      phone
      email
      description
      logo {
        image {
          url
          width
          height
        }
      }
      logoSymbol {
        image {
          url
          width
          height
        }
      }
      favicon {
        image {
          url
        }
      }
    `
  })

  const projects = await query.Project.findMany({
    query: `
      title
      slug
      address
      unitsCount
      thumbnail {
        image {
          url
        }
      }
    `
  })

  const matchingUnit = unitsFromSheet.find((sheetUnit: { id: string }) => sheetUnit.id === unit.id)
  // console.log(unit)
  const currentLanguage = getDefaultLocale(locale, defaultLocale)

  return {
    props: {
      ...(await serverSideTranslations(currentLanguage)),
      unit: {
        ...unit,
        ...matchingUnit,
        floorUrl: `/proiect/${params.projectSlug}/${unit.building.slug}/etaj/${unit.floor.slug}`
      },
      allUnitFromFloor: allUnitFromFloor.map((sibling: any) => ({
        url: `/proiect/${params.projectSlug}/${unit.building.slug}/apartament/${sibling.slug}`,
        id: sibling.id,
        title: sibling.title,
        model: sibling.model
      })),
      developer,
      projects,
      similarUnits
    }
  }
}
