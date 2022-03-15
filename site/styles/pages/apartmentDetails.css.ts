import { style, globalStyle } from '@vanilla-extract/css'
import { sprinkles } from '../sprinkles.css'
import { breakpoints, vars } from '../theme.css'

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
    transform: 'translateY(-40px)',
    '@media': {
      [breakpoints.xx_laptop]: {
        transform: 'translateY(0)',
      }
    }
  }
])

export const attachedCol = style([
  sprinkles({
    position: { mobile: 'relative', laptop: 'absolute' },
    fontFamily: 'heading',
  }),
  {
    transform: 'translateY(40px)',
    zIndex: 2,
    left: 0,
    top: 0,
    width: '159px',
    '@media': {
      [breakpoints.xx_laptop]: {
        transform: 'translateY(0)',
      }
    }
  }
])

export const stretch = style([
  sprinkles({
    display: 'flex'
  }),
  {
    justifyContent: 'stretch'
  }
])

export const apartmentNumber = style([
  sprinkles({
    background: 'primary',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 'large',
    lineHeight: '4x',
  }), {
    flex: 1,
  }
])

export const imageCol = style([
  sprinkles({
    background: 'surfaceFaded',
    position: 'relative',
    textAlign: 'center',
    padding: { mobile: 'xlarge', laptop: 'xxxlarge' },
  }),
  {
    marginLeft: 0,
    '@media': {
      [breakpoints.xx_laptop]: {
        marginLeft: '159px',
      }
    }
  }
])

export const listCol = style([
  sprinkles({
    padding: { mobile: 'large', laptop: 'xxlarge' },
    fontSize: '-1x',
  }),
  {
    flex: 1,
    background: 'rgba(236, 240, 243, .6)',
  }
])

export const listItem = style([
  sprinkles({
    display: 'flex',
    color: 'neutral_4',
    justifyContent: 'space-between',
    padding: 'xsmall',
  }),
  {
    borderBottom: `1px solid ${vars.color.neutral_2}`
  }
])

export const downloadButton = style([
  sprinkles({
    lineHeight: '2x',
  }),
  {
    whiteSpace: 'break-spaces',
    display: 'flex',
  }
])

globalStyle(`${downloadButton} span`, {
  padding: 0
})

export const extrasMobile = style([
  sprinkles({
    display: { mobile: 'flex', laptop: 'none' },
    flexWrap: 'wrap',
    fontFamily: 'heading',
  }),
  {
    background: 'rgba(236, 240, 243, .6)',
    alignItems: 'flex-start',
    width: '100%',
  }
])

export const moodBar = style([
  sprinkles({
    display: 'flex',
    background: 'optional_1',
    marginBottom: 'xxxlarge',
    justifyContent: 'space-around',
  }),
  {
    height: '260px',
  }
])

export const decoration = style([
  sprinkles({
    paddingRight: { laptop: 'large' },
    paddingBottom: { mobile: 'large', laptop: 'none' },
  }),
  {
    flexShrink: 1,
  }
])
