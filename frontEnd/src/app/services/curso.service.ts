import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Curso } from '../model/Curso';
import { CursoCreate } from '../model/CursoCreate';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private readonly API = 'api/curso';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Curso[]>(this.API)
      .pipe(
        first()
      );
  }

  listAlternative() {
    return this.httpClient.get<Curso[]>(`${this.API}/list`)
      .pipe(
        first()
      );
    
  }

  loadById(id: string) {
    return this.httpClient.get<Curso>(`${this.API}/${id}`);
  }

  save(record: Partial<Curso>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.createCurso(record);
  }

  private createCurso(record: Partial<Curso>) {
    return this.create(record);
  }

  private create(record: Partial<Curso>) {
    return this.httpClient.post<Curso>(this.API, record).pipe(first());
  }

  private update(record: Partial<Curso>) {
    return this.httpClient.put<Curso>(`${this.API}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }


  loadById2(id: string) {
    return this.httpClient.get<CursoCreate>(`${this.API}/${id}`);
  }

}
