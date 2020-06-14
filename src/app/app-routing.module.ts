import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then(m => m.ForgetPasswordPageModule)
  },
  {
    path: 'set-order',
    loadChildren: () => import('./pages/set-order/set-order.module').then(m => m.SetOrderPageModule),
  },
  {
    path: 'tracker',
    loadChildren: () => import('./pages/tracker/tracker.module').then(m => m.TrackerPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'load-order-details',
    loadChildren: () => import('./pages/load-order-details/load-order-details.module').then( m => m.LoadOrderDetailsPageModule)
  },
  {
    path: 'client-orders',
    loadChildren: () => import('./pages/client-orders/client-orders.module').then( m => m.ClientOrdersPageModule)
  },
  {
    path: 'shipper-orders',
    loadChildren: () => import('./pages/shipper-orders/shipper-orders.module').then( m => m.ShipperOrdersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
