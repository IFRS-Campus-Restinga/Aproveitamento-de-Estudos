import { Requisicao } from 'src/app/model/Requisicao';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RequisicaoService } from 'src/app/services/requisicao.service';


@Injectable({
  providedIn: 'root'
})
export class RequestResolver implements Resolve<Requisicao> {

  constructor(private requisicaoService: RequisicaoService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Requisicao> {
    if(route.params && route.params['id']){
      return this.requisicaoService.loadById(route.params['id']);
    }
    return of({ id: '',
                tipo: '',
                status: '',
                dataCriacao: '',
                experienciasAnteriores: '',
                dataAgendamentoProva: '',
                notaDaProva: 0,
                diciplinaCursaAnteriormente: '',
                notaObtida: 0,
                cargaHoraria: 0,
                analises: [],
                anexos: [],
                aluno_id: 0,
                edital_id: 0,
                disciplina_id: 0
              });
  }
}
