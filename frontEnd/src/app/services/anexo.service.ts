import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo } from '../model/Anexo';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

private readonly API = 'api/anexo';

constructor(private httpClient: HttpClient) { }

loadById(id: string) {
  return this.httpClient.get<Anexo>(`${this.API}/${id}`);
}

remove(id: string) {
  return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
}

getAnexo(anexo: any): Observable<Blob> {
  return this.httpClient.post(this.API, anexo, { responseType: 'blob' });
}

}
