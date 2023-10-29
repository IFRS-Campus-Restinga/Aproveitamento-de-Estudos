import { Component } from '@angular/core';

@Component({
  selector: 'app-requests-registration',
  templateUrl: './requests-registration.component.html',
  styleUrls: ['./requests-registration.component.css'],
})
export class RequestsRegistrationComponent {
  tipoSolicitacao: string = ''; // Variável para armazenar o tipo de solicitação selecionado

  formData: any = {
    componenteCurricular: 'Selecione um componente curricular',
    tipoSolicitacao: 'Selecione o tipo de solicitação',
  };

  // ---------- Lista de tipos de solicitação -----------------
  public listTiposRequisicoes: Array<{ tipoSolicitacao: string }> = [
    { tipoSolicitacao: 'Selecione o tipo de solicitação' },
    { tipoSolicitacao: 'Certificação de conhecimento' },
    { tipoSolicitacao: 'Aproveitamento de estudos' },
  ];

  // ---------- Lista de Componentes Curriculares -----------------
  public listComponentesCurriculares: Array<{ componenteCurricular: string }> =
    [
      { componenteCurricular: 'Selecione um componente curricular' },
      { componenteCurricular: 'Programação 1' },
      { componenteCurricular: 'Programação 2' },
      { componenteCurricular: 'Programação 3' },
      { componenteCurricular: 'Banco de dados 1' },
      { componenteCurricular: 'Banco de dados 2' },
      { componenteCurricular: 'Desenvolvimento de sistemas 1' },
      { componenteCurricular: 'Desenvolvimento de sistemas 2' },
      { componenteCurricular: 'Estrutura de dados' },
    ];

  // -------------------- File-Input ---------------------------------------

  files: File[] = [];                                                               // propriedade para armazenar os arquivos selecionados.
  fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos';  // mensagem inicial para exibir aos usuários.

  // Propriedades para controle de arquivos
  maxFileCount: number = 5;                     // Define o número máximo de arquivos permitidos
  selectedFileCount: number = 0;                // contador de número de arquivos selecionados
  maxFileSizeInBytes: number = 2 * 1024 * 1024; // Define o tamanho maximo de upload de arquivos

  // Método para lidar com a seleção de arquivos
  handleFileSelect(event: any) {
    const selectedFiles: FileList | null = event.target.files;

    if (selectedFiles) {
      // Verifique se o número de arquivos selecionados não excede o limite
      if (this.selectedFileCount + selectedFiles.length <= this.maxFileCount) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles.item(i);
          if (file) {
            if (file.size <= this.maxFileSizeInBytes) {
              this.files.push(file);
              this.selectedFileCount++; // Atualize a contagem de arquivos selecionados
            } else {
              alert('Tamanho do arquivo '+ file.name +' excede o limite')
            }
          }
        }
        this.updateFileFormat();
      } else {
        alert('Limite de arquivos excedido. Você pode selecionar no máximo ' + this.maxFileCount + ' arquivos.');
      }
    }
  }

  // Método para atualizar a mensagem exibida na interface do usuário com base nos arquivos selecionados
  private updateFileFormat() {
    if (this.files.length === 0) {
      // Verifica se não há arquivos na matriz.
      this.fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos'; // Define a mensagem padrão.
      return;
    }

    let fileFormats = '';

    // Loop para criar uma representação dos arquivos selecionados.
    for (const file of this.files) {
      const fileName = file.name;
      const fileSize = this.formatBytes(file.size); // Converte o tamanho do arquivo para uma representação legível.
      const fileFormat = fileName.split('.').pop(); // Extrai a extensão do arquivo.
      fileFormats += `<i class="fas fa-file"></i> ${fileName}, ${fileSize}<br>`;
      // fileFormats += `<i class="fas fa-file"></i> ${fileName} (${fileFormat}), ${fileSize}<br>`;
    }
    this.fileFormat = fileFormats; // Atualiza a mensagem com os detalhes dos arquivos selecionados.
  }

  // Método para lidar com a remoção de arquivos
  removeFile(index: number) {
    if (index >= 0 && index < this.files.length) {
      this.files.splice(index, 1);
      this.selectedFileCount--; // Atualize a contagem de arquivos selecionados
      this.updateFileFormat();
    }
  }

  // Método para formata o tamanho do arquivo em uma string legível.
  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes'; // Verifica se o tamanho do arquivo é zero.

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // Calcula a unidade de tamanho apropriada.

    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)).toString() +
      ' ' +
      sizes[i]
    );
  }

  // -------------------- botões ---------------------------------------

  submitForm(form: any) {
    console.log(this.formData); // Exibe os dados do formulário
    console.log('submitForm called');
  }

  handleResetClick() {
    this.files = []; // Limpa a matriz de arquivos.
    this.updateFileFormat(); // Atualiza o formato da mensagem.
  }
}
