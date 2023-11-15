import { EditalService } from './../../../services/edital.service';
import { Edital } from './../../../model/Edital';
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
export class EditalResolver implements Resolve<Edital> {

  constructor(private editalService: EditalService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Edital> {
    if(route.params && route.params['id']){
      return this.editalService.loadById(route.params['id']);
    }
    return of({id: '', numero: '', dataInicio: '', dataFim: '', etapas: []});
  }
}
