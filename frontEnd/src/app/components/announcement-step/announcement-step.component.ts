import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-announcement-step',
  templateUrl: './announcement-step.component.html',
  styleUrls: ['./announcement-step.component.css']
})
export class AnnouncementStepComponent implements OnInit {
  announcementStepForm!: FormGroup;
  atores: string[] = [
    'Selecione um ator',
    'ALUNO',
    'COORDENADOR',
    'PROFESSOR',
    'SERVIDOR'
  ];

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.announcementStepForm = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s.,\'-]*$')]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      ator: ['Selecione um ator', Validators.required],
    });
  }
     
  submitForm(): any {
    if (this.announcementStepForm.valid) {
      return this.announcementStepForm.value;
    }
    return null;
  }

  isAtorValid(): boolean {
    return this.announcementStepForm.get('ator')?.value !== 'Selecione um ator';
  }

  isFormValid(): boolean {
    console.log(this.announcementStepForm.value.descricao)
    console.log(this.announcementStepForm.value.dataInicio)
    console.log(this.announcementStepForm.value.dataFim)
    return this.announcementStepForm.valid;
  }
  
    validarDataFinalPosterior() {
    const dataInicio = new Date(this.announcementStepForm.value.dataInicio);
    const dataFim = new Date(this.announcementStepForm.value.dataFim);

    if (dataInicio <= dataFim) {
      return true;
    } else {
      return false;
    }
  }

  validarCursoSelecionado() {
    return this.announcementStepForm.value.curso !== 'Selecione um ator';
  }

  isValid(campo: string): boolean {
    const fieldControl = this.announcementStepForm.get(campo);
    
    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    
    return false;
  }

}
