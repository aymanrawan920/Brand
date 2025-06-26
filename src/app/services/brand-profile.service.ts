// src/app/services/brand-profile.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandProfileService {
  private baseUrl = 'http://localhost:5090/api';

  constructor(private http: HttpClient) {}

  getBrandProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Account/GetCurrentUser`).pipe(
      switchMap(user => {
        const brandId = user.brandId;
        if (!brandId) return throwError(() => new Error('No brandId found for user'));

        return this.http.get<any>(`${this.baseUrl}/brands/${brandId}`);
      }),
      catchError(error => {
        console.error('Failed to load brand profile:', error);
        return throwError(() => error);
      })
    );
  }
}
