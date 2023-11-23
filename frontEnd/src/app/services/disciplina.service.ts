import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Disciplina } from '../model/Disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  private readonly API = 'api/disciplina';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Disciplina[]>(this.API)
      .pipe(
        first()
      );
  }

  

  loadById(id: string) {
    return this.httpClient.get<Disciplina>(`${this.API}/${id}`);
  }

  save(record: Partial<Disciplina>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Disciplina>) {
    return this.httpClient.post<Disciplina>(this.API, record).pipe(first());
  }

  private update(record: Partial<Disciplina>) {
    return this.httpClient.put<Disciplina>(`${this.API}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}