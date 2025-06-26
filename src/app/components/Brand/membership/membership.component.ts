import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  showPaymentDialog = false;
  emailForm!: FormGroup;

  isVerifying = false;
  isSuccess = false;
  isFailure = false;

  selectedPackage: 'Basic' | 'Premium' = 'Premium'; 
  get membershipPrice(): number {
  return this.selectedPackage === 'Basic' ? 25 : 150;
}

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  openPaymentDialog(type: 'Basic' | 'Premium') {
  this.selectedPackage = type;
  this.showPaymentDialog = true;
}


  closePaymentDialog() {
    this.showPaymentDialog = false;
  }

  startVerification() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.isVerifying = true;
    this.isFailure = this.isSuccess = false;

    
    const planId = 1; 

    const token = localStorage.getItem('jwtToken') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post<{ iframeUrl: string }>(
      `http://localhost:5090/api/Payment/plan?planid=${planId}`,
      {},
      { headers }
    ).subscribe({
      next: res => {
        this.isVerifying = false;
        if (res.iframeUrl) {
          window.location.href = res.iframeUrl; 
        } else {
          this.isFailure = true;
        }
      },
      error: err => {
        console.error('Payment error:', err);
        this.isVerifying = false;
        this.isFailure = true;
      }
    });
  }

  reset() {
    this.isVerifying = this.isSuccess = this.isFailure = false;
    this.showPaymentDialog = false;
    this.emailForm.reset();
  }
}
