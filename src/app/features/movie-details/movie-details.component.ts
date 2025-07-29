import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { TMDbMovieResult } from '../../core/models/tmdb-movie-result.interface';
import { SearchService } from '../../core/services/movie-search.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MovieCollection } from '../../core/models/movie-collection.interface';
import { CollectionService } from '../../core/services/collection.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie$!: Observable<TMDbMovieResult>;
  rating: number = 0;
  hovered: number = 0;
  collections: MovieCollection[] = [];
  selectedCollection: string = '';
  movie: TMDbMovieResult | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movieId: number },
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.movie$ = this.searchService.getMovieDetails(this.data.movieId);
    this.movie$.subscribe((movie) => (this.movie = movie));
    this.collections = this.collectionService.getCollections();
  }

  setRating(rating: number): void {
    this.rating = rating;
  }

  submitRating(): void {
    this.searchService.createGuestSession().subscribe({
      next: (session) => {
        this.searchService
          .rateMovie(this.data.movieId, this.rating, session.guest_session_id)
          .subscribe({
            next: () => {
              this.snackBar.open('Rating submitted successfully!', 'Close', {
                duration: 3000,
              });
            },
            error: () => {
              this.snackBar.open('Failed to submit rating.', 'Close', {
                duration: 3000,
              });
            },
          });
      },
      error: () => {
        this.snackBar.open('Failed to create a guest session.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  addToCollection(): void {
    if (this.selectedCollection && this.movie) {
      if (
        this.collectionService.addMovieToCollection(
          this.selectedCollection,
          this.movie
        )
      ) {
        this.snackBar.open(
          `Movie added to ${this.selectedCollection}`,
          'Close',
          {
            duration: 2000,
          }
        );
      } else {
        this.snackBar.open('Movie is already in this collection.', 'Close', {
          duration: 2000,
        });
      }
    }
  }
}
