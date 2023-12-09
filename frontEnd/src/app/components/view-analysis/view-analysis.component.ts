import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Analise } from 'src/app/model/Analise';
import { AnaliseService } from 'src/app/services/analise.service';

@Component({
  selector: 'app-view-analysis',
  templateUrl: './view-analysis.component.html',
  styleUrls: ['./view-analysis.component.css']
})
export class ViewAnalysisComponent implements OnInit {

  public analises!: Analise[];
  @Input() idRequicao: string | undefined;
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private analiseService: AnaliseService) {

  }

  ngOnInit(): void {
    this.analiseService.list(this.idRequicao).subscribe(
      data => {
        this.analises = data;
      },
      erro =>{
        console.log(erro);
      });
  }

  close() {
    this.confirmed.emit(false);
  }

}
