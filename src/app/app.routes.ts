import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { PROJECT_ROUTES } from './projects/projects.routes';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home').then((m) => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./about-me/about-me').then((m) => m.AboutMe) },
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/project-view/project-view').then((m) => m.ProjectViewPage),
  },
  ...PROJECT_ROUTES,
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
