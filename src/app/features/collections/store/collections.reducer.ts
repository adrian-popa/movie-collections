
import { createFeature, createReducer, on } from '@ngrx/store';
import { Collection } from '../../../core/models/collection.model';
import { CollectionsActions } from './collections.actions';

export interface CollectionsState {
  items: Collection[];
}

const initialState: CollectionsState = {
  items: []
};

export const collectionsFeature = createFeature({
  name: 'collections',
  reducer: createReducer(
    initialState,
    on(CollectionsActions.createCollection, (state, { name }) => ({
      items: [
        ...state.items,
        {
          id: crypto.randomUUID(),
          name,
          movieIds: [],
          createdAt: Date.now()
        }
      ]
    })),
    on(CollectionsActions.deleteCollection, (state, { id }) => ({
      items: state.items.filter(c => c.id !== id)
    })),
    on(CollectionsActions.addMovieToCollection, (state, { collectionId, movieId }) => ({
      items: state.items.map(c =>
        c.id === collectionId && !c.movieIds.includes(movieId)
          ? { ...c, movieIds: [...c.movieIds, movieId] }
          : c
      )
    })),
    on(CollectionsActions.removeMovieFromCollection, (state, { collectionId, movieId }) => ({
      items: state.items.map(c =>
        c.id === collectionId
          ? { ...c, movieIds: c.movieIds.filter(id => id !== movieId) }
          : c
      )
    })),
    on(CollectionsActions.loadCollectionsFromStorageSuccess, (state, { collections }) => ({
      items: collections
    }))
  )
});
