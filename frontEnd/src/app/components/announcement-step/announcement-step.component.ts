import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-announcement-step',
  templateUrl: './announcement-step.component.html',
  styleUrls: ['./announcement-step.component.css']
})
export class AnnouncementStepComponent implements OnInit {
  announcementStepForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.announcementStepForm = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s.,\'-]*$')]],
      dataInicio: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿÇç\\s]{5,120}$')]],
      dataFim: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿ\\s]{10,60}$')]]
    });
  }
     
  submitForm(): any {
    if (this.announcementStepForm.valid) {
      return this.announcementStepForm.value;
    }
    return null;
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
  

