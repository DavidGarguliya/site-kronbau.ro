import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

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