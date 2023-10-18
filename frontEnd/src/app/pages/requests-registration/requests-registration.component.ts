import { Component } from '@angular/core';

@Component({
  selector: 'app-requests-registration',
  templateUrl: './requests-registration.component.html',
  styleUrls: ['./requests-registration.component.css']
})

export class RequestsRegistrationComponent {
  formData: any = {
    componenteCurricular: 'Selecione um componente Curricular',
    tipoSolicitacao: 'Selecione o tipo de solicitação',
  };

  public listTiposRequisicoes: Array<{ tipoSolicitacao: string }> = [
    { tipoSolicitacao:'Selecione o tipo de solicitação' },
    { tipoSolicitacao: 'Certificação de conhecimento' },
    { tipoSolicitacao: 'Aproveitamento de estudos' }
  ];

  public listComponentesCurriculares: Array<{ componenteCurricular: string }> = [
    { componenteCurricular: 'Selecione o componenete curricular' },
    { componenteCurricular: 'Programação 1' },
    { componenteCurricular: 'Programação 2' },
    { componenteCurricular: 'Programação 3' },
    { componenteCurricular: 'Banco de dados 1' },
    { componenteCurricular: 'Banco de dados 2' },
    { componenteCurricular: 'Desenvolvimento de software 1' },
    { componenteCurricular: 'Desenvolvimento de software 2' },
    { componenteCurricular: 'Estrutura de dados' }
  ];

  fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos: ';

  handleFileSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileName = file.name;
      const fileFormat = fileName.split('.').pop();
      this.fileFormat = `${fileName} (${fileFormat})`;
    } else {
      this.fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos';
    }
  }

  submitForm(form: any) {
    console.log(this.formData);
  }
}
