import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/model/Aluno';
import { AlunoService } from 'src/app/services/aluno.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class studentListComponent {

  public alunoList: Aluno[] = [];
  public alunoDelete!: Aluno;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que deseja excluir este Aluno?';

  constructor(private route: ActivatedRoute,
              private alunoService: AlunoService,
              private router: Router){
  }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(){
    this.alunoService.list().subscribe(
      (_aluno: Aluno[]) => {
        this.alunoList = _aluno;
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
    this.isConfirmationVisible = false;

  }
}
