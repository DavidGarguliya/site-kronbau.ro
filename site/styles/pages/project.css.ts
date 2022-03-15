import { breakpoints, overwrites, vars } from '../theme.css'

import { sprinkles } from '../sprinkles.css'
import { style } from '@vanilla-extract/css'

export const videoContainer = style([
  sprinkles({
    overflow: 'hidden',
    position: 'relative'
  }),
  {
    height: '100vh'
  }
])

export const video = style([
  sprinkles({
    position: 'absolute'
  }),
  {
    zIndex: -2,
    height: '100%',
    width: '177.77777778vh' /* 100 * 16 / 9 */,
    minWidth: '100%',
    minHeight: '56.25vw' /* 100 * 9 / 16 */,
    maxWidth: 'none',
    left: '50%' /* % of surrounding element */,
    top: '50%',
    transform: 'translate(-50%, -50%)' /* % of current element */
  }
])

export const mediaOverlayDark = style([
  sprinkles({
    position: 'absolute',
    zIndex: 0
  }),
  {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    background:
      'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 32%, rgba(0,0,0,0.3) 71%, rgba(0,0,0,0.7) 100%)'
  }
])

export const content = style([
  {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: overwrites.MENU_HEIGHT * 3

    // '@media': {
    //   [breakpoints.xx_laptop]: {
    //     bottom: vars.spacing.xxlarge,
    //   }
    // }
  }
])
