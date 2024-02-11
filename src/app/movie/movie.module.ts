import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieComponent } from './movie.component';
import { ComponentsModule } from '@components/components.module';
import { MessageService } from 'primeng/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/movie.reducer';
import { MovieEffects } from './store/movie.effects';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'movie',
    component: MovieComponent,
    children: [{ path: ':id', component: MovieDetailsComponent }]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ComponentsModule,
    StoreModule.forFeature('movie', reducer),
    EffectsModule.forFeature([MovieEffects]),
    CommonModule
  ],
  declarations: [MovieComponent, MovieDetailsComponent, MovieListComponent],
  providers: [MessageService]
})
export class MovieModule {}
