import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BASE_IMAGE_URL } from '@constants/constants';
import { BAD_MOVIE_ID } from '@constants/texts';
import { UnsubscribeMixin } from '@mixins/unsubscribe.mixin';
import { Movie } from '@model/types';
import { Store } from '@ngrx/store';
import { ToastService } from '@services/toast.service';
import { combineLatest, takeUntil } from 'rxjs';
import * as MovieActions from '../store/movie.actions';
import {
  isLoadingMovieSelector,
  selectedMovieIdSelector,
  selectedMovieSelector
} from '../store/movie.selectors';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent
  extends UnsubscribeMixin()
  implements OnInit
{
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  selectedMovie: Movie | null | undefined;
  isImgLoading = true;
  isLoadingMovie = true;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(async (params: ParamMap) => {
        const paramId = params.get('id');
        const id = parseInt(paramId!);
        if (Number.isNaN(id)) {
          this.toastService.showWarningToast(BAD_MOVIE_ID);
          this.router.navigate(['movie']);
          return;
        }
        this.store.dispatch(MovieActions.setSelectedMovie({ id }));
        this.fillIsImgLoading(true);
      });

    combineLatest([
      this.store.select(selectedMovieSelector),
      this.store.select(selectedMovieIdSelector),
      this.store.select(isLoadingMovieSelector)
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([movie, id, isLoadingMovie]) => {
        if (!movie && id) {
          this.store.dispatch(MovieActions.getMovie({ id }));
        }
        this.selectedMovie = movie;
        this.cdr.detectChanges();
        this.fillIsLoadingMovie(isLoadingMovie);
      });
  }

  onLoaded() {
    this.fillIsImgLoading(false);
  }

  private fillIsLoadingMovie(value: boolean) {
    if (value !== this.isLoadingMovie) {
      this.isLoadingMovie = value;
      this.cdr.markForCheck();
    }
  }

  private fillIsImgLoading(value: boolean) {
    if (value !== this.isImgLoading) {
      this.isImgLoading = value;
      this.cdr.markForCheck();
    }
  }

  get imageSrc() {
    return `${BASE_IMAGE_URL}${this.selectedMovie?.poster_path}`;
  }
}
