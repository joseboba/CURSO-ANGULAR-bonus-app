import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){

  }

  canActivate(): boolean | UrlTree {
    if(this.auth.estaAutenticado()){
      return true
    }else{
      this.router.navigateByUrl('login');
      return false;
    }
    
  }
  
}
