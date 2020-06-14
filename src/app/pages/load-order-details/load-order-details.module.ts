import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadOrderDetailsPageRoutingModule } from './load-order-details-routing.module';
import { LoadOrderDetailsPage } from './load-order-details.page';
import { MatListModule } from '@angular/material/list';
import { TrackerPage } from '../tracker/tracker.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatListModule,
    MatIconModule,
    LoadOrderDetailsPageRoutingModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeCFketdO1G0mIkVJRbpos_JvYROwxV_k',
      libraries: ['places']
      }),
  ],
  declarations: [LoadOrderDetailsPage, TrackerPage]
})
export class LoadOrderDetailsPageModule {}
