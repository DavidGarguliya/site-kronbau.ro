import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { sprinkles } from './sprinkles.css'
import { breakpoints, vars } from './theme.css'

export const hideFrom = recipe({
  variants: {
    tablet: {
      true: {
        '@media': {
          [breakpoints.x_tablet]: {
            display: 'none',
          }
        }
      }
    },
    laptop: {
      true: {
        '@media': {
          [breakpoints.xx_laptop]: {
            display: 'none',
          }
        }
      }
    },
    desktop: {
      true: {
        '@media': {
          [breakpoints.xxx_desktop]: {
            display: 'none',
          }
        }
      }
    }
  }
})

export const hideUntil = recipe({
  variants: {
    tablet: {
      true: {
        display: 'none',
        '@media': {
          [breakpoints.x_tablet]: {
            display: 'block',
          }
        }
      }
    },
    laptop: {
      true: {
        display: 'none',
        '@media': {
          [breakpoints.xx_laptop]: {
            display: 'block',
          }
        }
      }
    },
    desktop: {
      true: {
        display: 'none',
        '@media': {
          [breakpoints.xxx_desktop]: {
            display: 'block',
          }
        }
      }
    }
  }
})

export const activeIndicatorPartialUnderlineRecipe = recipe({
  base: [
    sprinkles({
      position: 'relative',
    }),
    {
      selectors: {
        '&:after': {
          content: '" "',
          position: 'absolute',
          transition: 'all 0.3s',
          bottom: 0,
          left: 0,
          // neutral 3 works on both light and dark
          borderBottom: `3px solid ${vars.color.neutral_3}`
        }
      }
    }
  ],
  variants: {
    active: {
      true: {
        selectors: {
          '&:after': {
            borderBottomColor: vars.color.primary
          }
        }
      },
      false: {
        selectors: {
          '&:after': {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          '&:hover:after': {
            opacity: 1,
            transform: 'translateY(0px)'
          }
        }
      }
    },
    size: {
      small: {
        selectors: {
          '&:after': {
            width: '25px',
          }
        }
      },
      medium: {
        selectors: {
          '&:after': {
            width: '50px',
          }
        }
      }
    }
  },
  defaultVariants: {
    active: false,
    size: 'small'
  }
})

export const activeIndicatorFullUnderlineRecipe = recipe({
  base: [
    sprinkles({
      position: 'relative',
    }),
    {
      selectors: {
        '&:after': {
          content: '" "',
          position: 'absolute',
          transition: 'all 0.3s',
          bottom: 0,
          left: 0,
          right: 0,
          borderBottom: `2px solid ${vars.color.neutral_3}`
        }
      }
    }
  ],
  variants: {
    active: {
      true: {
        selectors: {
          '&:after': {
            borderBottomColor: vars.color.primary
          }
        }
      },
      false: {
        selectors: {
          '&:after': {
            opacity: 0,
            transform: 'scaleX(0.4)'
          },
          '&:hover:after': {
            opacity: 1,
            transform: 'scaleX(1)'
          }
        }
      }
    }
  }
})