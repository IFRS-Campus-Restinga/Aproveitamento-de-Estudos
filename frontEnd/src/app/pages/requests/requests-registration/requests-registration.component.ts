import { Analise } from './../../../model/Analise';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ValidatorFn, MaxLengthValidator } from '@angular/forms';
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
  public numAnalise: number = 0;
  public idRequest: string = "0";
  public idServidor: string = "7";
  public isAddVisible: boolean = false;
  public isViewVisible: boolean = false;

  public listTiposRequisicoes: Array<{ tipoSolicitacao: string }> = [
      { tipoSolicitacao: 'CERTIFICACAO' },
      { tipoSolicitacao: 'APROVEITAMENTO' },
    ];

  isAproveitamento(): boolean {
    this.form.get('diciplinaCursaAnteriormente')?.setValue('');
    this.form.get('notaObtida')?.setValue('');
    this.form.get('cargaHoraria')?.setValue('');
    return this.tipoSolicitacao === 'APROVEITAMENTO';
  }

  isCertificacao(): boolean {
    this.form.get('experienciasAnteriores')?.setValue('');
    return this.tipoSolicitacao === 'CERTIFICACAO';
  }

  files: File[] = [];
  fileFormat = 'Arraste e solte arquivos aqui ou clique para selecionar arquivos';
  listDisciplinas: Disciplina[] = []
  maxFileCount: number = 5;
  selectedFileCount: number = 0;
  maxFileSizeInBytes: number = 10 * 1024 * 1024;
  isEditMode: boolean = false;

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
    if (requisicao) {
      this.numAnalise = requisicao.analises.length
      this.idRequest = requisicao.id;
      this.isEditMode = true;
      this.tipoSolicitacao = requisicao.tipo;
      this.getDisciplina(requisicao.disciplina_id);
    } else {
      this.numAnalise = 0;
      requisicao = this.generateObject();
    }


    this.form = this.formBuilder.group({
      id: [requisicao.id],
      tipoSolicitacao: [requisicao.tipo, [Validators.required]],
      status: [requisicao.status],
      dataCriacao: [requisicao.dataCriacao],
      experienciasAnteriores: [
        requisicao.experienciasAnteriores,
        this.getExperienciasAnterioresValidators(),
      ],
      dataAgendamentoProva: [requisicao.dataAgendamentoProva],
      notaDaProva: [requisicao.notaDaProva],
      diciplinaCursaAnteriormente: [
        requisicao.diciplinaCursaAnteriormente,
        this.getDiciplinaCursaAnteriormenteValidators(),
      ],
      notaObtida: [requisicao.notaObtida, this.getNotaObtidaValidators()],
      cargaHoraria: [requisicao.cargaHoraria, this.getCargaHorariaValidators()],
      analises: this.formBuilder.array(this.retriveAnalysis(requisicao)),
      aluno_id: [requisicao.aluno_id],
      edital_id: [requisicao.edital_id],
      disciplina_id: [requisicao.disciplina_id, [Validators.required]],
    });

    this.form.get('tipoSolicitacao')?.valueChanges.subscribe(() => {
      this.clearFormValues();
    });

    if (requisicao.id != '') {
      this.getAnexos(requisicao.anexos);
    }

  }

  clearFormValues() {
    this.form.get('disciplina_id')?.setValue('');
    this.files = [];
    this.updateFileFormat();
    this.form.markAsUntouched();
  }

  private getExperienciasAnterioresValidators(): ValidatorFn[] {
    if (this.tipoSolicitacao === 'CERTIFICACAO') {
      return [];
    } else {
      return [
        Validators.pattern(/^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*(?:[.,]\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*)*$/),
        Validators.minLength(6),Validators.maxLength(120)
      ];
    }
  }

  private getDiciplinaCursaAnteriormenteValidators(): ValidatorFn[] {
    if (this.tipoSolicitacao === 'APROVEITAMENTO') {
      return [];
    } else {
      return [
        Validators.pattern(/^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*(?:[.,]\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*)*$/),
        Validators.minLength(6),Validators.maxLength(120)
      ];
    }
  }

  private getNotaObtidaValidators(): ValidatorFn[] {
    if (this.tipoSolicitacao === 'APROVEITAMENTO') {
      return [];
    } else {
      return [
        Validators.pattern(/^([0-9]|10|10\.0|10\.00|[1-9]\.[0-9])$/)
      ];
    }
  }

  private getCargaHorariaValidators(): ValidatorFn[] {
    if (this.tipoSolicitacao === 'APROVEITAMENTO') {
      return [];
    } else {
      return [
        Validators.pattern(/^(?:[1-9]\d{0,2}|1000)$/)
      ];
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
      diciplinaCursaAnteriormente: '',
      notaObtida: 0,
      cargaHoraria: 0,
      analises: [{id: '', status: '', parecer: '', servidor_id: 0, requisicao_id: 0}],
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

  submitForm() {
    if (this.form.valid) {
      const formData: FormData = new FormData();

      Object.keys(this.form.value).forEach(chave => {
        const valor = this.form.value[chave];

        if (chave === 'analises') {
          valor.forEach((analise: any) => {
            Object.keys(analise).forEach(chaveAnalise => {
              formData.append(`analises[${chave}][${chaveAnalise}]`, analise[chaveAnalise]);
            });
          });
        } else {
          formData.append(chave, valor);
        }
      });

      this.files.forEach((arquivo: File) => {
        formData.append('files', arquivo, arquivo.name);
      });

      this.requisicaoService.create(formData).subscribe(
        (resultado) => {
          alert("Salvo com sucesso");
          this.router.navigate(['/request']);
        },
        (erro) => {
          console.error("Erro ao salvar disciplina", erro);
          alert("Erro ao salvar disciplina");
        }
      );
    } else {
      alert("Formulário inválido. Por favor, verifique os campos.");
    }
  }

  handleResetClick() {
    this.files = [];
    this.updateFileFormat();
    this.router.navigate(['/request']);
  }

  private retriveAnalysis(requisicao: Requisicao) {
    const analises = [];
    if (requisicao?.analises) {
      requisicao.analises.forEach((analise: Analise) =>
        analises.push(this.createAnalysis(analise))
      );
    } else {
      analises.push(this.createAnalysis());
    }
    return analises;
  }

  private createAnalysis(analise: Analise = {
    id: '',
    status: '',
    parecer: '',
    servidor_id: 0,
    requisicao_id: 0,
  }) {
    return this.formBuilder.group({
      id: [analise.id],
      status: [analise.status],
      parecer: [analise.parecer],
      servidor: [analise.servidor_id],
      requisicao: [analise.requisicao_id],
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

   check(variableName: string, condition: string): boolean {
    const variable = this.form.get(variableName);

    if (!variable) {
      return false;
    }

    switch (condition) {
      case 'minLength':
        return variable.hasError('minlength');
      case 'maxLength':
        return variable.hasError('maxlength');
      case 'status':
        return variable.invalid;
      default:
        return false;
    }
  }

  isValid(controlName: string) {
    return this.form.get(controlName)?.valid;
  }

  isTipoSolicitacaoSelected(): boolean {
    return this.form.get('tipoSolicitacao')?.touched || this.form.get('tipoSolicitacao')?.value !== '';
  }

  isInvalidFiles(parameter: 'size' | 'qtd' | 'qtdMin'): boolean {
    let totalFileSize = 0;

    for (const file of this.files) {
      totalFileSize += file.size;
    }

    if (parameter === 'qtd') {
      return this.files.length > this.maxFileCount;
    } else if (parameter === 'size') {
      return totalFileSize > this.maxFileSizeInBytes;
    } else if (parameter === 'qtdMin') {
      return this.files.length < 1;
    } else {
      return true;
    }
  }

  isEdit(){
    return this.isEditMode;
  }


  viewAnalytics(id: any){
    if(this.numAnalise > 0){
      this.isViewVisible = true;
    }else{
      alert("Requisição não possui analises!");
    }

  }

  addAnalysis(){
    this.isAddVisible = true;
  }

  handleConfirmation(confirmed: boolean) {
    this.isAddVisible = false;
  }

  handleConfirmationView(confirmed: boolean) {
    this.isViewVisible = false;
  }

}




