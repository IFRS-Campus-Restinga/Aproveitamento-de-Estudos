import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Analise } from 'src/app/model/Analise';
import { AnaliseService } from 'src/app/services/analise.service';

@Component({
  selector: 'app-add-analysis',
  templateUrl: './add-analysis.component.html',
  styleUrls: ['./add-analysis.component.css']
})
export class AddAnalysisComponent implements OnInit {

  @Input() idRequicao: string | undefined;
  @Input() idServidor: string | undefined;
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  formData!: FormGroup;
  listStatus: any[] = [
    {nome: 'Solicitação-criada', status: 'SOLICITACAO_CRIADA'},
    {nome: 'Aprovada-pelo-ensino', status: 'APROVADA_PELO_ENSINO'},
    {nome: 'Prova-agendada', status: 'PROVA_AGENDADA'},
    {nome: 'Aprovada-pelo-professor', status: 'APROVADA_PELO_PROFESSOR'},
    {nome: 'Aprovada-pelo-coordenador', status: 'APROVADA_PELO_COORDENADOR'},
    {nome: 'Deferida', status: 'DEFERIDA'},
    {nome: 'Indeferida', status: 'INDEFERIDA'},
  ]

  constructor(private formBuilder: FormBuilder, private analiseService: AnaliseService) {

  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      id: [''],
      status: ['', Validators.required],
      parecer: ['', [Validators.required,
                     Validators.pattern(/^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*(?:[.,]\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*)*$/),
                     Validators.minLength(10),
                     Validators.maxLength(200)]]
    });
  }

  confirm() {
    this.confirmed.emit(true);
  }

  cancel() {
    this.confirmed.emit(false);
  }

  submitForm(form: FormGroup) {
    if(form.valid){
      this.analiseService.createAanalise(this.generateAnalysis(form))
      .subscribe(
        result =>{
          alert("Salvo com sucesso");
        },
        erro => {
          alert('erro ao salvar analise!');
        }
      );
      this.confirm();
    }else{
      alert('Formulario invalido');
    }

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

  check(variableName: string, condition: string): boolean {
    const variable = this.formData.get(variableName);

    if (!variable) {
      return false;
    }

    switch (condition) {
      case 'minLength':
        return variable.hasError('minlength');
      case 'maxLength':
        return variable.hasError('maxlength');
      case 'status':
        return variable.invalid;
      default:
        return false;
    }
  }

  isStatusValid() {
    const ppcControl = this.formData.get('status');
    if (ppcControl?.value  !== '') {
      return true;
    }
    return false;
  }
}
