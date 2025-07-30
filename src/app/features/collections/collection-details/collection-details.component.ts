import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CollectionService } from '../../../core/services/collection.service';
import { MovieCollection } from '../../../core/models/movie-collection.interface';
import { TMDBService } from '../../../core/services/tmdb.service';

@Component({
  selector: 'app-collection-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css'],
})
export class CollectionDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private collectionService = inject(CollectionService);
  public TMDBService = inject(TMDBService);

  collection: MovieCollection | undefined;

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.collection = this.collectionService.getCollectionByTitle(title);
    }
  }

  openMovieDetails(movieId: number): void {
    this.router.navigate(['/', { outlets: { modal: ['movie', movieId] } }]);
  }

  removeMovie(movieId: number, event: MouseEvent): void {
    event.stopPropagation();
    if (this.collection) {
      if (
        this.collectionService.removeMovieFromCollection(
          this.collection.title,
          movieId
        )
      ) {
        this.collection.movies = this.collection.movies.filter(
          (movie) => movie.id !== movieId
        );
        if (this.collection.movies.length === 0) {
          this.router.navigate(['/collections']);
        }
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/collections']);
  }
}
