import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/prodduct.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Output() addedProduct = new EventEmitter<Product>();
  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    description: '',
    image: ''
  }

  constructor() { }

  addToCart() {
    this.addedProduct.emit(this.product);
  }

}
