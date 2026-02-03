import { Routes } from '@angular/router';

export const PROJECT_ROUTES: Routes = [
  {
    path: `weather`,
    loadComponent: () =>
      import('../projects/weather-app/weather-app').then((f) => f.WeatherAppComponent),
  },
  {
    path: 'to-do-list',
    loadComponent: () =>
      import('../projects/to-do/to-do-list/to-do-list').then((f) => f.ToDoListComponent),
  },
  {
    path: 'to-do-create',
    loadComponent: () =>
      import('../projects/to-do/to-do-list-form/to-do-list-form').then((f) => f.ToDoListForm),
  },
  {
    path: 'to-do-edit',
    loadComponent: () =>
      import('../projects/to-do/to-do-list-form/to-do-list-form').then((f) => f.ToDoListForm),
  },
];
