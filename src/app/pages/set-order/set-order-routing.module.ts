import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetOrderPage } from './set-order.page';
import { MaterialModule } from '../../materialModule/customMaterial.module';

const routes: Routes = [
  {
    path: '',
    component: SetOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule, MaterialModule],
})
export class OrderPageRoutingModule {}
