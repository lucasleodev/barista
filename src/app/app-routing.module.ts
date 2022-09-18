import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecoveryPasswordComponent } from './pages/login/recovery-password/recovery-password.component';
import { SigninComponent } from './pages/login/signin/signin.component';
import { SignupComponent } from './pages/login/signup/signup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AuthGuard } from './pages/shared/guards/auth.guard';
import { LoginGuard } from './pages/shared/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: SigninComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'create-account',
    component: SignupComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'order-list', pathMatch: 'full' },
      { path: 'order-list', component: OrderListComponent },
      { path: 'order/:id', component: OrdersComponent },
      { path: 'order', component: OrdersComponent },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
