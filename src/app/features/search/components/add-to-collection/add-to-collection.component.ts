import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TMDbMovieResult } from '../../../../core/models/tmdb-movie-result.interface';
import { CollectionService } from '../../../../core/services/collection.service';
import { MovieCollection } from '../../../../core/models/movie-collection.interface';

@Component({
  selector: 'app-add-to-collection',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.css'],
})
export class AddToCollectionComponent implements OnInit {
  private collectionService = inject(CollectionService);
  private snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialogRef<AddToCollectionComponent>);

  collections: MovieCollection[] = [];
  selectedCollection: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movies: TMDbMovieResult[] }
  ) {}

  ngOnInit(): void {
    this.collections = this.collectionService.getCollections();
  }

  addMovies(): void {
    if (!this.selectedCollection) return;

    let addedCount = 0;
    const totalMovies = this.data.movies.length;

    this.data.movies.forEach((movie) => {
      if (
        this.collectionService.addMovieToCollection(
          this.selectedCollection,
          movie
        )
      ) {
        addedCount++;
      }
    });

    if (addedCount > 0) {
      this.snackBar.open(
        `${addedCount} of ${totalMovies} movie(s) added to "${this.selectedCollection}".`,
        'Close',
        { duration: 3000 }
      );
    } else {
      this.snackBar.open(
        `All selected movies are already in "${this.selectedCollection}".`,
        'Close',
        { duration: 3000 }
      );
    }

    this.dialogRef.close();
  }
}
