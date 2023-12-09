import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Analise } from '../model/Analise';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnaliseService {

  private readonly API = '/api/analise';

  constructor(private httpClient: HttpClient) { }

  list(id: any) {
    return this.httpClient.get<Analise[]>(`${this.API}/${id}`)
      .pipe(
        first()
      );
  }


  createAanalise(record: Partial<Analise>) {
    return this.httpClient.post<Analise>(this.API, record).pipe(first());
  }
}
