import { Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: AppLoginComponent },
  { path: '', component: AppLoginComponent },
];
