import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Analise } from 'src/app/model/Analise';
import { AnaliseService } from 'src/app/services/analise.service';

@Component({
  selector: 'app-add-analysis',
  templateUrl: './add-analysis.component.html',
  styleUrls: ['./add-analysis.component.css']
})
export class AddAnalysisComponent implements OnInit {

  formData!: FormGroup;
  @Input() idRequicao: string | undefined;
  @Input() idServidor: string | undefined;
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private analiseService: AnaliseService) {

  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      id: [''],
      status: [''],
      parecer: ['']
    });
  }

  confirm() {
    this.confirmed.emit(true);
  }

  cancel() {
    this.confirmed.emit(false);
  }

  submitForm(form: any) {
    this.analiseService.createAanalise(this.generateAnalysis(form))
    .subscribe(
      result =>{
        alert("Salvo com sucesso");
      },
      erro => {
        alert('erro ao salvar analise!')
      }
    );
    this.confirm();
  }

  generateAnalysis(form: any): Analise {
    return {
      id:  form.get('id')?.value,
      status:  form.get('status')?.value,
      parecer: form.get('parecer')?.value,
      servidor_id: Number(this.idServidor),
      requisicao_id: Number(this.idRequicao)
    };
  }
}
