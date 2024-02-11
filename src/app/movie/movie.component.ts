import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieSignalStore } from '@store/movie.store';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MovieListComponent, MovieDetailsComponent, RouterOutlet],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent  {
  readonly movieStore = inject(MovieSignalStore);

}
