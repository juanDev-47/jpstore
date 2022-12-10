import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product, ProductDTO, UpdateProductDTO } from '../models/prodduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private httpClient: HttpClient) { }


  getAllProducts(limit?: number, offset?: number) {
    console.log(limit, offset)
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
        params = params.set('limit', limit.toString());
        params = params.set('offset', offset.toString());
        console.log("ingreso")
    }
    return this.httpClient.get<Product[]>(this.apiUrl, { params });
  }

  getProductById(id: string) {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(data: ProductDTO) {
    return this.httpClient.post<Product>(this.apiUrl, data);
  }

  update(data: UpdateProductDTO, id: string) {
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.httpClient.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
