
import { Injectable } from '@angular/core';
import { PpcCreate } from './../../../model/PpcCreate';
import { PpcService } from './../../../services/ppc.service';
import { Observable, of } from 'rxjs';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PpcResolver implements Resolve<PpcCreate> {

  constructor(private ppcService: PpcService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PpcCreate> {
    if(route.params && route.params['id']){
      return this.ppcService.loadById2(route.params['id']);
    }
    return of({
      id: '',
      curso:'',
      nomePPC: '',
      ano: 0
    });
  }
}

