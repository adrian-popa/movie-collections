import { Routes } from '@angular/router';

export const collectionsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./collections.component')
        .then(m => m.CollectionsComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/collection-detail/collection-detail.component')
        .then(m => m.CollectionDetailComponent)
  }
];
