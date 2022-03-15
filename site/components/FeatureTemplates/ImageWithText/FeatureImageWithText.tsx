import cn from 'classnames'
import { Box, Container, Section, Typography } from "landmarks-ds"
import { IUIComponent } from "landmarks-ds/utils/types"
import { IFeature } from '../../../utils/types'

import * as styles from './styles.css'
import * as styleUtils from '@styles/utils.css'

interface IProps extends IUIComponent {
  feature: IFeature
}

export function FeatureImageWithText({ feature, className, ...rest }: IProps) {
  const firstImage = feature.gallery[0]

  return (
    <Box position="relative">
      <Section
        variant="slideUp"
        className={cn(styles.feature, className)}
        background="surfaceFaded"
        backgroundImageUrl={firstImage.image.url}
        {...rest}>
      </Section>
      <Box className={styles.content}>
        <Container gutter={false} className={styles.contentContainer}>
          <Typography
            variant="h2"
            marginBottom="xlarge"
            paddingBottom="large"
            className={styleUtils.activeIndicatorPartialUnderlineRecipe({
              active: true,
              size: 'medium',
            })}>
            {feature.titleTranslated}
          </Typography>
          <Box className={styles.text}>
            {feature.description}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}