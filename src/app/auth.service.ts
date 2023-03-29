import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/users";
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  sairSistema(){
    localStorage.removeItem('access_token')
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
     const usuario =  this.jwtHelperService.decodeToken(token).user_name
     return usuario;
    }
  }

  getRoleAutenticado(){
    const token = this.obterToken();
    if(token){
      const role = this.jwtHelperService.decodeToken(token).authorities
      return role
    }
  }


  obterToken(){
    const tokenString = localStorage.getItem('access_token')
    if(tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token){
      const isExpired = this.jwtHelperService.isTokenExpired(token);
      if(isExpired){
        this.sairSistema();
      }
      return !isExpired;
    }
    return false;
  }

  salvar(usuario: Usuario) : Observable<any>{
    return this.http.post<any>(this.apiURL,usuario);
  }

  tentarLogar( username: string, password: string) : Observable<any>{
    const params = new HttpParams()
                            .set('username', username)
                            .set('password', password)
                            .set('grant_type', 'password')
    const headers = {
      'Authorization': 'Basic ' + window.btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }     
    return this.http.post(this.tokenURL, params.toString(), { headers });
  }
}
