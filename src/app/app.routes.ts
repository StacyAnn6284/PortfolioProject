import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home').then((m) => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./about-me/about-me').then((m) => m.AboutMe) },
  { path: 'projects', loadComponent: () => import('./projects/projects').then((m) => m.Projects) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
