import * as styleUtils from '@styles/utils.css'
import * as styles from '@styles/pages/gallery.css'

import {
  Container,
  Page,
  Section,
  Typography,
  addLocaleToPaths,
  getDefaultLocale,
  keepTranslationsFor,
  ImageWithSpinner,
  Spinner,
  Grid,
  Col
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
import { useTranslation } from 'next-i18next'
import { Carousel } from '@components/Carousel'
import { GlobalFooter } from '@components/GlobalFooter'

export default function GalleryPage({
  project,
  projects,
  developer
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()

  return (
    <Page
      title={`Contact - ${project.title}`}
      description={project.description}
      background="white"
      favicon={project.favicon.image.url}>
      <ProjectDesktopMenu project={project} developer={developer} hue="onLight" />

      <Section variant="slideUp" marginY="xlarge">
        <Container>
          <Grid gutter="large" marginBottom="xlarge">
            <Col laptop="3">
              <Typography
                variant="h3"
                marginTop="xxlarge"
                paddingBottom="large"
                marginBottom="xlarge"
                className={styleUtils.activeIndicatorPartialUnderlineRecipe({
                  active: true,
                  size: 'medium'
                })}>
                {t('exteriorGallery')}
              </Typography>
              <Typography>{t('exteriorDetails')}</Typography>
            </Col>

            <Col laptop="9">
              <Carousel autoplay={false}>
                {project.exteriorGallery.map(({ image }: any) => {
                  return (
                    <div key={image.url} className={styles.sliderImage}>
                      <ImageWithSpinner
                        alt={image.url}
                        src={image.url}
                        layout="fill"
                        objectFit="contain">
                        <Spinner background="secondary" />
                      </ImageWithSpinner>
                    </div>
                  )
                })}
              </Carousel>
            </Col>
          </Grid>

          <Grid gutter="large" marginBottom="xlarge">
            <Col laptop="3" className={styles.firstOnMobile}>
              <Typography
                variant="h3"
                marginTop="xxlarge"
                paddingBottom="large"
                marginBottom="xlarge"
                className={styleUtils.activeIndicatorPartialUnderlineRecipe({
                  active: true,
                  size: 'medium'
                })}>
                {t('lobbyGallery')}
              </Typography>
              <Typography>{t('lobbyDetails')}</Typography>
            </Col>
            <Col laptop="9" marginBottom="xlarge">
              <Carousel autoplay={false}>
                {project.lobbyGallery.map(({ image }: any) => {
                  return (
                    <div key={image.url} className={styles.sliderImage}>
                      <ImageWithSpinner
                        alt={image.url}
                        src={image.url}
                        layout="fill"
                        objectFit="contain">
                        <Spinner background="secondary" />
                      </ImageWithSpinner>
                    </div>
                  )
                })}
              </Carousel>
            </Col>
          </Grid>

          <Grid gutter="large">
            <Col laptop="3">
              <Typography
                variant="h3"
                marginTop="xxlarge"
                paddingBottom="large"
                marginBottom="xlarge"
                className={styleUtils.activeIndicatorPartialUnderlineRecipe({
                  active: true,
                  size: 'medium'
                })}>
                {t('interiorGallery')}
              </Typography>
              <Typography>{t('interiorDetails')}</Typography>
            </Col>

            <Col laptop="9">
              <Carousel autoplay={false}>
                {project.interiorGallery.map(({ image }: any) => {
                  return (
                    <div key={image.url} className={styles.sliderImage}>
                      <ImageWithSpinner
                        alt={image.url}
                        src={image.url}
                        layout="fill"
                        objectFit="contain">
                        <Spinner background="secondary" />
                      </ImageWithSpinner>
                    </div>
                  )
                })}
              </Carousel>
            </Col>
          </Grid>
        </Container>
      </Section>

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
      id
      title
      email
      address
      description
      googleMapLink
      mapCoordinates
      slug
      phone
      logo {
        title
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
      interiorGallery {
         image {
          url
          width
          height
        }
      }
      exteriorGallery {
         image {
          url
          width
          height
        }
      }
      lobbyGallery {
         image {
          url
          width
          height
        }
      }
      members {
        title
        role
        phone
        email
        image {
          id
          title
          image {
            url
            width
            height
          }
        }
      }
    `
  })

  const [developer] = await query.Developer.findMany({
    query: `
      title
      address
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

  return {
    props: {
      ...(await serverSideTranslations(currentLanguage)),
      developer,
      projects,
      project: {
        ...keepTranslationsFor(project, ['previewFeatures'], currentLanguage),
        members: project.members?.map((member: any) =>
          keepTranslationsFor(member, ['role'], currentLanguage)
        )
      }
    }
  }
}
