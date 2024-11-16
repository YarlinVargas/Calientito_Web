import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, ProductoModel } from '../../models/productos/producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>(`${this.apiUrl}listProducto`);
  }

  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/productos/${id}`);
  }

  createNewProduct(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/productos`, producto);
  }

  updateProductById(id: number, producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/productos/${id}`, producto);
  }

  deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/productos/${id}`);
  }

}
