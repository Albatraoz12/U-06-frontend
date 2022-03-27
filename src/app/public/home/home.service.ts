import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Food } from 'src/app/interface/food';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  private foodUrl = 'https://jsonplaceholder.typicode.com';

  getFood(): Observable<Food[]> {
    return this.httpClient
      .get<Food[]>(this.foodUrl + '/users/')
      .pipe(catchError(this.errorHandler));
  }

  find(id: string | number): Observable<Food> {
    return this.httpClient
      .get<Food>(this.foodUrl + '/users/' + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  // private handleError(err: HttpErrorResponse) {
  //   let errorMessage = '';
  //   console.log(err);
  //   return throwError(errorMessage);
  // }
}
