import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieComponent } from './movie/movie.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
  {
    path: 'movie',
    component: MovieComponent,
    children: [{ path: ':id', component: MovieDetailsComponent }]
  },
  {
    path: '**',
    redirectTo: 'movie',
    pathMatch: 'full'
  }
];
