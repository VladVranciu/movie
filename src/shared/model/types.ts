export interface Pagination<T> {
  results: T[];
  page: number;
  total_pages: number;
}

export interface Movie {
  id: number;
  adult: boolean;
  original_language: string;
  overview: string;
  popularity: number;
  title: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
}

export interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  selectedMovieId: number | null;
  page: number;
  totalPages: number;
  isLoading: boolean;
  isLoadingMovie: boolean;
}
