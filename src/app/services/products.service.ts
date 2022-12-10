import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Product,
  ProductDTO,
  UpdateProductDTO,
} from '../models/prodduct.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private httpClient: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    console.log(limit, offset);
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit.toString());
      params = params.set('offset', offset.toString());
      console.log('ingreso');
    }
    return this.httpClient.get<Product[]>(this.apiUrl, { params });
  }

  getProductById(id: string) {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 500) {
          return throwError('Error interno del servidor');
        }
        if (err.status === 404) {
          return throwError('Producto no encontrado');
        }
        return throwError(err.message);
      })
    );
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
