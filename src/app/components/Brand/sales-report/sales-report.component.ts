import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  brandId!: number;
  reportMonth!: number;
  reportYear!: number;
  

  orders: any[] = [];
  filteredOrders: any[] = [];

  totalProductsSold: number = 0;
  totalProfit: number = 0;
  totalSales: number = 0;
  brandName: string = '';


  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
     this.brandName = localStorage.getItem('brandName') || 'Your Brand';
console.log("Brand Name:", this.brandName);


    this.route.paramMap.subscribe(params => {
  const brandIdParam = params.get('brandId');
  const monthParam = params.get('month');
  const yearParam = params.get('year');

  this.brandId = brandIdParam ? +brandIdParam : 0;
  this.reportMonth = monthParam ? +monthParam : 0;
  this.reportYear = yearParam ? +yearParam : 0;

  console.log("Params:", this.brandId, this.reportMonth, this.reportYear);



      if (brandIdParam && monthParam && yearParam) {
        this.brandId = +brandIdParam;
        this.reportMonth = +monthParam;
        this.reportYear = +yearParam;

        console.log("Params:", this.brandId, this.reportMonth, this.reportYear);
        this.loadOrders();
      } else {
        console.error('Missing or invalid route parameters:', { brandIdParam, monthParam, yearParam });
      }
    });
  }

  loadOrders() {
  this.orderService.getOrdersForBrand(this.brandId).subscribe((data) => {
    console.log('Raw Orders Response:', data);

    const orders = (data as any).$values || [];
    console.log('Parsed Orders:', orders);
    console.log('Order Sample:', orders[0]); // Check structure

    this.orders = orders;

    const filtered = this.orders.filter((order: any) => {
      const orderDate = new Date(order.orderDate);
      return (
        orderDate.getFullYear() === this.reportYear &&
        orderDate.getMonth() + 1 === this.reportMonth
      );
    });

    // Save filtered orders for table use
    this.filteredOrders = filtered;

    this.totalProductsSold = filtered.reduce((sum, item) => {
      const orderProducts = item.orderProducts?.$values || [];
      return sum + orderProducts.reduce((pSum: number, p: any) => pSum + (p?.quentity || 0), 0);
    }, 0);

    this.totalProfit = filtered.reduce((sum, item) => {
      const orderProducts = item.orderProducts?.$values || [];
      return sum + orderProducts.reduce((pSum: number, p: any) => pSum + (p?.quentity || 0) * (p?.price || 0), 0);
    }, 0);
  });
}


  getOrderProfit(order: any): number {
  const products = order.orderProducts?.$values || [];
  return products.reduce((sum: number, p: any) => {
    return sum + (p?.quentity || 0) * (p?.price || 0);
  }, 0);
}

getOrderQuantity(order: any): number {
  const products = order.orderProducts?.$values || [];
  return products.reduce((sum: number, p: any) => {
    return sum + (p?.quentity || 0);
  }, 0);
}

getPaymentMethod(order: any): string {
  switch (order.paymentIntent) {
    case 0: return 'Cash';
    case 1: return 'Card';
    case 2: return 'Paymob';
    default: return 'Unknown';
  }
}



}
