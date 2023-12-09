import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ppc } from 'src/app/model/Ppc';
import { PpcCreate } from 'src/app/model/PpcCreate';
import { PpcRead } from 'src/app/model/PpcRead';
import { PpcService } from 'src/app/services/ppc.service';

@Component({
  selector: 'app-ppc-list',
  templateUrl: './ppc-list.component.html',
  styleUrls: ['./ppc-list.component.css']
})
export class PpcListComponent {
  public ppcList: PpcRead[] = [];
  public ppcDelete!: PpcCreate;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que deseja excluir este PPC?';
  public termoPesquisa: String = '';
  orderByKey: string = '';

  constructor(private route: ActivatedRoute,
              private ppcService: PpcService,
              private router: Router){
  }

  ngOnInit(): void {
    this.getPpc();
  }

  getPpc(){
    this.ppcService.list().subscribe(
      (_ppc: PpcRead[]) => {
        this.ppcList = _ppc.filter(ppc =>{
          const term = this.termoPesquisa.toLowerCase();
          return (
            ppc.nomePPC == null ? 'nome não encontrado' :
            ppc.nomePPC.toLowerCase().includes(term) ||
            ppc.nomeCurso.toLowerCase().includes(term) ||
            (typeof ppc.ano === 'number' && ppc.ano.toString().includes(term))
          );
        });
      },
      error => console.log(error)
    )
  }

  orderBy(key: keyof PpcCreate | string) {
    if (this.orderByKey === key) {
      this.ppcList.reverse();
    } else {
      this.orderByKey = key as keyof PpcCreate;
      this.ppcList.sort((a, b) => {
        const x = this.getPropertyValue(a, key);
        const y = this.getPropertyValue(b, key);
        if (key === 'curso.nome') {
          return x.localeCompare(y); // Ordenação alfabética para o nome do curso
        } else {
          return x.toString().localeCompare(y.toString());
        }
      });
    }
  }

  getPropertyValue(item: any, key: keyof PpcCreate | string): string {
    if (typeof key === 'string' && key.includes('.')) {
      const keys = key.split('.');
      return keys.reduce((acc, current) => (acc ? acc[current] : ''), item).toString().toLowerCase();
    } else {
      return item[key].toString().toLowerCase();
    }
  }


  onEdit(ppc: PpcCreate) {
    this.router.navigate(['edit', ppc.id], {relativeTo: this.route});
    console.log(ppc)
  }

  showConfirmationDialog(ppc: PpcCreate) {
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
