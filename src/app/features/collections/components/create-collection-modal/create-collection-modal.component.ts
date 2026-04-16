import { Component, ChangeDetectionStrategy, inject, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CollectionsActions } from '../../store/collections.actions';

@Component({
  selector: 'app-create-collection-modal',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-collection-modal.component.html',
  styleUrls: ['./create-collection-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollectionModalComponent {
  private store = inject(Store);
  name = '';
  @Output() closed = new EventEmitter<void>();

  create() {
    if (this.name) {
      this.store.dispatch(CollectionsActions.createCollection({ name: this.name }));
      this.close();
    }
  }

  close() {
    this.closed.emit();
  }
}
