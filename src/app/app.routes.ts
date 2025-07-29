import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search.component').then(
        (m) => m.SearchComponent
      ),
    children: [
      {
        path: 'movie/:id',
        loadComponent: () =>
          import('./features/movie-details/movie-details.component').then(
            (m) => m.MovieDetailsComponent
          ),
      },
    ],
  },
  {
    path: 'collections',
    loadComponent: () =>
      import('./features/collections/collections/collections.component').then(
        (m) => m.CollectionsComponent
      ),
  },
  {
    path: 'collections/new',
    loadComponent: () =>
      import(
        './features/collections/create-collection/create-collection.component'
      ).then((m) => m.CreateCollectionComponent),
  },
  {
    path: 'collections/:title',
    loadComponent: () =>
      import(
        './features/collections/collection-details/collection-details.component'
      ).then((m) => m.CollectionDetailsComponent),
  },
  { path: '**', redirectTo: '/search' },
];
