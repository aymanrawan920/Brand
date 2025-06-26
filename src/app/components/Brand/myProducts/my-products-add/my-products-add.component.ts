import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-products-add',
  templateUrl: './my-products-add.component.html',
  styleUrls: ['./my-products-add.component.css']
})
export class MyProductsAddComponent {
  product: any = {
    product_name: '',
    category_id: null,
    description: '',
    actual_quantity: '',
    cost_price: '',
    selling_price: '',
    brand_id: 1, 
    discount_percentage: 0,
    points: 0,
    is_archived: false,
    Profit: 0
  };

  selectedImage!: File;
  colorOptions = ['#000', '#f0f', '#0f0', '#0ff', '#00f', '#f00'];
  selectedColor = '';
  categories: any[] = [];

  constructor(private http: HttpClient , private router: Router) {}

  ngOnInit(): void {
  this.http.get<any>('http://localhost:5090/api/Category').subscribe({
    next: (res) => {
      this.categories = res.$values;
      console.log('Categories loaded:', this.categories);
    },
    error: (err) => {
      console.error('Failed to load categories', err);
    }
  });
}


  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  onSubmit(): void {
   
    this.product.Profit = this.product.selling_price - this.product.cost_price;
    console.log('Submitting product:', this.product);

    

    const formData = new FormData();
    for (const key in this.product) {
      formData.append(key, this.product[key]);
    }

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.http.post('http://localhost:5090/api/Product', formData).subscribe({
      next: res => {
        console.log('Product added successfully!', res);
        this.router.navigate(['my-products']);

      },
      error: err => {
        console.error('Error adding product:', err);
      }
    });
  }
}