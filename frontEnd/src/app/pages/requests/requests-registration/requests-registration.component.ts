import { Analise } from './../../../model/Analise';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { Anexo } from 'src/app/model/Anexo';
import { Requisicao } from 'src/app/model/Requisicao';

@Component({
  selector: 'app-requests-registration',
  templateUrl: './requests-registration.component.html',
  styleUrls: ['./requests-registration.component.css'],
})

export class RequestsRegistrationComponent implements OnInit {

  tipoSolicitacao: string = '';

  form!: FormGroup;

  //= {
  //  componenteCurricular: 'Selecione um componente curricular',
  //  tipoSolicitacao: 'Selecione o tipo de solicitação',
  //};

  public listTiposRequisicoes: Array<{ tipoSolicitacao: string }> = [
      { tipoSolicitacao: 'Selecione o tipo de solicitação' },
      { tipoSolicitacao: 'Certificacao' },
      { tipoSolicitacao: 'Aproveitamento' },
  ];

  public listComponentesCurriculares: Array<{id: number, componenteCurricular: string }> =
    [
      {id: 1,  componenteCurricular: 'Selecione um componente curricular' },
      {id: 1,  componenteCurricular: 'Programação 1' },
      {id: 1,  componenteCurricular: 'Programação 2' },
      {id: 1,  componenteCurricular: 'Programação 3' },
      {id: 1,  componenteCurricular: 'Banco de dados 1' },
      {id: 1,  componenteCurricular: 'Banco de dados 2' },
      {id: 1,  componenteCurricular: 'Desenvolvimento de sistemas 1' },
      {id: 1,  componenteCurricular: 'Desenvolvimento de sistemas 2' },
      {id: 1,  componenteCurricular: 'Estrutura de dados' },
    ];

  // -------------------- File-Input ---------------------------------------

  files: File[] = [];                                                               // propriedade para armazenar os arquivos selecionados.
  fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos';  // mensagem inicial para exibir aos usuários.

  // Propriedades para controle de arquivos
  maxFileCount: number = 5;                     // Define o número máximo de arquivos permitidos
  selectedFileCount: number = 0;                // contador de número de arquivos selecionados
  maxFileSizeInBytes: number = 10 * 1024 * 1024; // Define o tamanho maximo de upload de arquivos

  constructor(private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private requisicaoService: RequisicaoService){

  }

  ngOnInit(): void {
    let requisicao: Requisicao = this.route.snapshot.data['requisicao'];
    console.log(requisicao)

    this.form = this.formBuilder.group({
      id:[''],
      tipoSolicitacao: [''],
      status: ['Solicitação-criada'],
      dataCriacao: [''],
      experienciasAnteriores: [''],
      dataAgendamentoProva: [''],
      notaDaProva: [''],
      diciplinaCursaAnteriormente: [''],
      notaObtida: [''],
      cargaHoraria: [''],
      analises: this.formBuilder.array(this.retriveAnalysis(requisicao)),
      //anexos: this.formBuilder.array(this.retriveAttachments(requisicao)),
      aluno_id: [1],
      edital_id: [2],
      diciplina_id: [1]
    });


  }

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
    const formData: FormData = new FormData();
    formData.append('id', this.form.get('id')?.value);
    formData.append('tipoSolicitacao', this.form.get('tipoSolicitacao')?.value);
    formData.append('status', this.form.get('status')?.value);
    formData.append('dataCriacao', this.form.get('dataCriacao')?.value);
    formData.append('experienciasAnteriores', this.form.get('experienciasAnteriores')?.value);
    formData.append('dataAgendamentoProva', this.form.get('dataAgendamentoProva')?.value);
    formData.append('notaDaProva', this.form.get('notaDaProva')?.value);
    formData.append('diciplinaCursaAnteriormente', this.form.get('diciplinaCursaAnteriormente')?.value);//notaObtida
    formData.append('notaObtida', this.form.get('notaObtida')?.value);
    formData.append('cargaHoraria', this.form.get('cargaHoraria')?.value);
    formData.append('edital_id', this.form.get('edital_id')?.value);
    formData.append('aluno_id', this.form.get('aluno_id')?.value);
    formData.append('diciplina_id', this.form.get('diciplina_id')?.value);

    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i], this.files[i].name);
    }
    this.requisicaoService.teste(formData)
    .subscribe(result => alert("Salvo com sucesso"), error => alert("Erro ao salvar disciplina"));
  }

  handleResetClick() {
    this.files = [];
    this.updateFileFormat();
  }


  private retriveAnalysis(requisicao: Requisicao){
    const analises = [];
    if(requisicao?.analises){
      requisicao.analises.forEach((analise: Analise) => analises.push(this.createAnalysis(analise)))
    }else{
      analises.push(this.createAnalysis());
    }
    return analises;
  }

  private retriveAttachments(requisicao: Requisicao){
    const anexos = [];
    if(requisicao?.anexos){
      requisicao.anexos.forEach((anexo: Anexo) => anexos.push(this.createAttachments(anexo)))
    }else{
      anexos.push(this.createAttachments());
    }
    return anexos;
  }

  private createAnalysis(analise : Analise = {id: '', status: '', parecer: '', servidor: '0', requisicao: 0}){
    return this.formBuilder.group({
      id: [analise.id],
      status: [analise.status],
      parecer: [analise.parecer],
      servidor: [analise.servidor],
      requisicao: [analise.requisicao]
    });
  }

  private createAttachments(anexo : Anexo = {id: '', nome: '', arquivo: '', requisicao: 0}){
    return this.formBuilder.group({
      id: [anexo.id],
      status: [anexo.nome],
      parecer: [anexo.arquivo],
      requisicao: [anexo.requisicao]
    });
  }


  selectTipo(event: Event){
    const elementoSelecionado = event.target as HTMLSelectElement;
    this.tipoSolicitacao = elementoSelecionado.value.split(': ')[1];
  }
}
