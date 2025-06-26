import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = ''; 

  constructor(private http: HttpClient) {}

 getOrdersForBrand(brandId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:5090/api/Order/getAllOrdersForBrand?brandId=${brandId}`);
}


getOrderById(id: number): Observable<Order> {
  const token = localStorage.getItem('NEW_TOKEN');
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

return this.http.get<Order>(`http://localhost:5090/api/Order/${id}`, { headers });

}





}
