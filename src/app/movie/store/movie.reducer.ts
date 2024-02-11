import { Movie, MovieState, Pagination } from '@model/types';
import { createReducer, on } from '@ngrx/store';
import * as MovieActions from './movie.actions';

export const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  selectedMovieId: null,
  page: 1,
  totalPages: -1,
  isLoading: false,
  isLoadingMovie: false
};

//movie
export const getMovie = (state: MovieState) => ({
  ...state,
  isLoadingMovie: true
});

export const getMovieSuccess = (
  state: MovieState,
  actions: { movie: Movie }
) => ({
  ...state,
  isLoadingMovie: false,
  selectedMovie: actions.movie
});

export const getMovieFailure = (state: MovieState) => ({
  ...state,
  isLoadingMovie: false
});

//movies
export const getMovies = (state: MovieState) => ({
  ...state,
  isLoading: true
});

export const getMoviesSuccess = (
  state: MovieState,
  actions: { result: Pagination<Movie> }
) => {
  const { results: movies, total_pages: totalPages, page } = actions.result;
  return {
    ...state,
    isLoading: false,
    movies,
    totalPages,
    page
  };
};

export const getMoviesFailure = (state: MovieState) => ({
  ...state,
  isLoading: false
});

//misc
export const setSelectedMovie = (state: MovieState, action: { id: number }) => {
  const selectedMovie =
    state.movies.find((movie) => movie.id === action.id) || null;
  const isLoadingMovie = !selectedMovie;
  return {
    ...state,
    selectedMovie,
    selectedMovieId: action.id,
    isLoadingMovie
  };
};

export const setPage = (state: MovieState, action: { page: number }) => {
  localStorage.setItem('page', JSON.stringify(action.page));
  return {
    ...state,
    page: action.page
  };
};

export const reducer = createReducer(
  initialState,
  on(MovieActions.getMovie, getMovie),
  on(MovieActions.getMovieSuccess, getMovieSuccess),
  on(MovieActions.getMovieFailure, getMovieFailure),
  on(MovieActions.getMovies, getMovies),
  on(MovieActions.getMoviesSuccess, getMoviesSuccess),
  on(MovieActions.getMoviesFailure, getMoviesFailure),
  on(MovieActions.setSelectedMovie, setSelectedMovie),
  on(MovieActions.setPage, setPage)
);
