import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {
  isSuccess: boolean | null = null;
  message: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const success = params['success'];
      if (success === 'true') {
        this.isSuccess = true;
        this.message = 'You have successfully subscribed!';
      } else {
        this.isSuccess = false;
        this.message = 'Payment failed. Please try again.';
      }
    });
  }
}
