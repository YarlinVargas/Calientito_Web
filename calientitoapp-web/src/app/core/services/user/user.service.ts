import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespService } from '../../models/general/resp-service.model';
import { ConfigService } from '../config/config.service';
import { CreateUpdateUser } from './models/create-update-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public GetDetails(id: number): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}user/detail/${id}`);
  }

  public GetUser(id: string): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}user/${id}`);
  }

  public CreateOrUpate(user: CreateUpdateUser): Observable<any> {
    return this.http.post<RespService>(`${this.config.base}user/createUpdate`, user);
  }

  public Consult(): Observable<any> {
    return this.http.get<RespService>(`${this.config.base}user/consult`);
  }

  public ActiveOrDeactive(idUser: number): Observable<any> {
    return this.http.put<RespService>(`${this.config.base}user/ActivateDeactivate`, { id: idUser });
  }

  public Delete(idUser: number): Observable<any> {
    return this.http.delete<RespService>(`${this.config.base}user`, { body: { id: idUser } });
  }
}
