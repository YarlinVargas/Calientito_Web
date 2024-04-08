import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespService } from '../../models/general/resp-service.model';
import { ConfigService } from '../config/config.service';
import { CreateUpdateRequirenment } from './models/create-update-requirenment.model';


@Injectable({
  providedIn: 'root'
})
export class RequirenmentService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  // public GetDetails(id: number): Observable<any> {
  //   return this.http.get<RespService>(`${this.config.base}user/detail/${id}`);
  // }

  public GetRequirenments(id: string): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}requirenment/${id}`);
  }

  public CreateOrUpate(requirenment: CreateUpdateRequirenment): Observable<any> {
    return this.http.post<RespService>(`${this.config.base}requirenment/createUpdate`, requirenment);
  }

  public Consult(): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}requirenment/consult`);
  }

  public ActiveOrDeactive(idRequirenment: number): Observable<any> {
    return this.http.put<RespService>(`${this.config.base}requirenment/ActivateDeactivate`, { id: idRequirenment });
  }

  public Delete(idRequirenment: number): Observable<any> {
    return this.http.delete<RespService>(`${this.config.base}requirenment`, { body: { id: idRequirenment } });
  }
}
