/*
import { PpcService } from './../../../services/ppc.service';
import { Ppc } from './../../../model/Ppc';
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
export class PpcResolver implements Resolve<Ppc> {

  constructor(private ppcService: PpcService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ppc> {
    if(route.params && route.params['id']){
      return this.ppcService.loadById(route.params['id']);
    }
    return of({
      id: '',
      nomePPC: '',
      ano: '',
      curso:''
    });
  }
}
*/
