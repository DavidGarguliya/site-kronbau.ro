import * as styleUtils from '@styles/utils.css'
import * as styles from './styles.css'

import { Box, Button, Col, Container, Grid, ImageWithSpinner, Spinner, Typography } from 'landmarks-ds'

import { BsArrowRight } from 'react-icons/bs'
import Image from 'next/image'
import cn from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Carousel } from '@components/Carousel'

interface modelsPreviewProps {
  title: string
  image: {
    url: string
    width: number
    height: number
  }
}

export function ApartmentVisualizer() {
  const [apartment, setApartment] = useState(0)
  const { t } = useTranslation()
  const mockData: modelsPreviewProps[] = [
    {
      title: t('apStudio'),
      image: {
        url: '/studio.jpg',
        width: 800,
        height: 600
      }
    },
    {
      title: t('ap2room'),
      image: {
        url: '/2rooms.jpg',
        width: 800,
        height: 600
      }
    },
    {
      title: t('ap3room'),
      image: {
        url: '/3rooms.jpg',
        width: 800,
        height: 600
      }
    },
    {
      title: t('ap4room'),
      image: {
        url: '/4rooms.jpg',
        width: 800,
        height: 600
      }
    }
  ]

  return (
    <Container
      gutter={false}
      paddingX={{ laptop: 'large' }}
      paddingY={{ mobile: 'large', desktop: 'none' }}>
      <Box className={styleUtils.hideFrom({ laptop: true })}>
        <Typography
          variant="h3"
          marginBottom="large"
          paddingBottom="large"
          marginLeft="large"
          className={cn(
            styles.Heading,
            styleUtils.activeIndicatorPartialUnderlineRecipe({
              active: true,
              size: 'medium'
            })
          )}>
          {t('availableUnits')}
        </Typography>
        <Carousel>
          {mockData.map((item) => (
            <>
              <Typography marginBottom="large" textAlign="center">{item.title}</Typography>
              <Box
                key={item.image.url}
                paddingBottom="xxlarge"
                style={{ height: '80vw', position: 'relative' }}>
                <ImageWithSpinner
                  src={item.image.url}
                  layout="fill"
                  objectFit="contain"
                  alt={item.title}>
                  <Spinner background="primary" />
                </ImageWithSpinner>
              </Box>
            </>
          ))}
        </Carousel>

        <Button
          href="/proiect/noua-residence-2/apartamente-disponibile"
          hue="secondary"
          borderRadius="small"
          marginLeft="large"
          marginTop="large">
          {t('viewApartments')}
        </Button>
      </Box>
      <Box className={styleUtils.hideUntil({ laptop: true })}>
        <Grid>
          <Col laptop="3" display="flex" alignItems="center">
            <Box paddingY={'xlarge'} className={styles.apartmentsList}>
              <Typography
                variant="h3"
                marginBottom="large"
                paddingBottom="large"
                className={cn(
                  styles.Heading,
                  styleUtils.activeIndicatorPartialUnderlineRecipe({
                    active: true,
                    size: 'medium'
                  })
                )}>
                {t('availableUnits')}
              </Typography>

              {mockData.map(({ title, image }, index) => (
                <Button
                  marginLeft={'-medium'}
                  variant="text"
                  key={index}
                  onClick={() => setApartment(index)}
                  suffix={
                    apartment === index ? (
                      <Box component={BsArrowRight} fontSize="2x" marginLeft="large" />
                    ) : undefined
                  }>
                  <Typography
                    textTransform={'none'}
                    fontFamily="body"
                    color={apartment === index ? 'primary' : 'black'}>
                    {title}
                  </Typography>
                </Button>
              ))}
              <Button
                href="/proiect/noua-residence-2/apartamente-disponibile"
                hue="secondary"
                borderRadius="small">
                {t('viewApartments')}
              </Button>
            </Box>
          </Col>
          <Col laptop="9">
            <Box style={{ height: '40vw', position: 'relative' }}>
              <ImageWithSpinner
                src={mockData[apartment].image.url}
                layout="fill"
                objectFit="contain"
                alt="Apartment">
                <Spinner background="primary" />
              </ImageWithSpinner>
            </Box>
          </Col>
        </Grid>
      </Box>
    </Container>
  )
}
