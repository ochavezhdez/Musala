import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `${error.error}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  register(object: any): Observable<any> {
    return this.httpClient.post(this.SERVER_URL + 'register', object).pipe(catchError(this.handleError));
  }

  authenticate(object: any): Observable<any> {
    return this.httpClient.post(this.SERVER_URL + 'authenticate', object).pipe(catchError(this.handleError));
  }

  getRequest(url: string): Observable<any> {
    return this.httpClient.get(this.SERVER_URL + url).pipe(catchError(this.handleError));
  }

  getRequestById(url: string, id: number): Observable<any> {
    return this.httpClient.get(this.SERVER_URL + url + id).pipe(catchError(this.handleError));
  }

  postRequest(url: string, objeto: any): Observable<any> {
    return this.httpClient.post(this.SERVER_URL + url, objeto).pipe(catchError(this.handleError));
  }

  putRequest(url: string, objeto: any): Observable<any> {
    return this.httpClient.put(this.SERVER_URL + url + objeto.id, objeto).pipe(catchError(this.handleError));
  }

  deleteRequest(url: string, id: number): Observable<any> {
    return this.httpClient.delete(this.SERVER_URL + url + id).pipe(catchError(this.handleError));
  }

}
