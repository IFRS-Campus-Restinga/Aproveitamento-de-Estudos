import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplina } from 'src/app/model/Disciplina';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-discipline-list',
  templateUrl: './discipline-list.component.html',
  styleUrls: ['./discipline-list.component.css']
})
export class DisciplineListComponent {
  public disciplinaList: Disciplina[] = [];
  public disciplinaDelete!: Disciplina;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que deseja excluir está Disciplina?';

  constructor(private route: ActivatedRoute,
              private disciplinaService: DisciplinaService,
              private router: Router){
  }

  ngOnInit(): void {
    
    this.getDisciplina();
  }

  getDisciplina(){
    this.disciplinaService.list().subscribe(
      (_disciplina: Disciplina[]) => {
        this.disciplinaList = _disciplina;
      },
      error => console.log(error)
    )

  }


  onEdit(disciplina: Disciplina) {
    this.router.navigate(['edit', disciplina.id], {relativeTo: this.route});
  }

  showConfirmationDialog(disciplina: Disciplina) {
    this.isConfirmationVisible = true;
    this.disciplinaDelete = disciplina;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.disciplinaService.remove(this.disciplinaDelete?.id).subscribe(
        result => alert("Disciplina deletada com sucesso"),
        error => alert("Erro ao deletar disciplina")
      );
    }
    this.isConfirmationVisible = false;
  }
}
