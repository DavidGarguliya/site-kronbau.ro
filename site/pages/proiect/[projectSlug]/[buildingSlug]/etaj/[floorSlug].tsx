import * as styles from '@styles/pages/floorSlug.css'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import {
  Box,
  Col,
  Container,
  Floorplan,
  Grid,
  Page,
  Sunshine,
  Typography,
  Unit,
  addLocaleToPaths,
  fetchUnits,
  getDefaultLocale,
  isAvailable,
  keepTranslationsFor,
  mergeUnitData
} from 'landmarks-ds'
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'

import { FloorSelector } from '@components/FloorSelector'
import { ProjectDesktopMenu } from '@components/ProjectDesktopMenu'
import { ProjectMobileMenu } from '@components/ProjectMobileMenu'
import React from 'react'
import { query } from '.keystone/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { vars } from '@styles/theme.css'
import { GlobalFooter } from '@components/GlobalFooter'

export default function BuildingPage({
  selectedFloor,
  projects,
  developer,
  floors,
  buildings
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()

  return (
    <Page
      title={`${selectedFloor.titleTranslated} - ${selectedFloor.building.project.title}`}
      description={selectedFloor.building.project.description.ro}
      background="white"
      favicon={selectedFloor.building.project.favicon.image.url}>
      <ProjectDesktopMenu
        project={selectedFloor.building.project}
        developer={developer}
        hue="onLight"
      />

      <Container marginTop={{ laptop: 'xlarge' }} gutter={false} paddingX={{ laptop: 'large' }}>
        <Grid>
          <Col laptop="4" desktop="3">
            <FloorSelector selectedFloor={selectedFloor} floors={floors as any[]} />
          </Col>
          <Col laptop="8" desktop="9" paddingBottom="xxxlarge">
            <Box background="neutral_1" style={{ minHeight: '80vh' }} position="relative">
              <Sunshine orientation={selectedFloor.building.buildingOrientation}>
                <Box style={{ maxWidth: '500px', margin: 'auto' }}>
                  <Floorplan
                    intro={{ from: 0, to: 0 }}
                    viewBox={selectedFloor.building.svgViewbox}
                    background={selectedFloor?.svgBackground?.image?.url}
                    loadingColor="primary">
                    {selectedFloor.units.map((unit: any, i: number) => (
                      <Unit
                        key={unit.id}
                        className={styles.myUnit}
                        path={unit.model.unitSvg}
                        url={`/proiect/${selectedFloor.building.project.slug}/${selectedFloor.building.slug}/apartament/${unit.slug}`}
                        position={unit.floorplanPosition}
                        status={unit.disponibilitate}
                        rooms={unit.model.rooms}
                        number={unit.title}
                        // number={extractFirstNumber(unit.title)}
                        titleSelector=".cls-2 tspan"
                        classes={{
                          disponibil: styles.availableUnit,
                          inactiv: styles.unavailableUnit,
                          rezervat: styles.unavailableUnit,
                          vandut: styles.unavailableUnit
                        }}
                      />
                    ))}
                  </Floorplan>
                </Box>
              </Sunshine>
            </Box>
            <Box padding="large" marginTop="large">
              <Typography
                variant="h3"
                marginBottom="large"
                // className={styleUtils.activeIndicatorPartialUnderlineRecipe({
                //   active: true,
                //   size: 'medium'
                // })}
              >
                {t('chooseBuilding')}:
              </Typography>
              <Box display="flex">
                {buildings.map((building: any) => (
                  <Link
                    key={building.slug}
                    href={`/proiect/${selectedFloor.building.project.slug}/${building.slug}/etaj/${building.linkToFloor.slug}`}
                    passHref>
                    <Box
                      component="a"
                      padding="large"
                      color="link"
                      style={{
                        textDecoration: 'none',
                        borderBottom:
                          building.slug === selectedFloor.building.slug
                            ? `3px solid ${vars.color.primary}`
                            : ''
                      }}>
                      <Typography variant="h4">{building.title}</Typography>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          </Col>
        </Grid>
      </Container>

      <GlobalFooter developer={developer} />

      <ProjectMobileMenu
        project={selectedFloor.building.project}
        projects={projects}
        developer={developer}
      />
    </Page>
  )
}

export async function getStaticPaths({
  locales = []
}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const floors = await query.Floor.findMany({
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

  const paths = floors.map((floor: any) => ({
    params: {
      projectSlug: floor.building.project.slug,
      buildingSlug: floor.building.slug,
      floorSlug: floor.slug
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
  const { projectSlug, buildingSlug, floorSlug } = params as any
  const [floor] = await query.Floor.findMany({
    where: {
      slug: { equals: floorSlug },
      building: { slug: { equals: buildingSlug } }
    },
    query: `
      id
      titleTranslated
      slug
      svgBackground {
        image {
          url
          width
          height
        }
      }
      building {
        title
        status
        description
        floorLabelPosition
        floorplanDirections
        floorsCount
        project {
          title
          slug
          description
          phone
          email
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
          tagLine
        }
        slug
        svgViewbox
        buildingOrientation
      }
      units {
        id
        title
        slug
        floorplanPosition
        model {
          unitSvg
          rooms
        }
      }
    `
  })
  const floors = await query.Floor.findMany({
    where: {
      building: { slug: { equals: buildingSlug } },
      disabled: { equals: false }
    },
    query: `
      id
      slug
      titleTranslated
      building {
        slug
        project {
          slug
        }
      }
      units {
        id
      }
    `
  })

  const units = await query.Unit.findMany({
    where: { building: { slug: { equals: buildingSlug } } },
    query: `
      id
      title
    `
  })

  const buildings = await query.Building.findMany({
    query: `
      id
      title,
      slug,
      linkToFloor {
        slug
      }
    `
  })

  const [developer] = await query.Developer.findMany({
    query: `
      title
      address
      description
      phone
      email
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
      externalLink
      thumbnail {
        image {
          url
        }
      }
    `
  })

  const currentLanguage = getDefaultLocale(locale, defaultLocale)
  const unitsFromSheet = await fetchUnits(params.projectSlug as string)
  const allUnits = mergeUnitData(units, unitsFromSheet)
  const availableUnitsCount = allUnits.filter((unit: any) =>
    isAvailable(unit.disponibilitate)
  ).length
  const decorateFloor = (floor: any) => {
    const units = mergeUnitData(floor.units, unitsFromSheet)
    const availableUnitsCount = units.filter((unit: any) =>
      isAvailable(unit.disponibilitate)
    ).length
    return {
      ...floor,
      units,
      availableUnitsCount,
      url: `/proiect/${floor.building.project.slug}/${floor.building.slug}/etaj/${floor.slug}`
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(currentLanguage)),
      projects,
      buildings,
      selectedFloor: keepTranslationsFor(
        decorateFloor(floor),
        ['building.description', 'building.floorplanDirections', 'titleTranslated'],
        currentLanguage
      ),
      developer,
      floors: keepTranslationsFor(
        floors.map(decorateFloor).reverse(),
        ['titleTranslated'],
        currentLanguage
      )
    }
  }
}
