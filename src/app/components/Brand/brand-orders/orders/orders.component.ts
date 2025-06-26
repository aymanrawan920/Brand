import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  

  orders: any[] = []; 
  page: number = 1;
  itemsPerPage: number = 5;
  searchTerm = '';
selectedMonth = '';


  constructor(private ordersService: OrdersService ,private router: Router) {}

 ngOnInit(): void {
  this.loadBrandOrders();
}

loadBrandOrders() {
  this.ordersService.getOrdersForBrand(1).subscribe
({
    next: (data:any) => {
      console.log('Brand orders received:', data); 
      this.orders = data?.$values ?? [];
       console.log('Loaded orders array:', this.orders);
       
    },
    error: (err) => {
      console.error('Failed to fetch brand orders:', err);
       this.orders = [];
    }
  });
}

get filteredOrders() {
  const result = this.orders.filter(order => {
    console.log('Checking order:', order);

    const name = order.customerName?.toLowerCase() || '';
    const search = this.searchTerm.toLowerCase();

    const matchesSearch = !this.searchTerm || name.includes(search);
    const matchesMonth = this.selectedMonth
      ? new Date(order.orderDate).toISOString().slice(0, 7) === this.selectedMonth
      : true;

    return matchesSearch && matchesMonth;
  });

  console.log('Filtered result:', result);
  return result;
}


viewOrderDetails(orderId: number) {
  this.router.navigate(['/order-details', orderId]);
}

}
