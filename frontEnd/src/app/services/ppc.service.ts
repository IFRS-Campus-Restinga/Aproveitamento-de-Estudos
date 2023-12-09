import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Ppc } from '../model/Ppc';
import { PpcCreate } from '../model/PpcCreate';
import { PpcRead } from '../model/PpcRead';


@Injectable({
  providedIn: 'root'
})
export class PpcService {

  private readonly API = 'api/ppc';

  constructor(private httpClient: HttpClient) {

  }

  getPpc(){
    return this.httpClient.get<any[]>(this.API).pipe(first());
  }

  createDiscipline(obj: Partial<Ppc>){
    return this.httpClient.post(`${this.API}/disciplina`, obj).pipe(first());
  }


  //-------------------------------------------
  list() {
    return this.httpClient.get<PpcRead[]>(`${this.API}/ppcs`)
      .pipe(
        first()
      );
  }

  loadById(id: string) {
    return this.httpClient.get<PpcCreate>(`${this.API}/${id}`);
  }

  save(record: Partial<PpcCreate>) {
    console.log(record);
    if (record.id) {
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.createPPC(record);
  }

  public createPPC(record: Partial<PpcCreate>) {
    return this.httpClient.post<PpcCreate>(this.API, record).pipe(first());
  }

  private update(record: Partial<PpcCreate>) {
    return this.httpClient.put<PpcCreate>(`${this.API}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
