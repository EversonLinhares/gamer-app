import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  username!: string;
  password!: string;
  email!: string;
  cadastrando!: boolean;
  msgSucesso!: string;
  errors!: string[];
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit(){
    this.authService
    .tentarLogar(this.username,this.password)
    .subscribe(response => {
      const access_token = JSON.stringify(response);
      localStorage.setItem('access_token', access_token)
      this.router.navigate(['/home'])
    }, errorResponse => {
      this.errors = ['Usuário e/ou senha incorreto(s).']
      setTimeout(() =>{
        this.errors = [];
      },3000)
    })
  }
  
  preparaCadastro(event){
    event.preventDefault()
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    let usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    usuario.email = this.email;
    this.authService
    .salvar(usuario)
    .subscribe( response => {
       this.msgSucesso = "Cadastro realizado com sucesso!";
       setTimeout( () =>{
       this.msgSucesso = '';
       this.cadastrando = false;
       this.username = ''
       this.password = ''
       this.email = ''
       this.errors = []
       },3000)
    }, errorResponse =>{
      this.msgSucesso = '';
      this.errors = errorResponse.error.errors;
      setTimeout(() =>{
        this.errors = [];
      },3000)
    })
  }

}
