import { Component } from '@angular/core';
import { CollectionListComponent } from './components/collection-list/collection-list.component';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CollectionListComponent],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {}
