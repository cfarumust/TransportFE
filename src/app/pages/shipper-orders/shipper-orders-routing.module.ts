import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipperOrdersPage } from './shipper-orders.page';

const routes: Routes = [
  {
    path: '',
    component: ShipperOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipperOrdersPageRoutingModule {}
