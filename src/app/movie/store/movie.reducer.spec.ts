import { MOVIE } from '@mocks/test.mocks';
import * as Reducers from './movie.reducer';
import { initialState } from './movie.reducer';
describe('movie', () => {
  it('should getMovie', () => {
    const result = Reducers.getMovie(Reducers.initialState);
    expect(result.isLoadingMovie).toBeTrue();
  });

  it('should getMovieSuccess', () => {
    const result = Reducers.getMovieSuccess(Reducers.initialState, {
      movie: MOVIE
    });
    expect(result.selectedMovie.id).toBe(866398);
    expect(result.isLoadingMovie).toBeFalse();
  });
  it('should getMovieFailure', () => {
    const result = Reducers.getMovieFailure(Reducers.initialState);
    expect(result.isLoadingMovie).toBeFalse();
  });
});

describe('movies', () => {
  it('should getMovies', () => {
    const result = Reducers.getMovies(Reducers.initialState);
    expect(result.isLoading).toBeTrue();
  });

  it('should getMoviesSuccess', () => {
    const result = Reducers.getMoviesSuccess(Reducers.initialState, {
      result: {
        results: [MOVIE],
        page: 1,
        total_pages: 400
      }
    });
    expect(result.movies.length).toBe(1);
    expect(result.isLoading).toBeFalse();
  });
  it('should getMoviesFailure', () => {
    const result = Reducers.getMoviesFailure(Reducers.initialState);
    expect(result.isLoading).toBeFalse();
  });
});

it('should setSelectedMovie', () => {
  const result = Reducers.setSelectedMovie(
    {
      ...initialState,
      movies: [MOVIE]
    },
    { id: 866398 }
  );
  expect(result.selectedMovie?.id).toBe(866398);
  expect(result.isLoadingMovie).toBe(false);
});

it('should setPage', () => {
  const result = Reducers.setPage(initialState, { page: 44 });
  expect(result.page).toBe(44);
});
