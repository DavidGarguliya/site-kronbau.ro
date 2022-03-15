import Link from 'next/link'
import Image from 'next/image'
import { IUIComponent } from 'landmarks-ds/utils/types'
import { Box } from 'landmarks-ds'

interface IProps extends IUIComponent {
  className?: string
}

export function Landmarks({ className, ...rest }: IProps) {
  return (
    <Link href="https://landmarks.ro/">
      <Box component="a" target="_blank" className={className} {...rest}>
        <Image
          src="/credits-landmarks.png"
          width={97}
          height={29}
          alt="created by landmarks.ro"
          title="created by landmarks.ro" />
      </Box>
    </Link>
  )
}