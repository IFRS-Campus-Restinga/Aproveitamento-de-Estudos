import { Component, OnInit } from '@angular/core';
import { Usuario } from './model/Usuario';
import { parseTemplate } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'frontEnd';
  public currentUserString: string | null = '';
  public usuario: Usuario = {id:"",nome:"",email:"",admin:false,tipo:""}
  public recarregaNav: boolean = false;
  public usuarioLogado: string = ''
  
  ngOnInit(): void {
    this.currentUserString = localStorage.getItem('currentUser');
    if(this.currentUserString !== null || this.currentUserString !==  ''){
      this.usuario = JSON.parse(this.currentUserString == null? '{"id":"","nome":"","email":"","admin":false,"tipo":""}': this.currentUserString);
      this.usuarioLogado = this.usuario.nome;
    }

  }

  


  
  
  // currentUserObjec = JSON.parse(this.currentUserString);

}
