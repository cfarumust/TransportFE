import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';

export const signupConfig: FormlyFieldConfig[] = [
    {
        key: 'SFIRSTNAME',
        type: 'input',
        templateOptions: {
            label: 'Firstname',
            required: true,
        }
    },
    {
        key: 'SLASTNAME',
        type: 'input',
        templateOptions: {
            label: 'Lastname',
            required: true,
        }
    },
    {
        key: 'STELEPHONENUMBER',
        type: 'input',
        templateOptions: {
            type: 'number',
            label: 'Mobile No',
            required: true,
        }
    },
    {
        key: 'SEMAILADDRESS',
        type: 'input',
        templateOptions: {
          label: 'Email',
          type: 'email',
          required: true,
        },
      },
    {
        key: 'SADDRESS1',
        type: 'input',
        templateOptions: {
            label: 'Address',
            required: true,
        }
    },
    {
        key: 'password',
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
