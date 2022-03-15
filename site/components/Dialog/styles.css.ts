import { sprinkles } from '@styles/sprinkles.css'
import { breakpoints, overwrites, vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

export const dialog = style([
  sprinkles({
    position: 'fixed',
    background: 'white',
    boxShadow: 'large',
  }),
  {
    top: 0,
    left: 0,
    bottom: `${overwrites.MENU_HEIGHT}px`,
    width: '100vw',
    // height: `calc(100vh - ${overwrites.MENU_HEIGHT}px)`,
    maxWidth: '1000px',

    '@media': {
      [breakpoints.xx_laptop]: {
        top: '50%',
        left: '50%',
        height: '75vh',
        padding: vars.spacing.large,
        transform: 'translate(-50%, -50%)',
        borderRadius: vars.border.radius.large
      }
    }
  }
])

export const closeBtn = style([
  sprinkles({
    position: 'absolute',
    cursor: 'pointer',
  }),
  {
    right: vars.spacing.large,
    top: vars.spacing.large,
  }
])