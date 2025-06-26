// favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favourites.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductFormData } from 'src/app/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteProducts: ProductFormData[] = [];
  isMovingAll: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const favs = this.favoritesService.getFavorites();
    this.favoriteProducts = favs.map(product => ({
      ...product,
      favorited: true,
      rating: product.rating ?? Math.floor(Math.random() * 5) + 1,
      reviews: product.reviews ?? Math.floor(Math.random() * 100),
      isNew: product.isNew ?? false,
      isDiscounted: product.discountPercentage > 0
    }));
  }

  toggleFavorite(product: any) {
    this.favoritesService.toggleFavorite(product);
    this.favoriteProducts = this.favoritesService.getFavorites();
  }

  moveAllToCart() {
    if (!this.favoriteProducts.length) return;

    this.isMovingAll = true;

    const customer = {
      name: 'اسم العميل',
      email: 'email@example.com',
      phone: '0123456789'
    };

    this.cartService.addMultipleToCart(this.favoriteProducts, customer).subscribe({
      next: () => {
        this.isMovingAll = false;
        alert('✅ All addea to cart');
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        this.isMovingAll = false;
        console.error('❌ فشل:', err.message);
        alert('⚠️Fail to add to cart');
      }
    });
  }

  getStars(rating: number): any[] {
    return Array(rating);
  }
}
