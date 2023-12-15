import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/model/Aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  public alunoList: Aluno[] = [];
  public alunoDelete!: Aluno;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que deseja excluir este Aluno?';
  public termoPesquisa: string = '';
  
  message = '';

  constructor(private route: ActivatedRoute,
              private alunoService: AlunoService,
              private router: Router){
  }

  ngOnInit(): void {
    this.alunoService.list().subscribe( data => {
      this.message = data.message;
    },
    err => {
      console.log(err);
    });
 
  }

  getStudent(){
    this.alunoService.list().subscribe(
      (_aluno: Aluno[]) => {
        this.alunoList = _aluno.filter(aluno =>
          (aluno.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()))||
          (aluno.matricula.toLowerCase().includes(this.termoPesquisa.toLowerCase()))||
          (aluno.curso.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()))||
          (aluno.dataIngresso.toLowerCase().includes(this.termoPesquisa.toLowerCase()))
        );
      },
      error => console.log(error)
    )
  }

  onEdit(aluno: Aluno) {
    this.router.navigate(['edit', aluno.id], {relativeTo: this.route});
  }

  showConfirmationDialog(aluno: Aluno) {
    this.isConfirmationVisible = true;
    this.alunoDelete = aluno;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.alunoService.remove(this.alunoDelete?.id).subscribe(
        result => alert("Aluno deletado com sucesso"),
        error => alert("Erro ao deletar Aluno")
      );
    }
    location.reload();
    this.isConfirmationVisible = false;
  }
}
