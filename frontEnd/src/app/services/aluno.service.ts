import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { Aluno } from '../model/Aluno';
@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly API = '/api/aluno';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Aluno[]>(this.API)
      .pipe(
        first()
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Aluno>(`${this.API}/${id}`);
  }

  save(record: Partial<Aluno>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.createAluno(record);
  }

  createAluno(record: Partial<Aluno>) {
    return this.httpClient.post<Aluno>(this.API, record).pipe(first());
  }

  private update(record: Partial<Aluno>) {
    return this.httpClient.put<Aluno>(`${this.API}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
