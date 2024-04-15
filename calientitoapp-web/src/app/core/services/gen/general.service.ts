import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable, zip } from 'rxjs';
import { RespService } from '../../models/general/resp-service.model';
import { TipoDocumento } from '../../models/general/tipo_documento.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private config: ConfigService) { }

  //Servicio que trae los tipos de documentos
  getTiposDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.apiUrl}/tipos-documento`);
  }

  ListCompanies(): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}general/listCompany`);
  }

  ListPlans(id: string): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}general/listPlan/${id}`);
  }

  ImgEnterprise(): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}general/img`);
  }
  ListFiltersConsult(): Observable<RespService[]>{
    return zip(
      this.ImgEnterprise(),
      this.getTiposDocumento(),
    )
  }
}
