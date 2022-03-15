import Link from 'next/link'
import cn from 'classnames'
import { Box, ImageWithSpinner, Spinner, SplitText, Sunshine, Button } from "landmarks-ds"
import { IUIComponent } from "landmarks-ds/utils/types"
import { BsArrowRight } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'

import * as styles from './styles.css'

interface IProps extends IUIComponent {
  unit: any
  orientation: number
  detail1: string
  detail2: string
}

export function UnitPreview({ className, unit, orientation, detail1, detail2, ...rest }: IProps) {
  const { t } = useTranslation()
  return (
    <Link href={`/proiect/${unit.project.slug}/${unit.building.slug}/apartament/${unit.slug}`} passHref>
      {unit.model.image && (unit.model.image.length === 1) && (
        <Box component="a" className={styles.link}>
          <Box
            position="relative"
            padding="xxlarge"
            background="surfaceFaded"
            className={cn(styles.unitPreview, className)}
            {...rest}>
            <SplitText
              fontSizeLarge="5x"
              fontSizeSmall="1x"
              lineHeight="3x"
              className={styles.apNumber}>
              {`Ap. ${unit.title}`}
            </SplitText>
            <Sunshine orientation={orientation}>
              <ImageWithSpinner
                src={unit.model.image[0].image.url}
                width={600}
                height={600}
              >
                <Spinner background="secondary" />
              </ImageWithSpinner>
            </Sunshine>
          </Box>
          <Box className={styles.details}>
            <Box
              background="neutral_3"
              fontSize="2x"
              textAlign="center"
              paddingY="medium"
              paddingX="large">
              {detail1}
            </Box>
            <Box
              background="neutral_2"
              fontSize="2x"
              textAlign="center"
              paddingY="medium"
              paddingX="large">
              {detail2}
            </Box>
            <Button variant="text" style={{ flexGrow: 1 }} justifyContent="space-between">{t('viewMore')}</Button>
          </Box>
        </Box>
      )}
    </Link>
  )
}