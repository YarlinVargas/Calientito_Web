import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { RespService } from '../../models/general/resp-service.model';
import { PatientModel } from '../../models/general/form_result_patient.model';



@Injectable({
  providedIn: 'root'
})
export class PatientService {


  constructor(private http: HttpClient,  private config: ConfigService) { }

  ListFiltersConsult(data: PatientModel): Observable<RespService[]>{
    return zip(
      this.ConsultResults(data)
    )
  }
  //CONSULTAR TODOS LOS RESULTADOS
  ConsultResults(data:PatientModel): Observable<any>{
    return this.http.post<RespService>(`${this.config.base}patient/results`,data);
  }

  //CONSULTAR EXÁMENES DE LA SOLICITUD POR PACIENTE
  ConsultExam_Request(idRequest:number): Observable<any>{
    return this.http.get<RespService>(`${this.config.base}patient/examRequest/${idRequest}`);
  }

  //CONSULTAR RESULTADOS DE UN EXÁMEN
  ConsultResultExam(id:number): Observable<any>{
    return this.http.get<RespService>(`${this.config.base}patient/resultsExam/${id}`);
  }

  //CONSULTAR ULTIMOS RESULTADOS
  LastResults(): Observable<any>{
    return this.http.get<RespService>(`${this.config.base}patient/lastResults`);
  }
}
