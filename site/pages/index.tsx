import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import * as styleUtils from '@styles/utils.css'
import * as styles from '@styles/pages/homepage.css'

import {
  Box,
  Button,
  Card,
  Col,
  Container,
  Grid,
  ImageWithSpinner,
  Page,
  Section,
  Spinner,
  Typography,
  getDefaultLocale,
  keepTranslationsFor,
  useWindowSize,
  CardMedia
} from 'landmarks-ds'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { MdCall, MdEmail } from 'react-icons/md'

import { Carousel } from '@components/Carousel'
import { HomepageDesktopMenu } from '@components/HomepageDesktopMenu'
import { HomepageMobileMenu } from '@components/HomepageMobileMenu'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectsCarousel } from '@components/ProjectsCarousel'
import { SubmitLeadForm } from '@components/SubmitLeadForm'
import cn from 'classnames'
import { query } from '.keystone/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GlobalFooter } from '@components/GlobalFooter'

export default function Home({
  developer,
  projects
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()
  const [windowWidth] = useWindowSize(true, false)
  const isMobile = windowWidth < 991

  return (
    <Page
      title={`${developer.title} - ${developer.optionalTagLine}`}
      description={`${developer.title} este unul dintre cei mai mari dezvoltatori din Brașov.`}
      background="white"
      favicon={developer.favicon.image.url}>
      <HomepageDesktopMenu developer={developer} hue="onLight" />

      <Box className={styles.slider}>
        <Container position="relative">
          <Box className={styles.tagLineContainer}>
            <Typography variant="h2" className={styles.tagLine}>
              {developer.tagLine}
            </Typography>
            <br />
            <br />
            <Button href="#projectsSection" hue="secondary" borderRadius="small">
              {t('viewProjects')}
            </Button>
            {/* {developer.optionalTagLine && (
              <Typography variant="p" className={styles.optionalTagLine}>
                {developer.optionalTagLine}
              </Typography>
            )} */}
          </Box>
        </Container>
        <Carousel navigation={false} overlay fade>
          <div className={styles.sliderImage}>
            <ImageWithSpinner
              priority
              src="/slider0.jpg"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
              <Spinner background="secondary" />
            </ImageWithSpinner>
          </div>
          <div className={styles.sliderImage}>
            <ImageWithSpinner
              priority
              src="/slider1.jpg"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
              <Spinner background="secondary" />
            </ImageWithSpinner>
          </div>
          <div className={styles.sliderImage}>
            <ImageWithSpinner
              src="/slider4.jpg"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
              <Spinner background="secondary" />
            </ImageWithSpinner>
          </div>
          <div className={styles.sliderImage}>
            <ImageWithSpinner
              src="/slider5.jpg"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
              <Spinner background="secondary" />
            </ImageWithSpinner>
          </div>
          <div className={styles.sliderImage}>
            <ImageWithSpinner
              src="/slider2.jpg"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
              <Spinner background="secondary" />
            </ImageWithSpinner>
          </div>
          <div className={styles.sliderImage}>
            <ImageWithSpinner
              src="/slider3.jpg"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
              <Spinner background="secondary" />
            </ImageWithSpinner>
          </div>
        </Carousel>
      </Box>

      <Section
        id="projectsSection"
        variant="slideUp"
        backgroundImageUrl="/images/faded-background.jpg"
        className={styles.section}>
        <Container paddingY={{ mobile: 'xxlarge', laptop: 'xxxlarge' }} gutter={false}>
          <Grid>
            <Col mobile="12" laptop="3">
              <Box className={styles.projectsHeadline}>
                <AspectRatio.Root ratio={isMobile ? 2 : 1} className={styles.flex}>
                  <Box>
                    <Image
                      alt={developer.title}
                      src={developer.logoSymbol.image.url}
                      width={developer.logoSymbol.image.width / 2}
                      height={developer.logoSymbol.image.height / 2}
                    />
                    <Typography variant="h2">{t('ourProjects')}</Typography>
                  </Box>
                </AspectRatio.Root>
              </Box>
              <Typography variant="p" padding="xlarge">
                {t('ourProjectsDetails')}
              </Typography>
            </Col>
            <Col laptop="1" />
            <Col mobile="12" laptop="7">
              <ProjectsCarousel projects={projects} />
            </Col>
          </Grid>
        </Container>
      </Section>

      <Section
        id="aboutSection"
        variant="slideUp"
        backgroundImageUrl="/wave-abstract.jpg"
        style={{ background: '#f1ede9', scrollMarginTop: '88px' }}>
        <Container paddingY={{ mobile: 'xxlarge', laptop: 'xxxlarge' }}>
          <Typography
            variant="h2"
            paddingBottom="large"
            marginBottom="xlarge"
            className={styleUtils.activeIndicatorPartialUnderlineRecipe({
              active: true,
              size: 'medium'
            })}>
            {t('aboutUsDetail')}
          </Typography>
          <Grid>
            <Col mobile="12" laptop="4" paddingBottom="xxlarge">
              <Typography variant="p" color="onSurfaceRegular" marginBottom="large">
                {t('kronbauDetails')}
              </Typography>
              <Button href="http://www.profil-ag.de/" target="_blank" borderRadius="small">
                {t('viewMore')}
              </Button>
            </Col>
            <Col laptop="1" />
            <Col mobile="12" laptop="7">
              <Box className={styles.someGrid}>
                <Card className={styles.gridItem}>
                  <AspectRatio.Root ratio={1} className={styles.flex}>
                    <CardMedia
                      height={'600px'}
                      zIndex={3}
                      title={
                        <Typography fontWeight="bold" zIndex={3} color="white" padding={'small'}>
                          WILO industrial pump assembly plant
                        </Typography>
                      }>
                      <Image
                        alt="WILO industrial pump assembly plant"
                        src="/portfolio-wilo.jpg"
                        layout="fill"
                        objectFit="cover"
                      />
                    </CardMedia>
                  </AspectRatio.Root>
                </Card>
                <Card className={styles.gridItem}>
                  <AspectRatio.Root ratio={1} className={styles.flex}>
                    <CardMedia
                      height={'600px'}
                      zIndex={3}
                      title={
                        <Typography fontWeight="bold" zIndex={3} color="white" padding={'small'}>
                          JCB construction equipment assembly plant
                        </Typography>
                      }>
                      <Image
                        alt="JCB construction equipment assembly plant"
                        src="/portfolio-jcb.jpg"
                        layout="fill"
                        objectFit="cover"
                      />
                    </CardMedia>
                  </AspectRatio.Root>
                </Card>
                <Card className={styles.gridItem}>
                  <AspectRatio.Root ratio={1} className={styles.flex}>
                    <CardMedia
                      height={'600px'}
                      zIndex={3}
                      title={
                        <Typography fontWeight="bold" zIndex={3} color="white" padding={'small'}>
                          Faymonville Service Center
                        </Typography>
                      }>
                      <Image
                        alt="Faymonville Service Center"
                        src="/portfolio-faymonville.jpg"
                        layout="fill"
                        objectFit="cover"
                      />
                    </CardMedia>
                  </AspectRatio.Root>
                </Card>
                <Card className={styles.gridItem}>
                  <AspectRatio.Root ratio={1} className={styles.flex}>
                    <CardMedia
                      height={'600px'}
                      zIndex={3}
                      title={
                        <Typography fontWeight="bold" zIndex={3} color="white" padding={'small'}>
                          Business Center &quot;Delta Plaza&quot;
                        </Typography>
                      }>
                      <Image
                        alt='Business Center "Delta Plaza"'
                        src="/portfolio-delta-plaza.jpg"
                        layout="fill"
                        objectFit="cover"
                      />
                    </CardMedia>
                  </AspectRatio.Root>
                </Card>
                <Card className={styles.gridItem}>
                  <AspectRatio.Root ratio={1} className={styles.flex}>
                    <CardMedia
                      height={'600px'}
                      zIndex={3}
                      title={
                        <Typography fontWeight="bold" zIndex={3} color="white" padding={'small'}>
                          Hypermarket network LENTA
                        </Typography>
                      }>
                      <Image
                        alt="Hypermarket network LENTA"
                        src="/portfolio-lenta.jpg"
                        layout="fill"
                        objectFit="cover"
                      />
                    </CardMedia>
                  </AspectRatio.Root>
                </Card>
              </Box>
            </Col>
          </Grid>
        </Container>
      </Section>

      <Section id="whatWeDoSection" variant="slideUp" className={styles.section}>
        <Container textAlign="center" paddingY="xxxlarge">
          <Image
            alt={developer.title}
            src={developer.logoSymbol.image.url}
            width={developer.logoSymbol.image.width / 1.5}
            height={developer.logoSymbol.image.height / 1.5}
            unselectable="off"
          />
          <Typography variant="h2" marginY="medium">
            {t('whatWeDoHeading')}
          </Typography>
          <Typography
            variant="p"
            marginBottom="xxlarge"
            color="neutral_3"
            style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            {t('whatWeDoDetails')}
          </Typography>
          <Grid className={styles.iconGrid}>
            <Col mobile="6" laptop="3">
              <Card elevation="none">
                <Image alt="Design services" src="/icon-design.jpg" width={130} height={130} />
                <Typography variant="h5">{t('planningDesign')}</Typography>
              </Card>
            </Col>
            <Col mobile="6" laptop="3">
              <Card elevation="none">
                <Image
                  alt="Technical coordination services"
                  src="/icon-technical-coordonation.jpg"
                  width={130}
                  height={130}
                />
                <Typography variant="h5">{t('technicalCoordination')}</Typography>
              </Card>
            </Col>
            <Col mobile="6" laptop="3">
              <Card elevation="none">
                <Image
                  alt="Construction services"
                  src="/icon-construction.jpg"
                  width={130}
                  height={130}
                />
                <Typography variant="h5">{t('construction')}</Typography>
              </Card>
            </Col>
            <Col mobile="6" laptop="3">
              <Card elevation="none">
                <Image
                  alt="Project management services"
                  src="/icon-project-management.jpg"
                  width={130}
                  height={130}
                />
                <Typography variant="h5">{t('projectManagement')}</Typography>
              </Card>
            </Col>
          </Grid>
        </Container>
      </Section>

      <Container position="relative">
        <Card
          className={cn(styles.cardForm, styleUtils.hideUntil({ laptop: true }))}
          elevation="large">
          <Box padding="large">
            <Typography variant="h3">{t('contactUs')}</Typography>
            <SubmitLeadForm
              projectTitle={projects[0].title}
              buildingSlug={''}
              unitSlug={''}
              borderRadius={'small'}
            />
          </Box>
        </Card>
      </Container>

      <Section
        id="contactSection"
        variant="slideUp"
        background="surfaceFaded"
        className={styles.section}
        style={{ height: '70vh' }}>
        <ImageWithSpinner
          src="/images/map-kronbau.png"
          layout="fill"
          objectFit="cover"
          sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
          <Spinner background="secondary" />
        </ImageWithSpinner>
      </Section>

      <Card
        padding="large"
        className={cn(styles.cardForm, styleUtils.hideFrom({ laptop: true }))}
        style={{ transform: 'translat20vh' }}>
        <SubmitLeadForm
          projectTitle={projects[0].title}
          buildingSlug={''}
          unitSlug={''}
          padding={'small'}
          borderRadius={'small'}
        />
      </Card>

      <Box background="surfaceFaded" color="black_alpha_06">
        <Container className={styles.details}>
          <Box>
            <Typography variant="h4">{t('kronbauOffice')}</Typography>
            <Typography>Str. Nicolae Iorga, Nr.20, Brasov</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{t('office')}</Typography>
            <Typography>Calea București 254</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{t('contactUs')}</Typography>
            <Box>
              <Button
                variant="text"
                prefix={<MdCall />}
                href={`tel:${developer.phone}`}
                className={styles.leftCTAButton}>
                <Typography marginLeft={'small'}>{t('call')}</Typography>
              </Button>
              <Button
                prefix={<MdEmail />}
                color="black_alpha_06"
                href={`mailto:${developer.email}`}
                className={styles.rightCTAButton}>
                <Typography marginLeft={'small'}>{t('email')}</Typography>
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Section variant="slideUp" className={styles.projectHero}>
        <Container position="relative">
          <Box className={styles.tagLineContainer}>
            <Typography variant="h2" className={styles.tagLine} style={{ fontSize: '40px' }}>
              Noua Residence 2
            </Typography>
            <br />
            <Button
              href={`/proiect/noua-residence-2`}
              hue="secondary"
              size="large"
              borderRadius="small">
              {t('viewMore')}
            </Button>
          </Box>
        </Container>

        <Link href="/proiect/noua-residence-2" passHref>
          <Box component="a" display="block" className={styles.sliderImage}>
            <ImageWithSpinner
              src="/images/0886aa3d-18b1-43c7-a75f-3fbc308a10b5.jpg"
              layout="fill"
              objectFit="cover"
              sizes="(min-width: 1000px) 100vw, (min-width: 700px) 1500px, 1200px">
              <Spinner background="secondary" />
            </ImageWithSpinner>
          </Box>
        </Link>
      </Section>

      <Section
        id="partnersSection"
        variant="slideUp"
        className={styles.section}
        background={'surfaceFaded'}>
        <Container textAlign="center" paddingY="xxxlarge">
          <Typography variant="h3" marginTop="medium" marginBottom="xlarge">
            {t('ourPartners')}
          </Typography>
          <Grid gutter="large">
            <Col mobile="6" laptop="3">
              <Image alt="Ramona Paraschiv" src="/partner1.png" width={169} height={70} />
              <Typography
                variant="small"
                display="block"
                textAlign="left"
                marginY="medium"
                className={styleUtils.hideUntil({ laptop: true })}>
                {t('partner1')}
              </Typography>
            </Col>
            <Col mobile="6" laptop="3">
              <a
                href="https://www.dentons.com/en"
                target="_blank"
                rel="noreferrer"
                aria-label={`Open link in a new tab`}>
                <Image alt="Dentons" src="/partner2.png" width={147} height={60} />
              </a>
              <Typography
                variant="small"
                display="block"
                textAlign="left"
                marginY="medium"
                className={styleUtils.hideUntil({ laptop: true })}>
                {t('partner2')}
              </Typography>
            </Col>
            <Col mobile="6" laptop="3">
              <a
                href="https://contana.ro/"
                target="_blank"
                rel="noreferrer"
                aria-label={`Open link in a new tab`}>
                <Image alt="Contana" src="/partner3.png" width={142} height={58} />
              </a>
              <Typography
                variant="small"
                display="block"
                textAlign="left"
                marginY="medium"
                className={styleUtils.hideUntil({ laptop: true })}>
                {t('partner3')}
              </Typography>
            </Col>
            <Col mobile="6" laptop="3">
              <a
                href="https://aquariusgrup.ro/ro/"
                target="_blank"
                rel="noreferrer"
                aria-label={`Open link in a new tab`}>
                <Image alt="Aquarius" src="/partner4.png" width={138} height={58} />
              </a>
              <Typography
                variant="small"
                display="block"
                textAlign="left"
                marginY="medium"
                className={styleUtils.hideUntil({ laptop: true })}>
                {t('partner4')}
              </Typography>
            </Col>
          </Grid>
        </Container>
      </Section>

      <GlobalFooter developer={developer} />

      <HomepageMobileMenu developer={developer} />
    </Page>
  )
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
      tagLine
      address
      description
      optionalTagLine
      mapCoordinates
      googleMapLink
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

  return {
    props: {
      ...(await serverSideTranslations(currentLanguage)),
      projects,
      developer: keepTranslationsFor(developer, ['tagLine', 'optionalTagLine'], currentLanguage)
    }
  }
}
