import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Food } from 'src/app/interface/food';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  private foodUrl = 'https://jsonplaceholder.typicode.com/users';

  getFood(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodUrl).pipe(
      tap((d) => console.log('api response', JSON.stringify(d))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    console.log(err);
    return throwError(errorMessage);
  }
}
