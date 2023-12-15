import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/model/Curso';
import { CursoService } from 'src/app/services/curso.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-discipline-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit{
  public cursoList: Curso[] = [];
  public cursoDelete!: Curso;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que deseja excluir está Curso?';
  public termoPesquisa: String = '';
  message = '';

  constructor(private route: ActivatedRoute,
              private cursoService: CursoService,
              private router: Router,
              private tokenService: TokenService){
  }

  ngOnInit(): void {
    this.cursoService.list().subscribe( data => {
      this.message = data.message;
      console.log(this.message);
    },
    err => {
      console.log(err);
    });

  }

  getCurso(){
    this.cursoService.list().subscribe(
      (_curso: Curso[]) => {
        this.cursoList = _curso.filter(curso =>
          (curso.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()))||
          (curso.id.toLowerCase().includes(this.termoPesquisa.toLowerCase()))
        );
      },
      error => console.log(error)
    )

  }

  onEdit(curso: Curso) {
    this.router.navigate(['edit', curso.id], {relativeTo: this.route});
    console.log(curso)
  }

  showConfirmationDialog(curso: Curso) {
    this.isConfirmationVisible = true;
    this.cursoDelete = curso;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.cursoService.remove(this.cursoDelete?.id).subscribe(
        result => alert("Curso deletada com sucesso"),
        error => alert("Erro ao deletar curso")
      );
    }
    this.router.navigate(['/discipline']);
    location.reload();
    this.isConfirmationVisible = false;
  }
}