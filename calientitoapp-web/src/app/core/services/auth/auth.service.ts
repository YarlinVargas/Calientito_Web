import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { AuthModel, ReplyTokens, UserModel } from '../../models/auth/auth.model';
import { RespService } from '../../models/general/resp-service.model';
import { ConfigService } from '../config/config.service';
import { PasswordModel } from '../../models/auth/password.model';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = `${environment.apiEndpoint}`;
  apiUrl = environment.apiEndpoint;
  constructor(private http: HttpClient, private config: ConfigService, private router: Router) { }

  getAuthToken(): Observable<boolean> {
    const token = JSON.parse(sessionStorage.getItem('auth')!);
    let valid = false;
    if (token) valid = true;
    return of(valid);
  }

  Auth(idPerfil:number,login: string,password:string): Observable<RespService> {
    const body = {
      idPerfil:idPerfil,
      userName: login,
      password: password
    };
    return this.http.post<RespService>(`${this.apiUrl}auth`, body)
  }

  Register(data: UserModel):Observable<RespService>{
    return this.http.post<RespService>(`${this.config.base}insertUser`, data)
  }
  Password(data: PasswordModel): Observable<RespService> {
    return this.http.post<RespService>(`${this.config.base}auth/password`, data);
  }

  ValidatePassword(type: number, password: string, entity: string | number = 0): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}auth/validatePassword?type=${type}&password=${password}&encryptedEntity=${entity}`);
  }

  RecoverPassword(type: number, idIdentificationType: number, identificationNumber: string): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}auth/recoverPassword?type=${type}&idIdentificationType=${idIdentificationType}&identificationNumber=${identificationNumber}`);
  }

  ValidToken(type: number, token: string): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}auth/validToken?type=${type}&token=${token}`);
  }

  LogOut(): Observable<RespService> {
    return this.http.get<RespService>(`${this.config.base}auth/logOut`);
  }
  //Funcion que valida si el token ya vencio
  isValidToken() {

    const token = JSON.parse(sessionStorage.getItem('auth')!);
    if (token?.token) {
      const decodeToken = jwtDecode<JwtPayload>(token.token);
      if (decodeToken && decodeToken?.exp) {
        const tokenDate = new Date(0);
        tokenDate.setUTCSeconds(decodeToken.exp);
        const today = new Date();
        return tokenDate.getTime() > today.getTime();
      }else{
        return false;
      }
    }
    return true;
  }
  //Refresca el token internamente
  refreshToken(dataRefreshToken: ReplyTokens): Observable<RespService> {
    return this.http.post<RespService>(`${this.config.base}auth/refresh-token`, dataRefreshToken);
  }
}
