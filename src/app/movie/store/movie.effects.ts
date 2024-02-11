import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MovieService } from '../service/movie.service';
import * as MovieActions from './movie.actions';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions, private movieService: MovieService) {}
  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getMovies),
      switchMap(() => {
        const page = parseInt(localStorage.getItem('page') || '1');
        return this.movieService.getPaginatedList({ page }).pipe(
          map((result) => MovieActions.getMoviesSuccess({ result })),
          catchError(() => of(MovieActions.getMoviesFailure))
        );
      })
    )
  );

  getMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getMovie),
      switchMap((action) =>
        this.movieService
          .getModel((action as unknown as { id: number }).id)
          .pipe(
            map((movie) => MovieActions.getMovieSuccess({ movie })),
            catchError(() => of(MovieActions.getMovieFailure))
          )
      )
    )
  );
}
