import { collectionsFeature } from './collections.reducer';
import { selectMoviesByCollectionId } from './collections.selectors';

describe('Collections Selectors', () => {
  const collectionsState = {
    items: [
      {
        id: '1',
        name: 'Favorites',
        movieIds: [10, 20],
        createdAt: 1
      }
    ]
  };

  const moviesState = {
    items: [
      { id: 10, title: 'Movie A' },
      { id: 20, title: 'Movie B' },
      { id: 30, title: 'Movie C' }
    ]
  };

  const state = {
    [collectionsFeature.name]: collectionsState,
    movies: moviesState
  };

  it('should return movies belonging to collection', () => {
    const selector = selectMoviesByCollectionId('1');

    const result = selector.projector(
      collectionsState.items,
      moviesState.items
    );

    expect(result.length).toBe(2);
    expect(result[0].id).toBe(10);
    expect(result[1].id).toBe(20);
  });

  it('should return empty array if collection does not exist', () => {
    const selector = selectMoviesByCollectionId('999');

    const result = selector.projector(
      collectionsState.items,
      moviesState.items
    );

    expect(result).toEqual([]);
  });
});
