import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5090/api/order';

  constructor(private http: HttpClient, private userService: UserService) {}

  createOrder(orderData: any): Observable<any> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}`, orderData, { headers });
  }

  getUserOrders(): Observable<any> {
  const token = this.userService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<any[]>('http://localhost:5090/api/Order/OrdersForUser', { headers });
}


  getDeliveryMethods(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/DeliveryMethods`);
  }
}
