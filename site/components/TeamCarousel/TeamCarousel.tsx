import Image from 'next/image'
import { MdCall, MdEmail } from 'react-icons/md'
import { Box, Button, Card, CardCarousel, CardMedia, CUSTOM_EVENTS, logEvent, Typography } from "landmarks-ds"
import { IUIComponent } from 'landmarks-ds/utils/types'
import { useTranslation } from 'next-i18next'

import * as styles from './styles.css'

interface IProps extends IUIComponent {
  members: any
  columns: any
}

export function TeamCarousel({ members, ...rest }: IProps) {
  const { t } = useTranslation()

  return (
    <CardCarousel {...rest}>
      {members?.map((member: any) => (
        <Card key={member.title} elevation="medium" position="relative" background="optional_4">
          <CardMedia
            height="300px"
            title={
              <Typography variant="h4" color="white">
                {member.title}
              </Typography>
            }>
            <Image alt={member.title} src={member?.image?.image.url} layout="fill" objectFit="cover" />
          </CardMedia>
          <Box padding="medium">
            <Typography color="onChrome">{member.role}</Typography>
            <Box>
              {member.phone && (
                <Button
                  variant="text"
                  prefix={<MdCall />}
                  href={`tel:${member.phone}`}
                  className={styles.leftCardButton}>
                  <Typography marginLeft={'small'}>{t('call')}</Typography>
                </Button>
              )}
              {member.email && (
                <Button
                  variant="contained"
                  href={`mailto:${member.email}`}
                  prefix={<MdEmail />}
                  className={styles.rightCTAButton}>
                  <Typography marginLeft={'small'}>{t('Email')}</Typography>
                </Button>
              )}
              {member.phone && (
                <Button
                  size="small"
                  title="wadap"
                  variant="text"
                  href={`https://wa.me/${member.phone}`}
                  onClick={() => logEvent(CUSTOM_EVENTS.CHAT_WHATSAPP)}
                  style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Image alt="whatsapp icon" src="/whatsapp.png" width="24" height="24" />
                </Button>
              )}
            </Box>
          </Box>
        </Card>
      ))}
    </CardCarousel>
  )
}