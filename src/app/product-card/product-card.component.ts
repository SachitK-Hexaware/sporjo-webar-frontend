import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() _id: string;
  @Input() name: string;
  @Input() description: string;
  @Input() ios_src: string;
  @Input() short_description: number;
  @Input() src: string;
  @Input() category: number;
  @Input() product_image_url: string;
  @Input() price: string;
  @Input() industry: string;

  constructor() {}

  ngOnInit(): void {
    // console.log(this._id)
  }
}
