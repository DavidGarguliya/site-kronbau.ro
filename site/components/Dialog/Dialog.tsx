import * as DialogRadix from '@radix-ui/react-dialog'
import { Box, Button } from 'landmarks-ds'
import { IUIComponent } from 'landmarks-ds/utils/types'
import { MdClose } from 'react-icons/md'

interface IProps extends IUIComponent {
  children: any
  cta: any
}

import * as styles from './styles.css'

export function Dialog({ children, cta }: IProps) {
  return (
  <DialogRadix.Root>
    <DialogRadix.Trigger asChild>
      {cta}
    </DialogRadix.Trigger>
    <DialogRadix.Portal>
      <DialogRadix.Overlay />
      <DialogRadix.Content className={styles.dialog}>
        {children}
        <DialogRadix.Close className={styles.closeBtn} asChild>
          <Box component={MdClose} fontSize="2x" />
        </DialogRadix.Close>
      </DialogRadix.Content>
    </DialogRadix.Portal>
  </DialogRadix.Root>
)
}