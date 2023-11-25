import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requisicao } from 'src/app/model/Requisicao';
import { RequisicaoService } from 'src/app/services/requisicao.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

  public requisicaoList: Requisicao[] = [];
  public requisicaoDelete!: Requisicao;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que desja excluir esta Requisicao?';

  constructor(private route: ActivatedRoute,
              private requisicaoService: RequisicaoService,
              private router: Router){
  }

  ngOnInit(): void {
    this.getAnnouncement();
  }

  getAnnouncement(){
    this.requisicaoService.list().subscribe(
      (_requisicoes: Requisicao[]) => {
        this.requisicaoList = _requisicoes;
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


  onEdit(requisicao: Requisicao) {
    this.router.navigate(['edit', requisicao.id], {relativeTo: this.route});
  }

  showConfirmationDialog(requisicao: Requisicao) {
    this.isConfirmationVisible = true;
    this.requisicaoDelete = requisicao;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.requisicaoService.remove(this.requisicaoDelete?.id).subscribe(
        result => alert("Requisicao deletada com sucesso"),
        error => alert("Erro ao deletar Requisicao")
      );
    }
    location.reload();
    this.isConfirmationVisible = false;
  }

}
