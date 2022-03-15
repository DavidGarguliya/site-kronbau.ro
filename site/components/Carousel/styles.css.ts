import { sprinkles } from '@styles/sprinkles.css'
import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

export const embla = style({

})

export const emblaViewport = style({

})

export const slide = style({
  position: 'relative',
  flex: '0 0 100%'
})

export const emblaFadeContainer = style({
  transform: 'none!important'
})

export const emblaFadeSlide = style({
  flex: '0 0 auto',
  width: '100%',
  height: '100%',
  top: 0,
  left: '0!important',
  right: '0!important',
  opacity: 0,
  transition: 'opacity 0.5s',
})

export const selectedSlide = style({
  opacity: 1,
})

export const emblaButton = style([
  sprinkles({
    position: 'absolute',
    cursor: 'pointer',
    background: 'transparent'
  }),
  {
    outline: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  }
])

export const overlay = style([
  sprinkles({
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    background: 'black_alpha_02',
  })
])

export const leftButton = style({
  left: vars.spacing.large
})

export const rightButton = style({
  right: vars.spacing.large
})