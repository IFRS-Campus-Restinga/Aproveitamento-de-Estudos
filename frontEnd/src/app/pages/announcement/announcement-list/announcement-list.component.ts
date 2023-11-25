import { Edital } from './../../../model/Edital';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditalService } from 'src/app/services/edital.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {

  public editalList: Edital[] = [];
  public editaDelete!: Edital;
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  public isConfirmationVisible: boolean | undefined;
  public confirmationMessage = 'Tem certeza que desja excluir este Edital?';

  constructor(private route: ActivatedRoute,
              private editalService: EditalService,
              private router: Router){
  }

  ngOnInit(): void {
    this.getAnnouncement();
  }

  getAnnouncement(){
    this.editalService.list().subscribe(
      (_edital: Edital[]) => {
        this.editalList = _edital;
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


  onEdit(edital: Edital) {
    this.router.navigate(['edit', edital.id], {relativeTo: this.route});
  }

  showConfirmationDialog(edital: Edital) {
    this.isConfirmationVisible = true;
    this.editaDelete = edital;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      this.editalService.remove(this.editaDelete?.id).subscribe(
        result => alert("Edital deletado com sucesso"),
        error => alert("Erro ao deletar edital")
      );
    }
    this.isConfirmationVisible = false;
  }

}
