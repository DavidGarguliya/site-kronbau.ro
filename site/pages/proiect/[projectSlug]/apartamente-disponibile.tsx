import * as styleUtils from '@styles/utils.css'

import {
  Building,
  Floorplan,
  Page,
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

import { ProjectDesktopMenu } from '@components/ProjectDesktopMenu'
import { ProjectMobileMenu } from '@components/ProjectMobileMenu'
import React from 'react'
import { query } from '.keystone/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { GlobalFooter } from '@components/GlobalFooter'

export default function AvailableUnits({
  project,
  projects,
  developer
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Page
      title={`Apartamente Disponibile - ${project.title}`}
      description={project.description}
      background="white"
      favicon={project.favicon.image.url}>
      <div className={styleUtils.hideUntil({ tablet: true })}>
        <ProjectDesktopMenu project={project} developer={developer} hue="onLight" />
      </div>

      <Floorplan
        expandOnMobile
        intro={{ from: 300, to: 600 }}
        background={project.buildingSelectorBg.image.url}
        // on mobile the image is 1200px wide so we tell the browser that. Displayes higher quality image
        backgroundSizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px"
        viewBox={project.svgViewbox}>
        {project.buildings.map((building: any, i: number) => {
          return (
            <Building
              key={building.id}
              path={building.buildingSvg}
              position={building.buildingPosition}
              pinPosition={building.pinPosition}
              title={building.title}
              unitsCount={building.unitsCount}
              availableUnitsCount={building.availableUnitsCount}
              // availableUnitsCount={30}
              url={`/proiect/${router.query.projectSlug}/${building.slug}/etaj/${
                building?.linkToFloor?.slug || 'parter'
              }`}
            />
          )
        })}
      </Floorplan>

      <GlobalFooter developer={developer} />

      <ProjectMobileMenu project={project} projects={projects} developer={developer} />
    </Page>
  )
}

export async function getStaticPaths({
  locales = []
}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const projects = await query.Project.findMany({
    query: 'slug'
  })

  const paths = projects
    .map((x: any) => x.slug)
    .filter((slug: any) => !!slug)
    .map((slug: any) => ({
      params: {
        projectSlug: slug
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
  const currentLanguage = getDefaultLocale(locale, defaultLocale)
  const [project] = await query.Project.findMany({
    where: { slug: { equals: params.projectSlug as string } },
    query: `
      title
      slug
      phone
      address
      email
      svgViewbox
      favicon {
        image {
          url
        }
      }
      buildingSelectorBg {
        image {
          url
          width
          height
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
      buildings {
        id
        title
        slug
        linkToFloor {
          slug
        }
        svgBackground {
          image {
            url
            width
            height
          }
        }
        buildingSvg
        buildingPosition
        pinPosition
        unitsCount
        units {
          id
          slug
        }
      }
      tagLine
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
      externalLink
      thumbnail {
        image {
          url
        }
      }
    `
  })

  const unitsFromSheet = await fetchUnits(params.projectSlug as string)
  // MUTATION
  project.buildings = project.buildings.map((building: any) => ({
    ...building,
    availableUnitsCount: mergeUnitData(building.units, unitsFromSheet).filter((unit: any) =>
      isAvailable(unit.disponibilitate)
    ).length
  }))

  return {
    props: {
      ...(await serverSideTranslations(currentLanguage)),
      developer,
      projects,
      project: {
        ...keepTranslationsFor(project, ['previewFeatures'], currentLanguage)
      }
    }
  }
}
