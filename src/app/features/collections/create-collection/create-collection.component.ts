import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule, // Add ReactiveFormsModule
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
  fb = inject(FormBuilder);

  collectionForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  createCollection(): void {
    if (this.collectionForm.valid) {
      const { title, description } = this.collectionForm.value;
      if (
        this.collectionService.addCollection(
          title as string,
          description as string
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