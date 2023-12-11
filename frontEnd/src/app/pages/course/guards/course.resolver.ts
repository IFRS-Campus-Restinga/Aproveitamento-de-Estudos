import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursoCreate } from 'src/app/model/CursoCreate';
import { CursoService } from 'src/app/services/curso.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<CursoCreate> {
  constructor(private cursoService: CursoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CursoCreate> {
    if (route.params && route.params['id']) {
      return this.cursoService.loadById2(route.params['id']);
      // console.log(this.cursoService.loadById(route.params['id']))
    }
    return of({
      id: '',
      nome: '',
      coordenador_id: 0,
      coordenadores: [{ nome: 'Selecione o curso', id: '0', ativo: false }]
    });
  }
}
