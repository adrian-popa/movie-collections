
import { createSelector } from '@ngrx/store';
import { moviesFeature } from './movies.reducer';

export const {
    selectMoviesState,
    selectItems,
    selectSearchQuery,
    selectCurrentPage,
    selectTotalPages,
    selectLoading,
    selectError
} = moviesFeature;

export const selectFilteredMovies = createSelector(
    selectItems,
    selectSearchQuery,
    (items, searchQuery) =>
        !searchQuery
            ? items
            : items.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
);
