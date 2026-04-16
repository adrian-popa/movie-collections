
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Collection } from '../../../core/models/collection.model';

export const CollectionsActions = createActionGroup({
  source: 'Collections',
  events: {
    'Create Collection': props<{ name: string }>(),
    'Delete Collection': props<{ id: string }>(),
    'Add Movie To Collection': props<{ collectionId: string; movieId: number }>(),
    'Remove Movie From Collection': props<{ collectionId: string; movieId: number }>(),
    'Load Collections From Storage': emptyProps(),
    'Load Collections From Storage Success': props<{ collections: Collection[] }>(),
  },
});
