


import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormData } from 'src/app/interfaces/product';
import { FavoritesService } from 'src/app/services/favourites.service';
import { CartService } from 'src/app/services/cart.service'; 
import { Router } from '@angular/router';

interface ProductViewModel extends ProductFormData {
  favorited: boolean;
  rating: number;
  reviews: number;
  isNew: boolean;
  isDiscounted: boolean;
}

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  allProducts: ProductViewModel[] = [];
  filteredProducts: ProductViewModel[] = [];
  filterText: string = '';
  filterBy: string = 'all';
  showFilterPanel = false;
  isAdding = false;
  product!: ProductFormData;
   basket: any = null;
  basketId = localStorage.getItem('BASKET_ID') || 'user-basket-id';


  constructor(
    private productService: ProductService,
   private favoriteService: FavoritesService,
   private cartService: CartService,
   private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }



loadProducts() {
  this.productService.getAllProducts().subscribe({
    next: (response: any) => {
      const productsArray = response?.$values;

      if (!Array.isArray(productsArray)) {
        console.error('Unexpected response format:', response);
        return;
      }

    this.allProducts = productsArray.map((p: ProductFormData) => {
  const isFav = this.favoriteService.isFavorite(p.id);
  const BASE_IMAGE_URL = 'http://localhost:5090';

  const imageUrl = p.picturlUrl
    ? (p.picturlUrl.startsWith('http') ? p.picturlUrl : `${BASE_IMAGE_URL}${p.picturlUrl}`)
    : 'assets/placeholder.png';

  return {
    ...p,
    favorited: isFav,
    rating: Math.floor(Math.random() * 5) + 1,
    reviews: Math.floor(Math.random() * 100),
    isNew: false,
    isDiscounted: p.discountPercentage > 0,
    image: imageUrl
  };
});


      this.filteredProducts = this.allProducts;
    },
    error: (err) => {
      console.error('Error loading products:', err);
    }
  });
}


toggleFavorite(product: ProductFormData) {
  this.favoriteService.toggleFavorite(product);
}




  getStars(rating: number): any[] {
    return Array(rating);
  }


  toggleFilterPanel() {
    this.showFilterPanel = !this.showFilterPanel;
  }

  filterByBadge(filterType: string) {
    this.filterBy = filterType;

    if (filterType === 'all') {
      this.filteredProducts = this.allProducts;
    } else if (filterType === 'new') {
      this.filteredProducts = this.allProducts.filter(product => product.isNew);
    } else if (filterType === 'discount') {
      this.filteredProducts = this.allProducts.filter(product => product.isDiscounted);
    }
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
          this.router.navigate(['/cart']);
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
