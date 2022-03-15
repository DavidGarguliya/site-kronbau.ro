import * as styles from '@styles/pages/project.css'

import {
  Box,
  Button,
  Container,
  Page,
  Typography,
  addLocaleToPaths,
  getDefaultLocale,
  keepTranslationsFor,
  Spinner
} from 'landmarks-ds'
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'

import { BsArrowRight } from 'react-icons/bs'
import { ProjectDesktopMenu } from '@components/ProjectDesktopMenu'
import { ProjectMobileMenu } from '@components/ProjectMobileMenu'
import React from 'react'
import { query } from '.keystone/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function ProjectPage({
  project,
  projects,
  developer
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()

  return (
    <Page
      title={`${project.title} - apartamente vanzare ${project.city} | ${developer.title}`}
      description={project.description}
      favicon={project.favicon.image.url}>
      <Box className={styles.videoContainer}>
        <ProjectDesktopMenu project={project} developer={developer} hue="onDark" />

        <div className={styles.mediaOverlayDark} />
        {project.intro && (
          <>
            <video
              src={project.intro.file.url}
              autoPlay
              muted
              loop
              playsInline
              className={styles.video}
            />
            {/* Hack to display spinner under the video */}
            <div
              style={{
                zIndex: -4,
                position: 'absolute',
                left: '50%',
                top: '40%',
                transform: 'translate(-50%, -50%)'
              }}>
              <Spinner background="white" />
            </div>
          </>
        )}
        <div className={styles.content}>
          <Container paddingX="large">
            <Typography variant="h1" color="white" marginBottom="large">
              {project.tagLine}
            </Typography>
            <Button
              variant="contained"
              hue="secondary"
              borderRadius="small"
              marginRight="large"
              href={`/proiect/${project.slug}/apartamente-disponibile`}
              suffix={<Box component={BsArrowRight} fontSize="2x" marginLeft="large" />}>
              {t('viewApartments')}
            </Button>
            {/* TODO: create a hide on [breakpoint] component */}
            <Box component="span" display={{ mobile: 'none', laptop: 'inline' }}>
              <Button
                variant="outlined"
                hue="onDark"
                href={`/proiect/${project.slug}/despre-proiect`}
                borderRadius="small">
                {t('aboutProject')}
              </Button>
            </Box>
          </Container>
        </div>

        <ProjectMobileMenu project={project} projects={projects} developer={developer} />
      </Box>
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
      id
      title
      slug
      phone
      city
      description
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
      intro {
        title
        file {
          url
        }
      }
      tagLine
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

  const [developer] = await query.Developer.findMany({
    query: `
      title
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

  return {
    props: {
      ...(await serverSideTranslations(currentLanguage)),
      developer,
      projects,
      project: {
        ...keepTranslationsFor(project, ['tagLine'], currentLanguage)
      }
    }
  }
}
