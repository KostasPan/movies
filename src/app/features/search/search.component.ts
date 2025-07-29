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
import { Router, RouterOutlet } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AddToCollectionComponent } from './components/add-to-collection/add-to-collection.component';

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
    RouterOutlet,
    MatCheckboxModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchService = inject(SearchService);
  router = inject(Router);
  dialog = inject(MatDialog);

  currentSearchQuery: string = '';
  movies: TMDbMovieResult[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  selectedMovies: TMDbMovieResult[] = [];

  isLoading = false;
  searchAttempted = false;
  private searchSub?: Subscription;

  onSearchReceived(query: string): void {
    this.currentSearchQuery = query;
    this.searchAttempted = true;
    this.currentPage = 1;
    this.selectedMovies = [];

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
    this.router.navigate(['/search/movie', movieId]);
  }

  isSelected(movie: TMDbMovieResult): boolean {
    return this.selectedMovies.some((m) => m.id === movie.id);
  }

  toggleSelection(movie: TMDbMovieResult): void {
    if (this.isSelected(movie)) {
      this.selectedMovies = this.selectedMovies.filter(
        (m) => m.id !== movie.id
      );
    } else {
      this.selectedMovies.push(movie);
    }
  }

  openAddToCollectionDialog(): void {
    if (this.selectedMovies.length === 0) return;

    const dialogRef = this.dialog.open(AddToCollectionComponent, {
      width: '350px',
      data: { movies: this.selectedMovies },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedMovies = [];
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
