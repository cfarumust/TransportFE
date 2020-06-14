import { FormlyFieldConfig } from '@ngx-formly/core';

export const screen1Config: FormlyFieldConfig[] = [
    {
        fieldGroupClassName: 'assignedFieldByRow',
        fieldGroup: [
            {
                key: 'DTPICKUPDATE',
                type: 'datepicker',
                templateOptions: {
                    label: 'Pickup Date',
                    required: true,
                }
            },
            {
                key: 'DTPICKUPTIME',
                type: 'dateTime',
                templateOptions: {
                    label: 'Pickup Time',
                    required: true,
                },
            }
        ],
    },
    {
        fieldGroupClassName: 'assignedFieldByRow',
        fieldGroup: [
            {
                key: 'DTDROPDATE',
                type: 'datepicker',
                templateOptions: {
                    label: 'Drop date',
                    required: true,
                }
            },
            {
                key: 'DTDROPTIME',
                type: 'dateTime',
                templateOptions: {
                    label: 'Drop Time',
                    required: true,
                },
            }
        ],
    },
    {
        key: 'NBOXID',
        type: 'select',
        templateOptions: {
            label: 'Size',
            placeholder: '',
            required: true,
            options: [
                { id: 1, label: 'Regular (W:40cm x L:60cm x H:30cm)', value: 1 },
                { id: 2, label: 'Short W:40cm x L:60cm x H:15cm ', value: 2 },
                { id: 3, label: 'Small (W:40cm x L:30cm x H:30cm)', value: 3 },
                { id: 4, label: 'Small Short (W:40cm x L:30cm x H:15cm)', value: 4 },
            ],
        }
    },
    {
        key: 'NBOXCOUNT',
        type: 'input',
        templateOptions: {
            type: 'number',
            label: 'Number of Boxes',
            required: true,
            min: 1,
        }
    },
];
