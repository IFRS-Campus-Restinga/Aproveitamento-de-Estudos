import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';


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


}
