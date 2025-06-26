// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register2Brand } from 'src/app/interfaces/register-2-brand';
import { BrandRegistrationService } from 'src/app/services/brand-registration.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  brandForm!: FormGroup;
  logoFile: File | null = null;
 categories: any[] = [];
 isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private brandRegistrationService: BrandRegistrationService,) {}
  
  

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      BrandName: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      CategoryId: [null],
      OtherCategory: [''],
      Description: ['', Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],
      District: ['', Validators.required]
    });

  }

  onFileSelected(event: any): void {
    this.logoFile = event.target.files?.[0] || null;
  }

  // Submit form
  onSubmit(): void {
    if (this.brandForm.invalid) {
      console.warn('Form is invalid');
      return;
    }

    const formData = new FormData();
    const data = this.brandForm.value;

    formData.append('brandName', data.BrandName);
    formData.append('phoneNumber', data.PhoneNumber);
    if (data.CategoryId) formData.append('categoryId', data.CategoryId.toString());
    formData.append('otherCategory', data.OtherCategory || '');
    formData.append('description', data.Description);
    formData.append('country', data.Country);
    formData.append('city', data.City);
    formData.append('district', data.District);

    if (this.logoFile) {
      formData.append('logoFile', this.logoFile);
    }
this.brandRegistrationService.addBrand(formData).subscribe({
      next: res => {
        localStorage.setItem('brandName', res.brand?.brand_name || 'Your Brand');
        localStorage.setItem('brandId', res.brand?.id.toString() || '0');


        console.log('Brand registered successfully', res);
        this.isSubmitted = true; 
      },
      error: err => {
        console.error('Brand registration failed', err);
      }
    });
  }


  goBack(): void {
    this.router.navigate(['/reggone']);
  }

  closePopup() {
    this.isSubmitted = false;
    this.router.navigate(['/loginbrand']);
  }
}