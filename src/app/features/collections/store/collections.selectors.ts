import { createSelector } from '@ngrx/store';
import { collectionsFeature } from './collections.reducer';
import { selectItems as selectMovieItems } from '../../movies/store/movies.selectors';
import { Movie } from '../../../core/models/movie.model';

export const { selectCollectionsState, selectItems } = collectionsFeature;
export const selectAllCollections = collectionsFeature.selectItems;

export const selectCollectionById = (id: string) =>
    createSelector(
        selectItems,
        (collections) => collections.find(c => c.id === id)
    );

export const selectMoviesByCollectionId = (id: string) =>
    createSelector(
        selectItems,
        selectMovieItems,
        (collections, movies: Movie[]) => {
            const collection = collections.find(c => c.id === id);
            if (!collection) return [];
            return collection.movieIds
                .map(movieId => movies.find(m => m.id === movieId))
                .filter((m): m is Movie => !!m);
        }
    );
