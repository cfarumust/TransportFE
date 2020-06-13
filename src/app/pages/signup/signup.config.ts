import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';

export const signupConfig: FormlyFieldConfig[] = [
    {
        key: 'SNAME',
        type: 'input',
        templateOptions: {
            label: 'Name/Org Name',
            required: true,
        }
    },
    {
        key: 'SPHONE',
        type: 'input',
        templateOptions: {
            type: 'string',
            label: 'Mobile No',
            required: true,
        }
    },
    {
        key: 'SEMAIL',
        type: 'input',
        templateOptions: {
          label: 'Email',
          type: 'email',
          required: true,
        },
      },
    {
        key: 'SADDRESS',
        type: 'input',
        templateOptions: {
            label: 'Address',
            required: true,
        }
    },
    {
      key: 'SUSERNAME',
      type: 'input',
      templateOptions: {
          label: 'Username',
          required: true,
      }
  },
    {
        key: 'SPASSWORD',
        validators: {
          fieldMatch: {
            expression: (control: FormControl) => {
              const value = control.value;

              return value.passwordConfirm === value.password
                // avoid displaying the message error when values are empty
                || (!value.passwordConfirm || !value.password);
            },
            message: 'Password Not Matching',
            errorPath: 'passwordConfirm',
          },
        },
        fieldGroup: [
          {
            key: 'password',
            type: 'input',
            templateOptions: {
              type: 'password',
              label: 'Password',
              required: true,
            },
          },
          {
            key: 'passwordConfirm',
            type: 'input',
            templateOptions: {
              type: 'password',
              label: 'Confirm Password',
              required: true,
            },
          },
        ],
      }
];
