import { ServidorService } from './../../../services/servidor.service';
import { Servidor } from './../../../model/Servidor';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServantResolver implements Resolve<Servidor> {

  constructor(private servidorService: ServidorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Servidor> {
    if (route.params && route.params['id']) {
      return this.servidorService.loadById(route.params['id']);
    }
    return of({
      id: '',
      nome: '',
      email: '',
      admin: false,
      tipo: '',
      siape: ''
    });
  }
}
