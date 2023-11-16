import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Requisicao } from '../model/Requisicao';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  private readonly API = 'api/requisicao';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Requisicao[]>(this.API)
      .pipe(
        first()
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Requisicao>(`${this.API}/${id}`);
  }

  save(record: Partial<Requisicao>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Requisicao>) {
    return this.httpClient.post<Requisicao>(this.API, record).pipe(first());
  }

  private update(record: Partial<Requisicao>) {
    return this.httpClient.put<Requisicao>(`${this.API}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
