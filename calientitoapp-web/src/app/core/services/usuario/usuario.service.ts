import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
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

  authenticateUsuario(login: string,password:string): Observable<Usuario> {
    const body = {
      login: login,
      password: password
    };
    return this.http.post<Usuario>(`${this.apiUrl}/authenticate`, body);
  }
}
