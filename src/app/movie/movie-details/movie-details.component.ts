import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BAD_MOVIE_ID } from '@constants/texts';
import { ToastService } from '@services/toast.service';
import { MovieSignalStore } from '@store/movie.store';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit {
  readonly movieStore = inject(MovieSignalStore);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly toastService = inject(ToastService);

  isImgLoading = true;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id')!);
      if (Number.isNaN(id)) {
        this.toastService.showWarningToast(BAD_MOVIE_ID)
        this.router.navigate(['movie']);
        return;
      }
      this.movieStore.setSelectedMovie(id);
      if(!this.movieStore.selectedMovie()) {
        this.movieStore.loadMovie();
      }
      this.isImgLoading = true;
    });
  }

  onLoaded() {
    this.isImgLoading = false;
  }
}
