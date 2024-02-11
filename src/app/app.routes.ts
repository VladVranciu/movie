import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule)
  },
  {
    path: '**',
    redirectTo: 'movie',
    pathMatch: 'full'
  }
];
