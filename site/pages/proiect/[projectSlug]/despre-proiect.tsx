import * as styleUtils from '@styles/utils.css'
import * as styles from '@styles/pages/despreProiect.css'

import {
  Box,
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Grid,
  Page,
  Section,
  TimelineEvent,
  Typography,
  addLocaleToPaths,
  getDefaultLocale,
  keepTranslationsFor,
  ImageWithSpinner,
  Spinner
} from 'landmarks-ds'
import { EFeatureType, IDescription, IFeature } from '@utils/types'
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'

import { ApartmentVisualizer } from '@components/ApartmentVisualizer'
import { FeatureImageWithText } from '@components/FeatureTemplates'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { ProjectDesktopMenu } from '@components/ProjectDesktopMenu'
import { ProjectMobileMenu } from '@components/ProjectMobileMenu'
import cn from 'classnames'
import { query } from '.keystone/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Dialog } from '@components/Dialog'
import { Carousel } from '@components/Carousel'
import { TeamCarousel } from '@components/TeamCarousel'
import { GlobalFooter } from '@components/GlobalFooter'

export default function AboutProject({
  project,
  projects,
  developer
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()

  return (
    <Page
      title={`Despre Proiect - ${project.title}`}
      description={project.description}
      background="white"
      favicon={project.favicon.image.url}>
      <Container>
        <ProjectDesktopMenu
          project={project}
          developer={developer}
          hue="onLight"
          className={styles.desktopMenu}
        />
      </Container>

      <Section
        variant="slideUp"
        backgroundImageUrl="/images/faded-background.jpg"
        className={styles.hero}>
        <Container gutter={false} paddingX={{ mobile: 'xlarge', laptop: 'xxxlarge' }}>
          <Typography
            variant="h2"
            marginTop="xxxlarge"
            paddingBottom="large"
            marginBottom="xlarge"
            className={styleUtils.activeIndicatorPartialUnderlineRecipe({
              active: true,
              size: 'medium'
            })}
            style={{ maxWidth: '500px' }}>
            {project.optionalTagLine}
          </Typography>
          {!!project.brochure && (
            <Button
              hue="secondary"
              size="medium"
              href={project.brochure}
              borderRadius="medium"
              paddingLeft="large"
              suffix={<Box component={HiOutlineBookOpen} fontSize="2x" marginLeft="large" />}>
              {t('openBrochure')}
            </Button>
          )}
        </Container>
      </Section>

      <Section variant="slideUp">
        <Container gutter={false} paddingX={{ laptop: 'large' }}>
          <Card elevation="large" marginBottom={{ laptop: 'xxxlarge' }} background="white">
            <Grid>
              <Col laptop="6" background="optional_3">
                <Typography
                  variant="p"
                  color="white"
                  padding={{ mobile: 'xlarge', laptop: 'xxlarge' }}>
                  {project.description}
                </Typography>
              </Col>
              <Col laptop="6">
                <Box className={styles.statsColumn}>
                  {project.stats?.map((stat: IDescription) => (
                    <Box key={stat.label} className={styles.statItem}>
                      <Typography variant="h4" color="secondary">
                        {stat.description}
                      </Typography>
                      <Typography variant="h5" color="neutral_5">
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Col>
            </Grid>
          </Card>
        </Container>
      </Section>

      {project.features?.map((feature: IFeature) => {
        if (feature.type === EFeatureType.imageWithText) {
          return <FeatureImageWithText feature={feature} />
        }
      })}

      <ApartmentVisualizer />

      <Section variant="slideUp" background="surfaceContrast" color="onSurfaceContrast">
        <Container className={styles.benefits}>
          {project.benefits?.map((benefit: any) => (
            <Typography
              key={benefit.label}
              variant="h5"
              className={cn(
                styles.benefit,
                styleUtils.activeIndicatorPartialUnderlineRecipe({
                  active: true,
                  size: 'small'
                })
              )}>
              {benefit.label}
            </Typography>
          ))}
        </Container>
      </Section>

      <Section variant="slideUp" marginTop="xxxlarge">
        <Container>
          <Typography variant="h2" textAlign="center" marginY="xxlarge">
            {t('projectDetailsAndStatus')}
          </Typography>
          <Grid gutter="large">
            <Col mobile="12" laptop="6">
              <Typography
                variant="h2"
                marginY="large"
                paddingBottom="large"
                className={cn(
                  styleUtils.hideFrom({ laptop: true }),
                  styleUtils.activeIndicatorPartialUnderlineRecipe({
                    active: true,
                    size: 'small'
                  })
                )}>
                {t('timeline')}
              </Typography>
              <Box className={styles.timeline}>
                {project.timeline?.map((event: any) => (
                  <TimelineEvent
                    key={event.date}
                    date={event.date}
                    title={event.titleTranslated}
                    done={event.done}>
                    {!!event.gallery.length && (
                      <Dialog
                        cta={
                          <Button size="small" borderRadius="small">
                            {t('viewGallery')}
                          </Button>
                        }>
                        <Carousel>
                          {event.gallery.map(({ image }: any) => {
                            return (
                              <div key={image.url} style={{ height: '70vh' }}>
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
                      </Dialog>
                    )}
                  </TimelineEvent>
                ))}
              </Box>
            </Col>
            <Col mobile="12" laptop="6" marginBottom="large">
              {project.technicalDetails?.map((details: any) => (
                <Collapse
                  key={details.label}
                  variant="underline"
                  title={<Typography variant="h4">{details.label}</Typography>}
                  marginBottom="medium">
                  <Box paddingY="medium">{details.description}</Box>
                </Collapse>
              ))}
            </Col>
          </Grid>
        </Container>
      </Section>

      <Section variant="slideUp" paddingBottom="xlarge">
        <Container>
          <Typography
            variant="h2"
            marginTop="xxxlarge"
            paddingBottom="large"
            marginBottom="xlarge"
            className={styleUtils.activeIndicatorPartialUnderlineRecipe({
              active: true,
              size: 'medium'
            })}>
            {t('salesTeam')}
          </Typography>
          {/* <Typography variant="h5" color="neutral_3">
            {t('teamDescription')}
          </Typography> */}
          <TeamCarousel members={project.members} columns={4} />
        </Container>
      </Section>

      <Section variant="slideUp" paddingBottom="xxxlarge">
        <Container>
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
                href={`/proiect/${project.slug}/apartamente-disponibile`}
                variant="contained"
                hue="secondary"
                borderRadius="small"
                paddingX="large">
                {t('viewApartments')}
              </Button>
              <Button
                href={`/proiect/${project.slug}/contact-locatie`}
                variant="text"
                paddingX="xlarge">
                {t('contactUs')}
              </Button>
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
      slug
      phone
      email
      optionalTagLine
      stats
      description
      address
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
      benefits
      brochure
      technicalDetails
      features {
        title
        type
        titleTranslated
        description
        extraList
        gallery {
          title
          image {
            url
            width
            height
          }
        }
      }
      timeline {
        title
        titleTranslated
        date
        done
        gallery {
          image {
            url
            width
            height
          }
        }
      }
      members {
        title
        role
        phone
        email
        image {
          image {
            url
          }
        }
      }
      modelsPreview {
        title
        image {
          url
          width
          height
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
        ...keepTranslationsFor(
          project,
          [
            'previewFeatures',
            'optionalTagLine',
            'stats',
            'description',
            'benefits',
            'technicalDetails'
          ],
          currentLanguage
        ),
        features: project.features?.map((feature: any) =>
          keepTranslationsFor(feature, ['titleTranslated', 'description'], currentLanguage)
        ),
        timeline: project.timeline?.map((event: any) =>
          keepTranslationsFor(event, ['titleTranslated'], currentLanguage)
        ),
        members: project.members?.map((member: any) =>
          keepTranslationsFor(member, ['role'], currentLanguage)
        )
      }
    }
  }
}
