import { Component } from '@angular/core';

@Component({
  selector: 'app-requests-registration',
  templateUrl: './requests-registration.component.html',
  styleUrls: ['./requests-registration.component.css']
})

export class RequestsRegistrationComponent {

  tipoSolicitacao: string = ''; // Variável para armazenar o tipo de solicitação selecionado

  formData: any = {
    componenteCurricular: 'Selecione um componente Curricular',
    tipoSolicitacao: 'Selecione o tipo de solicitação',
  };

  // ---------- Lista de tipos de solicitação -----------------
  public listTiposRequisicoes: Array<{ tipoSolicitacao: string }> = [
    { tipoSolicitacao:'Selecione o tipo de solicitação' },
    { tipoSolicitacao: 'Certificação de conhecimento' },
    { tipoSolicitacao: 'Aproveitamento de estudos' }
  ];

  // ---------- Lista de Componentes Curriculares -----------------
  public listComponentesCurriculares: Array<{ componenteCurricular: string }> = [
    { componenteCurricular: 'Selecione o componenete curricular' },
    { componenteCurricular: 'Programação 1' },
    { componenteCurricular: 'Programação 2' },
    { componenteCurricular: 'Programação 3' },
    { componenteCurricular: 'Banco de dados 1' },
    { componenteCurricular: 'Banco de dados 2' },
    { componenteCurricular: 'Desenvolvimento de sistemas 1' },
    { componenteCurricular: 'Desenvolvimento de sistemas 2' },
    { componenteCurricular: 'Estrutura de dados' }
  ];

  // -------------------- File-Input ---------------------------------------

  files: File[] = [];
  fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos';

  handleFileSelect(event: any) {
    // Obtém a lista de arquivos selecionados
    const selectedFiles: FileList | null = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      // Limpa a lista de arquivos anteriores (opcional: está desativado para o usuário poder inserir mais)
      //this.files = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles.item(i);
        if (file) {
          // Adiciona cada arquivo à lista
          this.files.push(file);
        }
      }
      // Atualiza a exibição dos arquivos selecionados
      this.updateFileFormat();
    }
  }

  private updateFileFormat() {
    if (this.files.length === 0) {
      // Se nenhum arquivo foi selecionado
      this.fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos';
      return;
    }

    let fileFormats = '';
    for (const file of this.files) {
      const fileName = file.name;
      const fileSize = this.formatBytes(file.size);
      const fileFormat = fileName.split('.').pop();
      // Formata e concatena os detalhes de cada arquivo
      fileFormats += `<i class="fas fa-file"></i> ${fileName} (${fileFormat}), ${fileSize}<br>`;
    }

    // Atualiza a exibição dos arquivos selecionados
    this.fileFormat = fileFormats;
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Converte o tamanho do arquivo para uma unidade mais legível
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // ---------------------- botão para ver informações do formulário no log ------------------------
  submitForm(form: any) {
    console.log(this.formData);
  }

  // Método para lidar com o clique no botão de reset
  handleResetClick() {
    // Limpa a lista de arquivos
    this.files = [];
    // Atualiza a exibição dos arquivos selecionados
    this.updateFileFormat();
  }
}
