import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/interfaces/signup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  providers:[UserService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private userService: UserService ,private router: Router) {
    this.signupForm = this.fb.group({
      DisplayName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]], // رقم موبايل مصري كمثال
      Password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required]
    });
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {

    const postData={...this.signupForm.value};
        this.userService.registerCustomer(postData as unknown as Signup).subscribe({
          next: (res: any) => {
                console.log('تم تسجيل الدخول بنجاح:', res);
                this.router.navigate(['/collections']);
              },
              error: (err: any) => {
                console.error('خطأ في تسجيل الدخول:', err);
              }
        })
  }

  
}
