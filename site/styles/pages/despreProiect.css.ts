import { style, styleVariants } from '@vanilla-extract/css'
import { sprinkles } from '../sprinkles.css'
import { breakpoints, vars } from '../theme.css'
import { calc } from '@vanilla-extract/css-utils'

export const desktopMenu = style({
  position: 'absolute',
  left: 0,
  right: 0,
})

export const hero = style([
  sprinkles({
    paddingBottom: { mobile: 'large', laptop: 'xxxlarge' }
  }),
  {
    paddingTop: '144px',
    minHeight: '80vh',
    '@media': {
      [breakpoints.xx_laptop]: {
        minHeight: '70vh',
      }
    }
  }
])


export const statsColumn = style([
  sprinkles({
    display: 'grid',
  }),
  {
    height: '100%',
    gridTemplateColumns: '1fr 1fr',
    '@media': {
      [breakpoints.xx_laptop]: {
        gridTemplateColumns: '1fr 1fr 1fr',
      }
    }
  }
])

export const statItem = style([
  sprinkles({
    paddingLeft: 'xlarge',
    paddingY: 'xlarge',
  }),
  {
    borderRight: `1px solid ${vars.color.neutral_1}`
  }
])

export const benefits = style([
  sprinkles({
    display: { mobile: 'grid', laptop: 'flex' },
    padding: { mobile: 'xlarge', laptop: 'xxlarge' },
    justifyContent: 'space-around',
  }),
  {
    gap: vars.spacing.xxlarge,
    gridTemplateColumns: '1fr 1fr',
  }
])

export const benefit = style([
  sprinkles({
    paddingTop: 'medium',
  }),
  {
    maxWidth: '150px',
    selectors: {
      '&:after': {
        bottom: 'auto',
        top: 0,
      }
    }
  }
])

export const timeline = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'large'
  }),
  {
    gap: vars.spacing.small,
  }
])

export const teamCarousel = style({
  marginLeft: calc.negate(vars.spacing.large),
  marginRight: calc.negate(vars.spacing.large),
})