import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DateTimeFieldInputComponent } from './datetime.field';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { applyEmailValidation } from './emailValidation.type';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    MatIconModule,
    FormlyModule.forRoot({
      types: [
        { name: 'dateTime', component: DateTimeFieldInputComponent },
      ],
      extensions: [{ name: 'email', extension: { prePopulate: applyEmailValidation } }],
    }),
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [FormlyModule],
  declarations: [DateTimeFieldInputComponent]
})
export class CustomComponentFieldModule {}
