import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product'; 


@Injectable({ providedIn: 'root' })
export class ProductService {

private apiUrl = 'https://localhost:7053/api/Product'; 
  constructor(private http: HttpClient) {}

 addProduct(product: any): Observable<any> {
  const token = localStorage.getItem('NEW_TOKEN');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || ''}`
  });

  return this.http.post('https://localhost:7053/api/Product', product, { headers });
}



getAllProducts(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
}
