import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products-add',
  templateUrl: './my-products-add.component.html',
  styleUrls: ['./my-products-add.component.css']
})
export class MyProductsAddComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      category_id: [1, Validators.required], 
      description: [''],
      actual_quantity: [0, [Validators.required, Validators.min(1)]],
      cost_price: [0, [Validators.required, Validators.min(0)]],
      selling_price: [0, [Validators.required, Validators.min(0)]],
       discount_percentage: [0],
       points: [0],
       is_archived: [false]
    });
  }

 onSubmit() {
  if (this.productForm.invalid) return;

  const brandId = localStorage.getItem('BRAND_ID');
  if (!brandId) {
    alert('Brand ID not found. Please log in again.');
    this.router.navigate(['/login']);
    return;
  }

  const productData = {
    ...this.productForm.value,
    brand_id: +brandId  // make sure it’s a number
  };

  this.productService.addProduct(productData).subscribe({
    next: () => alert('Product added successfully'),
    error: err => console.error(err)
  });
}
}