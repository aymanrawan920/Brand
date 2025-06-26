import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: any[] = [];
  pagedOrders: any[] = [];
  selectedOrder: any = null;
  pageSize = 4;
  currentPage = 1;
  totalPages = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (ordersResponse) => {
        console.log('📦 Raw Orders Response:', ordersResponse);
  const rawOrders = ordersResponse?.$values || [];
  this.orders = rawOrders.map((o: any, i: number) => {
    const products = o.orderProducts?.$values?.map((p: any) => ({
      productName: p.productName || 'Unknown',
      pictureUrl: `http://localhost:5090${p.pictureUrl}`,
      price: p.price,
      quentity: p.quentity
    })) || [];

    return {
      ...o,
      orderNumber: 235 + i,
      date: new Date(o.orderDate || Date.now()).toLocaleString(),
      imageUrl: products[0]?.pictureUrl || 'assets/sample-product.jpg',
      rating: Math.floor(Math.random() * 6),
      products
    };
  });



  this.totalPages = Math.ceil(this.orders.length / this.pageSize);
  this.setPagedOrders();
},
      error: (err) => {
        if (err.status === 404 && err.error === 'There is no order for this User') {
          this.orders = [];
          this.pagedOrders = [];
          this.totalPages = 0;
        } else {
          console.error('Failed to load orders', err);
        }
      }
    });
  }

  setPagedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedOrders = this.orders.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.setPagedOrders();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) this.changePage(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.changePage(this.currentPage + 1);
  }

  get pageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  viewOrderDetails(order: any): void {
    this.selectedOrder = order;
  }

  sortRecent(): void {
    this.orders.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.setPagedOrders();
  }
}
