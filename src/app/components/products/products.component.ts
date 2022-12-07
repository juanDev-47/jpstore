import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/prodduct.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  total: number = 0;
  myShoppingCart: Product[] = [];
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 5, 15);

  constructor(
    private store: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.store.getShoppingCart();
    this.total = this.store.getTotal();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe( dataProducts => {
        this.products = dataProducts;
      });
  }

  onAddedProduct(product: Product) {
    this.store.addToCart(product);
    this.total = this.store.getTotal();
  }
}
