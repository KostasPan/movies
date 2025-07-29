import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CollectionService } from '../../../core/services/collection.service';

@Component({
  selector: 'app-create-collection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.css',
})
export class CreateCollectionComponent {
  collectionService = inject(CollectionService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  newCollectionTitle: string = '';
  newCollectionDescription: string = '';

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
        this.router.navigate(['/collections']);
      } else {
        this.snackBar.open('Collection title already exists.', 'Close', {
          duration: 2000,
        });
      }
    }
  }
}
