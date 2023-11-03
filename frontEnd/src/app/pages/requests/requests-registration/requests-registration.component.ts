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
  maxFileSizeInBytes: number = 10 * 1024 * 1024; // Define o tamanho maximo de upload de arquivos

  // Método para lidar com a seleção de arquivos
  handleFileSelect(event: any) {
    const selectedFiles: FileList | null = event.target.files; // Obtém a lista de arquivos selecionados do evento de input

    if (selectedFiles) {
      // Verifica se o número de arquivos selecionados não excede o limite
      if (this.selectedFileCount + selectedFiles.length <= this.maxFileCount) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles.item(i); // Obtém o arquivo atual da lista de arquivos selecionados
          if (file) {
            // Verifica se o tamanho do arquivo está dentro do limite permitido
            if (file.size <= this.maxFileSizeInBytes) {
              // Verifica se o arquivo já não está na lista de arquivos existentes
              if (!this.files.some(existingFile => existingFile.name === file.name)) {
                this.files.push(file);    // Adiciona o arquivo à lista de arquivos
                this.selectedFileCount++; // Atualiza a contagem de arquivos selecionados
              } else {
                alert('O arquivo ' + file.name + ' já foi selecionado.'); // Exibe um alerta se o arquivo já foi selecionado anteriormente
              }
            } else {
              alert('Tamanho do arquivo ' + file.name + ' excede o limite'); // Exibe um alerta se o tamanho do arquivo exceder o limite
            }
          }
        }
        this.updateFileFormat(); // Atualiza a mensagem exibida na interface do usuário com base nos arquivos selecionados
      } else {
        alert('Limite de arquivos excedido. Você pode selecionar no máximo ' + this.maxFileCount + ' arquivos.'); // Exibe um alerta se o limite de arquivos for excedido
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
    // this.fileFormat = fileFormats; // Atualiza a mensagem com os detalhes dos arquivos selecionados.
  }

  // Método para lidar com a remoção de arquivos
  removeFile(index: number) {
    if (index >= 0 && index < this.files.length) {
      this.files.splice(index, 1);
      this.selectedFileCount--; // Atualiza a contagem de arquivos selecionados
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
    alert("Solicitão enviada com sucesso");
  }

  handleResetClick() {
    this.files = []; // Limpa a matriz de arquivos.
    this.updateFileFormat(); // Atualiza o formato da mensagem.
  }
}
