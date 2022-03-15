import { colorboxForXD, colorboxPalette } from '../workflow'

import { createGlobalTheme } from '@vanilla-extract/css'
import { modularScale } from 'polished'

console.log('Paste these in theme.css.ts => baseColors \n', colorboxPalette)
console.log('Paste these in Adobe XD Get Color plugin \n', colorboxForXD)

const ratioNames = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth: 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4
}

const unit = 4
const px = (value: string | number) => `${value}px`
const createScale =
  (ratio: keyof typeof ratioNames | number, base: number) => (steps: number) =>
    `${modularScale(steps, base, ratio)}px`

const fontScale = createScale('majorThird', 16)
const lineHeightScale = createScale('majorThird', 20)

const baseColors = {
  neutral_0: '#f9fcff',
  neutral_1: '#ecf0f3',
  neutral_2: '#c8ccd0',
  neutral_3: '#8e9296',
  neutral_4: '#595b5f',
  neutral_5: '#3a3c3f',
  neutral_6: '#2f3033',
  primary_0: '#dcffcc',
  primary_1: '#b3fc92',
  primary_2: '#77e146',
  primary_3: '#38b000',
  primary_4: '#2b700a',
  primary_5: '#224710',
  primary_6: '#1e3314',
  secondary_0: '#d9f0ff',
  secondary_1: '#a9e2ff',
  secondary_2: '#5ebcf9',
  secondary_3: '#0e86d4',
  secondary_4: '#125988',
  secondary_5: '#143a53',
  secondary_6: '#142733',
  optional_0: '#f2fff9',
  optional_1: '#e3f7ee',
  optional_2: '#b8d8c9',
  optional_3: '#7ba290',
  optional_4: '#4a6f5e',
  optional_5: '#2e473b',
  optional_6: '#22332b'
}

const fixedColors = {
  transparent: 'transparent',
  white: '#fff',
  white_alpha_08: 'rgba(255,255,255, .8)',
  white_alpha_06: 'rgba(255,255,255, .6)',
  white_alpha_04: 'rgba(255,255,255, .4)',
  white_alpha_02: 'rgba(255,255,255, .2)',
  black: '#000',
  black_alpha_08: 'rgba(0,0,0, .8)',
  black_alpha_06: 'rgba(0,0,0, .6)',
  black_alpha_04: 'rgba(0,0,0, .4)',
  black_alpha_02: 'rgba(0,0,0, .2)'
}

export const vars = createGlobalTheme(':root', {
  color: {
    ...baseColors,
    ...fixedColors,

    // defaults
    primary: baseColors.primary_3,
    secondary: baseColors.secondary_3,
    optional: baseColors.optional_3,
    chrome: baseColors.optional_4, // also applies to body
    page: fixedColors.white,
    surfaceFaded: baseColors.neutral_1,
    surfaceRegular: baseColors.neutral_2,
    surfaceContrast: baseColors.neutral_6,

    // text color
    onPrimary: fixedColors.white,
    onSecondary: fixedColors.white,
    onOptional: baseColors.optional_0,
    onChrome: baseColors.optional_0,
    onPage: baseColors.neutral_6,
    onSurfaceFaded: baseColors.neutral_5,
    onSurfaceRegular: baseColors.neutral_6,
    onSurfaceContrast: baseColors.neutral_2,
    onDark: baseColors.neutral_2,
    onLight: baseColors.neutral_4,

    error: '#D53B58',
    link: baseColors.primary_4,

    // deprecated below. Can be removed only after cleanup of DS
    body: '#383838',
    light: '#eee',
    brand: '#B9ABA1',
    tertiary: '#6DA46F',
    quaternary: '#CFAD6F',
    alternative: '#2E3948',

    brandLight: '#7C6455',
    disabled: '#989CA8'
  },
  font: {
    body: 'jaf-facitweb, sans-serif',
    heading: 'karmina, sans-serif'
  },
  fontSize: {
    '-2x': fontScale(-2),
    '-1x': fontScale(-1),
    '1x': fontScale(0),
    '2x': fontScale(1),
    '3x': fontScale(2),
    '4x': fontScale(3),
    '5x': fontScale(4),
    '6x': fontScale(5),
    '7x': fontScale(6),
    '8x': fontScale(7),
    '9x': fontScale(8),
    '10x': fontScale(9)
  },
  lineHeight: {
    '-2x': lineHeightScale(-2),
    '-1x': lineHeightScale(-1),
    '1x': lineHeightScale(0),
    '2x': lineHeightScale(1),
    '3x': lineHeightScale(2),
    '4x': lineHeightScale(3),
    '5x': lineHeightScale(4),
    '6x': lineHeightScale(5),
    '7x': lineHeightScale(6),
    '8x': lineHeightScale(7),
    '9x': lineHeightScale(8),
    '10x': lineHeightScale(9)
  },
  unit: px(unit),
  spacing: {
    none: '0',
    xsmall: px(1 * unit),
    small: px(2 * unit),
    medium: px(3 * unit),
    large: px(5 * unit),
    xlarge: px(8 * unit),
    xxlarge: px(12 * unit),
    xxxlarge: px(24 * unit)
  },
  // gradients generated from:
  // https://shadows.brumm.af
  shadows: {
    small: '0px 0px 0.1px rgba(0, 0, 0, 0.039), 0px 0px 0.3px rgba(0, 0, 0, 0.049), 0px 0px 0.5px rgba(0, 0, 0, 0.054), 0px 0px 0.9px rgba(0, 0, 0, 0.059), 0px 0px 1.7px rgba(0, 0, 0, 0.068), 0px 0px 4px rgba(0, 0, 0, 0.1)',
    medium: '0px 0.4px 0.3px rgba(0, 0, 0, 0.039), 0px 0.8px 0.7px rgba(0, 0, 0, 0.049), 0px 1.3px 1.3px rgba(0, 0, 0, 0.054), 0px 2.2px 2.2px rgba(0, 0, 0, 0.059), 0px 3.7px 4.2px rgba(0, 0, 0, 0.068), 0px 8px 10px rgba(0, 0, 0, 0.1)',
    large: '0px 1.3px 0.8px rgba(0, 0, 0, 0.039), 0px 2.9px 2px rgba(0, 0, 0, 0.049), 0px 5px 3.8px rgba(0, 0, 0, 0.054), 0px 8.1px 6.7px rgba(0, 0, 0, 0.059), 0px 13.8px 12.5px rgba(0, 0, 0, 0.068), 0px 30px 30px rgba(0, 0, 0, 0.1)'
  },
  border: {
    width: {
      standard: px(1 * unit),
      large: px(2 * unit)
    },
    radius: {
      small: px(1 * unit),
      medium: px(2 * unit),
      large: px(4 * unit),
      full: '9999px'
    }
  }
})

export const overwrites = {
  MENU_HEIGHT: 66,
  LOGO_HEIGHT: 100,
  MAX_WIDTH: 1440
}

// TODO: remove tablet breakpoint (will decrease sprinkles.css size)
export const rawBreakpoints = {
  mobile: 0,
  laptop: 62,
  desktop: 90
}

export const breakpoints = {
  x_tablet: 'screen and (min-width: 42em)',
  xx_laptop: 'screen and (min-width: 62em)',
  xxx_desktop: 'screen and (min-width: 1440px)'
}
