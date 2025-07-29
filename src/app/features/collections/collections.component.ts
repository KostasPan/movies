import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CollectionService } from '../../core/services/collection.service';
import { MovieCollection } from '../../core/models/movie-collection.interface';
import { SearchService } from '../../core/services/movie-search.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  collectionService = inject(CollectionService);
  searchService = inject(SearchService);
  snackBar = inject(MatSnackBar);

  collections: MovieCollection[] = [];
  newCollectionTitle: string = '';
  newCollectionDescription: string = '';

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.collections = this.collectionService.getCollections();
  }

  createCollection(): void {
    if (
      this.newCollectionTitle.trim() &&
      this.newCollectionDescription.trim()
    ) {
      if (
        this.collectionService.addCollection(
          this.newCollectionTitle,
          this.newCollectionDescription
        )
      ) {
        this.snackBar.open('Collection created!', 'Close', { duration: 2000 });
        this.newCollectionTitle = '';
        this.newCollectionDescription = '';
        this.loadCollections();
      } else {
        this.snackBar.open('Collection title already exists.', 'Close', {
          duration: 2000,
        });
      }
    }
  }
}
