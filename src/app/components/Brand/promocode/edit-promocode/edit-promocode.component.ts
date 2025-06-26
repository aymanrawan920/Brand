import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PromocodeService } from 'src/app/services/promocode.service';

@Component({
  selector: 'app-edit-promocode',
  templateUrl: './edit-promocode.component.html',
  styleUrls: ['./edit-promocode.component.css']
})
export class EditPromocodeComponent {
  promoForm: FormGroup;
 
   constructor(private fb: FormBuilder,
     private promoService: PromocodeService,
     private router: Router) {
     this.promoForm = this.fb.group({
       promocode: [''],
       expirationDate: [''],
       neverExpires: [false],
       discountAmount: [''],
       condition: ['For all orders'],
       maxUsers: [''],
       unlimitedUsers: [false]
     });
   }
 
   onSubmit(): void {
     console.log('Submit clicked');
     const form = this.promoForm.value;
     const newPromo = {
       code: form.promocode,
       description: `${form.discountAmount}% off ${form.condition}`,
       used: 0,
       created: new Date().toLocaleDateString(),
       expires: form.neverExpires ? 'Unlimited' : form.expirationDate
 
     };
 
     this.promoService.addPromocode(newPromo);
     console.log('Creating:', newPromo);
     this.router.navigate(['/promocode-history']); 
   }
 
  
}
