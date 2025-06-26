import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  description: string;
  type: string;
}

@Component({
  selector: 'app-my-products-details',
  templateUrl: './my-products-details.component.html',
  styleUrls: ['./my-products-details.component.css']
})
export class MyProductsDetailsComponent {
   @Input() product: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  deleteProduct() {
    console.log(`Deleting product: ${this.product?.id}`);
    this.close.emit(); 
  }

  
}