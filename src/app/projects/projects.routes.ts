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
    path: 'book-list',
    loadComponent: () => import('./book-list/book-list').then((f) => f.BookListComponent),
  },
  {
    path: 'book-form-create',
    loadComponent: () => import('./book-list/book-form/book-form').then((f) => f.BookFormComponent),
  },
  {
    path: 'book-form-edit',
    loadComponent: () => import('./book-list/book-form/book-form').then((f) => f.BookFormComponent),
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
