// @ts-nocheck

import * as colorsJSON from './colorbox.json'
import { generate } from '../utils/coloralgorithm/src'

interface IHue {
  inverted: boolean
  colors: any[],
  name: string
}

export const colorboxPalette: any = colorsJSON.map((color) =>
  generate(color.properties, color.options)
).reduce((acc, curr) => {
  const value: IHue = curr[0]
  const shade = value.colors.reduce((acx, curx) => {
    return {
      ...acx,
      [`${value.name.toLowerCase()}_${curx.step}`]: curx.hex,
    }
  }, {})

  return {
    ...acc,
    ...shade,
  }
}, {})

export const colorboxForXD = Object.keys(colorboxPalette).reduce((acc, curr) => {
  const value = colorboxPalette[curr]
  return `${acc} $${curr}: ${value};\n`
}, ``)

// get the colors from the console and paste them in the theme