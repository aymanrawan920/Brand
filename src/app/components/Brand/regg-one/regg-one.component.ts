import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterBrand } from 'src/app/interfaces/register-brand';
import { BrandRegistrationService } from 'src/app/services/brand-registration.service';

@Component({
  selector: 'app-regg-one',
  templateUrl: './regg-one.component.html',
  styleUrls: ['./regg-one.component.css']
})
export class ReggOneComponent {
  registrationForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private brandRegistrationService: BrandRegistrationService ,private router: Router) {
      this.registrationForm = this.fb.group({
        DisplayName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]], 
        Password: ['', [Validators.required, Validators.minLength(6)]],
      });
      
    }

     togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  onSubmit() {
    const postData={...this.registrationForm.value};
            this.brandRegistrationService.registerBrand(postData as unknown as RegisterBrand).subscribe({
              next: (res: any) => {
                    console.log('تم تسجيل الدخول بنجاح:', res);
                    this.router.navigate(['/register']);
                  },
                  error: (err: any) => {
                    console.error('خطأ في تسجيل الدخول:', err);
                  }
            })
      }

}
