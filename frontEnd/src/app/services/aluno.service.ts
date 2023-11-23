import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { Aluno } from '../model/Aluno';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly API = 'api/aluno';

  constructor(private httpClient: HttpClient) {

  }

  createAluno(obj: Aluno){
    return this.httpClient.post(this.API, obj).pipe(first());
  }



}
