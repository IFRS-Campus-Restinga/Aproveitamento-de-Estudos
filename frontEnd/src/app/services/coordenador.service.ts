import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { Coordenador } from '../model/Coordenador';
@Injectable({
  providedIn: 'root'
})
export class CoordenadorService {

  private readonly API = '/api/coordenador';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Coordenador[]>(this.API)
      .pipe(
        first()
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Coordenador>(`${this.API}/${id}`);
  }
  
  listByIdCurso(id: number) {
    return this.httpClient.get<Coordenador[]>(`${this.API}/curso/${id}`);
  }

  // save(record: Partial<Coordenador>) {
  //   console.log(record);
  //   if (record.id) {
  //     console.log('update');
  //     return this.update(record);
  //   }
  //   console.log('create');
  //   return this.createAluno(record);
  // }

  createAluno(record: Partial<Coordenador>) {
    return this.httpClient.post<Coordenador>(this.API, record).pipe(first());
  }

  private update(record: Partial<Coordenador>) {
    return this.httpClient.put<Coordenador>(`${this.API}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
