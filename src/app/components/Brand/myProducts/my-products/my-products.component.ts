import { HttpClient } from '@angular/common/http';
import { Component  ,OnInit} from '@angular/core';



@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit{
  
  products: any[] = [];
  searchText = '';
  selectedProduct: any = null;
  isLoading = true;
  errorMessage = '';
  showLimitPopup = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const backendBaseUrl = 'http://localhost:5090';

    this.http.get<any>('http://localhost:5090/api/Product').subscribe({
      next: (data) => {
        const rawProducts = data?.$values ?? data ?? [];

        this.products = rawProducts.map((p: any) => {
          let picturlUrl = p.picturlUrl ?? '';
          if (picturlUrl && !picturlUrl.startsWith('/')) {
            picturlUrl = '/' + picturlUrl;
          }

          const imageUrl = picturlUrl
            ? backendBaseUrl + picturlUrl
            : 'assets/Ellipse_1_2.png';

          return {
            id: p.id,
            name: p.productName,
            image: imageUrl,
            price: p.sellingPrice,
            colors: ['#000', '#f0f', '#0f0', '#0ff', '#00f', '#f00'],
            brandId: p.brandId
          };
        });

        // 🔔 Show popup if 10 or more products loaded
        if (this.products.length >= 10) {
          this.showLimitPopup = true;
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }

  handleAddClick(): void {
  if (this.products.length >= 10) {
    this.showLimitPopup = true;
  }
}


  filteredProducts(): any[] {
    return this.products.filter(p =>
      (!this.searchText || p.name.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  showProductDetails(product: any): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  confirmDelete(product: any): void {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.deleteProduct(product.id);
    }
  }

  deleteProduct(productId: number): void {
    this.http.delete(`http://localhost:5090/api/Product/${productId}`).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
        this.selectedProduct = null;
        alert('Product deleted successfully.');
      },
      error: (err) => {
        console.error('Failed to delete product', err);
        alert('Failed to delete product.');
      }
    });
  }

  closePopup(): void {
    this.showLimitPopup = false;
  }
}




   


  


