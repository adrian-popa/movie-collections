
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from '../../../core/models/movie.model';

export const MoviesActions = createActionGroup({
  source: 'Movies',
  events: {
    'Load Movies': props<{ page: number }>(),
    'Load Movies Success': props<{ movies: Movie[]; totalPages: number; currentPage: number; append?: boolean }>(),
    'Load Movies Failure': props<{ error: string }>(),
    'Search Movies': props<{ query: string; page: number; append?: boolean }>(),
    'Set Search Query': props<{ query: string }>(),
    'Clear Search': emptyProps(),
  },
});
