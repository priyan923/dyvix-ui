import { Modal } from 'dyvix-ui';
import Wrapper from '../Wrapper';
import React from 'react';
import {
  DYVIX_GLOBAL_THEME,
  DYVIX_GLOBAL_ANIMATION,
  DYVIX_MODAL_TYPE,
  DYVIX_MODAL_VALIDATION_PRESET,
  DYVIX_MODAL_ELEMENT
} from 'dyvix-ui';

export default function ModalPlayground() {
  const [config, setConfig] = React.useState([
    {
      utility: 'theme',
      type: 'select',
      options: DYVIX_GLOBAL_THEME,
      current: DYVIX_GLOBAL_THEME.OCEAN,
      format: 'string',
      allowNull: false
    },
    {
      utility: 'animation',
      type: 'select',
      options: DYVIX_GLOBAL_ANIMATION,
      current: DYVIX_GLOBAL_ANIMATION.BUBBLE,
      format: 'string',
      allowNull: false
    },
    {
      utility: 'title',
      type: 'text',
      current: 'Register',
      format: 'string'
    },
    {
      utility: 'type',
      type: 'select',
      options: DYVIX_MODAL_TYPE,
      current: DYVIX_MODAL_TYPE.AUTH,
      format: 'string',
      allowNull: false
    },
    {
      utility: 'elements',
      type: 'config',
      'config-title': 'Edit config',
      'config-rules': [
        {
          rule: 'amount',
          formats: ['number'],
          max_val: 3,
          required: true,
          amount_field: true
        },
        {
          rule: 'name',
          formats: ['string', 'multiple', 'unique'],
          max_length: 3,
          required: true
        },
        {
          rule: 'type',
          formats: ['string'],
          options: DYVIX_MODAL_ELEMENT,
          required: true
        },
        {
          rule: 'placeholder',
          formats: ['string', 'multiple', 'unique'],
          max_length: 3
        },
        {
          rule: 'id',
          formats: ['string', 'multiple', 'unique'],
          max_length: 3
        },
        {
          rule: 'validation',
          formats: ['string', 'multiple'],
          max_length: 3,
          options: DYVIX_MODAL_VALIDATION_PRESET
        },
        { rule: 'match', formats: ['string', 'multiple'] }
      ],
      current: [
        {
          type: 'text',
          placeholder: ['First Name', 'Last Name'],
          id: 'name',
          name: ['firstName', 'lastName'],
          className: 'ex-text',
          amount: 2
        },
        {
          type: 'text',
          placeholder: ['First Namex', 'Last Namex'],
          id: 'names',
          name: ['firstNamez', 'lastNamez'],
          className: 'ex-text2',
          amount: 2
        }
      ],
      format: 'object'
    }
  ]);

  const theme = config.find((e) => e['utility'] === 'theme').current;
  const animation = config.find((e) => e['utility'] === 'animation').current;
  const title = config.find((e) => e['utility'] === 'title').current;
  const type = config.find((e) => e['utility'] === 'type').current;
  const elements = config.find((e) => e['utility'] === 'elements').current;
  const probs = {
    ...(theme && { theme: theme }),
    ...(animation && { animation: animation }),
    ...(title && { title: title }),
    ...(type && { type: type }),
    ...(elements && { elements: elements })
  };
  return (
    <Wrapper
      componentConfig={config}
      componentCallback={setConfig}
      tag={'Modal'}
    >
      <Modal onClick={() => console.log('clicked')} {...probs}></Modal>
    </Wrapper>
  );
}
