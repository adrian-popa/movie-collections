import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, Genre } from '../models/movie.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private readonly http = inject(HttpClient);
  private readonly apiKey = environment.tmdbApiKey;
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  getPopularMovies(page: number = 1): Observable<{ results: Movie[]; total_pages: number; page: number }> {
    return this.http.get<{ results: Movie[]; total_pages: number; page: number }>(
      `${this.baseUrl}/movie/popular`,
      { params: { api_key: this.apiKey, page: page.toString() } }
    );
  }

  searchMovies(query: string, page: number = 1): Observable<{ results: Movie[]; total_pages: number; page: number }> {
    return this.http.get<{ results: Movie[]; total_pages: number; page: number }>(
      `${this.baseUrl}/search/movie`,
      { params: { api_key: this.apiKey, query, page: page.toString() } }
    );
  }

  getGenres(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(
      `${this.baseUrl}/genre/movie/list`,
      { params: { api_key: this.apiKey } }
    );
  }
}
