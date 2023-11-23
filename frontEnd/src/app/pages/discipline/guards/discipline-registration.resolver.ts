import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Disciplina } from 'src/app/model/Disciplina';
import { DisciplinaService } from 'src/app/services/disciplina.service';


@Injectable({
  providedIn: 'root'
})
export class DisciplinaResolver implements Resolve<Disciplina> {

  constructor(private disciplinaService: DisciplinaService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Disciplina> {
    if(route.params && route.params['id']){
      return this.disciplinaService.loadById(route.params['id']);
    }
    return of({id: '', nome: '', codDisciplina: '', cargaHoraria: 0, ppcs: []});
  }
}

