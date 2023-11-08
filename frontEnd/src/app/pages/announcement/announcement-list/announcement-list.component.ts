import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Edital } from 'src/app/model/Edital';
import { EditalService } from 'src/app/services/edital.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {

  public editalList: Edital[] = [];

  constructor(private route: ActivatedRoute,
              private editalService: EditalService){
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

}
