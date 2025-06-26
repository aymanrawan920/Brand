import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductFormData } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

   basket: any = null;
  basketId = localStorage.getItem('BASKET_ID') || 'user-basket-id';

  @Input() product!: ProductFormData;
   constructor(
      private cartService: CartService,
      private router: Router,
      private favoriteService: FavoritesService
    ) {}


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


  toggleFavorite(product: ProductFormData) {
  this.favoriteService.toggleFavorite(product);
}

}
