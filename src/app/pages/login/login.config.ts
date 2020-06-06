import { FormlyFieldConfig } from '@ngx-formly/core';

export const loginConfig: FormlyFieldConfig[] = [
    {
      key: 'USERNAME',
      type: 'input',
      templateOptions: {
        label: 'Username',
        required: true,
      }
    },
    {
      key: 'PASSWORD',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        required: true,
        minLength: 3,
      },
    }
  ];
