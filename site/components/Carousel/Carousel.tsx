import { useRef, useCallback, useEffect, useState } from 'react'
import { Children } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import cn from 'classnames'
import { Box } from 'landmarks-ds'
import Autoplay from 'embla-carousel-autoplay'
import EmblaClassNames from 'embla-carousel-class-names'
import * as styles from './styles.css'
import { NextButton, PrevButton } from './CarouselButtons'
import { IUIComponent } from 'landmarks-ds/utils/types'

interface IProps extends IUIComponent {
  children: any
  overlay?: boolean
  navigation?: boolean
  autoplay?: boolean
  fade?: boolean
}

export function Carousel({
  children,
  navigation = true,
  overlay = false,
  autoplay = true,
  fade = false,
}: IProps) {
  const autoplayRef = useRef(
    Autoplay(
      { delay: autoplay ? 4000 : 1000000, stopOnInteraction: true },
      (emblaRoot) => emblaRoot.parentElement
    )
  )
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false }, [autoplayRef.current, EmblaClassNames({selected: styles.selectedSlide})])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    // @ts-ignore
    setScrollSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
  }, [embla, setScrollSnaps, onSelect])

  return (
    <Box position="relative" className={styles.embla}>
      <Box overflow="hidden" innerRef={viewportRef} className={styles.emblaViewport}>
        <Box display="flex" className={cn({
          [styles.emblaFadeContainer]: fade
        })}>
          {Children.map(children, (child) => (
            <Box className={fade ? styles.emblaFadeSlide : styles.slide}>{child}</Box>
          ))}
        </Box>
        {overlay && <div className={styles.overlay} />}
      </Box>
      {navigation && (
        <>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </>
      )}
    </Box>
  )
}
