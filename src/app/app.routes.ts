import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/movies/movies.routes').then(m => m.moviesRoutes)
  },
  {
    path: 'collections',
    loadChildren: () =>
      import('./features/collections/collections.routes').then(m => m.collectionsRoutes)
  },
  {
    path: '**',
    redirectTo: 'movies'
  }
];
