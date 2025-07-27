import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/components/pages/search/search.component').then(
        (m) => m.SearchComponent
      ),
  },
  { path: '**', redirectTo: '/search' },
];
