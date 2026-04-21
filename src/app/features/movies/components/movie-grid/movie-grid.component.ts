import { Component, OnInit, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from '../../../../core/models/movie.model';
import { MoviesActions } from '../../store/movies.actions';
import { CollectionsActions } from '../../../collections/store/collections.actions';
import { selectFilteredMovies, selectLoading, selectError, selectCurrentPage, selectTotalPages, selectSearchQuery } from '../../store/movies.selectors';
import { selectAllCollections } from '../../../collections/store/collections.selectors';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-grid',
  standalone: true,
  imports: [MatSelectModule, MatCardModule, MatIconModule],
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieGridComponent implements OnInit {
  private store = inject(Store);
  movies: Signal<Movie[]> = this.store.selectSignal(selectFilteredMovies);
  loading: Signal<boolean> = this.store.selectSignal(selectLoading);
  error: Signal <string | null> = this.store.selectSignal(selectError);
  collections = this.store.selectSignal(selectAllCollections);
  currentPage = this.store.selectSignal(selectCurrentPage);
  totalPages = this.store.selectSignal(selectTotalPages);
  searchQuery = this.store.selectSignal(selectSearchQuery);

  private selections = new Map<number, string>();
  addedMovies = new Set<number>();

  ngOnInit() {
    this.store.dispatch(MoviesActions.loadMovies({ page: 1 }));
    this.store.dispatch(CollectionsActions.loadCollectionsFromStorage());
  }

  getSelection(movieId: number): string {
    return this.selections.get(movieId) ?? '';
  }

  onCollectionSelect(movieId: number, collectionId: string) {
    if (!collectionId) return;
    this.store.dispatch(CollectionsActions.addMovieToCollection({ collectionId, movieId }));
    this.selections.set(movieId, '');
    this.addedMovies.add(movieId);
    setTimeout(() => {
      this.addedMovies.delete(movieId);
    }, 1500);
  }

  showMore() {
    const nextPage = this.currentPage() + 1;
    if (nextPage > this.totalPages()) return;
    if (this.searchQuery()) {
      this.store.dispatch(MoviesActions.searchMovies({ query: this.searchQuery(), page: nextPage, append: true }));
    } else {
      this.store.dispatch(MoviesActions.loadMovies({ page: nextPage }));
    }
  }
}
