import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Edital } from 'src/app/model/Edital';
import { Etapa } from 'src/app/model/Etapa';
import { EditalService } from 'src/app/services/edital.service';

@Component({
  selector: 'app-announcement-registration',
  templateUrl: './announcement-registration.component.html',
  styleUrls: ['./announcement-registration.component.css']
})
export class AnnouncementRegistrationComponent implements OnInit {

  today: number = new Date().getDay();
  anoCorrente: number = new Date().getFullYear();
  minDate: string = `${this.anoCorrente}-01-01`;
  maxDate: string = `${this.anoCorrente}-12-31`;
  hoje: string = '';

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

  isEditMode: boolean = false;

  constructor(private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private editalService: EditalService,
    private router: Router) {}

  ngOnInit(): void {
    this.hoje = this.obterDataAtual();
    const currentYear = new Date().getFullYear();
    let edital: Edital = this.route.snapshot.data['edital'];

    if (!edital) {
      this.isEditMode = true;
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
      numero: [edital.numero, [Validators.required, Validators.pattern('^(?!.*(?:\s{2}|/.*\/))[a-zA-Z0-9À-ÖØ-ÿ\s/]{6,35}$')]],
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
      const dataInicioValue = this.form.get('dataInicio')?.value;
      const dataFimValue = this.form.get('dataFim')?.value;
      if (dataInicioValue && dataFimValue) {
        this.form.patchValue({
          dataInicio: this.addDayToDate(dataInicioValue),
          dataFim: this.addDayToDate(dataFimValue)
        })

      this.editalService.save(this.form.value)
        .subscribe(result => {
          alert("Salvo com sucesso");
          this.router.navigate(['/announcement']);
        },
        error => alert("Erro ao salvar edital"));
    } else {
      alert("Preencha todos os campos");
    }
    this.router.navigate(['/announcement']);
  }
}

  private createSteps(etapa: Etapa = { id: '', nome: '', ator: '', dataInicio: '0', dataFim: '0' }) {
    return this.formBuilder.group({
      id: [etapa.id],
      nome: [
        etapa.nome,
        [
          Validators.required,
          Validators.pattern(/^[^<>;'"`\\]{6,240}$/),
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
    edital.etapas.forEach((etapa: any) => {
      etapa.dataInicio = this.addDayToDate(new Date(etapa.dataInicio));
      etapa.dataFim = this.addDayToDate(new Date(etapa.dataFim));
      etapas.push(this.createSteps(etapa));
    });
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
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  private customNumberValidator(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      const isValidLength = value && value.length >= minLength && value.length <= maxLength;
      const patternValidator = Validators.pattern('^(?!.*(?:\s{2}|/.*\/))[a-zA-Z0-9À-ÖØ-ÿ\s/]{6,35}$')(control);
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
      const patternValidator = Validators.pattern(/^[^<>;'"`\\]{6,240}$/)(control);
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

  todosDescricaoValid(): boolean {
    const etapasArray = this.form.get('etapas') as FormArray;
    for (let i = 0; i < etapasArray.length; i++) {
      const etapa = etapasArray.at(i);
      if (etapa) {
        const descricaoControl = etapa.get('nome');
        if (descricaoControl && !descricaoControl.valid) {
          return false;
        }
      }
    }
    return true;
  }

  todosDatasValid(): boolean {
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

  isEdit(){
    return this.isEditMode;
  }

  addDayToDate(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  }

  validarEtapasDentroDoPeriodo(formGroup: FormGroup): boolean {
    const dataInicioEdital = new Date(formGroup.get('dataInicio')?.value);
    const dataFimEdital = new Date(formGroup.get('dataFim')?.value);
    const etapasArray = formGroup.get('etapas') as FormArray;
    for (let i = 0; i < etapasArray.length; i++) {
      const etapa = etapasArray.at(i) as FormGroup;
      const dataInicioEtapa = new Date(etapa.get('dataInicio')?.value);
      const dataFimEtapa = new Date(etapa.get('dataFim')?.value);
      if (dataInicioEtapa < dataInicioEdital) {
        return false;
      }
      if (dataFimEtapa > dataFimEdital) {
        return false;
      }
    }
    return true;
  }

  validarEtapasSemSobreposicao(formGroup: FormGroup): boolean {
    const etapasArray = formGroup.get('etapas') as FormArray;
    const etapasOrdenadas = etapasArray.controls.slice().sort((a, b) => {
      const dataInicioA = new Date((a as FormGroup).get('dataInicio')?.value).getTime();
      const dataInicioB = new Date((b as FormGroup).get('dataInicio')?.value).getTime();
      return dataInicioA - dataInicioB;
    });

    for (let i = 0; i < etapasOrdenadas.length - 1; i++) {
      const etapaAtual = etapasOrdenadas[i] as FormGroup;
      const etapaSeguinte = etapasOrdenadas[i + 1] as FormGroup;
      const dataFimEtapaAtual = new Date(etapaAtual.get('dataFim')?.value);
      const dataInicioEtapaSeguinte = new Date(etapaSeguinte.get('dataInicio')?.value);
      if (dataInicioEtapaSeguinte <= dataFimEtapaAtual) {
        return false;
      }
    }
    return true;
  }

  obterDataAtual(): string {
    const dataOntem = new Date();
    dataOntem.setDate(dataOntem.getDate());
    const anoOntem = dataOntem.getFullYear();
    const mesOntem = (dataOntem.getMonth() + 1).toString().padStart(2, '0');
    const diaOntem = dataOntem.getDate().toString().padStart(2, '0');
    return `${anoOntem}-${mesOntem}-${diaOntem}`;
  }

  haEtapas(formGroup: FormGroup): boolean {
    const etapasArray = formGroup.get('etapas') as FormArray;
    return etapasArray.length > 0;
  }

  isDataInicioEditalValid(): boolean {
    const dataInicio = new Date(this.form.get('dataInicio')?.value);
    const dataOntem = new Date();
    dataOntem.setDate(dataOntem.getDate() - 1);
    dataInicio.setHours(0, 0, 0, 0);
    dataOntem.setHours(0, 0, 0, 0);
    return dataInicio.getTime() >= dataOntem.getTime();
  }

}
