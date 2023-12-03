import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ppc } from 'src/app/model/Ppc';
import { PpcService } from 'src/app/services/ppc.service';

@Component({
  selector: 'app-ppc-list',
  templateUrl: './ppc-list.component.html',
  styleUrls: ['./ppc-list.component.css']
})
export class PpcListComponent {
  public ppcList: Ppc[] = [];
  public ppcDelete!: Ppc;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que deseja excluir este PPC?';
  public termoPesquisa: String = '';

  constructor(private route: ActivatedRoute,
              private ppcService: PpcService,
              private router: Router){
  }

  ngOnInit(): void {
    this.getPpc();
  }

  getPpc(){
    this.ppcService.list().subscribe(
      (_ppc: Ppc[]) => {
        this.ppcList = _ppc.filter(ppc =>{
          const term = this.termoPesquisa.toLowerCase();
          return (
            ppc.nomePPC.toLowerCase().includes(term) ||
            (typeof ppc.ano === 'number' && ppc.ano.toString().includes(term))
          );
        });
      },
      error => console.log(error)
    )
  }

  onEdit(ppc: Ppc) {
    this.router.navigate(['edit', ppc.id], {relativeTo: this.route});
    console.log(ppc)
  }

  showConfirmationDialog(ppc: Ppc) {
    this.isConfirmationVisible = true;
    this.ppcDelete = ppc;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.ppcService.remove(this.ppcDelete?.id).subscribe(
        result => alert("PPC deletado com sucesso"),
        error => alert("Erro ao deletar PPC")
      );
    }
    this.router.navigate(['/ppc']);
    location.reload();
    this.isConfirmationVisible = false;
  }
}
