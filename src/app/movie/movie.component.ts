import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MovieActions from './store/movie.actions';
import { doesNotHaveSelectedMovie } from './store/movie.selectors';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {
  doesNotHaveSelectedMovie$: Observable<boolean> | undefined;
  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.dispatch(MovieActions.getMovies());
    this.doesNotHaveSelectedMovie$ = this.store.select(
      doesNotHaveSelectedMovie
    );
  }
}
