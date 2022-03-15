import React from 'react';
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { FieldContainer, FieldLabel, TextInput, Select } from '@keystone-ui/fields';
import { MinusCircleIcon, EditIcon } from '@keystone-ui/icons';
import { controller } from '@keystone-6/core/fields/types/json/views';
import { Fragment, useState } from 'react';

interface RelatedLink {
  label: string;
  size: string;
}

const availableOptions = [
  'Living',
  'Dormitor',
  'Dormitor 1',
  'Dormitor 2',
  'Bucătărie',
  'Depozitare',
  'Baie',
  'Baie 1',
  'Baie 2',
  'Dressing',
  'Hol',

  'Logie',
  'Balcon',
  'Balcon 1',
  'Balcon 2',
  'Terasă',
  'Terasă 1',
  'Terasă 2',
]

export const Field = ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => {
  const [labelValue, setLabelValue] = useState('');
  const [sizeValue, setSizeValue] = useState('');
  const [index, setIndex] = useState<number | null>(null);

  const relatedLinks: RelatedLink[] = value ? JSON.parse(value) : [];

  const onSubmitNewRelatedLink = () => {
    if (onChange) {
      const relatedLinksCopy = [...relatedLinks, { label: labelValue, size: sizeValue }];
      onChange(JSON.stringify(relatedLinksCopy));
      onCancelRelatedLink();
    }
  };

  const onDeleteRelatedLink = (index: number) => {
    if (onChange) {
      const relatedLinksCopy = [...relatedLinks];
      relatedLinksCopy.splice(index, 1);
      onChange(JSON.stringify(relatedLinksCopy));
      onCancelRelatedLink();
    }
  };

  const onEditRelatedLink = (index: number) => {
    if (onChange) {
      setIndex(index);
      setLabelValue(relatedLinks[index].label);
      setSizeValue(relatedLinks[index].size);
    }
  };

  const onUpdateRelatedLink = () => {
    if (onChange && index !== null) {
      const relatedLinksCopy = [...relatedLinks];
      relatedLinksCopy[index] = { label: labelValue, size: sizeValue };
      onChange(JSON.stringify(relatedLinksCopy));
      onCancelRelatedLink();
    }
  };

  const onCancelRelatedLink = () => {
    setIndex(null);
    setLabelValue('');
    setSizeValue('');
  };

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {relatedLinks.map((relatedLink: RelatedLink, i: number) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <div>{relatedLink.label} - {relatedLink.size}m<sup>2</sup></div>
            {onChange && (
              <div>
                <Button
                  size="small"
                  onClick={() => onEditRelatedLink(i)}
                >
                  <EditIcon size="small" color="blue" />
                </Button>
                <Button size="small">
                  <MinusCircleIcon
                    size="small"
                    color="red"
                    onClick={() => onDeleteRelatedLink(i)}
                  />
                </Button>
              </div>
            )}
          </div>
        );
      })}
      {onChange && (
        <Fragment>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div>
              <label>Label</label>
              <Select
                value={{
                  label: labelValue,
                  value: labelValue,
                }}
                options={availableOptions.map(v => ({
                  label: v,
                  value: v,
                }))}
                onChange={newValue => newValue && setLabelValue(newValue.value)} />

              <TextInput
                autoFocus={autoFocus}
                onChange={event => setLabelValue(event.target.value)}
                value={labelValue}
              />
            </div>
            <div>
              <label>Size</label>
              <TextInput
                autoFocus={autoFocus}
                onChange={event => setSizeValue(event.target.value)}
                value={sizeValue}
              />
            </div>
            {index !== null ? (
              <Fragment>
                <Button onClick={onUpdateRelatedLink}>
                  Update
                </Button>
                <Button onClick={onCancelRelatedLink}>
                  Cancel
                </Button>
              </Fragment>
            ) : (
              <Button onClick={onSubmitNewRelatedLink}>
                Add
              </Button>
            )}
          </div>
        </Fragment>
      )}
    </FieldContainer>
  );
};
