import {
  ConditionalValue,
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
  defineProperties
} from '@vanilla-extract/sprinkles'
import { rawBreakpoints, vars } from './theme.css'

import { calc } from '@vanilla-extract/css-utils'
import mapValues from 'lodash/mapValues'

const space = vars.spacing
export type Space = keyof typeof space

const negativeSpace = {
  ['-xsmall']: `${calc(space.xsmall).negate()}`,
  ['-small']: `${calc(space.small).negate()}`,
  ['-medium']: `${calc(space.medium).negate()}`,
  ['-large']: `${calc(space.large).negate()}`,
  ['-xlarge']: `${calc(space.xlarge).negate()}`,
  ['-xxlarge']: `${calc(space.xxlarge).negate()}`,
  ['-xxxlarge']: `${calc(space.xxxlarge).negate()}`
}

const margins = {
  ...space,
  ...negativeSpace
}

const responsiveProperties = defineProperties({
  conditions: mapValues(rawBreakpoints, (bp) =>
    bp === 0 ? {} : { '@media': `screen and (min-width: ${bp}em)` }
  ),
  defaultCondition: 'mobile',
  properties: {
    position: ['absolute', 'relative', 'fixed', 'sticky'],
    display: ['none', 'block', 'inline', 'inline-block', 'flex', 'grid'],
    alignItems: ['flex-start', 'center', 'flex-end'],
    justifyContent: [
      'flex-start',
      'center',
      'flex-end',
      'space-between',
      'space-around'
    ],
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: margins,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    pointerEvents: ['none', 'auto'],
    overflow: ['hidden', 'visible'],
    opacity: ['0', '0.3', '0.7', '1'],
    order: [0, 1, 2, 3, 4],
    textAlign: ['left', 'center'],
    fontSize: vars.fontSize,
    fontWeight: ['regular', 'bold'],
    lineHeight: vars.lineHeight,
    fontFamily: vars.font,
    textTransform: ['none', 'lowercase', 'uppercase', 'capitalize']
    // maxWidth: vars.contentWidth,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom']
  }
})

export const mapResponsiveValue = createMapValueFn(responsiveProperties)
export const normalizeResponsiveValue =
  createNormalizeValueFn(responsiveProperties)

export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveProperties,
  Value
>

export const lightMode = 'light'
export const darkMode = 'dark'

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { selector: `.${darkMode} &` }
  },
  defaultCondition: 'lightMode',
  properties: {
    background: vars.color,
    color: vars.color
  }
})

const unresponsiveProperties = defineProperties({
  properties: {
    flexWrap: ['wrap', 'nowrap'],
    top: [0],
    bottom: [0],
    left: [0],
    right: [0],
    flexShrink: [0],
    flexGrow: [0, 1],
    zIndex: [-1, 0, 1, 2, 3],
    width: { full: '100%' },
    borderTopLeftRadius: vars.border.radius,
    borderTopRightRadius: vars.border.radius,
    borderBottomRightRadius: vars.border.radius,
    borderBottomLeftRadius: vars.border.radius,
    boxShadow: vars.shadows,
    userSelect: ['none'],
    cursor: ['pointer']
  },
  shorthands: {
    borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
  }
})

export const sprinkles = createSprinkles(
  responsiveProperties,
  unresponsiveProperties,
  colorProperties
)

export type Atoms = Parameters<typeof sprinkles>[0]
