import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    console.log('token123',token)
    if(token){
      console.log(" enterting token interceptor")
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}

      })
    }
    
    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          console.log(err.url)
          if(err.status === 401 || err.status === 403){
            if(this.router.url === '/'){
              console.log("Captain America")
            }
            else{
              console.log("now with the hell")
              localStorage.clear();
              this.router.navigate(['/'])
            }

          }
        }
       return throwError(err)

      })
    );
   }
}
