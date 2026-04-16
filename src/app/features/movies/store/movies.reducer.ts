
import { createFeature, createReducer, on } from '@ngrx/store';
import { Movie } from '../../../core/models/movie.model';
import { MoviesActions } from './movies.actions';

export interface MoviesState {
  items: Movie[];
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  items: [],
  searchQuery: '',
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null
};

export const moviesFeature = createFeature({
  name: 'movies',
  reducer: createReducer(
    initialState,
    on(MoviesActions.loadMovies, MoviesActions.searchMovies, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(MoviesActions.loadMoviesSuccess, (state, { movies, totalPages, currentPage, append }) => ({
      ...state,
      items: append ? [...state.items, ...movies] : movies,
      totalPages,
      currentPage,
      loading: false,
      error: null
    })),
    on(MoviesActions.loadMoviesFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),
    on(MoviesActions.setSearchQuery, (state, { query }) => ({
      ...state,
      searchQuery: query
    })),
    on(MoviesActions.clearSearch, (state) => ({
      ...state,
      searchQuery: '',
      currentPage: 1
    }))
  )
});
