import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionListComponent } from './collection-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CollectionsActions } from '../../store/collections.actions';
import { By } from '@angular/platform-browser';

describe('CollectionListComponent', () => {
  let component: CollectionListComponent;
  let fixture: ComponentFixture<CollectionListComponent>;
  let store: MockStore;

  const initialState = {
    collections: {
      items: [
        {
          id: '1',
          name: 'Favorites',
          movieIds: [],
          createdAt: 1
        }
      ]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionListComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(CollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render collections', () => {
    const items = fixture.debugElement.queryAll(By.css('.collection-card'));

    expect(items.length).toBe(1);
  });

  it('should dispatch deleteCollection when delete clicked', () => {
    vi.spyOn(store, 'dispatch');

    component.delete('1');

    expect(store.dispatch).toHaveBeenCalledWith(
      CollectionsActions.deleteCollection({ id: '1' })
    );
  });
});
