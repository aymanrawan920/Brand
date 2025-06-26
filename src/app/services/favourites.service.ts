import { Injectable } from '@angular/core';
import { ProductFormData } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoriteProducts';
  private favorites: ProductFormData[] = [];

  constructor() {
    this.loadFavorites(); 
  }

  private saveFavorites() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

  private loadFavorites() {
    const stored = localStorage.getItem(this.storageKey);
    this.favorites = stored ? JSON.parse(stored) : [];
  }

  getFavorites(): ProductFormData[] {
    return [...this.favorites]; 
  }

  isFavorite(productId: number): boolean {
    return this.favorites.some(p => p.id === productId);
  }

  addToFavorites(product: ProductFormData): void {
    if (!this.isFavorite(product.id)) {
      this.favorites.push(product);
      this.saveFavorites();
    }
  }

  removeFromFavorites(productId: number): void {
    this.favorites = this.favorites.filter(p => p.id !== productId);
    this.saveFavorites();
  }

  toggleFavorite(product: ProductFormData): void {
    if (this.isFavorite(product.id)) {
      this.removeFromFavorites(product.id);
      product.favorited = false;
    } else {
      this.addToFavorites(product);
      product.favorited = true;
    }
  }

  clearFavorites(): void {
    this.favorites = [];
    localStorage.removeItem(this.storageKey);
  }
}
