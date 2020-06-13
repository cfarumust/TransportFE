import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderPageRoutingModule } from './set-order-routing.module';
import { SetOrderPage } from './set-order.page';
import { MatInputModule } from '@angular/material/input';
import { AgmCoreModule } from '@agm/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    MatIconModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeCFketdO1G0mIkVJRbpos_JvYROwxV_k',
      libraries: ['places', 'geometry']
      })
  ],
  declarations: [SetOrderPage],
})
export class SetOrderPageModule {}
