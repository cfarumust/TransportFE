import { FormlyFieldConfig } from '@ngx-formly/core';

export const forgetPasswordConfig: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        required: true,
      }
    }
  ];
