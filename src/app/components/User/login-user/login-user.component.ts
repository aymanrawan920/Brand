import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  providers:[UserService],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder ,private userService: UserService ,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
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
    this.userService.loginCustomer(postData as unknown as Login).subscribe({
      next: (res: any) => {
            console.log('Login successful:', res);
      this.errorMessage = null;
      this.successMessage = 'Login successful! Redirecting...';
      setTimeout(() => {
        this.router.navigate(['/collections']);
      }, 2000);
    },
          error: (err: any) => {
            console.error('Login failed:', err);
      this.successMessage = null;
      this.errorMessage = 'Incorrect email or password. Please try again.';}
    })
    
  }
  
}
