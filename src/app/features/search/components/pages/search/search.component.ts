import { Component, inject } from '@angular/core';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  catchError,
  finalize,
  map,
  Observable,
  of,
  Subscription,
  tap,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TMDbSearchResponse } from '../../../../../core/models/tmdb-search-response.interface';
import { TMDbMovieResult } from '../../../../../core/models/tmdb-movie-result.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    SearchBarComponent,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private http = inject(HttpClient);

  private readonly API_KEY = '85204a8cc33baf447559fb6d51b18313';
  private readonly API_URL = 'https://api.themoviedb.org/3/search/movie';
  readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

  currentSearchQuery: string = '';
  movies: TMDbMovieResult[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  isLoading = false;
  searchAttempted = false;
  private searchSub?: Subscription;

  onSearchReceived(query: string): void {
    this.currentSearchQuery = query;
    this.searchAttempted = true;
    this.currentPage = 1;

    if (!query) {
      this.clearResults();
      return;
    }

    this.fetchMovies(query, this.currentPage);
  }

  fetchMovies(query: string, page: number): void {
    this.isLoading = true;
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('query', query)
      .set('page', page.toString());

    this.searchSub?.unsubscribe(); // Cancel previous request
    this.searchSub = this.http
      .get<TMDbSearchResponse>(this.API_URL, { params })
      .pipe(
        tap((data) => console.log('API Response:', data)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          this.movies = response.results;
          this.totalPages = response.total_pages;
          this.currentPage = response.page;
        },
        error: (err) => {
          console.error('API Error:', err);
          this.clearResults();
        },
      });
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.fetchMovies(this.currentSearchQuery, page);
    }
  }

  private clearResults(): void {
    this.movies = [];
    this.totalPages = 0;
    this.currentPage = 1;
    this.searchAttempted = this.currentSearchQuery.length > 0;
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }
}
