/*Desenvolvido por Guilherme Selau Pereira*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-discipline-list',
  templateUrl: './discipline-list.component.html',
  styleUrls: ['./discipline-list.component.css']
})
export class DisciplineListComponent {
  /*public disciplinaList: Disciplina[] = [];
  public disciplinaDelete!: Disciplina;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que deseja excluir está Disciplina?';

  constructor(private route: ActivatedRoute,
              //private disciplinaService: DisciplinaService,
              private router: Router){
  }

  ngOnInit(): void {
    this.getAnnouncement();
  }

  getAnnouncement(){
    this.disciplinaService.list().subscribe(
      (_disciplina: Disciplina[]) => {
        this.disciplinaList = _disciplina;
      },
      error => console.log(error)
    )

  }

  toDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
  }*/
}
