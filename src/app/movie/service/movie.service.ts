import { Injectable } from '@angular/core';
import { Movie } from '@model/types';
import { BaseService } from '@services/base.service';
import { MovieServiceAgent } from './service-agent/movie.service-agent';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends BaseService<Movie> {
    constructor(private movieServiceAgent: MovieServiceAgent) {
      super(movieServiceAgent)
    }
}
