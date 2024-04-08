import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { RespService } from '../../models/general/resp-service.model';
import { ResultRequest } from '../../models/result/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  PDF(id: number): Observable<any> {    
    return this.http.get<RespService>(`${this.config.base}result/PDF/${id}`);
  }

  EmailToPDF(data: ResultRequest, email: string = ""): Observable<any> {
    return this.http.post<RespService>(`${this.config.base}result/emailResult?email=${email}`, data);
  }

  EmailToResult(data: ResultRequest[]): Observable<any>{
    return this.http.post<RespService>(`${this.config.base}result/emailResultMassive`, data);
  }

  DownloadResults(data: ResultRequest[]): Observable<any> {
    return this.http.post(`${this.config.base}result/dowloadResults`, data, { responseType: 'blob'} );
  }
}
