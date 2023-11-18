import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { Servidor } from '../model/Servidor';


@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  private readonly API = 'api/Servidor';

  constructor(private httpClient: HttpClient) {

  }

  list() {
    return this.httpClient.get<Servidor[]>(this.API)
      .pipe(
        first()
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Servidor>(`${this.API}/${id}`);
  }

  save(record: Partial<Servidor>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Servidor>) {
    return this.httpClient.post<Servidor>(this.API, record).pipe(first());
  }

  private update(record: Partial<Servidor>) {
    return this.httpClient.put<Servidor>(`${this.API}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
