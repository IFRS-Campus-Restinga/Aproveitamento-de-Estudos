import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'api/aluno';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080' // Domínio do servidor
    })
  };

  //http://localhost:8080/
  constructor(private httpClient: HttpClient) {

  }

  create(obj: any){
    return this.httpClient.post(this.API, obj).pipe(first());
  }



}
