import { initialState } from '@app/movie/store/movie.reducer';
import {
  isLoadingMovieSelector,
  isLoadingSelector,
  moviesSelector,
  pageSelector,
  selectedMovieIdSelector,
  selectedMovieSelector
} from '@app/movie/store/movie.selectors';
import { Movie } from '@model/types';
import { of } from 'rxjs';

export const MOVIE: Movie = {
  adult: false,
  backdrop_path: '/4MCKNAc6AbWjEsM2h9Xc29owo4z.jpg',
  id: 866398,
  original_language: 'en',
  overview:
    'One man’s campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as Beekeepers.',
  popularity: 3775.726,
  poster_path: '/A7EByudX0eOzlkQ2FIbogzyazm2.jpg',
  title: 'The Beekeeper',
  vote_average: 7.248,
  vote_count: 843
};

export const MOCK_STORE = {
  initialState: initialState,
  selectors: [
    {
      selector: selectedMovieSelector,
      value: MOVIE
    },
    {
      selector: selectedMovieIdSelector,
      value: 866398
    },
    {
      selector: isLoadingMovieSelector,
      value: false
    },
    {
      selector: isLoadingSelector,
      value: false
    },
    {
      selector: moviesSelector,
      value: [MOVIE]
    },
    {
      selector: pageSelector,
      value: 1
    }
  ]
};

export const ACTIVATED_ROUTE = {
  paramMap: of({
    get() {
      return this.value;
    },
    value: '1234'
  })
};
