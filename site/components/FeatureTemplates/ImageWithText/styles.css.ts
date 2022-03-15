import { style, styleVariants } from '@vanilla-extract/css'
import { sprinkles } from '@styles/sprinkles.css'
import { breakpoints, vars } from '@styles/theme.css'

export const feature = style({
  minHeight: '70vh',
  '@media': {
    [breakpoints.xx_laptop]: {
      minHeight: '100vh',
    }
  }
})

export const content = style([
  sprinkles({
    position: { laptop: 'absolute' }
  }),
  {
    left: 0,
    top: vars.spacing.xxxlarge,
    right: 0,
  }
])

export const contentContainer = style([
  sprinkles({
    background: 'white_alpha_08',
    padding: { mobile: 'xlarge', laptop: 'xxlarge' }
  }),
  {
    // padding: { mobile: vars.spacing.xlarge }
  }
])

export const text = style({
  '@media': {
    [breakpoints.xx_laptop]: {
      columnCount: 3,
      columnGap: vars.spacing.xxxlarge
    }
  }
})