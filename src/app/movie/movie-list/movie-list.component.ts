import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorComponent } from '@components/paginator/paginator.component';
import { MovieSignalStore } from '@store/movie.store';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  standalone: true,
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginatorComponent]
})
export class MovieListComponent {
  readonly movieStore = inject(MovieSignalStore);
  readonly router = inject(Router);

  selectMovie(id: number) {
    this.movieStore.setSelectedMovie(id);
    this.router.navigate(['movie', id]);
  }

  onPageChange($event: number) {
    this.movieStore.setPage($event);
    this.movieStore.loadMovies();
  }

  tryAgain() {
    this.movieStore.loadMovie();
  }
}
