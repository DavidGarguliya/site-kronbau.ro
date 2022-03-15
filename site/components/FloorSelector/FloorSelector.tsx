import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import { Box, Pill, SubMenu, ListItem } from "landmarks-ds"

import * as styles from './styles.css'

interface IProps {
  selectedFloor: any
  floors: any[]
}

export function FloorSelector({ selectedFloor, floors }: IProps) {
  const { t } = useTranslation()
  const selectedIndex = floors.findIndex((floor) => floor.slug === selectedFloor.slug)
  const hasNext = selectedIndex < floors.length - 1
  const hasPrev = selectedIndex > 0
  const nextButton = (
    <Link href={hasNext ? floors[selectedIndex + 1].url : selectedFloor.url}>
      <Box
        component="a"
        name={floors[selectedIndex + 1]?.title}
        paddingRight="medium"
        display="flex"
        alignItems="center"
        color="white"
        style={{ opacity: hasNext ? 1 : 0.3 }}>
        <Box
          component={BsArrowRight}
          fontSize="5x" />
      </Box>
    </Link>
  )
  const prevButton = (
    <Link href={hasPrev ? floors[selectedIndex - 1].url : selectedFloor.url} passHref>
      <Box
        component="a"
        name={floors[selectedIndex - 1]?.title}
        paddingLeft="medium"
        display="flex"
        alignItems="center"
        color="white"
        style={{ opacity: hasPrev ? 1 : 0.3 }}>
        <Box
          component={BsArrowLeft}
          fontSize="5x" />
      </Box>
    </Link>
  )

  return (
    <SubMenu
      title={selectedFloor.building.title}
      subtitle={selectedFloor.titleTranslated}
      actionLeft={prevButton}
      actionRight={nextButton}
      classes={{
        title: styles.customTitle,
        list: styles.customList,
      }}>
      {floors.map((floor, i) => {
        const selectedItem = i === selectedIndex
        const extra = selectedItem
          ? <Box component={BsArrowRight} fontSize="2x" />
          : <Pill>{`${floor.availableUnitsCount} Ap.`}</Pill>

        return (
          <ListItem
            key={floor.title}
            selected={selectedItem}
            title={floor.titleTranslated}
            url={floor.url}
            extra={extra}
            className={styles.customListItem} />
        )
      })}
    </SubMenu>
  )
}