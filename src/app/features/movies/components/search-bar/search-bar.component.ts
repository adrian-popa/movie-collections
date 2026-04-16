import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesActions } from '../../store/movies.actions';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  private store = inject(Store);
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(query => {
      if (!query) {
        this.store.dispatch(MoviesActions.clearSearch());
        this.store.dispatch(MoviesActions.loadMovies({ page: 1 }));
      } else {
        this.store.dispatch(MoviesActions.setSearchQuery({ query }));
        this.store.dispatch(MoviesActions.searchMovies({ query, page: 1 }));
      }
    });
  }

  onInput(query: string) {
    this.searchSubject.next(query);
  }
}