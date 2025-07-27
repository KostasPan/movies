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

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie$!: Observable<TMDbMovieResult>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { movieId: number },
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.movie$ = this.searchService.getMovieDetails(this.data.movieId);
  }
}
