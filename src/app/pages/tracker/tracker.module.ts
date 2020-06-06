import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrackerPageRoutingModule } from './tracker-routing.module';
import { TrackerPage } from './tracker.page';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackerPageRoutingModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeCFketdO1G0mIkVJRbpos_JvYROwxV_k',
      libraries: ['places']
      })
  ],
  declarations: [TrackerPage],
  providers: [NativeGeocoder]
})
export class TrackerPageModule {}
