import * as styles from './styles.css'

import { CUSTOM_EVENTS, logEvent } from 'landmarks-ds/utils/gtm'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Atoms } from 'site/styles/sprinkles.css'
import { Box } from 'landmarks-ds/components/Box'
import { Button } from 'landmarks-ds/components/Button'
import { Spinner, Typography } from 'landmarks-ds'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'

interface IProps extends Atoms {
  projectTitle: string
  buildingSlug: string
  unitSlug: string
  withLeadField?: boolean
  className?: string
  classes?: {
    submit?: string
  }
}

type Inputs = {
  nume: string
  email: string
  telefon: string
  mesaj: string
  sursa: string
  acordPolitica: boolean
  acordInformari: boolean
}

export function SubmitLeadForm({
  className,
  projectTitle,
  buildingSlug,
  unitSlug,
  withLeadField = false,
  classes,
  ...rest
}: IProps) {
  const { register, handleSubmit, formState } = useForm<Inputs>()
  const { errors, isSubmitSuccessful, isSubmitting } = formState
  const { t } = useTranslation()

  if (isSubmitSuccessful) {
    return (
      <Box padding="xxlarge">
        <Typography variant="h4">Mulțumim</Typography>
        <Typography>Cererea a fost trimisă. O să vă contactăm în cel mai scurt timp</Typography>
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form, className)}>
      <Box paddingY="small">
        <input
          {...register('nume', {
            required: t('requiredName') as string
          })}
          type="text"
          placeholder={t('name')}
        />
        {errors.nume && (
          <Typography variant="small" color="error">
            {errors.nume.message}
          </Typography>
        )}
      </Box>
      <Box paddingY="small">
        <input
          {...register('telefon', {
            required: t('errorPhone') as string
          })}
          placeholder={t('phone')}
          type="tel"
        />
        {errors.telefon && (
          <Typography variant="small" color="error">
            {errors.telefon.message}
          </Typography>
        )}
      </Box>
      <Box paddingY="small">
        <input
          {...register('email', {
            required: t('requiredMail') as string,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: t('errorMail')
            }
          })}
          placeholder={t('email')}
          type="email"
        />
        {errors.email && (
          <Typography variant="small" color="error">
            {errors.email.message}
          </Typography>
        )}
      </Box>
      {withLeadField && (
        <Box paddingY="small">
          <label htmlFor="sursa">{t('referalQuestion')}</label>
          <select id="sursa" {...register('sursa')}>
            <option value="">-</option>
            <option value="facebook">Facebook</option>
            <option value="google">Google</option>
            <option value="prieten">{t('fromFriends')}</option>
            <option value="banner">{t('fromBanner')}</option>
          </select>
        </Box>
      )}
      <Box paddingY="small">
        {/* <label htmlFor="inputMesaj">Mesaj</label> */}
        <textarea
          // id="inputMesaj"
          style={{ resize: 'none' }}
          {...register('mesaj')}
          placeholder={t('message')}
        />
      </Box>
      <Box paddingY="small">
        <label>
          <input
            type="checkbox"
            {...register('acordPolitica', { required: t('requiredPrivacy') as string })}
          />{' '}
          {t('acknowledge')} {t('privacyPolicy')}
          {errors.acordPolitica && (
            <Typography variant="small" color="error" display="block">
              {errors.acordPolitica.message}
            </Typography>
          )}
        </label>
        <label>
          <input type="checkbox" {...register('acordInformari')} />{' '}
          {t('agreeUpdates', { name: projectTitle })}
        </label>
      </Box>
      <Box paddingY="small">
        {isSubmitting ? (
          <Spinner background="secondary" />
        ) : (
          <Button
            type="submit"
            hue="secondary"
            borderRadius="small"
            disabled={isSubmitting}
            variant="contained"
            className={classes?.submit}>
            {t('send')}
          </Button>
        )}
      </Box>
    </form>
  )

  async function onSubmit(data: Inputs) {
    const finalData = {
      ...data,
      unit: unitSlug && `${projectTitle}/${buildingSlug}/${unitSlug}`,
      day:
        new Date().getDate().toString() +
        '-' +
        (new Date().getMonth() + 1).toString() +
        '-' +
        new Date().getFullYear().toString()
    }
    try {
      const rawResponse = await fetch('/api/save-lead', {
        method: 'POST',
        body: JSON.stringify(finalData)
      })
      const response = await rawResponse.json()

      if (response.error) {
        throw new Error(response.error)
      }

      logEvent(CUSTOM_EVENTS.SUBMIT_LEAD, {
        success: true
      })
    } catch (e) {
      logEvent(CUSTOM_EVENTS.SUBMIT_LEAD, {
        success: false
      })
    }
  }
}
