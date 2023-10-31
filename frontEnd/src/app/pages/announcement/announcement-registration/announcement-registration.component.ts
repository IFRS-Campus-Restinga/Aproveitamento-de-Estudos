import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementStepComponent } from 'src/app/components/announcement-step/announcement-step.component';

@Component({
  selector: 'app-announcement-registration',
  templateUrl: './announcement-registration.component.html',
  styleUrls: ['./announcement-registration.component.css']
})
export class AnnouncementRegistrationComponent implements OnInit {
  announcementForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.announcementForm = this.formBuilder.group({
      numero: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9À-ÖØ-\\s]{6,35}$')]],
      dataInicio: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿÇç\\s]{5,120}$')]],
      dataFim: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿ\\s]{10,60}$')]]
    });
  }
 
  submitForm(): void {
    if (this.announcementForm.valid) {
      console.log(this.announcementForm.value);
    }
  }

  isFormValid(): boolean {
    console.log(this.announcementForm.value.numero)
    console.log(this.announcementForm.value.dataInicio)
    console.log(this.announcementForm.value.dataFim)
    return this.announcementForm.valid;
  }
  
    validarDataFinalPosterior() {
    const dataInicio = new Date(this.announcementForm.value.dataInicio);
    const dataFim = new Date(this.announcementForm.value.dataFim);

    if (dataInicio <= dataFim) {
      return true;
    } else {
      return false;
    }
  }

  validarCursoSelecionado() {
    return this.announcementForm.value.curso !== 'Selecione um ator';
  }

  convertNumeroToUpperCase() {
    this.announcementForm.get('numero')?.setValue(this.announcementForm.value.numero.toUpperCase());
  }


  steps: AnnouncementStepComponent[] = [];

  addStep() {
    this.steps.push(new AnnouncementStepComponent());
  }

  isValid(campo: string): boolean {
    const fieldControl = this.announcementForm.get(campo);
    
    if (fieldControl) {
      return !fieldControl.valid && fieldControl.touched;
    }
    
    return false;
  }

}
  

