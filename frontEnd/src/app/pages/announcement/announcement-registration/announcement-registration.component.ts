import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Etapa } from 'src/app/model/Etapa';
import { EditalService } from 'src/app/services/edital.service';

@Component({
  selector: 'app-announcement-registration',
  templateUrl: './announcement-registration.component.html',
  styleUrls: ['./announcement-registration.component.css']
})
export class AnnouncementRegistrationComponent implements OnInit{

  form!: FormGroup;
  public listAtores: Array<{ ator: string }> = [
    {ator: "ALUNO"},
    {ator: "COORDENADOR"},
    {ator: "ENSINO"},
    {ator: "PROFESSOR"},
    {ator: "SERVIDOR"}
  ];

  constructor(private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private editalService: EditalService){

  }
  ngOnInit(): void {
    const edital: any = this.route.snapshot.data['edital'];

    this.form = this.formBuilder.group({
        id:[''],
        numero: [''],
        dataInicio: [''],
        dataFim:  [''],
        etapas: this.formBuilder.array(this.retriveSteps(edital))
      }
    );
  }

  addStep() {
    const etapas = this.form.get('etapas') as UntypedFormArray;
    etapas.push(this.createSteps());
  }

  submitForm() {
    if (this.form.valid) {
      this.editalService.save(this.form.value)
        .subscribe(result => alert("Salvo com sucesso"), error => alert("Erro ao salvar curso"));
    } else {
      alert("Prrencha todos os campos");
    }
  }

  private createSteps(etapa : Etapa = {id: '', nome: '', ator: '', dataInicio: '', dataFim: ''}){
    return this.formBuilder.group({
      id: [etapa.id],
      nome: [etapa.nome],
      ator: [etapa.ator],
      dataInicio: [etapa.dataInicio],
      dataFim: [etapa.dataFim]
    });
  }

  getStepsFormArray(){
    return (<UntypedFormArray>this.form.get('etapas')).controls;
  }

  private retriveSteps(edital: any){
    const etapas = [];
    if(edital?.etapas){
      edital.etapas.forEach((etapa: any) => etapas.push(this.createSteps(etapa)))
    }else{
      etapas.push(this.createSteps());
    }
    return etapas;
  }

  removeSteps(i: number) {
    const steps = this.form.get('etapas') as UntypedFormArray;
    steps.removeAt(i);
  }
}
