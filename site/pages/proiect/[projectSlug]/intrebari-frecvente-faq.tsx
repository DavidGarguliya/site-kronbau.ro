import {
  addLocaleToPaths,
  Box,
  Button,
  Col,
  Collapse,
  Container,
  getDefaultLocale,
  Grid,
  keepTranslationsFor,
  Page,
  Section,
  Typography
} from 'landmarks-ds'
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import Image from 'next/image'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { query } from '.keystone/api'

import * as styles from '@styles/pages/privacy.css'
import * as styleUtils from '@styles/utils.css'
import { GlobalFooter } from '@components/GlobalFooter'
import { InfoMenu } from '@components/InfoMenu'
import { ProjectDesktopMenu } from '@components/ProjectDesktopMenu'
import { ProjectMobileMenu } from '@components/ProjectMobileMenu'

export default function PrivacyPolicyPage({
  developer,
  project,
  projects
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()

  return (
    <Page
      title={`Intrebari frecvente despre ${project.title}`}
      description="Incercam sa raspundem oricaror intrebari pe care le aveti."
      background="white">
      <ProjectDesktopMenu project={project} developer={developer} hue="onLight" />

      <Container marginTop="xxlarge">
        <Grid gutter="large">
          <Col laptop="4" className={styles.stickyImage} style={{ top: '0px' }}>
            <Image width={1231} height={909} src="/faq.jpg" alt="FAQ Illustration" />
            <InfoMenu projects={projects} className={styleUtils.hideUntil({ laptop: true })} />
          </Col>
          <Col laptop="8">
            <Typography variant="h3" marginBottom="xlarge">
              {t('faq')}
            </Typography>

            {project.faqs.map((faq: any) => (
              <Collapse
                key={faq.id}
                variant="fill"
                title={<Typography variant="h5">{faq.titleTranslated}</Typography>}>
                <Typography variant="p" marginTop="medium">
                  {faq.description}
                </Typography>
              </Collapse>
            ))}

            <Typography
              variant="h3"
              marginY="xxlarge"
              paddingBottom="large"
              className={styleUtils.activeIndicatorPartialUnderlineRecipe({
                active: true,
                size: 'medium'
              })}>
              {t('wantMore')}
            </Typography>
            <div>
              <Button
                href={`/proiect/${project.slug}/contact-locatie`}
                variant="contained"
                hue="secondary"
                borderRadius="small"
                paddingX="xlarge">
                {t('contactUs')}
              </Button>
            </div>
          </Col>
        </Grid>
      </Container>

      <Section variant="slideUp" paddingBottom="xxxlarge">
        <InfoMenu
          projects={projects}
          className={styleUtils.hideFrom({ laptop: true })}
          paddingX="large"
        />
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
      faqs {
        id
      }
      thumbnail {
        image {
          url
        }
      }
    `
  })

  const [project] = await query.Project.findMany({
    where: { slug: { equals: params.projectSlug as string } },
    query: `
        title
        slug
        phone
        address
        email
        logo {
          title
          image {
            url
            width
            height
          }
        }
        faqs {
          id
          title
          titleTranslated
          description
        }
      `
  })

  return {
    props: {
      ...(await serverSideTranslations(currentLanguage)),
      developer,
      projects,
      project: {
        ...project,
        faqs: project.faqs.map((faq: any) =>
          keepTranslationsFor(faq, ['titleTranslated', 'description'], currentLanguage)
        )
      }
    }
  }
}
