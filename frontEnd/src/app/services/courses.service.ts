import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, of, tap, delay } from 'rxjs';
import { Curso } from '../model/Curso';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly api = 'api/curso';

  constructor(private httpClient: HttpClient) { }

  list(){


    return this.httpClient.get<Curso[]>(this.api)
    .pipe(
      first(),
      delay(1500),
      tap(courses => console.log(courses)));
  }


  save(record: Curso){
    //console.log("salvando curso pelo servico");
    //console.log(record);
    return this.httpClient.post<Curso>(this.api, record);
  }
}
