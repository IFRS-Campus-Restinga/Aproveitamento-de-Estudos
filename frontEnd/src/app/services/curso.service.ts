import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CursoService {
  createCurso(curso: any) {
    throw new Error('Method not implemented.');
  }

  private readonly API = 'api/curso';

  constructor(private httpClient: HttpClient) {

  }

  getCursos(){
    return this.httpClient.get<any[]>(this.API).pipe(first());
  }



}
