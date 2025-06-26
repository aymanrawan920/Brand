import { Component } from '@angular/core';
import { BrandRegistrationService } from 'src/app/services/brand-registration.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-three',
  templateUrl: './reg-three.component.html',
  styleUrls: ['./reg-three.component.css']
})
export class RegThreeComponent {
  isSubmitted = false;
  selectedPlan = '';

   constructor( private router: Router) {}

  onPlanChange(plan: string) {
    this.selectedPlan = plan;
  }

  submitRequest() {
    if (!this.selectedPlan) {
      alert('Please select a plan before submitting.');
      return;
    }
  }

  //   // Define the payload based on the selected plan
  //   let payload: any;

  //   if (this.selectedPlan === 'Basic') {
  //     payload = {
  //       id: 0,
  //       plan_name: 'Basic',
  //       plan_description: '1 Owner, Limited products, Post 5 products',
  //       cost: 25
  //     };
  //   } else if (this.selectedPlan === 'Premium') {
  //     payload = {
  //       id: 0,
  //       plan_name: 'Premium',
  //       plan_description: 'Unlimited Owners, Unlimited Products, Post Free products',
  //       cost: 150
  //     };
  //   }

  //   this.http.post('https://localhost:7053/api/Plan', payload).subscribe({
  //     next: (res) => {
  //       this.isSubmitted = true;
  //     },
  //     error: (err) => {
  //       console.error('Plan submission failed:', err);
  //       alert('Failed to submit plan. Please try again.');
  //     }
  //   });
  // }

  closePopup() {
    this.isSubmitted = false;
    this.router.navigate(['/loginbrand']);
  }
}

