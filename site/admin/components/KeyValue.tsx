import { EditIcon, MinusCircleIcon } from '@keystone-ui/icons'
import { FieldContainer, FieldLabel, Select, TextInput } from '@keystone-ui/fields'
import { Fragment, useState } from 'react'

import { Button } from '@keystone-ui/button'
import { FieldProps } from '@keystone-6/core/types'
import React from 'react'
import { TranslationWrapper } from './TranslationWrapper'
import { controller } from '@keystone-6/core/fields/types/json/views'

interface IItem {
  label: string
  description: string
}

export const Field = ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => {
  const [labelValue, setLabelValue] = useState('')
  const [description, setDescription] = useState('')
  const [index, setIndex] = useState<number | null>(null)

  return (
    <TranslationWrapper field={field} value={value} onChange={onChange} autoFocus={autoFocus}>
      {(localizedValue, setLocalizedValue) => {
        const items: IItem[] = localizedValue || []

        const onAdd = () => {
          const itemsCopy = [...items, { label: labelValue, description }]
          setLocalizedValue(itemsCopy)
          onCancel()
        }

        const onDelete = (index: number) => {
          const itemsCopy = [...items]
          itemsCopy.splice(index, 1)
          setLocalizedValue(itemsCopy)
          onCancel()
        }

        const onEdit = (index: number) => {
          setIndex(index)
          setLabelValue(items[index].label)
          setDescription(items[index].description)
        }

        const onUpdate = () => {
          if (index !== null) {
            const itemsCopy = [...items]
            itemsCopy[index] = { label: labelValue, description }
            setLocalizedValue(itemsCopy)
            onCancel()
          }
        }

        const onCancel = () => {
          setIndex(null)
          setLabelValue('')
          setDescription('')
        }

        return (
          <>
            {items.map((item: IItem, i: number) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <div>{item.label} - {item.description}</div>
                  <div>
                    <Button
                      size="small"
                      onClick={() => onEdit(i)}
                    >
                      <EditIcon size="small" color="blue" />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => onDelete(i)}>
                      <MinusCircleIcon
                        size="small"
                        color="red"
                      />
                    </Button>
                  </div>
                </div>
              )
            })}
            <Fragment>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <div>
                  <label>Label</label>
                  <TextInput
                    autoFocus={autoFocus}
                    onChange={event => setLabelValue(event.target.value)}
                    value={labelValue}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <TextInput
                    autoFocus={autoFocus}
                    onChange={event => setDescription(event.target.value)}
                    value={description}
                  />
                </div>
                {index !== null ? (
                  <Fragment>
                    <Button onClick={onUpdate}>
                      Update
                    </Button>
                    <Button onClick={onCancel}>
                      Cancel
                    </Button>
                  </Fragment>
                ) : (
                  <Button onClick={onAdd}>
                    Add
                  </Button>
                )}
              </div>
            </Fragment>
          </>
        )
      }}
    </TranslationWrapper>
  )
}
