import { computed, inject } from '@angular/core';
import { MovieService } from '@app/movie/service/movie.service';
import { BASE_IMAGE_URL } from '@constants/constants';
import { MovieState } from '@model/types';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';

export const MovieSignalStore = signalStore(
  { providedIn: 'root' },
  withState<MovieState>({
    movies: [],
    selectedMovie: null,
    selectedMovieId: null,
    page: 1,
    totalPages: -1,
    isLoading: false,
    isLoadingMovie: false
  }),
  withMethods((store, movieService = inject(MovieService)) => ({
    loadMovies: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          movieService.getPaginatedList({ page: store.page() }).pipe(
            tap((response) => {
              const {
                results: movies,
                total_pages: totalPages,
                page
              } = response;
              patchState(store, { movies, totalPages, page, isLoading: false });
            })
          )
        )
      )
    ),
    loadMovie: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoadingMovie: true })),
        switchMap(() =>
          movieService.getModel(store.selectedMovieId()!).pipe(
            tap((selectedMovie) => {
              patchState(store, { selectedMovie, isLoadingMovie: false });
            }),
            catchError((err) => {
              patchState(store, { isLoadingMovie: false });
              return of(err);
            })
          )
        )
      )
    ),
    setSelectedMovie: (id: number) => {
      const selectedMovie = store.movies().find((movie) => movie.id === id);
      const isLoadingMovie = !selectedMovie
      patchState(store, { selectedMovie, selectedMovieId: id, isLoadingMovie });
    },
    setPage: (page: number) => {
      patchState(store, { page });
      localStorage.setItem('page', JSON.stringify(page));
    }
  })),
  withComputed((store) => ({
    selectedImageSrc: computed(
      () => `${BASE_IMAGE_URL}${store.selectedMovie()?.poster_path}`
    )
  })),
  withHooks({
    onInit: (store) => {
      const page = parseInt(localStorage.getItem('page') || '1');
      patchState(store, { page });
      store.loadMovies();
    }
  })
);
