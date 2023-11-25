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

  createServidor(obj: Servidor){
    return this.httpClient.post(this.API, obj).pipe(first());
  }



}
