import { Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: AppLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];
