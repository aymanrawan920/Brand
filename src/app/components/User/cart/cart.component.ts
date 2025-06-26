import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  cartItems: any[] = [];
  shipping = 20;
  deliveryMethods: any[] = [];
  deliveryMethodId: number = 0;
  selectedCity: string = 'Cairo';        
selectedDistrict: string = 'Nasr City'; 
  basketId: string = localStorage.getItem('BASKET_ID') || 'user-basket-id';

  constructor(
    @Inject(CartService) private cartService: CartService,
    private router: Router,
    private orderService: OrderService,private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.loadDeliveryMethods();
  }

  loadCartItems() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.cartItems = [];
      this.cart = null;
      return;
    }

    this.cartService.getCartItems(this.basketId).subscribe({
      next: (response: Cart) => {
        console.log("Cart Items from API:", this.cartItems);

        this.cart = response;
        const items = response?.basket_item?.$values || [];

       this.cartItems = Array.isArray(items)
  ? items.map(item => ({
      ...item,
      product_id: item.product_id || item.id,
      image: Array.isArray(item.image) ? item.image : ['assets/Rectangle 81.png']
    }))
  : [];



        console.log('🛒 Cart Items:', this.cartItems);
      },
      error: err => {
        console.error('❌ Failed to load cart:', err);
        this.cartItems = [];
        this.cart = null;
      }
    });
  }

  loadDeliveryMethods() {
  this.orderService.getDeliveryMethods().subscribe({
    next: (methods: any) => {
      this.deliveryMethods = methods?.$values || [];
      if (this.deliveryMethods.length > 0) {
        this.deliveryMethodId = this.deliveryMethods[0].id;
        this.shipping = this.deliveryMethods[0].price;
      }
    },
    error: err => {
      console.error('❌ Failed to load delivery methods:', err);
    }
  });
}


  get subtotal(): number {
    return this.cartItems.reduce((sum, item) =>
      sum + (item.selling_price || 0) * (item.selling_quantity || 1), 0);
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  updateQuantity(item: any, change: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('يجب تسجيل الدخول أولاً');
      this.router.navigate(['/loginuser']);
      return;
    }

    const newQuantity = item.selling_quantity + change;
    if (newQuantity < 1) return;

    const updatedItem = { ...item, selling_quantity: newQuantity };

    this.cartService.updateQuantity(updatedItem).subscribe({
      next: () => (item.selling_quantity = newQuantity),
      error: err => {
        console.error('❌ Update failed:', err);
        alert('فشل في تحديث الكمية');
      }
    });
  }

  removeItem(item: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('يجب تسجيل الدخول أولاً');
      this.router.navigate(['/loginuser']);
      return;
    }

    this.cartService.removeItem(item).subscribe({
      next: () => this.loadCartItems(),
      error: () => alert('فشل في حذف المنتج')
    });
  }

  clearCart() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('يجب تسجيل الدخول أولاً');
      this.router.navigate(['/loginuser']);
      return;
    }

    this.cartService.clearCart(this.basketId).subscribe({
      next: () => {
    console.log('🧹 Cleared corrupted cart');
    this.cartItems = [];
    this.cart = null;
    localStorage.removeItem('BASKET_ID');
    this.loadCartItems();
      },
      error: () => alert('فشل في حذف السلة')
    });
  }
  

  placeOrder(): void {
  if (!this.cartItems.length) {
    console.warn("🚫 No items in cart");
    return;
  }
  const filteredItems = this.cartItems.filter(item => item.id && item.id !== 0);

const products = filteredItems.map(item => ({
  product_id: item.id,
  quantity: item.selling_quantity
}));

  const orderPayload = {
  basketId: this.basketId,
  Address: {
    city: this.selectedCity,
    district: this.selectedDistrict,
    country: 'Egypt'
  },
  deliveryMethodId: this.deliveryMethodId,
  products: products 
};
;
  console.log('🧾 Cart Items Before Filtering:', this.cartItems);

  this.http.post('http://localhost:5090/api/order', orderPayload).subscribe({
    next: res => {
      console.log("✅ Order placed:", res);
      alert('✅ تم تنفيذ الطلب بنجاح');

     
      this.cartService.clearCart(this.basketId).subscribe({
        next: () => {
          console.log('🧹 Cart cleared after order');
          this.cartItems = [];
          this.cart = null;
          localStorage.removeItem('BASKET_ID');
          this.router.navigate(['/user-orders']);
        },
        error: err => {
          console.error('❌ Failed to clear cart after order:', err);
          alert('⚠️ تم تنفيذ الطلب، لكن لم يتم مسح السلة');
        }
      });
    },
    error: err => {
      console.error("❌ فشل تنفيذ الطلب:", err);
      alert('❌ فشل تنفيذ الطلب');
    }
  });
}

  onDeliveryMethodChange(id: number) {
    this.deliveryMethodId = id;
    const selected = this.deliveryMethods.find(method => method.id === id);
    this.shipping = selected?.price || 0;
  }
}
