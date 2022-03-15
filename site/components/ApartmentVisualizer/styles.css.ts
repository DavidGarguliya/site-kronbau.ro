import { style } from '@vanilla-extract/css'
import { vars } from '@styles/theme.css'

export const Heading = style({
  fontFamily: vars.font.heading
})

export const fluidGrid = style({
  gap: vars.spacing.large,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0,1fr))'
})

export const fluidFlex = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.spacing.large
})

export const moveImage = style({
  marginRight: '8vw'
})

export const apartmentsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.medium,
  alignItems: 'flex-start'
})
