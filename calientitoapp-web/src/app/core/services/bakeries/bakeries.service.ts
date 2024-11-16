import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, ProductoModel } from '../../models/productos/producto.model';
import { environment } from 'src/environments/environment';
import { BakerieModel } from '../../models/bakeries/bakeries.model';

@Injectable({
  providedIn: 'root'
})
export class BakerieService {
  apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getBakeries(): Observable<BakerieModel[]> {
    return this.http.get<BakerieModel[]>(`${this.apiUrl}listPanaderia`);
  }



}
