import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  static accessToken = '';
  apiUrl : string = "https://read-it-later.onrender.com";

  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request, next)
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor.accessToken}`
      }
    });
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 403) {
        return this.http.get(`${this.apiUrl}/refresh`, {withCredentials: true}).pipe(
          switchMap( (res: any) => {
            AuthInterceptor.accessToken = res.accessToken;
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${AuthInterceptor.accessToken}`
              },
            }));
          })
        )
      }
      return throwError(()=> err);
    }));
  }
}
