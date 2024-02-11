import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getHumanReadableError } from '@helpers/helper';
import { ToastService } from '@services/toast.service';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = 'https://api.themoviedb.org/3/';

export const APIInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);
  const params = req.params.set('api_key', environment.API_KEY);
  return next(
    req.clone({
      url: `${API_URL}${req.url}`,
      params
    })
  ).pipe(
    catchError((error) => {
      toastService.showErrorToast(getHumanReadableError(error.error));
      router.navigate(['movies'])
      return of();
    })
  );
};
