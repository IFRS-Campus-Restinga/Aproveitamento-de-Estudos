import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/model/Aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-user-resgistration',
  templateUrl: './user-resgistration.component.html',
  styleUrls: ['./user-resgistration.component.css']
})
export class UserResgistrationComponent implements OnInit{

  private aluno: Aluno | null = null;
  public cursos: any[] | null = null;
  public listCursos: Array<{ curso: string, id: number}> = [];

  constructor(private alunoService: AlunoService, private cursoService: CursoService) {

  }

  ngOnInit(): void {
    this.loadCursos();
  }

  formData: any = {
    curso: 'Selecione um curso'
  };

  submitForm(form: any) {
    this.aluno = {
        nome: this.formData.nome,
        email: this.formData.email,
        admin: false,
        tipo: "ALUNO",
        matricula: this.formData.matricula,
        dataIngresso: this.formData.dataIngresso,
        curso: this.formData.curso
    }

    this.alunoService.createAluno(this.aluno).subscribe(
      (error) => {
        console.error('Erro:', error);
      }
    );
  }

  loadCursos(){
    this.cursoService.getCursos().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((curso: any) => {
            this.listCursos.push(
              { curso: curso.nome, id: curso.id }
            )
          });
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );

  }

}
