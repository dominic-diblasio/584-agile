import { HttpInterceptorFn } from '@angular/common/http';

// Auth System - New with Angular 17
export const authInterceptor: HttpInterceptorFn = (req, next) => {
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
  return next(req);
};
