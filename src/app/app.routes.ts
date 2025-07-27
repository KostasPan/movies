import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search.component').then(
        (m) => m.SearchComponent
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./features/movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
  },
  { path: '**', redirectTo: '/search' },
];
