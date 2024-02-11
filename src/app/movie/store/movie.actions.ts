import { Movie, Pagination } from '@model/types';
import { createAction, props } from '@ngrx/store';

//movies
export const getMovies = createAction('[Movies] Get movies');
export const getMoviesSuccess = createAction(
  '[Movies] Get movies success',
  props<{ result: Pagination<Movie> }>()
);
export const getMoviesFailure = createAction(
  '[Movies] Get movies failure',
  props<{ error: string }>()
);

//movie
export const getMovie = createAction(
  '[Movie] Get movie',
  props<{ id: number }>()
);
export const getMovieSuccess = createAction(
  '[Movie] Get movie success',
  props<{ movie: Movie }>()
);
export const getMovieFailure = createAction(
  '[Movie] Get movie failure',
  props<{ error: string }>()
);

export const setPage = createAction(
  '[Movies] Set page',
  props<{ page: number }>()
);

export const setSelectedMovie = createAction(
  '[Movies] Set selected movie',
  props<{ id: number }>()
);
