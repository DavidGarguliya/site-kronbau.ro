import * as styleUtils from '@styles/utils.css'
import * as styles from '@styles/pages/contact-locatie.css'

import {
  Box,
  Button,
  Card,
  Container,
  MapboxMap,
  Page,
  Section,
  Typography,
  addLocaleToPaths,
  getDefaultLocale,
  keepTranslationsFor
} from 'landmarks-ds'
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { MdCall, MdEmail } from 'react-icons/md'

import { ProjectDesktopMenu } from '@components/ProjectDesktopMenu'
import { ProjectMobileMenu } from '@components/ProjectMobileMenu'
import React from 'react'
import { SubmitLeadForm } from '@components/SubmitLeadForm'
import cn from 'classnames'
import { query } from '.keystone/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { TeamCarousel } from '@components/TeamCarousel'
import { GlobalFooter } from '@components/GlobalFooter'

export default function ContactAndLocation({
  project,
  projects,
  developer
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()

  const latitude = project.mapCoordinates.split(',')[0]
  const longitude = project.mapCoordinates.split(',')[1]

  return (
    <Page
      title={`Contact - ${project.title}`}
      description={project.description}
      background="white"
      favicon={project.favicon.image.url}>
      <ProjectDesktopMenu project={project} developer={developer} hue="onLight" />
      <Container position="relative">
        <Card
          style={{}}
          className={cn(styles.cardForm, styleUtils.hideUntil({ laptop: true }))}
          elevation="large">
          <Box padding="large">
            <Typography variant="h3">{t('contactUs')}</Typography>
            <SubmitLeadForm
              projectTitle={project.title}
              buildingSlug={''}
              unitSlug={''}
              borderRadius={'small'}
            />
          </Box>
        </Card>
      </Container>

      <MapboxMap
        location={[latitude, longitude]}
        title={project.title}
        subtitle={project.address}
        googleMapsLink={project.googleMapLink}
        className={styles.map}
        startZoom={9}
        endZoom={16}
        width={'full'}
      />

      <Card
        padding="large"
        className={cn(styles.cardForm, styleUtils.hideFrom({ laptop: true }))}
        style={{ transform: 'translateY(-20vh)' }}>
        <SubmitLeadForm
          projectTitle={project.title}
          buildingSlug={''}
          unitSlug={''}
          padding={'small'}
          borderRadius={'small'}
        />
      </Card>

      <Box background="surfaceFaded" color="black_alpha_06">
        <Container className={styles.details}>
          <Box>
            <Typography variant="h4">{t('office')}</Typography>
            <Typography>{project.address}</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{t('contactUs')}</Typography>
            <Box>
              <Button
                variant="text"
                prefix={<MdCall />}
                href={`tel:${project.phone}`}
                className={styles.leftCTAButton}>
                <Typography marginLeft={'small'}>{t('call')}</Typography>
              </Button>
              <Button
                prefix={<MdEmail />}
                color="black_alpha_06"
                href={`mailto:${project.email}`}
                className={styles.rightCTAButton}>
                <Typography marginLeft={'small'}>{t('email')}</Typography>
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Section variant="slideUp">
        <Container paddingY={{ mobile: 'xlarge', desktop: 'xxlarge' }}>
          <Box className={styles.descriptionCards}>
            <Box className={styles.description}>
              <Typography
                variant="h2"
                marginBottom="large"
                paddingBottom="large"
                className={styles.activeIndicatorPartialUnderlineRecipe({
                  active: true,
                  size: 'medium'
                })}>
                {t('salesTeam')}
              </Typography>

              <Typography>{t('contactText')}</Typography>
            </Box>

            <Box>
              <TeamCarousel members={project.members} columns={2} />
            </Box>
          </Box>
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
