import { Component, OnInit } from '@angular/core';
import { Ppc } from 'src/app/model/Ppc';
import { CursoService } from 'src/app/services/curso.service';
import { PpcService } from 'src/app/services/ppc.service';

@Component({
  selector: 'app-discipline-registration',
  templateUrl: './discipline-registration.component.html',
  styleUrls: ['./discipline-registration.component.css']
})
export class DisciplineRegistrationComponent implements OnInit {

  formData: any = {};
  ppc: Ppc | null = null;

  public listCursos: Array<{ curso: string, id: number, ppcs: any[]}> = [{ curso: 'Selecione o curso', id: 0, ppcs: [{id: 0, nomePPC: 'Selecione o curso', ano: 0}] }];
  public listPpcs: Array<{ id: number, nomePPC: string, ano: number}> = [{id: 0, nomePPC: 'Selecione o curso', ano: 0}];

  constructor(private cursoService: CursoService, private ppcService: PpcService) {

  }

  ngOnInit(): void {
     this.loadCursos();
  }

  submitForm(form: any) {
    console.log(this.adjustPpcs(form.value));
    if (form.valid) {
      this.ppcService.createDiscipline(this.adjustPpcs(form.value))
        .subscribe(result => alert("Salvo com sucesso"), error => alert("Erro ao salvar disciplina"));
    } else {
      alert("Prrencha todos os campos");
    }

  }

  loadCursos(){
    this.cursoService.getCursos().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((curso: any) => {
            this.listCursos.push(
              { curso: curso.nome, id: curso.id, ppcs: curso.ppcs }
            )
          });
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }

  selectPpcs(event: Event){
    const elementoSelecionado = event.target as HTMLSelectElement;
    const opcaoSelecionada = elementoSelecionado.value;

    const idCurso: number = parseInt(opcaoSelecionada.split('. ')[0]);
    this.listPpcs = [];
    for (const i of this.listCursos) {
      if(i.id === idCurso){
       for(const j of i.ppcs){
          this.listPpcs.push({id: j.id, nomePPC: j.nomePPC, ano: j.ano});
       }
      }
    }
  }

  adjustPpcs(form: any): Ppc{
    return this.ppc = {
        id: form.ppc.id,
        nomePPC: form.ppc.nomePPC,
        ano: form.ppc.ano,
        disciplinas: [{
          id: '',
          nome: form.disciplina,
          codDisciplina: form.codigo,
          cargaHoraria: form.cargaHoraria
        }]
    }
  }

}
