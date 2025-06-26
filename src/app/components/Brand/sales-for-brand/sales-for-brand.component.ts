import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-sales-for-brand',
  templateUrl: './sales-for-brand.component.html',
  styleUrls: ['./sales-for-brand.component.css'],
})
export class SalesForBrandComponent implements OnInit {
  salesData: any[] = [];
  searchQuery: string = '';
  selectedMonth: string = '';
  totalProductsSold: number = 0;
  brandId: number = 0;


  constructor(private orderService: OrdersService ,private router: Router) {}

  ngOnInit(): void {
  this.brandId = 1; 

  this.orderService.getOrdersForBrand(this.brandId).subscribe((data) => {
    const orders = (data as any).$values;

    this.salesData = orders.map((order: any) => {
      const products = order.orderProducts?.$values || [];

      const purchased = products.reduce((sum: number, p: any) => sum + (p?.quentity || 0), 0);
      const profit = products.reduce((sum: number, p: any) => sum + (p?.quentity || 0) * (p?.price || 0), 0);

      let rawDate = order.orderDate;
      let month = 'Unknown';
      if (rawDate) {
        const date = new Date(rawDate);
        if (!isNaN(date.getTime())) {
          month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        }
      }

      return {
        name: order.buyerEmaiil || 'Unknown',
        date: rawDate,
        month,
        purchased,
        sales: 1,
        profit,
      };
    });

    this.totalProductsSold = this.salesData.reduce((sum, s) => sum + (s.purchased || 0), 0);
  });
}

  filteredData(): any[] {
  return this.salesData
    .filter(item => {
      const matchesSearch = this.searchQuery === '' ||
        (item.name && item.name.toLowerCase().includes(this.searchQuery.toLowerCase()));

      const matchesMonth = this.selectedMonth === '' ||
        (item.date && item.date.startsWith(this.selectedMonth)); 

      return matchesSearch && matchesMonth;
    })
    .map(item => {
      const date = new Date(item.date);
      const month = isNaN(date.getTime())
        ? 'Unknown'
        : date.toLocaleString('default', { month: 'short', year: 'numeric' });

      return {
        ...item,
        month,
      };
    });
}

goToReport(sale: any) {
  const date = new Date(sale.date);
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  console.log({ brandId: this.brandId, currentMonth, currentYear });

  if (!this.brandId || !currentMonth || !currentYear) {
    console.error('Missing parameter(s). Aborting navigation.');
    return;
  }

  this.router.navigate(['/brand-sales-report', this.brandId, currentMonth, currentYear]);
}





  pageSize: number = 5;
currentPage: number = 1;

get totalPages(): number {
  return Math.ceil(this.filteredData().length / this.pageSize);
}

get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

goToPage(page: number) {
  this.currentPage = page;
}

previousPage() {
  if (this.currentPage > 1) this.currentPage--;
}

nextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
}

get pagedData() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredData().slice(start, start + this.pageSize);
}

}
