import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  httpOptions = {
    headers: this.getApiHeaders(),
    credentials: 'include',
  };
  constructor(private _http: HttpClient) {}

  getApiHeaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers
      .set('Content-Type', 'application/json')
      .set('Access-Control-Request-Headers', '*')
      .set('Access-Control-Request-Method', '*')
      .set('pragma', 'no-cache')
      .set('cache-control', 'no-cache')
      .set('timeout', `${environment.timeout}`)
      .set('withCredentials', 'true');
    return headers;
  }

  get(apiUrl: string, customHeaders: any = null) {
    customHeaders &&
      customHeaders.forEach((h: any) => {
        this.httpOptions.headers.set(h.key, h.value);
      });

    return this._http.get(apiUrl, this.httpOptions).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  post(apiUrl: string, data: any) {
    return this._http.post(apiUrl, data, this.httpOptions).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
