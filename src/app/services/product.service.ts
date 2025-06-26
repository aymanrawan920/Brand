import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProductFormData } from '../interfaces/product'; 


@Injectable({ providedIn: 'root' })
export class ProductService {

private apiUrl = 'http://localhost:5090/api/Product'; 
  constructor(private http: HttpClient) {}

 addProduct(product: any): Observable<any> {
  const token = localStorage.getItem('NEW_TOKEN');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || ''}`
  });

  return this.http.post('http://localhost:5090/api/Product', product, { headers });
}



getAllProducts(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

getProducts(): Observable<ProductFormData[]> {
  return this.http.get<ProductFormData[]>('http://localhost:5090/api/Product');
}
}
