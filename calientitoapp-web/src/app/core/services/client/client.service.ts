import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespService } from '../../models/general/resp-service.model';
import { ConfigService } from '../config/config.service';
import { CreateUpdateClient } from './models/create-update-client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  // public GetDetails(id: number): Observable<any> {
  //   return this.http.get<RespService>(`${this.config.base}user/detail/${id}`);
  // }

  public GetClients(id: string): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}client/${id}`);
  }

  public CreateOrUpate(client: CreateUpdateClient): Observable<any> {
    return this.http.post<RespService>(`${this.config.base}client/createUpdate`, client);
  }

  public Consult(): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}client/consult`);
  }

  public ActiveOrDeactive(idClient: number): Observable<any> {
    return this.http.put<RespService>(`${this.config.base}client/ActivateDeactivate`, { id: idClient });
  }

  public Delete(idClient: number): Observable<any> {
    return this.http.delete<RespService>(`${this.config.base}client`, { body: { id: idClient } });
  }
}
