import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

export const listItem = style({
  borderBottom: `1px solid ${vars.color.neutral_1}`,
  textTransform: 'capitalize',
  color: vars.color.link
})
