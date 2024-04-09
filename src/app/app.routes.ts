import { Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guard/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: AppLoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
