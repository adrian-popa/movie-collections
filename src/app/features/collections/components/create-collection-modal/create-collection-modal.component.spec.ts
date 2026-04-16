import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCollectionModalComponent } from './create-collection-modal.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CollectionsActions } from '../../store/collections.actions';

describe('CreateCollectionModalComponent', () => {
  let component: CreateCollectionModalComponent;
  let fixture: ComponentFixture<CreateCollectionModalComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCollectionModalComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CreateCollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closed when close() is called', () => {
    const spy = vi.fn();
    component.closed.subscribe(spy);
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch createCollection and close when create() is called with a name', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const closeSpy = vi.spyOn(component, 'close');
    component.name = 'Test Collection';
    component.create();
    expect(dispatchSpy).toHaveBeenCalledWith(CollectionsActions.createCollection({ name: 'Test Collection' }));
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not dispatch or close when create() is called with empty name', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const closeSpy = vi.spyOn(component, 'close');
    component.name = '';
    component.create();
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
  });
});
