import { Routes } from '@angular/router';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../projects/project-view/project-view').then((f) => f.ProjectViewPage),
  },
  {
    path: `weather`,
    loadComponent: () =>
      import('../projects/weather-app/weather-app').then((f) => f.WeatherAppComponent),
  },
  {
    path: 'recipe-box-list',
    loadComponent: () =>
      import('./recipe-box/recipe-box-list/recipe-box-list').then((f) => f.RecipeListComponent),
  },
  {
    path: 'recipe-create',
    loadComponent: () =>
      import('./recipe-box/recipe-box-form/recipe-box-form').then((f) => f.RecipeListForm),
  },
  {
    path: 'recipe-edit',
    loadComponent: () =>
      import('./recipe-box/recipe-box-form/recipe-box-form').then((f) => f.RecipeListForm),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar').then((f) => f.Calendar),
  },
  {
    path: 'meeting-create',
    loadComponent: () =>
      import('./calendar/calendar-form/calendar-form').then((f) => f.CalendarMeetingForm),
  },
  {
    path: 'meeting-edit',
    loadComponent: () =>
      import('./calendar/calendar-form/calendar-form').then((f) => f.CalendarMeetingForm),
  },
];
