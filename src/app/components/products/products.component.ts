import { Component, OnInit } from '@angular/core';
import {
  Product,
  ProductDTO,
  UpdateProductDTO,
} from 'src/app/models/prodduct.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

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
  showProductDetail: boolean = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    description: '',
    images: [],
    category: {
      id: '',
      name: '',
    },
  };
  limit: number = 10;
  offset: number = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private store: StoreService,
    private productsService: ProductsService,
    private spinner: NgxSpinnerService
  ) {
    this.myShoppingCart = this.store.getShoppingCart();
    this.total = this.store.getTotal();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  onAddedProduct(product: Product) {
    this.store.addToCart(product);
    this.total = this.store.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowProductDetail(id: string) {
    this.statusDetail = 'loading';
    if (this.statusDetail === 'loading') {
      this.spinner.show();
      // console.log('hola')
    }
    this.productsService.getProductById(id).subscribe((dataProduct) => {
      this.toggleProductDetail();
      this.productChosen = dataProduct;
      this.statusDetail = 'success';
    }, (error) => {
      this.statusDetail = 'error';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        confirmButtonText: 'Cool'
      });
    });
  }

  createNewProduct() {
    const newProduct: ProductDTO = {
      title: 'New Product - jpav',
      price: 180,
      description: 'New Product Description',
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 1,
    };
    this.productsService.create(newProduct).subscribe((dataProduct) => {
      this.products.unshift(dataProduct);
    });
  }

  updateProduct() {
    const updateProduct: UpdateProductDTO = {
      title: 'Update Product - jpav',
      price: 180,
      description: 'Update Product Description',
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 1,
    };
    const id = this.productChosen.id;
    this.productsService.update(updateProduct, id).subscribe((dataProduct) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products[productIndex] = dataProduct;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe((dataProduct) => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
    });
    this.showProductDetail = !this.showProductDetail;
  }

  loadMore() {
    this.productsService.getAllProducts(this.limit,this.offset).subscribe((dataProducts) => {
      this.products = this.products.concat(dataProducts);
      this.offset += this.limit;
    });
  }

}
