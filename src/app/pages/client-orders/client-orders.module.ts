import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientOrdersPageRoutingModule } from './client-orders-routing.module';

import { ClientOrdersPage } from './client-orders.page';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    ClientOrdersPageRoutingModule
  ],
  declarations: [ClientOrdersPage]
})
export class ClientOrdersPageModule {}
