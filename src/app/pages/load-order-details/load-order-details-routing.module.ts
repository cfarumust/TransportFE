import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadOrderDetailsPage } from './load-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: LoadOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadOrderDetailsPageRoutingModule {}
