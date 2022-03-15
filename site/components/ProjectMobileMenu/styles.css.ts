import { style } from "@vanilla-extract/css"
import { sprinkles } from "@styles/sprinkles.css"
import { vars } from "@styles/theme.css"

export const menu = style([
  sprinkles({
    background: 'chrome',
    color: 'white',
  })
])

export const mainButton = style([
  {
    borderRadius: vars.border.radius.small,
    background: vars.color.optional_3,
    color: vars.color.white,
    minWidth: '125px',
    justifyContent: 'flex-start',
  }
])

export const mainButtonActive = style([
  {
    background: vars.color.optional_5,
    boxShadow: `inset 0 0 0 2px rgba(255,255,255, .2)`,
  }
])

export const content = style([
  {
    background: vars.color.chrome,
  }
])

export const otherButtons = style([
  {
    background: 'transparent',
    color: 'rgba(255,255,255, 0.8)',
    marginRight: 0,
    paddingLeft: vars.spacing.small,
    paddingRight: vars.spacing.small,

    selectors: {
      '&:first-child:after': {
        content: '" "',
        height: '20px',
        paddingLeft: vars.spacing.large,
        borderRight: '1px solid rgba(255,255,255, 0.3)'
      }
    }
  }
])

export const twoUp = style([
  sprinkles({
    display: 'grid',
  }),
  {
    gap: vars.spacing.large,
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
  }
])

export const alignBottom = sprinkles({
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
})