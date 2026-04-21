import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { selectCollectionById, selectMoviesByCollectionId } from '../../store/collections.selectors';
import { CollectionsActions } from '../../store/collections.actions';

@Component({
    selector: 'app-collection-detail',
    standalone: true,
    imports: [RouterModule, MatButtonModule, MatIconModule],
    templateUrl: './collection-detail.component.html',
    styleUrls: ['./collection-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionDetailComponent {
    private store = inject(Store);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    id = this.route.snapshot.paramMap.get('id')!;
    collection = this.store.selectSignal(selectCollectionById(this.id));
    movies = this.store.selectSignal(selectMoviesByCollectionId(this.id));

    back() {
        this.router.navigate(['/collections']);
    }

    removeMovie(movieId: number) {
        this.store.dispatch(CollectionsActions.removeMovieFromCollection({ collectionId: this.id, movieId }));
    }
}
