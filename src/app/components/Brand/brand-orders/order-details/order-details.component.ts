import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  orderId!: number;

  constructor(private route: ActivatedRoute, private orderService: OrdersService) {}

  ngOnInit(): void {
  const orderId = this.route.snapshot.paramMap.get('id');
  if (orderId) {
    this.orderService.getOrderById(+orderId).subscribe({
      next: (order) => this.order = order,
      error: (err) => console.error('Error fetching order details:', err)
    });
  }
}


  getOrderDetails() {
    this.orderService.getOrderById(1).subscribe({
      next: (res: any) => {
        this.order = res;
        console.log('Fetched order details:', res);
      },
      error: (err: any) => {
        console.error('Error fetching order details:', err);
      }
    });
  

  }}
