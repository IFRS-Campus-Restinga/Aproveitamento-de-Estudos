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

  private update(record: Partial<Requisicao>) {
    return this.httpClient.put<Requisicao>(`${this.API}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  create(form: any){
    return this.httpClient.post<any>(`${this.API}`, form).pipe(first());
  }

}
