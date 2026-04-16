import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MoviesActions } from './movies.actions';
import { TmdbService } from '../../../core/services/tmdb.service';
import { switchMap, map, catchError, of, debounceTime } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesEffects {
    private actions$ = inject(Actions);
    private tmdbService = inject(TmdbService);

    loadMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoviesActions.loadMovies),
            switchMap(action =>
                this.tmdbService.getPopularMovies(action.page).pipe(
                    map(response => MoviesActions.loadMoviesSuccess({
                        movies: response.results,
                        totalPages: response.total_pages,
                        currentPage: response.page,
                        append: action.page > 1
                    })),
                    catchError((error: Error) =>
                        of(MoviesActions.loadMoviesFailure({ error: error.message ?? 'Failed to load movies' }))
                    )
                )
            )
        )
    );

    searchMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MoviesActions.searchMovies),
            debounceTime(300),
            switchMap(action =>
                this.tmdbService.searchMovies(action.query, action.page).pipe(
                    map(response => MoviesActions.loadMoviesSuccess({
                        movies: response.results,
                        totalPages: response.total_pages,
                        currentPage: response.page,
                        append: action.append
                    })),
                    catchError((error: Error) =>
                        of(MoviesActions.loadMoviesFailure({ error: error.message ?? 'Failed to load movies' }))
                    )
                )
            )
        )
    );
}
