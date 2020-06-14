import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrdersPageRoutingModule } from './orders-routing.module';
import { OrdersPage } from './orders.page';
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
    OrdersPageRoutingModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
