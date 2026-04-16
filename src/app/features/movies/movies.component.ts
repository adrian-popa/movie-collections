import { Component } from '@angular/core';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SearchBarComponent, MovieGridComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {}
