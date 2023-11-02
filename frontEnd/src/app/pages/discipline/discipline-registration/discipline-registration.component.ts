import { Component, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { PpcService } from 'src/app/services/ppc.service';

@Component({
  selector: 'app-discipline-registration',
  templateUrl: './discipline-registration.component.html',
  styleUrls: ['./discipline-registration.component.css']
})
export class DisciplineRegistrationComponent implements OnInit {

  formData: any = {
    curso: 'Selecione um curso'
  };

  public cursos: any[] | null = null;
  public listCursos: Array<{ curso: string, id: number, ppcs: any[]}> = [];
  public listPpcs: Array<{ nomePPC: string, id: number, ano: number}> = [];

  constructor(private cursoService: CursoService, private ppcService: PpcService) {

  }

  ngOnInit(): void {
     this.loadCursos();
  }

  submitForm(form: any) {
    console.log(this.formData);
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

    const idCurso = opcaoSelecionada.split('. ')[0];
    //this.listPpcs = this.listCursos.find(item => item.id == idCurso).ppcs;
  }

}
