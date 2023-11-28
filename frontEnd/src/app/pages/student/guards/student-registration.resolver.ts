import { AlunoService } from './../../../services/aluno.service';
import { Aluno } from './../../../model/Aluno';
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
export class StudentResolver implements Resolve<Aluno> {

  constructor(private alunoService: AlunoService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Aluno> {
    if(route.params && route.params['id']){
      return this.alunoService.loadById(route.params['id']);
    }
    return of({
      id: '',
      nome: '',
      email: '',
      admin: false,
      tipo: '',
      matricula: '',
      dataIngresso: '',
      curso:''
    });
  }
}
