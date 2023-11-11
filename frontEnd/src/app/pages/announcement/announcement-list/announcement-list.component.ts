import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edital } from 'src/app/model/Edital';
import { EditalService } from 'src/app/services/edital.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {

  public editalList: Edital[] = [];
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

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

  //onDelete(edital: Edital) {
  //  let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //    data: 'Deseja excluir este curso?',
  //  });
//
  //  dialogRef.afterClosed().subscribe((result : boolean) => {
  //    if(result){
  //      this.coursesService.remove(course._id);
  //      this.refresh();
  //    }
  //  });
//
  //}

}
