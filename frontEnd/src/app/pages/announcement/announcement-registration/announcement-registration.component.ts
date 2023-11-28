import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Edital } from 'src/app/model/Edital';
import { Etapa } from 'src/app/model/Etapa';
import { EditalService } from 'src/app/services/edital.service';

@Component({
  selector: 'app-announcement-registration',
  templateUrl: './announcement-registration.component.html',
  styleUrls: ['./announcement-registration.component.css']
})
export class AnnouncementRegistrationComponent implements OnInit {

  minLengthValue: number = 0;
  maxLengthValue: number = 0;

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
    private editalService: EditalService) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    let edital: Edital = this.route.snapshot.data['edital'];

    if (!edital) {
      edital = {
        id: '',
        numero: '',
        dataInicio: '0',
        dataFim: '0',
        etapas: []
      };
    }

    this.form = this.formBuilder.group({
      id: [edital.id],
      numero: [edital.numero, [Validators.required, Validators.pattern('^[a-zA-Z0-9À-ÖØ-\\s]{6,35}$')]],
      dataInicio: [this.toDate(edital.dataInicio), Validators.required],
      dataFim: [this.toDate(edital.dataFim), [Validators.required]],
      etapas: this.formBuilder.array(this.retriveSteps(edital))
    });

    const numeroControl = this.form.get('numero');
    if (numeroControl) {
      const currentValidators = numeroControl.validator !== null ? [numeroControl.validator] : [];
      const customValidator = this.customNumberValidator(6, 35);
      numeroControl.setValidators([...currentValidators, customValidator]);
    }
    this.updateCustomNomeValidators();
  }

  addStep() {
    const etapas = this.form.get('etapas') as UntypedFormArray;
    etapas.push(this.createSteps());
    this.updateCustomNomeValidators();
  }

  submitForm() {
    if (this.form.valid) {
      this.editalService.save(this.form.value)
        .subscribe(result => alert("Salvo com sucesso"), error => alert("Erro ao salvar edital"));
    } else {
      alert("Preencha todos os campos");
    }
  }

  private createSteps(etapa: Etapa = { id: '', nome: '', ator: '', dataInicio: '0', dataFim: '0' }) {
    return this.formBuilder.group({
      id: [etapa.id],
      nome: [
        etapa.nome,
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿ0-9. ]{6,240}$'),
          this.customNomeValidator(6, 240),
        ],
      ],
      ator: [etapa.ator, Validators.required],
      dataInicio: [this.toDate(etapa.dataInicio), Validators.required],
      dataFim: [this.toDate(etapa.dataFim), Validators.required]
    });
  }

  getStepsFormArray() {
    return (this.form.get('etapas') as UntypedFormArray).controls;
  }

  private retriveSteps(edital: any) {
    const etapas = [];
    if (edital?.etapas) {
      edital.etapas.forEach((etapa: any) => etapas.push(this.createSteps(etapa)));
    } else {
      etapas.push(this.createSteps());
    }
    return etapas;
  }

  removeSteps(i: number) {
    const steps = this.form.get('etapas') as UntypedFormArray;
    steps.removeAt(i);
    this.updateCustomNomeValidators();
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
      if (nomeControl && !nomeControl.valid) {
        allValid = false;
      }
    });
    return allValid;
  }

  validarDataFinalPosterior(): boolean {
    const dataInicio = new Date(this.form.value.dataInicio);
    const dataFim = new Date(this.form.value.dataFim);
    const currentYear = new Date().getFullYear();
    if (dataFim.getFullYear() > currentYear) {
      return false;
    }
    if (dataInicio < dataFim) {
      return true;
    }
    return false;
  }

  isAtorValid(i: number): boolean {
    const etapa = (this.form.get('etapas') as FormArray).at(i);

    if (etapa) {
      const atorControl = etapa.get('ator');
      return atorControl ? atorControl.valid : false;
    }

    return false;
  }

  validarEtapaDataFinalPosterior(i: number): boolean {
    const etapa = (this.form.get('etapas') as FormArray).at(i);

    if (etapa) {
      const dataInicio = new Date(etapa.get('dataInicio')?.value);
      const dataFim = new Date(etapa.get('dataFim')?.value);
      const currentYear = new Date().getFullYear();
      if (dataFim.getFullYear() > currentYear) {
        return false;
      }
      return dataInicio < dataFim;
    }
    return false;
  }

  toDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private customNumberValidator(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const isValidLength = value && value.length >= minLength && value.length <= maxLength;
      const patternValidator = Validators.pattern('^[a-zA-Z0-9À-ÖØ-\\s]*$')(control);
      if (!isValidLength) {
        if (value && value.length < minLength) {
          return { 'minLengthError': true };
        } else if (value && value.length > maxLength) {
          return { 'maxLengthError': true };
        }
      }
      if (patternValidator !== null) {
        return { 'contentInvalid': true };
      }
      return null;
    };
  }

  private customNomeValidator(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const isValidLength = value && value.length >= minLength && value.length <= maxLength;
      const patternValidator = Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿ0-9. ]*$')(control);
      if (!isValidLength) {
        if (value && value.length < minLength) {
          return { 'minLengthNomeError': true };
        } else if (value && value.length > maxLength) {
          return { 'maxLengthNomeError': true };
        }
      }
      if (patternValidator !== null) {
        return { 'contentNomeInvalid': true };
      }
      return null;
    };
  }

  private updateCustomNomeValidators() {
    const etapasArray = this.form.get('etapas') as FormArray;
    etapasArray.controls.forEach((control: AbstractControl) => {
      const nomeControl = control.get('nome');
      if (nomeControl) {
        const currentValidators = nomeControl.validator !== null ? [nomeControl.validator] : [];
        const customValidator = this.customNomeValidator(6, 240);
        nomeControl.setValidators([...currentValidators, customValidator]);
        nomeControl.updateValueAndValidity();
      }
    });
  }

  todasEtapasComDatasValidas(): boolean {
    const etapasArray = this.form.get('etapas') as FormArray;
    for (let i = 0; i < etapasArray.length; i++) {
      const etapa = etapasArray.at(i);
      if (etapa) {
        const dataInicio = new Date(etapa.get('dataInicio')?.value);
        const dataFim = new Date(etapa.get('dataFim')?.value);
        if (!(dataInicio < dataFim)) {
          return false;
        }
      }
    }
    return true;
  }

  todosAtoresValid(): boolean {
    const etapasArray = this.form.get('etapas') as FormArray;
      for (let i = 0; i < etapasArray.length; i++) {
      const etapa = etapasArray.at(i);
      if (etapa) {
        const atorControl = etapa.get('ator');
        if (atorControl && !atorControl.valid) {
          return false;
        }
      }
    }
    return true;
  }
}
