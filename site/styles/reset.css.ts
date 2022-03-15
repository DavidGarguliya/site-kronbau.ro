import { globalStyle } from "@vanilla-extract/css"
import { margin } from "polished"
import { breakpoints, vars } from "./theme.css"

// https://www.joshwcomeau.com/css/custom-css-reset/

/*
  1. Use a more-intuitive box-sizing model.
*/
globalStyle(`*, *::before, *::after`, {
  boxSizing: 'border-box'
})
/*
  2. Remove default margin
*/
globalStyle(`*`, {
  margin: 0
})

globalStyle('.mapboxgl-ctrl-bottom-left', {
  display: 'none',
})
/*
  3. Allow percentage-based heights in the application
*/
globalStyle(`html, body`, {
  height: '100%',
  lineHeight: vars.lineHeight["3x"],
  fontFamily: vars.font.body,
  background: vars.color.chrome,
  scrollBehavior: 'smooth',
})

globalStyle('button', {
  appearance: 'none',
  background: 'none',
  border: 'none',
  margin: 0,
  padding: 0
})

/*
  6. Improve media defaults
*/
globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
})
/*
  7. Remove built-in form typography styles
*/
globalStyle('input, button, textarea, select', {
  font: 'inherit'
})
/*
  8. Avoid text overflows
*/
globalStyle('p, h1, h2, h3, h4, h5, h6', {
  overflowWrap: 'break-word'
})
/*
  9. Create a root stacking context
*/
globalStyle('#root, #__next', {
  isolation: 'isolate'
})

// globalStyle('html, body', {
//   padding: 0,
//   margin: 0,
//   color: vars.color.body,
//   fontSize: '16px',
//   fontFamily: vars.font.body,
//   lineHeight: vars.lineHeight,
//   background: vars.color.chrome,
// })

// globalStyle('h1, h2, h3, h4, h5, h6', {
//   padding: 0,
//   margin: 0,
//   lineHeight: '100%',
//   fontFamily: vars.font.heading,
// })

// globalStyle('small', {
//   fontSize: vars.fontSize["-1x"],
// })

// // fill weird chrome bug where some units have black background (fill)
// globalStyle('a', {
//   fill: 'inherit',
//   color: vars.color.body,
// })

// globalStyle('img, video', {
//   maxWidth: '100%',
//   display: 'block'
// })

// globalStyle('button', {
//   padding: 0,
//   margin: 0,
//   border: 'none',
//   background: 'transparent',
//   cursor: 'pointer',
// })

// globalStyle('*', {
//   boxSizing: 'border-box'
// })

// export const base = style({
//   margin: 0,
//   padding: 0,
//   border: 0,
//   minWidth: 0,
//   boxSizing: 'border-box',
//   fontSize: '100%',
//   font: 'inherit',
//   verticalAlign: 'baseline',
// });

globalStyle('.CookieConsent', {
  position: 'fixed',
  zIndex: 40,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: vars.color.chrome,
  color: vars.color.onChrome,
  padding: vars.spacing.large,

  '@media': {
    [breakpoints.xx_laptop]: {
      left: 'auto',
      boxShadow: vars.shadows.large,
      right: vars.spacing.large,
      bottom: `${vars.spacing.large}!important`,
      width: '350px',
      backgroundColor: vars.color.surfaceContrast,
      color: vars.color.onSurfaceContrast,
    }
  }
})

globalStyle('.CookieConsent button', {
  padding: '10px',
  fontSize: '16px',
  color: vars.color.white,
  border: 'none',
  borderRadius: vars.border.radius.small,
  backgroundColor: 'transparent',
  marginRight: '10px',
  cursor: 'pointer',
  paddingLeft: vars.spacing.large,
  paddingRight: vars.spacing.large,
})

globalStyle('.CookieConsent #rcc-confirm-button', {
  backgroundColor: vars.color.secondary,
  float: 'left',
})