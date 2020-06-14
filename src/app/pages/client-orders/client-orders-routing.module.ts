import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientOrdersPage } from './client-orders.page';

const routes: Routes = [
  {
    path: '',
    component: ClientOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientOrdersPageRoutingModule {}
