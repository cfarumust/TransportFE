
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ViewChild } from '@angular/core';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';

@Component({
    selector: 'formly-field-input',
    template: `
  <mat-form-field>
    <mat-label>Pickup Time</mat-label>
    <input matInput [format]="24" readonly type="dateTime" [ngxTimepicker]="picker" [formControl]="formControl" [formlyAttributes]="field">
    <mat-icon class="timeIcon" (click)="pickTimer()" matSuffix>access_time</mat-icon>
  </mat-form-field>
  <ngx-material-timepicker #picker></ngx-material-timepicker>
 `,
})
export class DateTimeFieldInputComponent extends FieldType {

  @ViewChild('picker', {static: false}) public timePicker: NgxMaterialTimepickerComponent;

  pickTimer() {
    if (this.timePicker) {
      this.timePicker.open();
    }
  }

}
