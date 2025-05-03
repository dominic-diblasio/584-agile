import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Auth System - New with Angular 17
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  let jwt = localStorage.getItem("c584_jwt");
  if(jwt) {
    req = req.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );
  }
  return next(req).pipe(catchError(error => {
    // In the case of unauthorized, reroute to /login
    if(error instanceof HttpErrorResponse && error.status === 401)
    {
      router.navigate(["/login"]);
    }
    // throwError to pass forward out of pipe
    return throwError(() => error);
  }));
};
