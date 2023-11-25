import { Analise } from './../../../model/Analise';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { Anexo } from 'src/app/model/Anexo';
import { Requisicao } from 'src/app/model/Requisicao';
import { AnexoService } from 'src/app/services/anexo.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { Disciplina } from 'src/app/model/Disciplina';

@Component({
  selector: 'app-requests-registration',
  templateUrl: './requests-registration.component.html',
  styleUrls: ['./requests-registration.component.css'],
})

export class RequestsRegistrationComponent implements OnInit {

  tipoSolicitacao: string = '';

  form!: FormGroup;

  public listTiposRequisicoes: Array<{ tipoSolicitacao: string }> = [
      { tipoSolicitacao: 'Selecione o tipo de solicitação' },
      { tipoSolicitacao: 'CERTIFICACAO' },
      { tipoSolicitacao: 'APROVEITAMENTO' },
  ];

  files: File[] = [];
  fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos';
  listDisciplinas: Disciplina[] = []
  maxFileCount: number = 5;
  selectedFileCount: number = 0;
  maxFileSizeInBytes: number = 10 * 1024 * 1024;

  constructor(private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private requisicaoService: RequisicaoService,
    private anexoService: AnexoService,
    private disciplinaService: DisciplinaService,
    private router: Router){

  }

  ngOnInit(): void {
    this.getDisciplinas();
    let requisicao: Requisicao = this.route.snapshot.data['requisicao'];
    console.log(requisicao);
    if(requisicao){
      this.tipoSolicitacao = requisicao.tipo
      this.getDisciplina(requisicao.disciplina_id);
    }else{
      requisicao = this.generateObject();
    }

    this.form = this.formBuilder.group({
      id:[requisicao.id],
      tipoSolicitacao: [requisicao.tipo],
      status: [requisicao.status],
      dataCriacao: [requisicao.dataCriacao],
      experienciasAnteriores: [requisicao.experienciasAnteriores],
      dataAgendamentoProva: [requisicao.dataAgendamentoProva],
      notaDaProva: [requisicao.notaDaProva],
      diciplinaCursaAnteriormente: [requisicao.diciplinaCursaAnteriormente],
      notaObtida: [requisicao.notaObtida],
      cargaHoraria: [requisicao.cargaHoraria],
      analises: this.formBuilder.array(this.retriveAnalysis(requisicao)),
      aluno_id: [requisicao.aluno_id],
      edital_id: [requisicao.edital_id],
      disciplina_id: [requisicao.disciplina_id]
    });

    if(requisicao.id != ''){
      this.getAnexos(requisicao.anexos);
    }
  }

  generateObject(): Requisicao {
    return {
      id: '',
      tipo: '',
      status: 'SOLICITACAO_CRIADA',
      dataCriacao:'',
      experienciasAnteriores:'',
      dataAgendamentoProva: '',
      notaDaProva: 0,
      diciplinaCursaAnteriormente: 0,
      notaObtida: 0,
      cargaHoraria: 0,
      analises: [{id: '', status: '', parecer: '', servidor: '0', requisicao: 0}],
      anexos: [{id: '', nome: '', arquivo: '', requisicao: 0 }],
      aluno_id: 1,
      edital_id: 1,
      disciplina_id: 0
    }
  }

  getDisciplina(diciplina_id: number) {
    let disciplinaAux: Disciplina = {id: '',nome: '',codDisciplina: '', cargaHoraria: 0};
    this.listDisciplinas.forEach(disciplina => {
      if (parseInt(disciplina.id) === diciplina_id){
        disciplinaAux = disciplina;
      }
    });
    this.listDisciplinas = [];
    this.listDisciplinas = [disciplinaAux];
  }

  handleFileSelect(event: any) {
    const selectedFiles: FileList | null = event.target.files;

    if (selectedFiles) {
      if (this.selectedFileCount + selectedFiles.length <= this.maxFileCount) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles.item(i);
          if (file) {
            if (file.size <= this.maxFileSizeInBytes) {
              if (!this.files.some(existingFile => existingFile.name === file.name)) {
                this.files.push(file);
                this.selectedFileCount++;
              } else {
                alert('O arquivo ' + file.name + ' já foi selecionado.');
              }
            } else {
              alert('Tamanho do arquivo ' + file.name + ' excede o limite');
            }
          }
        }
        this.updateFileFormat();
      } else {
        alert('Limite de arquivos excedido. Você pode selecionar no máximo ' + this.maxFileCount + ' arquivos.');
      }
    }
  }

  private updateFileFormat() {
    if (this.files.length === 0) {
      this.fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos';
      return;
    }

    let fileFormats = '';
    for (const file of this.files) {
      const fileName = file.name;
      const fileSize = this.formatBytes(file.size);
      const fileFormat = fileName.split('.').pop();
      fileFormats += `<i class="fas fa-file"></i> ${fileName}, ${fileSize}<br>`;
    }
  }

  removeFile(index: number) {
    if (index >= 0 && index < this.files.length) {
      this.files.splice(index, 1);
      this.selectedFileCount--;
      this.updateFileFormat();
    }
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)).toString() +
      ' ' +
      sizes[i]
    );
  }

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
    formData.append('disciplina_id', this.form.get('disciplina_id')?.value);

    for (const element of this.files) {
      formData.append('files', element, element.name);
    }
    this.requisicaoService.create(formData)
    .subscribe((result) => {
      alert("Salvo com sucesso");
      this.router.navigate(['/request']);
    }, error => alert("Erro ao salvar disciplina"));
  }

  handleResetClick() {
    this.files = [];
    this.updateFileFormat();
    this.router.navigate(['/request']);
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

  private createAnalysis(analise : Analise = {id: '', status: '', parecer: '', servidor: '0', requisicao: 0}){
    return this.formBuilder.group({
      id: [analise.id],
      status: [analise.status],
      parecer: [analise.parecer],
      servidor: [analise.servidor],
      requisicao: [analise.requisicao]
    });
  }

  selectTipo(event: Event){
    const elementoSelecionado = event.target as HTMLSelectElement;
    this.tipoSolicitacao = elementoSelecionado.value.split(': ')[1];
  }

  getAnexos(anexos: Anexo[]) {
    anexos.forEach((anexo: Anexo) => {
      this.anexoService.getAnexo(anexo).subscribe(
        (blob: Blob) => {
          this.files.push( new File([blob], anexo.arquivo , { type: 'text/plain' }));
        },
        error => {
          console.error('Erro:', error);
        }
      );
    });
  }

  getDisciplinas() {
    this.disciplinaService.listAlternative().subscribe(
      (_diciplinas: Disciplina[]) => {
        this.listDisciplinas = _diciplinas;
      },
      error => console.log(error)
    )
  }

}




