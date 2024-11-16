import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Usuario {
  id_usuario: number;
  cedula: number;
  nombres:string;
  apellidos: string;
  celular:string;
  correo: string;
  direccion: string;
  id_tipo_documento: number;
  id_perfil:number;
  id_estado:number;
  login:string;
  password:string;
  eliminado: number;
}

export interface UsuarioModel {
  id_usuario:number,
  name :string,
  dateBirthday? :string,
 genero? :string,
  email? :string,
  password :string,
 active :boolean,
 idPerfil :number,
  creationDate :Date,
 updateDate? :null,
 lastName? :string,
phoneNumber? :string,
  type_document?:string,
 num_document? :string,
 direccion? :string,
 department? :string,
city? :string,
  userName?:string,
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.apiUrl}listUser`);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  createNewUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

  updateUsuarioById(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  deleteUsuarioById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }

  authenticateUsuario(idPerfil:number,login: string,password:string): Observable<Usuario> {
    const body = {
      idPerfil:idPerfil,
      login: login,
      password: password
    };
    debugger
    return this.http.post<Usuario>(`${this.apiUrl}/auth`, body);
  }
}
