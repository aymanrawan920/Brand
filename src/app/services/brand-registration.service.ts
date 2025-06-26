
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register2Brand } from '../interfaces/register-2-brand';
import { RegisterBrand } from '../interfaces/register-brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandRegistrationService {
  private apiUrl='http://localhost:5090/api';

    constructor(private http: HttpClient) {}
    
  registerBrand(data: RegisterBrand):Observable<RegisterBrand[]> {
      return this.http.post<RegisterBrand[]>(`${this.apiUrl}/Account/register/brand`,data);
    }

   addBrand(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/brands`, formData);
}
  



   }
