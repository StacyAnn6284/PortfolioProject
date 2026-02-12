import { Routes } from '@angular/router';
import { PROJECT_ROUTES } from './projects/projects.routes';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home').then((m) => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./about-me/about-me').then((m) => m.AboutMe) },
  {
    path: 'projects',
    loadChildren: () => PROJECT_ROUTES,
  },
  {
    path: 'login',
    loadComponent: () => import('./login-register/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./login-register/register').then((m) => m.RegisterComponent),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
