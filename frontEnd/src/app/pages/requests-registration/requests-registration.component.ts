import { Component } from '@angular/core';

@Component({
  selector: 'app-requests-registration',
  templateUrl: './requests-registration.component.html',
  styleUrls: ['./requests-registration.component.css']
})
export class RequestsRegistrationComponent {
  formData: any = {
    componenteCurricular: 'Selecione um componente Curricular'
  };

  public listComponentesCurriculares: Array<{ componenteCurricular: string }> = [
    { componenteCurricular:'Selecione o componenete curricular' },
    { componenteCurricular: 'Programação 1' },
    { componenteCurricular: 'Programação 2' },
    { componenteCurricular: 'Programação 3' },
    { componenteCurricular: 'Banco de dados 1' },
    { componenteCurricular: 'Banco de dados 2' },
    { componenteCurricular: 'Desenvolvimento de software 1' },
    { componenteCurricular: 'Desenvolvimento de software 2' },
    { componenteCurricular: 'Estrutura de dados' }
  ];

  submitForm(form: any) {
    console.log(this.formData);
  }
}
