import { style } from '@vanilla-extract/css'
import { sprinkles } from '@styles/sprinkles.css'
import { vars } from '@styles/theme.css'

export const unitPreview = style([
  sprinkles({
    paddingBottom: 'xlarge',
  }),
  {
  }
])

export const link = style([
  {
    textDecoration: 'none',
    color: 'inherit',
  }
])

export const apNumber = style([
  sprinkles({
    background: 'primary',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: 'large',
    position: 'absolute',
    fontFamily: 'heading',
    zIndex: 2,
    lineHeight: '-1x',
  }),
  {
    left: 0,
    top: 0,
    paddingBottom: vars.spacing.xlarge,
  }
])

export const details = style([
  sprinkles({
    fontFamily: 'heading',
    display: 'flex',
    paddingBottom: { mobile: 'xxlarge', laptop: 'none' }
  })
])