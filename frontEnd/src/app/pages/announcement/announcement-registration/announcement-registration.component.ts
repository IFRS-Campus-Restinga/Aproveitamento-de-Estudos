import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, AbstractControl, FormArray } from '@angular/forms';
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
        numero: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9À-ÖØ-\\s]{6,240}$')]],
        dataInicio: ['', Validators.required],
        dataFim:  ['', Validators.required],
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
      alert("Preencha todos os campos");
    }
  }

  private createSteps(etapa : Etapa = {id: '', nome: '', ator: '', dataInicio: '0', dataFim: '0'}){
    return this.formBuilder.group({
      id: [etapa.id],
      nome: [etapa.nome, [Validators.required, Validators.pattern('^[a-zA-Z0-9À-ÖØ-\\s]{6,35}$')]],
      ator: [etapa.ator, Validators.required],
      dataInicio: [etapa.dataInicio, Validators.required],
      dataFim: [etapa.dataFim, Validators.required]
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

  convertNumeroToUpperCase() {
    this.form.get('numero')?.setValue(this.form.value.numero.toUpperCase());
  }

  isValid(campo: string): boolean {
    const fieldControl = this.form.get(campo);
    if (fieldControl) {
      return fieldControl.valid;
    }
    return false;
  }

  isNumeroValid(): boolean {
    const numeroControl = this.form.get('numero');
    return numeroControl ? numeroControl.valid && numeroControl.touched : false;
  }

  isNomeValid(): boolean {
    const etapasArray = this.form.get('etapas') as FormArray;
    let allValid = true;

    etapasArray.controls.forEach((control: AbstractControl) => {
      const nomeControl = control.get('nome');
      if (nomeControl && !nomeControl.valid ) {
        allValid = false;
      }
    });

    return allValid;
  }

  validarDataFinalPosterior() {
    const dataInicio = new Date(this.form.value.dataInicio);
    const dataFim = new Date(this.form.value.dataFim);
    if (dataInicio < dataFim) {
      return true;
    } else {
      return false;
    }
  }

  isAtorValid(): boolean {
    const etapasArray = this.form.get('etapas') as FormArray;
    let allValid = true;

    etapasArray.controls.forEach((control: AbstractControl) => {
      const nomeControl = control.get('ator');
      if (nomeControl && nomeControl.value =='') {
        allValid = false;
      }
    });

    return allValid;
  }

  validarEtapaDataFinalPosterior(): boolean {
    const etapasArray = this.form.get('etapas') as FormArray;
    let allValid = true;

    etapasArray.controls.forEach((control: AbstractControl) => {
      const dataInicioControl = control.get('dataInicio');
      const dataFimControl = control.get('dataFim');
      if (dataInicioControl && dataFimControl) {
        const dataInicio = new Date(dataInicioControl.value);
        const dataFim = new Date(dataFimControl.value);
        if (dataInicio >= dataFim ) {
          allValid = false;
        }
      }
    });

    return allValid;
  }

 }
