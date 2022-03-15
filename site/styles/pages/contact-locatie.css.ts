import { breakpoints, vars } from '../theme.css'

import { recipe } from '@vanilla-extract/recipes'
import { sprinkles } from '@styles/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const desktopMenu = style({
  position: 'absolute',
  left: 0,
  right: 0
})

export const cardForm = style({
  backgroundColor: vars.color.white,
  zIndex: 2,

  '@media': {
    [breakpoints.xx_laptop]: {
      position: 'absolute',
      top: vars.spacing.xlarge,
      width: '400px',
    }
  }
})

export const leftCTAButton = style({
  backgroundColor: vars.color.transparent,
  textTransform: 'none',
  color: vars.color.black_alpha_06,
  left: '0',
  marginLeft: '-20px'
})

export const rightCTAButton = style({
  backgroundColor: vars.color.transparent,
  textTransform: 'none'
})

export const leftCardButton = style({
  backgroundColor: vars.color.transparent,
  textTransform: 'none',
  color: vars.color.white,
  marginLeft: '-5px'
})

export const details = style([
  sprinkles({
    display: { mobile: 'grid', laptop: 'flex' },
    paddingTop: { mobile: 'large', laptop: 'large' },
    justifyContent: 'space-around'
  }),
  {
    gap: vars.spacing.large,
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
  }
])

export const descriptionCards = style({
  // display: 'grid'
  // gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
  '@media': {
    [breakpoints.xx_laptop]: {
      // gridTemplateColumns: '3'
      // gridColumn: '3'
      display: 'grid',
      gap: vars.spacing.xxlarge,
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
    }
  }
})

export const fluidGrid = style({
  gap: vars.spacing.large,
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'
})

export const map = style({
  height: `80vh`
})

export const description = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.medium
})

export const activeIndicatorPartialUnderlineRecipe = recipe({
  base: [
    sprinkles({
      position: 'relative'
    }),
    {
      selectors: {
        '&:after': {
          content: '" "',
          position: 'absolute',
          transition: 'all 0.3s',
          bottom: 0,
          left: 0,
          // neutral 3 works on both light and dark
          borderBottom: `3px solid ${vars.color.neutral_3}`
        }
      }
    }
  ],
  variants: {
    active: {
      true: {
        selectors: {
          '&:after': {
            borderBottomColor: vars.color.primary
          }
        }
      },
      false: {
        selectors: {
          '&:after': {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          '&:hover:after': {
            opacity: 1,
            transform: 'translateY(0px)'
          }
        }
      }
    },
    size: {
      small: {
        selectors: {
          '&:after': {
            width: '25px'
          }
        }
      },
      medium: {
        selectors: {
          '&:after': {
            width: '50px'
          }
        }
      }
    }
  },
  defaultVariants: {
    active: false,
    size: 'small'
  }
})
