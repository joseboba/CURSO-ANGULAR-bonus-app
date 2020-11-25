import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyB9_rr8-q0LwQ0fSDowPDubdkqEcPnNGbc';
  userToken: string;

  constructor( private http: HttpClient ) { 
    this.leerToken()
  }


  logout(){
    localStorage.removeItem('token')
  }

  login(usuario: UsuarioModel){

    const { email, password } = usuario;
    const authData = { email, password}

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe( 
      map( (resp:any) =>  {
          this.guardarToken(resp.idToken);
          return resp;
      })
    )

  }

  nuevoUsuario( usuario: UsuarioModel ){

    const { email, password } = usuario;
    const authData = { email, password, returnSecureToken: true }

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData
    ).pipe( 
      map( (resp:any) =>  {
          this.guardarToken(resp.idToken);
          return resp;
      })
    )

  }

  private guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );

    let hoy = new Date();
    hoy.setSeconds( 3600 );
    console.log(hoy.getTime().toString())
    localStorage.setItem('expira', hoy.getTime().toString());

  }

  leerToken(){
    if(localStorage.getItem('token')){

      this.userToken = localStorage.getItem('token')
    }else{
      this.userToken = ''
    }

    return this.userToken;
  }

  estaAutenticado() : boolean{

    if(this.userToken.length < 2){
      return false;
    }

    const expira:number = Number(localStorage.getItem('expira'));
    const hoy = new Date();
    hoy.setTime(expira); 

    if(hoy > new Date()){
      return true;
    }else{
      return false;
    }
  
  }

}
