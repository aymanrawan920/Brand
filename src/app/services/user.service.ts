
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { Signup } from '../interfaces/signup';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl='https://localhost:7053/api/Account';
  constructor(private http: HttpClient) {}

  loginCustomer(data: Login):Observable<Login[]> {
    return this.http.post<Login[]>(`${this.apiUrl}/Login/customer`,data);
    
  }
  
  registerCustomer(data: Signup):Observable<Signup[]> {
    return this.http.post<Signup[]>(`${this.apiUrl}/register/customer`,data);
  }

  loginBrand(data: Login): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${this.apiUrl}/Login/brand`, data);
}
  
}
