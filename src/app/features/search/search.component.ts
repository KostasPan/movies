import { Component, inject } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { finalize, Subscription, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TMDbMovieResult } from '../../core/models/tmdb-movie-result.interface';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../../core/services/movie-search.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-search',
  providers: [SearchService],
  imports: [
    CommonModule,
    SearchBarComponent,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchService = inject(SearchService);
  dialog = inject(MatDialog);

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
    this.searchSub?.unsubscribe();

    this.searchSub = this.searchService
      .searchMovies(query, page)
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

  openMovieDetails(movieId: number): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { movieId },
    });
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
