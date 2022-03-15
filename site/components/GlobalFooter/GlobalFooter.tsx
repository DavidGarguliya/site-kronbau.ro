import { Footer, Typography } from "landmarks-ds"
import { IUIComponent } from "landmarks-ds/utils/types"
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

interface IProps extends IUIComponent {
  developer: any
}

export function GlobalFooter({ developer }: IProps) {
  const { t } = useTranslation()

  return (
    <Footer
      logo={
        <Image
          src={developer.logo.image.url}
          alt={`${developer.title} logo`}
          width={developer.logo.image.width / 2}
          height={developer.logo.image.height / 2}
        />
      }
      description={
        <>
          <Typography variant="small">{developer.description}</Typography>
          <br />
          <Typography variant="small">{developer.address}</Typography>
        </>
      }
      copyright={t('copyright', { year: 2021, developer: developer.title })}
      address={developer.address}
      phone={developer.phone}
      email={developer.email}
      projects={[
        {
          title: 'Noua Residence 2',
          href: '/proiect/noua-residence-2'
        },
        {
          title: `- ${t('faq')}`,
          href: '/proiect/noua-residence-2/intrebari-frecvente-faq'
        },
        {
          title: 'Noua Residence',
          href: 'https://nouaresidence.ro'
        }
      ]}
      links={[
        {
          title: t('privacyPolicy'),
          href: '/politica-confidentialitate'
        },
        {
          title: t('cookiePolicy'),
          href: '/politica-utilizare-cookie-uri'
        },
        {
          title: 'ANPC',
          href: 'https://anpc.ro/'
        },
        {
          title: 'Created by Landmarks',
          href: 'https://landmarks.ro/'
        }
      ]}
    />
  )
}