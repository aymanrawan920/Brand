import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {
  private readonly storageKey = 'promocodes';

  getPromocodes(): any[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  addPromocode(promo: any): void {
    const current = this.getPromocodes();
    current.push(promo);
    localStorage.setItem(this.storageKey, JSON.stringify(current));
  }

  deletePromocode(promo: any): void {
    const current = this.getPromocodes().filter(p => p.code !== promo.code);
    localStorage.setItem(this.storageKey, JSON.stringify(current));
  }
}
