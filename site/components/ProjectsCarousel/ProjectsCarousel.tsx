import { Box, CardCarousel, Card, CardMedia, Typography, ImageWithSpinner, Spinner, Button, useWindowSize } from "landmarks-ds"
import { IUIComponent } from "landmarks-ds/utils/types"
import { useTranslation } from "next-i18next"
import { BsArrowRight } from 'react-icons/bs'

interface IProps extends IUIComponent {
  projects: any
}

export function ProjectsCarousel({ projects }: IProps) {
  const [windowWidth] = useWindowSize(true, false)
  const isMobile = windowWidth < 991
  const { t } = useTranslation()

  return (
    <CardCarousel columns={2}>
      {projects.map((project: any) => (
        <Card
          key={project.slug}
          href={project.externalLink || `/proiect/${project.slug}`}
          elevation="large"
          background="surfaceRegular">
          <CardMedia
            height={isMobile ? '400px' : '480px'}
            title={
              <Typography variant="h3" color="white">
                {project.title}
              </Typography>
            }>
            <ImageWithSpinner src={project.thumbnail.image.url} layout="fill" objectFit="cover">
              <Spinner background="white" />
            </ImageWithSpinner>
          </CardMedia>
          <Box paddingTop="medium" paddingBottom="large" paddingX="large">
            <Typography variant="small" color="onSurfaceRegular">
              {project.address}
            </Typography>
            <Box marginTop="large" display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h3" color="onSurfaceRegular" style={{ lineHeight: '20px' }}>
                  {project.unitsCount}
                </Typography>
                <Typography variant="p" color="onSurfaceRegular">
                  {t('apartments')}
                </Typography>
              </Box>
              <Button borderRadius="full" hue="secondary">
                <Box component={BsArrowRight} fontSize="2x" marginX="xsmall" />
              </Button>
            </Box>
          </Box>
        </Card>
      ))}
      <Card
        key="Noua1"
        href="https://nouaresidence.ro"
        elevation="large"
        background="surfaceRegular">
        <CardMedia
          height={isMobile ? '400px' : '480px'}
          title={
            <Typography variant="h3" color="white">
              Noua Residence
            </Typography>
          }>
          <ImageWithSpinner
            src="/images/05bab6cb-21a5-496f-b0ef-6032b7587bf0.png"
            layout="fill"
            objectFit="cover">
            <Spinner background="white" />
          </ImageWithSpinner>
        </CardMedia>
        <Box paddingTop="medium" paddingBottom="large" paddingX="large">
          <Typography variant="small" color="onSurfaceRegular">
            Strada Nucului 42, Brașov
          </Typography>
          <Box marginTop="large" display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h3" color="onSurfaceRegular" style={{ lineHeight: '20px' }}>
                144
              </Typography>
              <Typography variant="p" color="onSurfaceRegular">
                {t('apartments')}
              </Typography>
            </Box>
            <Button borderRadius="full" hue="secondary">
              <Box component={BsArrowRight} fontSize="2x" marginX="xsmall" />
            </Button>
          </Box>
        </Box>
      </Card>
    </CardCarousel>
  )
}