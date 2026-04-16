import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CollectionsActions } from './collections.actions';
import { selectAllCollections } from './collections.selectors';
import { switchMap, of, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable({ providedIn: 'root' })
export class CollectionsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);

    loadCollections$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CollectionsActions.loadCollectionsFromStorage),
            switchMap(() => {
                try {
                    const raw = localStorage.getItem('movie-collections');
                    const collections = raw ? JSON.parse(raw) : [];
                    return of(CollectionsActions.loadCollectionsFromStorageSuccess({ collections }));
                } catch {
                    return of(CollectionsActions.loadCollectionsFromStorageSuccess({ collections: [] }));
                }
            })
        )
    );

    saveCollections$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                CollectionsActions.createCollection,
                CollectionsActions.deleteCollection,
                CollectionsActions.addMovieToCollection,
                CollectionsActions.removeMovieFromCollection
            ),
            concatLatestFrom(() => this.store.select(selectAllCollections)),
            tap(([, collections]) => {
                try {
                    localStorage.setItem('movie-collections', JSON.stringify(collections));
                } catch {
                    // localStorage unavailable (private browsing quota exceeded etc.)
                }
            })
        ), { dispatch: false }
    );
}
