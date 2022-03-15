import React, { useState } from 'react'
import { FieldProps } from '@keystone-6/core/types'
// import { Button } from '@keystone-ui/button'
import { TextInput } from '@keystone-ui/fields'
import { controller } from '@keystone-6/core/fields/types/json/views'
import { TranslationWrapper } from './TranslationWrapper'


export const Field = ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => {
  return (
    <TranslationWrapper field={field} value={value} onChange={onChange} autoFocus={autoFocus}>
      {(localizedValue, setLocalizedValue) => (
        <TextInput value={localizedValue} type="text" onChange={(e) => setLocalizedValue(e.target.value)} />
      )}
    </TranslationWrapper>
  )
}