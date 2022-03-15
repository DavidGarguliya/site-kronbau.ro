import React, { useState, ReactNode } from 'react'
import { FieldProps } from '@keystone-6/core/types'
// import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/json/views'
import { Tabs, Tab, Box, Typography } from '@material-ui/core'

import { LANGUAGES } from '../constants'

interface ITranslations {
  [lang: string]: string
}

interface IProps extends FieldProps<typeof controller> {
  children: (
    localizedValue: any,
    newVal: (newVal: any) => void
  ) => ReactNode
}

export const TranslationWrapper = ({ field, value: jsonValue, onChange, autoFocus, children }: IProps) => {
  const initialTranslations: ITranslations = jsonValue ? JSON.parse(jsonValue) : LANGUAGES.reduce((acc, cur) => ({
    ...acc,
    [cur]: ''
  }), {})
  const [translations, setTranslations] = useState(initialTranslations)
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
        {Object.keys(translations).map(lang => (
          <Tab label={lang} />
        ))}
      </Tabs>
      {Object.keys(translations).map((lang, i) => (
        <TabPanel value={selectedTab} index={i}>
          {children(translations[lang], (newVal: any) => updateTranslations(lang, newVal))}
        </TabPanel>
      ))}
    </FieldContainer>
  )

  function updateTranslations(lang: string, value: string) {
    const updated = { ...translations, [lang]: value }
    setTranslations(updated)

    if (onChange) {
      onChange(JSON.stringify(updated))
    }
  }
}

interface ITabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}