import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { TMDbMovieResult } from '../../core/models/tmdb-movie-result.interface';
import { SearchService } from '../../core/services/movie-search.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie$!: Observable<TMDbMovieResult>;
  rating: number = 0;
  hovered: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movieId: number },
    private searchService: SearchService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.movie$ = this.searchService.getMovieDetails(this.data.movieId);
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
}
