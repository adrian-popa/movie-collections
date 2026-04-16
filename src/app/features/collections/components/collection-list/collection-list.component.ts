import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { selectAllCollections } from '../../store/collections.selectors';
import { CollectionsActions } from '../../store/collections.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateCollectionModalComponent } from '../create-collection-modal/create-collection-modal.component';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, CreateCollectionModalComponent],
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  collections = this.store.selectSignal(selectAllCollections);
  showModal = false;

  ngOnInit() {
    this.store.dispatch(CollectionsActions.loadCollectionsFromStorage());
  }

  navigate(id: string) {
    this.router.navigate(['/collections', id]);
  }

  delete(id: string, event?: Event) {
    event?.stopPropagation();
    this.store.dispatch(CollectionsActions.deleteCollection({ id }));
  }
}
