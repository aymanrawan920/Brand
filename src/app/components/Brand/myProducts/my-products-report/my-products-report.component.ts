import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-products-report',
  templateUrl: './my-products-report.component.html',
  styleUrls: ['./my-products-report.component.css']
})
export class MyProductsReportComponent implements OnInit {
  searchText = '';
  currentPage = 1;
  itemsPerPage = 5;

 products: any[] = [];
  productReport: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const backendBaseUrl = 'http://localhost:5090';
    this.http.get<any>('http://localhost:5090/api/Product').subscribe({
      next: (data) => {
        const rawProducts = data?.$values ?? [];
        console.log('Raw API Response:', data);


        this.products = rawProducts.map((p: any) => ({
          name: p.productName,
          id: p.id,
          actualQuantity: p.actualQuantity,
          soldItem: p.soldItem,
          total: p.actualQuantity + p.soldItem
        }));

        this.generateProductReport();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  generateProductReport(): void {
    this.productReport = this.products.map(p => ({
      productName: p.name,
      productId: p.id,
      total: p.total,
      sold: p.soldItem,
      remaining: p.actualQuantity
    }));
  }
 filterProducts() {
  return this.productReport.filter(product =>
    (product.productName || '').toLowerCase().includes((this.searchText || '').toLowerCase())
  );
}


  get paginatedProducts() {
    const filtered = this.filterProducts();
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  getTotalPages(): number[] {
    return Array.from({ length: Math.ceil(this.filterProducts().length / this.itemsPerPage) }, (_, i) => i + 1);
  }
  
  
}



