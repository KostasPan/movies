import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CollectionService } from '../../../core/services/collection.service';
import { MovieCollection } from '../../../core/models/movie-collection.interface';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  collectionService = inject(CollectionService);
  collections: MovieCollection[] = [];

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.collections = this.collectionService.getCollections();
  }
}
