import { style } from '@vanilla-extract/css'
import { sprinkles } from '@styles/sprinkles.css'

export const customTitle = style([
  sprinkles({
    background: 'secondary',
    color: 'white',
  })
])

export const customList = style([
  sprinkles({
    background: 'secondary_4',
  })
])

export const customListItem = style([
  sprinkles({
    color: 'secondary_1',
  })
])