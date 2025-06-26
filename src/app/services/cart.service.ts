

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ProductFormData } from '../interfaces/product';

@Injectable({ providedIn: 'root' })
export class CartService {
 private apiUrl = 'http://localhost:5090/api/Cart';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getCartItems(basketId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${basketId}`, { headers: this.getHeaders() }).pipe(
      catchError(error => throwError(() => new Error('فشل في تحميل السلة')))
    );
  }


  addMultipleToCart(products: ProductFormData[], customer: any): Observable<any> {
    const basketId = localStorage.getItem('BASKET_ID') || 'user-basket-id';
    return this.getCartItems(basketId).pipe(
      switchMap(cart => {
        const items = cart.basket_item?.$values || [];
        for (let product of products) {
  if (!product.id || product.id === 0) {
    console.warn('⛔ Skipping invalid product', product);
    continue;
  }

  const existing = items.find((i: any) => i.product_name === product.productName);

  if (existing) {
    existing.selling_quantity += 1;
  } else {
    items.push({
      id: product.id,
      product_name: product.productName ?? 'اسم غير معروف',
      category: 'فئة غير معروفة',
      image: product.image ? [product.image] : ['no-image.jpg'],
      selling_price: product.sellingPrice ?? 0,
      selling_quantity: 1,
      brand: 'بدون علامة تجارية'
    });
  }
}

        const payload = {
          id: basketId,
          basket_item: items,
          customerName: customer?.name ?? '',
          customerEmail: customer?.email ?? '',
          customerPhone: customer?.phone ?? '',
          paymentIntentId: null,
          clientSecret: null,
          deliveryMethodId: null
        };

        localStorage.setItem('BASKET_ID', basketId);

        return this.http.post<any>(this.apiUrl, payload, { headers: this.getHeaders() }).pipe(
          catchError(error => {
            console.error('❌ فشل في إرسال كل المنتجات:', error);
            return throwError(() => new Error('فشل في إرسال كل المنتجات'));
          })
        );
      })
    );
  }
  

  addToCart(product: any, quantity: number, customer: any): Observable<any> {
  const basketId = localStorage.getItem('BASKET_ID');

  const initial$ = basketId
    ? this.getCartItems(basketId)
    : of({ basket_item: { $values: [] }, id: 'user-basket-id' });

  return initial$.pipe(
    switchMap(cart => {
      const id = cart.id || 'user-basket-id';
      const items = cart.basket_item?.$values || [];

      const existing = items.find((i: any) => i.product_name === product.productName);

      if (existing) {
  existing.selling_quantity += quantity;
} else{

  console.log("🆔 Adding product ID:", product.id);
if (!product.id) {
  console.error("❌ Product is missing valid ID:", product);
}

        items.push({
   id: product.id,  
  product_name: product.product_name ?? product.productName ?? 'اسم غير معروف',
  category: typeof product.category === 'string'
    ? product.category
    : (product.category?.name ?? 'فئة غير معروفة'),
  image: product.image ? [product.image] : ['no-image.jpg'],
  selling_price: product.sellingPrice ?? 0,
  selling_quantity: 1,
  brand: typeof product.brand === 'string'
    ? product.brand
    : (product.brand?.brand_name ?? product.brand?.name ?? 'بدون علامة تجارية')
});
      }

      const payload = {
        id,
        basket_item: items,
        customerName: customer?.name ?? '',
        customerEmail: customer?.email ?? '',
        customerPhone: customer?.phone ?? '',
        paymentIntentId: null,
        clientSecret: null,
        deliveryMethodId: null
      };

      localStorage.setItem('BASKET_ID', id);

      return this.http.post<any>(this.apiUrl, payload, { headers: this.getHeaders() }).pipe(
        catchError(error => {
          console.error('❌ فشل في إضافة أو تحديث المنتج:', error);
          return throwError(() => new Error('فشل في إضافة أو تحديث المنتج'));
        })
      );
    })
  );
}


  updateQuantity(updatedItem: any): Observable<any> {
    const basketId = localStorage.getItem('BASKET_ID') || 'user-basket-id';

    return this.getCartItems(basketId).pipe(
      switchMap(cart => {
        const items = cart.basket_item?.$values || [];

        const updatedItems = items.map((item: any) => {
          if (item.product_name === updatedItem.product_name) {
            return { ...item, selling_quantity: updatedItem.selling_quantity };
          }
          return item;
        });

        const updatedCart = {
          id: basketId,
          basket_item: updatedItems,
          customerName: cart.customerName ?? '',
          customerEmail: cart.customerEmail ?? '',
          customerPhone: cart.customerPhone ?? '',
          paymentIntentId: null,
          clientSecret: null,
          deliveryMethodId: null
        };

        return this.http.post<any>(this.apiUrl, updatedCart, { headers: this.getHeaders() }).pipe(
          catchError(error => {
            console.error('❌ فشل في تحديث الكمية:', error);
            return throwError(() => new Error('فشل في تحديث الكمية'));
          })
        );
      })
    );
  }

  // ✅ حذف عنصر من السلة
removeItem(item: any): Observable<any> {
  const basketId = localStorage.getItem('BASKET_ID') || '';

  return this.getCartItems(basketId).pipe(
    switchMap(cart => {
      const items = cart.basket_item?.$values || [];

      // حذف العنصر بناءً على الاسم (أو ممكن ID لو عندك لاحقًا)
      const updatedItems = items.filter((i: any) => i.product_name !== item.product_name);

      const updatedCart = {
        id: basketId,
        basket_item: updatedItems,
        customerName: cart.customerName ?? '',
        customerEmail: cart.customerEmail ?? '',
        customerPhone: cart.customerPhone ?? '',
        paymentIntentId: cart.paymentIntentId ?? null,
        clientSecret: cart.clientSecret ?? null,
        deliveryMethodId: cart.deliveryMethodId ?? null
      };

      return this.http.post<any>(this.apiUrl, updatedCart, { headers: this.getHeaders() }).pipe(
        catchError(error => {
          console.error('❌ فشل في حذف المنتج:', error);
          return throwError(() => new Error('فشل في حذف المنتج'));
        })
      );
    })
  );
}


  // ✅ حذف السلة بالكامل
  clearCart(basketId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?Id=${basketId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('❌ فشل في حذف السلة بالكامل:', error);
        return throwError(() => new Error('فشل في حذف السلة بالكامل'));
      })
    );
  }


}
