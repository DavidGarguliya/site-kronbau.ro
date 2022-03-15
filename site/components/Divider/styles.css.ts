import { style } from '@vanilla-extract/css'
import { sprinkles } from '@styles/sprinkles.css'
import { vars } from '@styles/theme.css'

export const divider = style([
  sprinkles({
    paddingY: 'medium',
    position: 'relative',
  }),
  {
    selectors: {
      '&:before': {
        content: '" "',
        display: 'block',
        borderTop: `1px solid ${vars.color.light}`,
      },
      '&:after': {
        content: '" "',
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '15px',
        height: '15px',
        transform: 'rotate(45deg) translateX(-7px) translateY(-5px)',
        background: `linear-gradient(90deg, ${vars.color.quaternary} 0%, rgba(178,125,86,1) 100%)`,
        boxShadow: `0 0 0 15px #fff`,
      }
    }
  }
])