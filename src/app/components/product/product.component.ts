import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/prodduct.model';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();
  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    description: '',
    images: [],
    category: {
      id: '',
      name: ''
    }
  }

  constructor() { }

  addToCart() {
    this.addedProduct.emit(this.product);
  }

  showDetail() {
    this.showProduct.emit(this.product.id);
  }

}
