import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Edital } from '../model/Edital';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditalService {

  private readonly API = 'api/edital';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Edital[]>(this.API)
      .pipe(
        first()
      );
  }

  loadById(id: string) {
    return this.httpClient.get<Edital>(`${this.API}/${id}`);
  }

  save(record: Partial<Edital>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Edital>) {
    return this.httpClient.post<Edital>(this.API, record).pipe(first());
  }

  private update(record: Partial<Edital>) {
    return this.httpClient.put<Edital>(`${this.API}/${record.id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
