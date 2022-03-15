import { style } from '@vanilla-extract/css'
import { breakpoints, vars } from '@styles/theme.css'
import { sprinkles } from '@styles/sprinkles.css'

export const homepageHeader = style([
  sprinkles({
    background: 'white',
    zIndex: 3,
  }),
  {
    '@media': {
      [breakpoints.xx_laptop]: {
        position: 'sticky',
        top: 0,
        borderBottom: `1px solid ${vars.color.neutral_1}`
      }
    }
  }
])