import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomComponentFieldModule } from '../customTypes/customField.module';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormlyMaterialModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
    CustomComponentFieldModule,
    FormlyModule.forRoot()
  ],
  exports: [
    FormlyModule,
    FormlyMaterialModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class MaterialModule { }
