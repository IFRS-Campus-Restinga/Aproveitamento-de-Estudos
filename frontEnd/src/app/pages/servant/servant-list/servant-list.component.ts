import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from './../../../model/Servidor';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-servant-list',
  templateUrl: './servant-list.component.html',
  styleUrls: ['./servant-list.component.css']
})
export class ServantListComponent {
  public servidorList: Servidor[] = [];
  public servidorDelete!: Servidor;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que desja excluir este Servidor?';

  constructor(private route: ActivatedRoute,
              private servidorService: ServidorService,
              private router: Router){
  }

  ngOnInit(): void {
    this.getServant();
  }

  getServant(){
    this.servidorService.list().subscribe(
      (_servidor: Servidor[]) => {
        this.servidorList = _servidor;
      },
      error => console.log(error)
    )
  }


  onEdit(servidor: Servidor) {
    this.router.navigate(['edit', servidor.id], {relativeTo: this.route});
  }

  showConfirmationDialog(servidor: Servidor) {
    this.isConfirmationVisible = true;
    this.servidorDelete = servidor;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.servidorService.remove(this.servidorDelete?.id).subscribe(
        result => alert("Servidor deletado com sucesso"),
        error => alert("Erro ao deletar servidor")
      );
    }
    this.isConfirmationVisible = false;
  }
}
