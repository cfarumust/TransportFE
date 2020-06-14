import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipperOrdersPageRoutingModule } from './shipper-orders-routing.module';

import { ShipperOrdersPage } from './shipper-orders.page';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    IonicModule,
    ShipperOrdersPageRoutingModule
  ],
  declarations: [ShipperOrdersPage]
})
export class ShipperOrdersPageModule {}
