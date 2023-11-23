import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  idCurso: number = 0;

  public listCursos: Array<{ curso: string, id: number, ppcs: any[]}> = [{ curso: 'Selecione o curso', id: 0, ppcs: [] }];
  public listPpcs: Array<{ id: number, nomePPC: string, ano: number}> = [{id: 0, nomePPC: 'Selecione o curso', ano: 0}];

  constructor(private cursoService: CursoService, private route: ActivatedRoute, 
    private ppcService: PpcService, 
    private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.loadCursos();
    let disciplina: Disciplina = this.route.snapshot.data['disciplina'];
    //console.log(disciplina);
    if(disciplina){
      //console.log(this.listCursos);
      let curso_id: any = disciplina.curso_id;
      let ppc_id: any = disciplina.ppc_id;
      this.ppcEdit(curso_id, ppc_id);
    }

    this.formData = this.fb.group({
      curso: [disciplina.curso_id, Validators.required],
      ppc: [disciplina.ppc_id, Validators.required],
      codigo: [disciplina.codDisciplina, [Validators.required, Validators.pattern('^[A-Z]{3}-[A-Z]{3}[0-9]{3}$')]],
      disciplina: [disciplina.nome, [Validators.required, Validators.pattern('^[a-zA-Z0-9À-ÖØ-\\s]{10,120}$')]],
      cargaHoraria: [disciplina.cargaHoraria, [Validators.required, Validators.min(10), Validators.max(500)]],
    });
     
  }

  submitForm(form: FormGroup) {
    //console.log(form.value);
    //console.log(this.adjustPpcs(form.value));
    if (form.valid) {
      this.ppcService.createDiscipline(this.adjustPpcs(form.value))
        .subscribe(result => alert("Salvo com sucesso"), error => alert("Erro ao salvar disciplina"));
    } else {
      alert("Preencha todos os campos");
    }
  }

  loadCursos(){
    this.cursoService.getCursos().subscribe(
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

  ppcEdit(idCurso: any, idPpc: number){
    const teste = this.listCursos;
    console.log(this.listCursos.length);
    teste.forEach(curso => {
      console.log(curso);
    });
      
      //console.log(i);
      /*if(i.id === idCurso){
       for(const j of i.ppcs ){
          if(j.id === idPpc){
            this.listPpcs.push({id: j.id, nomePPC: j.nomePPC, ano: j.ano});
            this.ppcAux = {
              id: j.id,
              nomePPC: j.nomePPC,
              ano: j.ano,
            }
          }
        }*/
      
    }
  

  selectPpcs(event: Event){
    this.listPpcs = [];
    const elementoSelecionado = event.target as HTMLSelectElement;
    const opcaoSelecionada = elementoSelecionado.value;
    this.idCurso = parseInt(opcaoSelecionada.split('. ')[0]);
    this.listPpcs = [{id: 0, nomePPC: 'Selecione o PPC', ano: 0}];
    for (const i of this.listCursos) {
      if(i.id === this.idCurso){
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
          id: '',
          nome: form.disciplina,
          codDisciplina: form.codigo,
          cargaHoraria: form.cargaHoraria
        }]
    }
  }

  ppcChange() {
    for (const i of this.listCursos) {
      if(i.id === this.idCurso){
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
    return this.formData.get('ppc')?.valid;
  }

  isValid(controlName: string) {
    return this.formData.get(controlName)?.valid;
  }

}