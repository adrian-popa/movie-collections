import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { moviesFeature } from './features/movies/store/movies.reducer';
import { collectionsFeature } from './features/collections/store/collections.reducer';
import { MoviesEffects } from './features/movies/store/movies.effects';
import { CollectionsEffects } from './features/collections/store/collections.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      [moviesFeature.name]: moviesFeature.reducer,
      [collectionsFeature.name]: collectionsFeature.reducer,
    }),
    provideEffects([MoviesEffects, CollectionsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    importProvidersFrom(MatIconModule),
  ],
};
