import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-analysis',
  templateUrl: './add-analysis.component.html',
  styleUrls: ['./add-analysis.component.css']
})
export class AddAnalysisComponent {

  @Input() message: string | undefined;
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirm() {
    this.confirmed.emit(true);
  }

  cancel() {
    this.confirmed.emit(false);
  }
}
