import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SignupPage } from './signup.page';
import { MaterialModule } from '../../materialModule/customMaterial.module';
import { CustomComponentFieldModule } from '../../customTypes/customField.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    SignupPageRoutingModule,
    CustomComponentFieldModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
