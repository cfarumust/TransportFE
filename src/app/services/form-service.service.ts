import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from './errorHandler.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient, private errorHandler: ErrorHandler, private storage: Storage) { }

  public url = 'https://www.mishnmash.de/order';

  sendOrder(data: any, token: string): Observable<any> {
    return this.httpClient.post<any>(this.url, data, this.getAuthHeaders(token)).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getData(): Observable<any> {
    return this.httpClient.get<any>(this.url, this.getHeaders()).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getHeaders(): { headers: HttpHeaders } {
    const headerDict = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Accept'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return requestOptions;
  }

  public getAuthHeaders(token: string): { headers: HttpHeaders } {
    const headersOptions = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Accept',
      Authorization: 'Bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headersOptions),
    };

    return requestOptions;
  }

}
