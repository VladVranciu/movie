import { MovieState } from '@model/types';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const featureSelector = createFeatureSelector<MovieState>('movie');

export const moviesSelector = createSelector(
  featureSelector,
  (state: MovieState) => state.movies
);

export const selectedMovieSelector = createSelector(
  featureSelector,
  (state: MovieState) => state.selectedMovie
);

export const doesNotHaveSelectedMovie = createSelector(
  featureSelector,
  (state: MovieState) => !state.selectedMovie
);

export const selectedMovieIdSelector = createSelector(
  featureSelector,
  (state: MovieState) => state.selectedMovieId
);

export const pageSelector = createSelector(
  featureSelector,
  (state: MovieState) => state.page
);

export const isLoadingSelector = createSelector(
  featureSelector,
  (state: MovieState) => state.isLoading
);

export const isLoadingMovieSelector = createSelector(
  featureSelector,
  (state: MovieState) => state.isLoadingMovie
);
