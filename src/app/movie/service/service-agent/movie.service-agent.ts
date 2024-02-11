import { Injectable } from '@angular/core';
import { Movie } from '@model/types';
import { BaseServiceAgent } from '@services/base.service-agent';

const RESOURCE = 'movie';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceAgent extends BaseServiceAgent<Movie> {
  constructor() {
    super(RESOURCE);
  }
}
