import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, finalize, switchMap } from 'rxjs';
import { TMDbMovieResult } from '../../core/models/tmdb-movie-result.interface';
import { TMDBService } from '../../core/services/tmdb.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToCollectionComponent } from '../search/components/add-to-collection/add-to-collection.component';

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
  isSubmittingRating = false;
  submittedRating: number | null = null;
  private movieId: number = 0;

  constructor(
    private TMDBService: TMDBService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.params.pipe(
      switchMap((params) => {
        this.movieId = +params['id'];
        return this.TMDBService.getMovieDetails(this.movieId);
      })
    );
  }

  setRating(rating: number): void {
    this.rating = rating;
  }

  closeModal(): void {
    this.router.navigate(['/', { outlets: { modal: null } }]);
  }

  submitRating(): void {
    if (this.isSubmittingRating) {
      return;
    }
    this.isSubmittingRating = true;

    this.TMDBService.createGuestSession()
      .pipe(
        switchMap((session) =>
          this.TMDBService.rateMovie(
            this.movieId,
            this.rating,
            session.guest_session_id
          )
        ),
        finalize(() => (this.isSubmittingRating = false))
      )
      .subscribe({
        next: () => {
          this.submittedRating = this.rating;
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
  }

  openAddToCollectionDialog(movie: TMDbMovieResult): void {
    this.dialog.open(AddToCollectionComponent, {
      width: '350px',
      data: { movies: [movie] },
    });
  }
}
