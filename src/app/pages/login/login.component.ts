import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService, private router: Router ) { 
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  onSubmit(login: NgForm){

    if(login.invalid){ return; }
    
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor',
      icon: 'info'
    })

    Swal.showLoading();

    this.auth.login(this.usuario)
        .subscribe( resp => {
          Swal.close();
          if(this.recordarme){
            localStorage.setItem('email', this.usuario.email);
          }
          this.router.navigateByUrl('/home')
        }, (err) => {
          Swal.fire({
            text: err.error.error.message,
            icon: 'error'
          })
        })
   

  }

}
