import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-loginbrand',
  templateUrl: './login-brand.component.html',
  styleUrls: ['./login-brand.component.css']
})
export class LoginBrandComponent {
  loginForm: FormGroup;
    loginError: boolean = false; 
  
    constructor(private fb: FormBuilder,private userService: UserService ,private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
    onSubmit() {
        if (this.loginForm.valid) {
          this.login();
        }
      }
     successMessage: string | null = null;
    errorMessage: string | null = null;
    
    
      login() {
        const postData={...this.loginForm.value};
        this.userService.loginBrand(postData as unknown as Login).subscribe({
          next: (res: any) => { 
                console.log('Login successful:', res);
                localStorage.setItem('NEW_TOKEN', res.token);
                localStorage.setItem('brandName', res.displayname);
                localStorage.getItem("brandName");
                 localStorage.setItem('brandName', res.brand?.brand_name || 'Your Brand');
        localStorage.setItem('brandId', res.brand?.id.toString() || '0');


                const payload = JSON.parse(atob(res.token.split('.')[1]));
                console.log('Decoded JWT Payload:', payload);
               const brandId = payload.BrandId || payload.nameid || payload.sub;
                localStorage.setItem('BRAND_ID', brandId);
          this.errorMessage = null;
          this.successMessage = 'Login successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/brand-main']);
          }, 2000);
        },
              error: (err: any) => {
                console.error('Login failed:', err);
          this.successMessage = null;
          this.errorMessage = 'Incorrect email or password. Please try again.';}
        })
        
      }
      
    closeError() {
      this.loginError = false; 
    }
  

}