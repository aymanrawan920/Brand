import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandProfileService } from 'src/app/services/brand-profile.service';


@Component({
  selector: 'app-brand-profile',
  templateUrl: './brand-profile.component.html',
  styleUrls: ['./brand-profile.component.css']
})
export class BrandProfileComponent implements OnInit {
  brandData: any;

  constructor(private profileService: BrandProfileService) {}

  ngOnInit(): void {
    this.profileService.getBrandProfile().subscribe({
      next: (data) => {
        this.brandData = data;
        console.log('✅ Brand Data:', this.brandData);
      },
      error: (err) => {
        console.error('❌ Failed to load profile:', err);
      }
    });
  }
}
