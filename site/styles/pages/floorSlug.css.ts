import { vars } from '@styles/theme.css'
import { style, globalStyle } from '@vanilla-extract/css'

export const myUnit = style({
})

// Background
globalStyle(`${myUnit} .cls-1`, {
  transition: 'all 0.3s',
  opacity: 0.8,
})

// Title
globalStyle(`${myUnit} .cls-2`, {
  transition: 'all 0.3s',
  opacity: 1,
  fontSize: vars.fontSize['3x'],
  fontWeight: 'bold',
})

// Subtitle
globalStyle(`${myUnit} .cls-3`, {
  fontSize: vars.fontSize['-1x'],
})


export const availableUnit = style({
})

globalStyle(`${availableUnit} .cls-1`, {
  fill: vars.color.optional_3,
})

globalStyle(`${availableUnit} .cls-2`, {
  fill: vars.color.white,
})


globalStyle(`${availableUnit}:hover .cls-1`, {
  opacity: 1
})


export const unavailableUnit = style({
})

globalStyle(`${unavailableUnit} .cls-1`, {
  fill: vars.color.surfaceRegular,
})

globalStyle(`${availableUnit}:hover text`, {
  opacity: 1,
})

globalStyle(`${availableUnit}:hover text`, {
  opacity: 1,
})