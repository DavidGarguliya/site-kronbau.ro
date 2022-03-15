import { Box, ListItem } from "landmarks-ds";
import { IUIComponent } from "landmarks-ds/utils/types"
import { useTranslation } from 'next-i18next'
import { FiExternalLink } from 'react-icons/fi'

import * as styles from './styles.css'

interface IProps extends IUIComponent {
  projects: any[]
}

export function InfoMenu({ projects, className, ...rest }: IProps) {
  const { t } = useTranslation()

  return (
    <Box marginY="large" className={className} {...rest}>
      <ListItem
        title={t('privacyPolicy')}
        url="/politica-confidentialitate"
        className={styles.listItem}
      />
      <ListItem
        title={t('cookiePolicy')}
        url="/politica-utilizare-cookie-uri"
        className={styles.listItem}
      />
      {renderFaqLinks()}
      <ListItem
        title="ANPC"
        url="https://anpc.ro/"
        className={styles.listItem}
        extra={<Box component={FiExternalLink} fontSize="1x" />}
      />
    </Box>
  )

  function renderFaqLinks() {
    const multipleFaqs = projects.length > 1 && projects.filter(project => project.faqs.length).length > 1
    const [singleProject] = projects

    if (multipleFaqs) {
      return (
        <Box>
          {projects.map((project) => (
            <ListItem
              key={project.slug}
              title={`${t('faq')} - ${project.title}`}
              url={`/proiect/${project.slug}/intrebari-frecvente-faq`}
              className={styles.listItem}
            />
          ))}
        </Box>
      )
    }

    return (
      <ListItem
        key={singleProject.slug}
        title={`${t('faq')} - ${singleProject.title}`}
        url={`/proiect/${singleProject.slug}/intrebari-frecvente-faq`}
        className={styles.listItem}
      />
    )
  }
}