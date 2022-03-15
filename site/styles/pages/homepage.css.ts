import { breakpoints, vars } from '@styles/theme.css'

import { sprinkles } from '@styles/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const slider = style([
  sprinkles({
    position: 'relative',
    background: 'neutral_2'
  }),
  {
    minHeight: '80vh'
  }
])

export const sliderImage = style({
  height: '80vh'
})

export const tagLineContainer = style([
  sprinkles({
    position: 'absolute',
    zIndex: 2,
    padding: 'large',
    left: 0,
    right: 0,
    paddingLeft: { laptop: 'xxxlarge' },
    textAlign: { mobile: 'center', laptop: 'left' }
  }),
  {
    top: '20vh'
  }
])

export const tagLine = style([
  sprinkles({
    display: 'inline',
    color: 'white',
    zIndex: 2,
    marginBottom: 'large'
  }),
  {
    whiteSpace: 'break-spaces',
    lineHeight: vars.lineHeight['7x']
  }
])

export const optionalTagLine = style([
  sprinkles({
    background: 'secondary',
    color: 'white',
    display: 'inline',
    paddingX: 'medium',
    paddingY: 'small',
    zIndex: 2
  }),
  {
    lineHeight: vars.lineHeight['7x']
  }
])

export const flex = sprinkles({
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column'
})

export const someGrid = style([
  sprinkles({
    display: 'none'
  }),
  {
    '@media': {
      [breakpoints.xx_laptop]: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: vars.spacing.xxlarge
      }
    }
  }
])

export const gridItem = style([
  sprinkles({
    background: 'white_alpha_08',
    display: 'flex',
    alignItems: 'flex-end',
    borderRadius: 'medium'
  })
])

export const projectHero = style([
  sprinkles({
    position: 'relative',
    background: 'neutral_2'
  })
])

export const projectsHeadline = style([
  sprinkles({
    padding: 'large',
    borderRadius: 'small',
    marginX: 'large',
    marginTop: 'large'
  })
])

export const iconGrid = style([
  sprinkles({
    paddingY: 'xlarge'
  }),
  {
    rowGap: '80px'
  }
])

export const section = style({
  '@media': {
    [breakpoints.xx_laptop]: {
      scrollMarginTop: '70px'
    }
  }
})

export const cardForm = style({
  backgroundColor: vars.color.white,
  zIndex: 2,

  '@media': {
    [breakpoints.xx_laptop]: {
      position: 'absolute',
      top: vars.spacing.xlarge,
      width: '400px'
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

export const map = style({
  height: `80vh`
})
