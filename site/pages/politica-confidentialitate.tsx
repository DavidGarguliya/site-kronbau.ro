import {
  Box,
  Col,
  Container,
  getDefaultLocale,
  Grid,
  ListItem,
  Page,
  Typography
} from 'landmarks-ds'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { query } from '.keystone/api'
import { HomepageDesktopMenu } from '@components/HomepageDesktopMenu'
import { HomepageMobileMenu } from '@components/HomepageMobileMenu'

import * as styles from '@styles/pages/privacy.css'
import * as styleUtils from '@styles/utils.css'
import { GlobalFooter } from '@components/GlobalFooter'
import { InfoMenu } from '@components/InfoMenu'

export default function PrivacyPolicyPage({
  developer,
  projects
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  const { t: tPolicies } = useTranslation('policies')

  return (
    <Page
      title="Politica de Confidențialitate"
      description="Politica de Confidențialitate și Protecția Datelor cu Caracter Personal"
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
              {tPolicies('privacyPolicyTitle')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p1', { developer: developer.title })}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p2', { developer: developer.title })}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p3')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('whatIsGDPR')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p4')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('whyDataCollection')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p5')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('whatData')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p6', { developer: developer.title })}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('newsletterData')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p7', { unsubscribeEmail: developer.email })}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('otherData')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p8')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('formData')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p9')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('whatLaw')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p10')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('whatToKnow')}
            </Typography>
            <Typography variant="h5">{tPolicies('definitions')}</Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p11')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p12')}
            </Typography>
            <Typography variant="h4" marginBottom="medium">
              {tPolicies('yourRights')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p13')}
            </Typography>
            <ul>
              <li>{tPolicies('p14')}</li>
              <li>{tPolicies('p15')}</li>
              <li>{tPolicies('p16')}</li>
              <li>{tPolicies('p17')}</li>
              <li>{tPolicies('p18')}</li>
              <li>{tPolicies('p19', { developer: developer.title })}</li>
            </ul>

            <Typography variant="h4" marginBottom="medium">
              {tPolicies('howContact')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p20', { developer: developer.title })}
            </Typography>
            <ul>
              <li>{tPolicies('p21', { phone: developer.phone })}</li>
              <li>
                {tPolicies('emailTo')}
                <a href={`mailto:${developer.email}`}>{developer.email}</a>.
              </li>
            </ul>

            <Typography variant="p" marginBottom="large">
              {tPolicies('p22', {
                email: developer.email,
                phone: developer.phone
              })}
            </Typography>

            <Typography variant="h4" marginBottom="medium">
              {tPolicies('howLong')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p23')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p24')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p25')}
            </Typography>

            <Typography variant="h4" marginBottom="medium">
              {tPolicies('thirdParty')}
            </Typography>
            <ol>
              <li>
                <Typography variant="p" marginBottom="large">
                  {tPolicies('p26', { developer: developer.title })}{' '}
                  <a target="_blank" rel="noreferrer" href="https://www.sendinblue.com/gdpr/">
                    https://www.sendinblue.com/gdpr/
                  </a>
                </Typography>
              </li>
              <li>
                <Typography variant="p" marginBottom="large">
                  {tPolicies('p27')}{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://business.safety.google/compliance/">
                    https://business.safety.google/compliance
                  </a>
                </Typography>
              </li>
            </ol>

            <Typography variant="h4" marginBottom="medium">
              {tPolicies('dataToAuthorities')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p28', { developer: developer.title })}
            </Typography>

            <Typography variant="h4" marginBottom="medium">
              {tPolicies('socialNetworks')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p29')}
            </Typography>

            <Typography variant="h4" marginBottom="medium">
              {tPolicies('googleAnalytics')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p30')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p31', { developer: developer.title })}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p32')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p33', { developer: developer.title })}
            </Typography>

            <Typography variant="h4" marginBottom="medium">
              {tPolicies('updates')}
            </Typography>
            <Typography variant="p" marginBottom="large">
              {tPolicies('p34', { developer: developer.title })}
            </Typography>
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
      projects
    }
  }
}
