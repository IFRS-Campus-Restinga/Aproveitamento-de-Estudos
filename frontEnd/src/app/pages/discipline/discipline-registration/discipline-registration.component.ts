import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NonNullableFormBuilder, ValidatorFn} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplina } from 'src/app/model/Disciplina';
import { Ppc } from 'src/app/model/Ppc';
import { CursoService } from 'src/app/services/curso.service';
import { PpcService } from 'src/app/services/ppc.service';

@Component({
  selector: 'app-discipline-registration',
  templateUrl: './discipline-registration.component.html',
  styleUrls: ['./discipline-registration.component.css']
})

export class DisciplineRegistrationComponent implements OnInit {
  formData: any = {};
  ppc: Ppc | null = null;
  ppcAux: Ppc = { id: '', nomePPC: '', ano: 0,}
  idCurso: string = '';

  public listCursos: Array<{ curso: string, id: string, ppcs: any[]}> = [{ curso: 'Selecione o curso', id: '', ppcs: [] }];
  public listPpcs: Array<{ id: number, nomePPC: string, ano: number}> = [{id: 0, nomePPC: 'Selecione o curso', ano: 0}];

  isEditMode: boolean = false;

  constructor(private cursoService: CursoService, 
    private route: ActivatedRoute, 
    private ppcService: PpcService, 
    private fb: FormBuilder,
    private router: Router) {
    
  }

  ngOnInit(): void {
    let disciplina: Disciplina = this.route.snapshot.data['disciplina'];
    if(!disciplina){
      this.isEditMode = true;
      disciplina = {
        id: '',
        nome: '',
        codDisciplina: '',
        cargaHoraria: 0,
        curso_id: 0,
        ppc_id: 0,
      }
      this.loadCursos();
    }else{
      let curso_id: any = disciplina.curso_id;
      let ppc_id: any = disciplina.ppc_id;
      this.loadCursosEdit(curso_id, ppc_id);
    }

    this.formData = this.fb.group({
      disciplina_id: [disciplina.id],
      curso: [disciplina.curso_id, Validators.required],
      ppc: [disciplina.ppc_id, Validators.required],
      codigo: [disciplina.codDisciplina, [Validators.required, Validators.pattern('^[A-Z]{3}-[A-Z]{3}[0-9]{3}$'), Validators.minLength(10), Validators.maxLength(10)]],
      disciplina: [disciplina.nome, [Validators.required, 
        Validators.pattern(/^(?!.*[.]{2})(?!.*[,]{2})(?!.*[\s]{2})[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*(?:[.,]\s?[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*)*$/), 
        Validators.minLength(6),Validators.maxLength(120)]],
      cargaHoraria: [disciplina.cargaHoraria, [Validators.required, Validators.min(10), Validators.max(110), Validators.pattern(/^(?:[1-9]|[1-7][0-9]|110)$/)]],
    });
     
  }

  loadCursosEdit(curso_id: string, ppc_id: number){
    this.cursoService.list().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((curso: { nome: string, id: string, ppcs: any[]}) => {
            if(curso.id === curso_id){
              this.listCursos.push({ curso: curso.nome, id: curso.id, ppcs: curso.ppcs });
              curso.ppcs.forEach((element: { id: number, nomePPC: string, ano: number}) => {
                if(element.id == ppc_id ){
                  this.listPpcs.push({id: element.id, nomePPC: element.nomePPC, ano: element.ano});
                  let id = element.id.toString();
                  this.ppcAux = {id: id, nomePPC: element.nomePPC, ano: element.ano};
                }
              });
            }
          });
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }


  submitForm(form: FormGroup) {
    if (form.valid) {
      this.ppcService.createDiscipline(this.adjustPpcs(form.value))
        .subscribe(result => { 
          alert("Salvo com sucesso");
          this.router.navigate(['/discipline']);
        }, error => alert("Erro ao salvar disciplina"));
    } else {
      alert("Preencha todos os campos");
    }
  }

  loadCursos(){
    this.cursoService.list().subscribe(
      (data) => {
        if (data !== null) {
          data.forEach((curso: any) => {
            this.listCursos.push(
              { curso: curso.nome, id: curso.id, ppcs: curso.ppcs }
            )
          });
        }
      },
      (error) => {
        console.log('Erro:', error);
      }
    );
  }
  

  selectPpcs(event: Event){
    this.listPpcs = [];
    const elementoSelecionado = event.target as HTMLSelectElement;
    const opcaoSelecionada = elementoSelecionado.value;
    this.idCurso = opcaoSelecionada.split('. ')[0];
    this.listPpcs = [{id: 0, nomePPC: 'Selecione o PPC', ano: 0}];
    for (const i of this.listCursos) {
      if(i.id == this.idCurso){
       for(const j of i.ppcs){
          this.listPpcs.push({id: j.id, nomePPC: j.nomePPC, ano: j.ano});
       }
      }
    }
  }

  adjustPpcs(form: any): Ppc{
    return this.ppc = {
        id: this.ppcAux.id,
        nomePPC: this.ppcAux.nomePPC,
        ano: this.ppcAux.ano,
        disciplinas: [{
          id: form.disciplina_id,
          nome: form.disciplina,
          codDisciplina: form.codigo,
          cargaHoraria: form.cargaHoraria
        }]
    }
  }

  ppcChange() {
    for (const i of this.listCursos) {
      if(i.id == this.idCurso){
       for(const j of i.ppcs){
          if(j.id == this.formData.value.ppc){
            this.ppcAux = {
              id: j.id,
              nomePPC: j.nomePPC,
              ano: j.ano,
            }
          }
        }
      }
    }
  }

  converterParaMaiusculas() {
    this.formData.patchValue({ codigo: this.formData.value.codigo.toUpperCase(), disciplina: this.formData.value.disciplina.toUpperCase() });
  }

  isCursoValid() {
    return this.isValid('curso');
  }

  isPpcValid() {
    const ppcControl = this.formData.get('ppc');
    if (ppcControl?.value  !== '0') {
      return true;
    }
    return false;
  }


  check(variableName: string, condition: string): boolean {
    const variable = this.formData.get(variableName);

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
    return this.formData.get(controlName)?.valid;
  }

  isEdit(){
    return this.isEditMode;
  }

}