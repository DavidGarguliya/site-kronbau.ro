import { breakpoints } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

export const sliderImage = style({
  height: '40vh',

  '@media': {
    [breakpoints.xx_laptop]: {
      height: '70vh'
    }
  }
})

export const firstOnMobile = style({
  order: 0,

  '@media': {
    [breakpoints.x_tablet]: {
      order: 2
    }
  }
})