

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormData } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  allProducts: ProductFormData[] = [];
  salesProducts: ProductFormData[] = [];
  bestSellingProducts: ProductFormData[] = [];
   basket: any = null;
  basketId = localStorage.getItem('BASKET_ID') || 'user-basket-id';


  newArrivals = [
    {
      name: "Water bottle",
      description: "High quality thermal bottle",
      image: "assets/Rectangle 78.png",
    },
    {
      name: "T-shirt",
      description: "100% cotton summer t-shirt",
      image: "assets/Rectangle 79.png",
    },
    {
      name: "glasses",
      description: "High quality sunglasses",
      image: "assets/Rectangle 80.png",
    },
    {
      name: "Mobile",
      description: "iPhone xs max",
      image: "assets/Rectangle 81.png",
    }
  ];

  constructor(private productService: ProductService, private cartService: CartService,
      private router: Router , private favoriteService: FavoritesService) {}

ngOnInit(): void {
  const BASE_IMAGE_URL = 'http://localhost:5090'; 

  this.productService.getAllProducts().subscribe((response: any) => {
    const products: ProductFormData[] = response.$values || [];
    console.log("All Products:", products);

    this.allProducts = products.map(p => {
      const discount = this.calculateDiscount(p.costPrice, p.sellingPrice);

      const imageUrl = p.picturlUrl
        ? (p.picturlUrl.startsWith('http') ? p.picturlUrl : `${BASE_IMAGE_URL}${p.picturlUrl}`)
        : 'assets/placeholder.png';

      return {
        ...p,
        discountPercentage: discount,
        image: imageUrl 
      };
    });

    this.allProducts.forEach(p => {
      console.log(`🧾 ${p.productName}: Cost = ${p.costPrice}, Selling = ${p.sellingPrice}, Discount = ${p.discountPercentage}%, Image = ${p.image}`);
    });

    this.salesProducts = this.allProducts.filter(p =>
      p.costPrice && p.sellingPrice && p.costPrice > p.sellingPrice
    );

    this.bestSellingProducts = this.allProducts.filter(p => (p.soldItem || 0) > 5);
    

    console.log("Sales Products:", this.salesProducts);
    console.log("Best Selling Products:", this.bestSellingProducts);
    console.log("Total Products:", this.allProducts.length);
    console.log("Sales Count:", this.salesProducts.length);
    console.log("Best Sellers Count:", this.bestSellingProducts.length);
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
          console.log('Adding product to cart:', product);

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


calculateDiscount(cost: number, selling: number): number {
  if (!cost || !selling || cost <= selling) return 0;
  return Math.round(((cost - selling) / cost) * 100);
}


toggleFavorite(product: ProductFormData) {
  this.favoriteService.toggleFavorite(product);
}

}
