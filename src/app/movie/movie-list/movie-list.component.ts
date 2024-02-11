import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { UnsubscribeMixin } from '@mixins/unsubscribe.mixin';
import { Movie } from '@model/types';
import { Store } from '@ngrx/store';
import { combineLatest, takeUntil } from 'rxjs';
import * as MovieActions from '../store/movie.actions';
import {
  isLoadingSelector,
  moviesSelector,
  pageSelector,
  selectedMovieIdSelector
} from '../store/movie.selectors';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent extends UnsubscribeMixin() implements OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  isLoading = true;
  selectedCurrentPage: number = 1;
  selectedMovieId: number | null | undefined;
  movies: Movie[] = [];
  ngOnInit(): void {
    combineLatest([
      this.store.select(selectedMovieIdSelector),
      this.store.select(pageSelector),
      this.store.select(isLoadingSelector),
      this.store.select(moviesSelector)
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([id, page, isLoading, movies]) => {
        this.movies = movies;
        this.selectedMovieId = id;
        this.selectedCurrentPage = page;
        this.fillIsLoading(isLoading);
      });
  }

  selectMovie(id: number) {
    this.store.dispatch(MovieActions.setSelectedMovie({ id }));
    this.router.navigate(['movie', id]);
  }

  onPageChange(page: number) {
    this.store.dispatch(MovieActions.setPage({ page }));
    this.store.dispatch(MovieActions.getMovies());
  }

  tryAgain() {
    this.store.dispatch(MovieActions.getMovies());
  }

  private fillIsLoading(value: boolean) {
    if (value !== this.isLoading) {
      this.isLoading = value;
      this.cdr.markForCheck();
    }
  }
}
