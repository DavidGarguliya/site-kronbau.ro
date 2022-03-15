import { ReactElement } from 'react'
import cn from 'classnames'
import { Box } from "landmarks-ds"
import { IUIComponent } from "landmarks-ds/utils/types"
import * as styles from './styles.css'

interface IProps extends IUIComponent {
  // decorator: ReactElement
}

export function Divider({ className, ...rest }: IProps) {
  return (
    <Box
      className={cn(styles.divider, className)}
      {...rest}  />
  )
}