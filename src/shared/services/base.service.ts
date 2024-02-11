import { CrudOperationsInterface } from '@model/crud-operations.interface';
import { Pagination } from '@model/types';
import { Observable } from 'rxjs';
import { BaseServiceAgent } from './base.service-agent';

const popularityFilter = {
  sort_by: 'popularity.desc',
  language: 'en-US'
};

export abstract class BaseService<T> implements CrudOperationsInterface<T> {
  constructor(private serviceAgent: BaseServiceAgent<T>) {}

  getPaginatedList(
    filter?: Record<string, string | number>
  ): Observable<Pagination<T>> {
    return this.serviceAgent.getPaginatedList({
      ...filter,
      ...popularityFilter
    });
  }

  getModel(id: number): Observable<T> {
    return this.serviceAgent.getModel(id);
  }
}
