import { Component } from '@angular/core';
import { AnnouncementStepComponent } from 'src/app/components/announcement-step/announcement-step.component';

@Component({
  selector: 'app-announcement-registration',
  templateUrl: './announcement-registration.component.html',
  styleUrls: ['./announcement-registration.component.css']
})
export class AnnouncementRegistrationComponent {

  formData: any = {
    dataInicio: '',
    dataFim: ''
  };

  validarDataFinalPosterior() {
    const dataInicio = new Date(this.formData.dataInicio);
    const dataFim = new Date(this.formData.dataFim);

    if (dataInicio <= dataFim) {
      return true; // A data final é posterior à data de início
    } else {
      return false; // A data final não é posterior à data de início
    }
  }

  validarCursoSelecionado() {
    return this.formData.curso !== 'Selecione um ator';
  }

  converterParaMaiusculas() {
    this.formData.numero = this.formData.numero.toUpperCase();
  }


  steps: AnnouncementStepComponent[] = [];

  addStep() {
    this.steps.push(new AnnouncementStepComponent());
}

  submitForm(form: any) {
    // Aqui você pode lidar com os dados do formulário, como enviá-los para um servidor ou exibi-los no console.
    console.log(this.formData);
  }
}
