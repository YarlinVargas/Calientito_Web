import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable, zip } from 'rxjs';
import { RespService } from '../../models/general/resp-service.model';
import { CompanyModel } from '../../models/company/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  Name(): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}company/name`);
  }

  ListPlans(): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}company/listPlans`);
  }

  ListCenters(): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}company/listCenters`);
  }

  ListStatus(): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}company/listStatus`);
  }

  ListFiltersConsult(): Observable<RespService[]>{
    return zip(
      this.ListCenters(),
      this.ListPlans(),
    )
  }

  Consult(data: CompanyModel): Observable<RespService> {
    return this.http.post<RespService>(`${this.config.base}company/consult`, data);
  }

  ReportExcel(data: any): Observable<RespService> {
    return this.http.post<RespService>(`${this.config.base}report/EXCEL`, data);
  }

  ListAvailableStatus(): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}company/listAvailableStatus`);
  }
}
