import { collectionsFeature, CollectionsState } from './collections.reducer';
import { CollectionsActions } from './collections.actions';

describe('Collections Reducer', () => {
  const reducer = collectionsFeature.reducer;

  const initialState: CollectionsState = {
    items: []
  };

  it('should create a collection', () => {
    const action = CollectionsActions.createCollection({ name: 'Favorites' });

    const state = reducer(initialState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].name).toBe('Favorites');
    expect(state.items[0].movieIds).toEqual([]);
  });

  it('should add movie to collection', () => {
    const state: CollectionsState = {
      items: [
        {
          id: '1',
          name: 'Favorites',
          movieIds: [],
          createdAt: 1
        }
      ]
    };

    const action = CollectionsActions.addMovieToCollection({
      collectionId: '1',
      movieId: 100
    });

    const newState = reducer(state, action);

    expect(newState.items[0].movieIds).toContain(100);
  });

  it('should remove movie from collection', () => {
    const state: CollectionsState = {
      items: [
        {
          id: '1',
          name: 'Favorites',
          movieIds: [100],
          createdAt: 1
        }
      ]
    };

    const action = CollectionsActions.removeMovieFromCollection({
      collectionId: '1',
      movieId: 100
    });

    const newState = reducer(state, action);

    expect(newState.items[0].movieIds).toEqual([]);
  });

  it('should delete collection', () => {
    const state: CollectionsState = {
      items: [
        {
          id: '1',
          name: 'Favorites',
          movieIds: [],
          createdAt: 1
        }
      ]
    };

    const action = CollectionsActions.deleteCollection({ id: '1' });

    const newState = reducer(state, action);

    expect(newState.items.length).toBe(0);
  });

  it('should not duplicate movie in collection', () => {
    const state: CollectionsState = {
        items: [
        {
            id: '1',
            name: 'Favorites',
            movieIds: [100],
            createdAt: 1
        }
        ]
    };

    const action = CollectionsActions.addMovieToCollection({
        collectionId: '1',
        movieId: 100
    });

    const newState = reducer(state, action);

    expect(newState.items[0].movieIds.length).toBe(1);
  });
});
