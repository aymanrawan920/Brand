import { Component } from '@angular/core';
import { PromocodeService } from 'src/app/services/promocode.service';

@Component({
  selector: 'app-promocode-history',
  templateUrl: './promocode-history.component.html',
  styleUrls: ['./promocode-history.component.css']
})
export class PromocodeHistoryComponent {
  promocodes: any[] = [];
  showSuccessMessage: boolean | undefined;
  showDeleteModal = false;
  promoToDelete: any = null;

  constructor(private promoService: PromocodeService) {}

  ngOnInit(): void {
    this.promocodes = this.promoService.getPromocodes();
    console.log('Loaded promocodes:', this.promocodes);
  }


  confirmDelete(promo: any) {
    this.promoToDelete = promo;
    this.showDeleteModal = true;
    document.body.classList.add('modal-open');
  }
  
  cancelDelete() {
    this.showDeleteModal = false;
    document.body.classList.remove('modal-open');
  }
  
  deletePromo() {
    if (this.promoToDelete) {
      this.promocodes = this.promocodes.filter(promo => promo !== this.promoToDelete);
      this.promoToDelete = null;
      this.showDeleteModal = false;
      this.showSuccessMessage = true;
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
    }
  }
  
}
