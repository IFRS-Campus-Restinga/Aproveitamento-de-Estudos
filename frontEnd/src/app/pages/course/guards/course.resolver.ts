import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from 'src/app/model/Curso';
import { CursoService } from 'src/app/services/curso.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Curso> {
  constructor(private cursoService: CursoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
    if (route.params && route.params['id']) {
      return this.cursoService.loadById(route.params['id']);
      // console.log(this.cursoService.loadById(route.params['id']))
    }
    return of({
      id: '',
      nome: '',
      ppcs: '',
      coordenadores: '',
      alunos: null,
    });
  }
}
