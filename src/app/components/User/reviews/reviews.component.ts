import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews = [
    {
      name: 'Basma Badr',
      image: '',
      text: "Fast delivery and excellent product quality! I'm beyond satisfied with my purchase."
    },
    {
      name: 'Basma Badr',
      image: '',
      text: "Fast delivery and excellent product quality! I'm beyond satisfied with my purchase."
    },
    {
      name: 'Basma Badr',
      image: '',
      text: "Fast delivery and excellent product quality! I'm beyond satisfied with my purchase."
    }
  ];

}


