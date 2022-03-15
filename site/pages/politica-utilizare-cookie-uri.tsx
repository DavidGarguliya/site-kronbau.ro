import { Box, Col, Container, Footer, getDefaultLocale, Grid, ListItem, Page, Typography } from 'landmarks-ds'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { query } from '.keystone/api'
import { BsArrowRight } from 'react-icons/bs'
import { FiExternalLink } from 'react-icons/fi'

import * as styles from '@styles/pages/privacy.css'
import * as styleUtils from '@styles/utils.css'
import { HomepageDesktopMenu } from '@components/HomepageDesktopMenu'
import { HomepageMobileMenu } from '@components/HomepageMobileMenu'
import { GlobalFooter } from '@components/GlobalFooter'
import { InfoMenu } from '@components/InfoMenu'

export default function CookiePolicyPage({
  developer,
  projects
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  const { t: tPolicies } = useTranslation('policies')

  return (
    <Page
      title="Politica de Utilizare Cookie-uri"
      description="Politica de Utilizare Cookie-uri"
      background="white">
      <HomepageDesktopMenu developer={developer} hue="onLight" />

      <Container marginTop="xxlarge">
        <Grid gutter="large">
          <Col laptop="4" className={styles.stickyImage}>
            <Image
              width={736}
              height={440}
              src="/privacy-policy.svg"
              alt="Privacy Policy Illustration"
            />
            <InfoMenu projects={projects} className={styleUtils.hideUntil({ laptop: true })} />
          </Col>
          <Col laptop="8">
            <Typography variant="h3" marginBottom="xlarge">
              {tPolicies('cookiePolicy')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p35')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('whatIsCookie')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p36')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('cookieUsecase')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p37')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('cookieLife')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p38')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('whatCookies')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p39')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('howCookies')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p40')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p41')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p42')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p43')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p44')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('cookieData')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p45')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('deleteCookies')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p46')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('whyCookies')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p47')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p48')}
            </Typography>
            <ol>
              <li>
                <Typography variant="p" marginBottom="large">
                  {tPolicies('p49')}
                </Typography>
              </li>
              <li>
                <Typography variant="p" marginBottom="large">
                  {tPolicies('p50')}
                </Typography>
              </li>
              <li>
                <Typography variant="p" marginBottom="large">
                  {tPolicies('p51')}
                </Typography>
              </li>
              <li>
                <Typography variant="p" marginBottom="large">
                  {tPolicies('p52')}
                </Typography>
              </li>
            </ol>
          </Col>
        </Grid>
      </Container>
      <InfoMenu
        projects={projects}
        className={styleUtils.hideFrom({ laptop: true })}
        paddingX="large"
      />
      <GlobalFooter developer={developer} />

      <HomepageMobileMenu developer={developer} />
    </Page>
  )
}

export async function getStaticProps({ locale, defaultLocale }: GetStaticPropsContext) {
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
      faqs {
        id
      }
    `
  })

  return {
    props: {
      ...(await serverSideTranslations(currentLanguage, ['common', 'policies'])),
      developer,
      projects,
    }
  }
}
