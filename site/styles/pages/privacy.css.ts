import { sprinkles } from '@styles/sprinkles.css'
import { vars } from '@styles/theme.css'
import { style } from '@vanilla-extract/css'

export const stickyImage = style([
  sprinkles({
    position: { laptop: 'sticky' },
    marginBottom: 'xxlarge'
  }),
  {
    top: '119px',
    alignSelf: 'flex-start'
  }
])