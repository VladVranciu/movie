import { Observable } from 'rxjs';
import { Pagination } from './types';

export interface CrudOperationsInterface<T> {
  getPaginatedList(
    filter: Record<string, string | number>
  ): Observable<Pagination<T>>;

  getModel(id: number): Observable<T>
}
