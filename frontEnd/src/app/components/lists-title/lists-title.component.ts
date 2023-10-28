import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lists-title',
  templateUrl: './lists-title.component.html',
  styleUrls: ['./lists-title.component.css']
})
export class ListsTitleComponent {
  @Input() title: string;
  @Input() route: string;
  @Input() buttonName: string;

  constructor() { 
    this.title = "";
    this.route = "";
    this.buttonName = "";
  }

}
