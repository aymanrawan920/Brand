import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductFormData } from 'src/app/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductFormData[] = [];
  searchText = '';
  visibleProducts = 6;
  selectedCategory = 'Best Sellers';
  basket: any = null;
  basketId = localStorage.getItem('BASKET_ID') || 'user-basket-id';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.loadBasket();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response);
        this.products = response?.$values || [];
      },
      error: (err) => console.error("failed to add to cart", err)
    });
  }

  loadBasket(): void {
    this.cartService.getCartItems(this.basketId).subscribe({
      next: (basket: any) => {
        this.basket = basket;
      },
      error: (err) => {
        this.basket = null;
        console.warn('FAILED',err);
      }
    });
  }

  get filteredProducts() {
    return this.products.filter(product =>
      product.productName?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  loadMore() {
    this.visibleProducts += 6;
  }

  setActiveCategory(category: string) {
    this.selectedCategory = category;
  }

  addToCart(product: ProductFormData, quantity: number, customer: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('يجب تسجيل الدخول أولاً');
      this.router.navigate(['/loginuser']);
      return;
    }
    try {
      this.cartService.addToCart(product, quantity, customer).subscribe({
        next: () => {
          alert('Product added to cart successfully');
          this.loadBasket();
        },
        error: (err) => {
          console.error('❌ Failed to add to cart:', err);
          alert('Something went wrong. Please try again later.');
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Something went wrong.');
    }
  }
}
